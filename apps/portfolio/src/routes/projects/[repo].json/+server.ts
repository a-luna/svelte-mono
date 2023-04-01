import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { convertReadmeToHtml } from '$lib/server';
import { API_BASE_URL, GH_USER } from '$lib/siteConfig';
import { userRepos } from '$lib/stores';
import type { RepoWithMetaData } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, setHeaders }: RequestEvent) => {
	const endpoint = `repos/${GH_USER}/${params.repo}/readme`;
	const result = await api.get(
		`${API_BASE_URL}/${endpoint}`,
		{ type: 'Token', token: API_KEY },
		'application/vnd.github.raw',
	);
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	const markdown = await response.text().catch(() => '');
	const { repos } = get(userRepos);
	const repo = repos.find((r) => r.name === params.repo) || ({} as RepoWithMetaData);
	const readme = await convertReadmeToHtml(markdown, repo);

	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`,
	});
	return json(readme);
};
