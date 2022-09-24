import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { GH_USER } from '$lib/siteConfig';
import { error } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, setHeaders }: RequestEvent) => {
	const endpoint = `repos/${GH_USER}/${params.repo}/readme`;
	const result = await api.get(endpoint, API_KEY, 'application/vnd.github.html');
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	const readme = await response.text().catch(() => '');
	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`
	});
	return new Response(readme);
};
