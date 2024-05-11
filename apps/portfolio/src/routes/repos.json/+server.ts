import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { MONOREPO_NAMES } from '$lib/constants';
import { cachedUserRepos, convertGHRepos, convertMonorepoProjects, repoDataDepot } from '$lib/projectMetaData';
import { API_BASE_URL, GH_USER } from '$lib/siteConfig';
import { isMonorepoProject } from '$lib/typeguards';
import type { GHCommit, HttpResult, Monorepo, MonorepoProjectName, RepoWithMetaData } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ setHeaders }: RequestEvent) => {
	const { userRepos, cachedAt } = await getUserRepos();
	const monorepoProjects = await getMonorepoProjects();

	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`,
	});
	return json({ repos: [...userRepos, ...monorepoProjects], cachedAt });
};

async function getUserRepos(): Promise<{ userRepos: RepoWithMetaData[]; cachedAt: string }> {
	const endpoint = `users/${GH_USER}/repos`;
	const q = new URLSearchParams();
	q.set('per_page', '100');

	let result: HttpResult;
	try {
		result = await api.get(`${API_BASE_URL}/${endpoint}?${q}`, {
			type: 'Token',
			token: API_KEY,
		});
	} catch (ex) {
		return { userRepos: convertGHRepos(cachedUserRepos), cachedAt: new Date(0).toISOString() };
	}

	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	const allRepos = await response.json().catch(() => ({}));
	return { userRepos: convertGHRepos(allRepos), cachedAt: new Date().toISOString() };
}

async function getMonorepoProjects(): Promise<RepoWithMetaData[]> {
	const monorepoData: Record<Monorepo, Record<MonorepoProjectName, string>> = {} as Record<
		Monorepo,
		Record<MonorepoProjectName, string>
	>;
	for (const monorepo of MONOREPO_NAMES) {
		if (monorepo === '') continue;
		monorepoData[monorepo] = {} as Record<MonorepoProjectName, string>;
		const commits = await getMonorepoCommits(monorepo);

		for (const projectName of getMonorepoProjectNames(monorepo)) {
			const lastCommitDate = getMonorepoProjectLastCommitDate(commits, projectName);
			const thisMonorepoData = monorepoData[monorepo];
			if (isMonorepoProject(projectName)) {
				thisMonorepoData[projectName] = lastCommitDate;
			}
		}
	}
	return convertMonorepoProjects(monorepoData);
}

async function getMonorepoCommits(repo: string) {
	const endpoint = `repos/${GH_USER}/${repo}/commits`;
	const q = new URLSearchParams();
	q.set('per_page', '100');

	const result = await api.get(
		`${API_BASE_URL}/${endpoint}?${q}`,
		{ type: 'Token', token: API_KEY },
		'application/vnd.github+json',
	);
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	return await response.json().catch(() => ({}));
}

const getMonorepoProjectNames = (monorepo: string): string[] =>
	Object.values(repoDataDepot)
		.filter((repo) => repo.inMonorepo)
		.filter((repo) => repo.monorepoName === monorepo)
		.map((repo) => repo?.name ?? '');

function getMonorepoProjectLastCommitDate(allCommits: GHCommit[], projectName: string): string {
	const lastCommit = allCommits
		.filter((commit) => commit.commit.message.includes(`(${projectName})`))
		.sort((a, b) => new Date(b.commit.author.date).valueOf() - new Date(a.commit.author.date).valueOf())
		.at(0);
	return lastCommit?.commit.author.date || '';
}
