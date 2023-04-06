import {
    getLockfileImporterId,
    readWantedLockfile,
    type Lockfile,
    type ProjectSnapshot
} from '@pnpm/lockfile-file';
import type { PackageSnapshot, PackageSnapshots, TarballResolution } from '@pnpm/lockfile-types';
import { nameVerFromPkgSnapshot, pkgSnapshotToResolution } from '@pnpm/lockfile-utils';
import { pruneSharedLockfile } from '@pnpm/prune-lockfile';
import { readProjectManifestOnly } from '@pnpm/read-project-manifest';
import { DEPENDENCIES_FIELDS } from '@pnpm/types';
import { parse as parseDepPath } from 'dependency-path';
import { writeFile } from 'fs/promises';
import path from 'path';


interface Dependency {
    version: string;
    integrity?: string;
    resolved?: string;
    bundled?: boolean;
    dev?: boolean;
    optional?: boolean;
    requires?: Record<string, string>;
    dependencies?: Record<string, Dependency>;
}

interface NamedDependency extends Dependency {
    // Package name
    name: string;
    // Map of dependency package names to a nested tree of snapshots
    dependencies: Record<string, NamedDependency>;
}

interface PackageLock {
    name: string;
    version: string;
    lockfileVersion: 1;
    packageIntegrity?: string;
    requires: boolean;
    dependencies?: Record<string, Dependency>;
}

const LATEST_SUPPORTED_PNPM_LOCK_VERSION = 5.4;
const MONOREPO_ROOT = '/Users/aaronluna/Projects/svelte-mono';
const PORTFOLIO_SITE_DIR = '/Users/aaronluna/Projects/svelte-mono/apps/portfolio';
const BASE64_SITE_DIR = '/Users/aaronluna/Projects/svelte-mono/apps/svelte-base64-ts';

export async function createPortfolioSiteLockFile(): Promise<void> {
	await createProjectLockFile(MONOREPO_ROOT, PORTFOLIO_SITE_DIR);
}

export async function createBase64SiteLockFile(): Promise<void> {
	await createProjectLockFile(MONOREPO_ROOT, BASE64_SITE_DIR);
}

async function createProjectLockFile(rootDir: string, projectDir: string): Promise<void> {
    const lock = await dedicatedLockfile(rootDir, projectDir);
    await writePackageLock(lock, projectDir);
}

async function dedicatedLockfile(
    lockfileDir: string,
    projectDir: string
): Promise<Lockfile> {
    const lockfile = await parseLockfile(lockfileDir);

    const allImporters = lockfile.importers;
    lockfile.importers = {};
    const baseImporterId = getLockfileImporterId(lockfileDir, projectDir);
    for (const [importerId, importer] of Object.entries(allImporters)) {
        if (importerId.startsWith(`${baseImporterId}/`)) {
            const newImporterId = importerId.slice(baseImporterId.length + 1);
            lockfile.importers[newImporterId] = projectSnapshotWithoutLinkedDeps(importer);
            continue;
        }
        if (importerId === baseImporterId) {
            lockfile.importers['.'] = projectSnapshotWithoutLinkedDeps(importer);
        }
    }

    return pruneSharedLockfile(lockfile);
}

async function parseLockfile(pkgPath: string): Promise<Lockfile> {
    const lock = await readWantedLockfile(pkgPath, { ignoreIncompatible: true });
    if (lock == null) throw new Error('pnpm lockfile not found');

    if (lock.lockfileVersion > LATEST_SUPPORTED_PNPM_LOCK_VERSION)
        console.warn(
            `Your lockfile version (${lock.lockfileVersion}) is higher than the supported version of pnpm-lock-export (${LATEST_SUPPORTED_PNPM_LOCK_VERSION}).`
        );

    return lock;
}

function projectSnapshotWithoutLinkedDeps(projectSnapshot: ProjectSnapshot) {
    const newProjectSnapshot: ProjectSnapshot = {
        specifiers: projectSnapshot.specifiers
    };
    for (const depField of DEPENDENCIES_FIELDS) {
        if (projectSnapshot[depField] == null) continue;
        newProjectSnapshot[depField] = Object.fromEntries(
            Object.entries(projectSnapshot[depField] ?? {}).filter(
                (entry) => !entry[1].startsWith('link:')
            )
        );
    }
    return newProjectSnapshot;
}

async function writePackageLock(lock: Lockfile, lockfileDir: string): Promise<void> {
    await convertPnpmLockFile(lock, lockfileDir)
        .then(serialize)
        .then((lock) => writeFile(path.join(lockfileDir, 'package-lock.json'), lock));
}

async function convertPnpmLockFile(lock: Lockfile, lockfileDir: string): Promise<PackageLock> {
    // Use some default dummy values if name/version are not available.
    // They should not be authoritive in the package-lock.json anyway.
    const { name, version } = await readProjectManifestOnly(lockfileDir).then(
        ({ name, version }) => {
            if (!name) console.warn("Package name not found in manifest, using placeholder value ('package').");
            if (!version) console.warn("Package version not found in manifest, using placeholder value ('0.0.0').");
            return { name: name ?? 'package', version: version ?? '0.0.0' };
        },
        (e) => {
            console.warn(`${e} Using placeholder values (name: 'package', version: '0.0.0').`);
            return { name: 'package', version: '0.0.0' };
        }
    );

    return {
        name,
        version,
        lockfileVersion: 1,
        requires: true,
        dependencies: dependenciesFromNamedDependencies(namedDependenciesFromSnapshots(lock.packages ?? {})),
    };
}

function namedDependenciesFromSnapshots(snapshots: PackageSnapshots): Record<string, NamedDependency> {
    const missingRootDepPaths = missingDepPaths(snapshots);

    function namedDependencyFromSnapshot([depPath, snapshot]: [string, PackageSnapshot]): [string, NamedDependency] {
        const { name, version } = nameVerFromPkgSnapshot(depPath, snapshot as PackageSnapshot);
        const resolution = pkgSnapshotToResolution(depPath, snapshot, { default: 'https://registry.npmjs.org/' });

        const dependencySnapshots = Object.entries(snapshot.dependencies ?? {})
            // convert the dependency to a depPath
            .map((dependency) => depPathFromDependency(dependency))
            // find the depPath in the packages map
            .map((depPath) => [depPath, snapshots[depPath]] as [string, PackageSnapshot]);

        const dependencyEntries = dependencySnapshots
            // only for depPaths that are missing...
            .filter(([depPath]) => missingRootDepPaths.includes(depPath))
            // recurse over the dependencies
            .map((entry) => namedDependencyFromSnapshot(entry));

        const requireEntries = dependencySnapshots
            .map(([depPath, snapshot]) => nameVerFromPkgSnapshot(depPath, snapshot))
            .map(({ name, version }) => [name, version])
            // Remove any dependencies that are also peerDependencies
            .filter(([key]) => key && !Object.keys(snapshot.peerDependencies ?? {}).includes(key));

        const namedDependency: NamedDependency = {
            ...snapshot,
            name,
            version,
            resolved: (resolution as TarballResolution).tarball,
            requires: Object.fromEntries(requireEntries),
            dependencies: Object.fromEntries(dependencyEntries),
        };

        const integrity = (resolution as TarballResolution).integrity;
        if (integrity) {
            namedDependency.integrity = integrity;
        }

        return [depPath, namedDependency];
    }

    return Object.fromEntries(
        Object.entries(snapshots).map((snapshotEntry) => namedDependencyFromSnapshot(snapshotEntry))
    );
}

function depPathFromDependency([name, version]: [string, string]): string {
    try {
        parseDepPath(version);
        return version;
    } catch {
        parseDepPath(`/${name}/${version}`);
        return `/${name}/${version}`;
    }
}

function dependenciesFromNamedDependencies(namedDependencies: Record<string, NamedDependency>): Record<string, Dependency> {
    return Object.fromEntries(
        Object.entries(namedDependencies)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(([_, snapshot]) => {
                const dependency: Dependency = {
                    version: snapshot.version,
                    dependencies: dependenciesFromNamedDependencies(snapshot.dependencies ?? {}),
                };

                if (snapshot.integrity) dependency.integrity = snapshot.integrity;
                if (snapshot.resolved) dependency.resolved = snapshot.resolved;
                if (snapshot.dev) dependency.dev = true;
                if (snapshot.optional) dependency.optional = true;
                if (snapshot.requires) dependency.requires = snapshot.requires;

                return [snapshot.name, dependency];
            })
            .reverse()
    );
}

function missingDepPaths(snapshots: PackageSnapshots): string[] {
    const reducedDepPaths = Object.values(
        Object.fromEntries(
            Object.keys(snapshots)
                .reverse()
                .map((depPath) => [parseDepPath(depPath).name, depPath])
        )
    );

    return Object.keys(snapshots).filter((depPath) => !reducedDepPaths.includes(depPath));
}

function serialize(lock: PackageLock): string {
    return JSON.stringify(lock, undefined, 2);
}