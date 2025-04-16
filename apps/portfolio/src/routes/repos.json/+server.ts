import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { MONOREPO_NAMES, nullRepoWithMetadata } from '$lib/constants';
import { cachedUserRepos, convertGHRepos, createProjectMap, repoDataDepot } from '$lib/projectMetaData';
import { API_BASE_URL, GH_USER } from '$lib/siteConfig';
import { isMonorepoProject, isSiteProject } from '$lib/typeguards';
import {
	gHCommitSchema,
	gHRepoSchema,
	type HttpJsonResult,
	type Monorepo,
	type MonorepoProjectName,
	type RepoWithMetaData,
	type ZodParseResult,
	type ghCommit,
	type ghRepo,
} from '$lib/types';
import { error, json } from '@sveltejs/kit';
import { ZodError, z } from 'zod';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ setHeaders }: RequestEvent) => {
	let userRepos: RepoWithMetaData[] = [];
	let cachedAt: string = '';
	const result = await getUserRepos();
	if (result.success) {
		userRepos = convertGHRepos(result.data);
		cachedAt = new Date().toISOString();
	} else {
		userRepos = convertGHRepos(cachedUserRepos);
		cachedAt = new Date(0).toISOString();
	}
	const monorepoProjects = await getMonorepoProjects();
	const repos = createProjectMap([...userRepos, ...monorepoProjects]);

	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`,
	});
	return json({ repos, cachedAt });
};

async function getUserRepos(): Promise<ZodParseResult<ghRepo[]>> {
	const endpoint = `users/${GH_USER}/repos`;
	const q = new URLSearchParams();
	q.set('per_page', '100');

	let result: HttpJsonResult;
	try {
		result = await api.getJson(`${API_BASE_URL}/${endpoint}?${q}`, {
			type: 'Token',
			token: API_KEY,
		});
	} catch (ex) {
		const error = ex as Error;
		return { success: false, error: new ZodError([{ path: [], message: error.message, code: 'custom' }]) };
	}
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	return await z.array(gHRepoSchema).safeParseAsync(result.value);
}

async function getMonorepoProjects(): Promise<RepoWithMetaData[]> {
	const monorepoData: Record<Monorepo, Record<MonorepoProjectName, string>> = {} as Record<
		Monorepo,
		Record<MonorepoProjectName, string>
	>;
	for (const monorepo of MONOREPO_NAMES) {
		if (monorepo === '') continue;
		monorepoData[monorepo] = {} as Record<MonorepoProjectName, string>;
		const result = await getMonorepoCommits(monorepo);
		if (!result.success) {
			throw error(500, 'Error fetching monorepo commits');
		}
		const commits = result.data;

		for (const projectName of getMonorepoProjectNames(monorepo)) {
			if (projectName === '') continue;
			const lastCommitDate = getMonorepoProjectLastCommitDate(commits, projectName);
			if (isMonorepoProject(projectName)) {
				monorepoData[monorepo][projectName] = lastCommitDate;
			}
		}
	}
	return convertMonorepoProjects(monorepoData);
}

async function getMonorepoCommits(repo: string): Promise<ZodParseResult<ghCommit[]>> {
	const endpoint = `repos/${GH_USER}/${repo}/commits`;
	const q = new URLSearchParams();
	q.set('per_page', '100');

	const result = await api.getJson(
		`${API_BASE_URL}/${endpoint}?${q}`,
		{ type: 'Token', token: API_KEY },
		'application/vnd.github+json',
	);
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	return await z.array(gHCommitSchema).safeParseAsync(result.value);
}

const getMonorepoProjectNames = (monorepo: string): string[] =>
	Object.values(repoDataDepot)
		.filter((repo) => repo.inMonorepo)
		.filter((repo) => repo.monorepoName === monorepo)
		.map((repo) => repo?.name ?? '');

function getMonorepoProjectLastCommitDate(allCommits: ghCommit[], projectName: string): string {
	const lastCommit = allCommits
		.filter((commit) => commit.commit.message.includes(`(${projectName})`))
		.sort((a, b) => new Date(b.commit.author.date).valueOf() - new Date(a.commit.author.date).valueOf())
		.at(0);
	return lastCommit?.commit.author.date || '';
}

function convertMonorepoProjects(
	monorepoProjectData: Record<Monorepo, Record<MonorepoProjectName, string>>,
): RepoWithMetaData[] {
	const monorepoProjects: RepoWithMetaData[] = [];
	for (const projects of Object.values(monorepoProjectData)) {
		for (const [projectName, lastCommitDate] of Object.entries(projects)) {
			if (!isSiteProject(projectName)) continue;
			const project = repoDataDepot?.[projectName] ?? nullRepoWithMetadata;
			project.repoUrl = `https://github.com/a-luna/${project.monorepoName}/tree/main/${project.monorepoProjectPath}`;
			monorepoProjects.push({
				...nullRepoWithMetadata,
				...project,
				updatedAt: lastCommitDate,
			});
		}
	}
	return monorepoProjects;
}
