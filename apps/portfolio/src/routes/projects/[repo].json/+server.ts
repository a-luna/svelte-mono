import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { convertReadmeToHtml } from '$lib/server';
import { API_BASE_URL, GH_USER } from '$lib/siteConfig';
import { userRepos } from '$lib/stores';
import type { RepoWithMetaData } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { RequestEvent, RequestHandler } from './$types';

const getReadmeEndpointForProject = (project: RepoWithMetaData): string => {
	return project.inMonorepo
		? `repos/${GH_USER}/${project.monorepoName}/contents/${project.monorepoProjectPath}/README.md`
		: `repos/${GH_USER}/${project.name}/readme`;
};

export const GET: RequestHandler = async ({ params, setHeaders }: RequestEvent) => {
	const { repos } = get(userRepos);
	const project = Object.values(repos).find((r) => r.name === params.repo) || ({} as RepoWithMetaData);
	const endpoint = getReadmeEndpointForProject(project);
	const result = await api.getText(
		`${API_BASE_URL}/${endpoint}`,
		{ type: 'Token', token: API_KEY },
		'application/vnd.github.raw',
	);
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const markdown = result.value;
	const readme = await convertReadmeToHtml(markdown, project);

	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`,
	});
	return json(readme);
};
