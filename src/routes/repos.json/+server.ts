import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { API_BASE_URL, GH_USER } from '$lib/siteConfig';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ setHeaders }: RequestEvent) => {
	const endpoint = `users/${GH_USER}/repos`;
	const q = new URLSearchParams();
	q.set('per_page', '100');
	const result = await api.get(`${API_BASE_URL}/${endpoint}?${q}`, {
		type: 'Token',
		token: API_KEY
	});
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	const allRepos = await response.json().catch(() => ({}));
	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`
	});
	return json(allRepos);
};
