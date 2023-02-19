import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { cachedUserRepos } from '$lib/projectMetaData';
import { API_BASE_URL, GH_USER } from '$lib/siteConfig';
import type { HttpResult } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ setHeaders }: RequestEvent) => {
	const endpoint = `users/${GH_USER}/repos`;
	const q = new URLSearchParams();
	q.set('per_page', '100');

	let result: HttpResult;
	try {
		result = await api.get(`${API_BASE_URL}/${endpoint}?${q}`, {
			type: 'Token',
			token: API_KEY
		});
	} catch (ex) {
		return json({ repos: cachedUserRepos, cachedAt: new Date(0).toISOString() });
	}

	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	const allRepos = await response.json().catch(() => ({}));
	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`
	});
	return json({ repos: allRepos, cachedAt: new Date().toISOString() });
};
