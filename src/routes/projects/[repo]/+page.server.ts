import { API_KEY } from '$env/static/private';
import { getReadme } from '$lib/userRepos';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export async function load({ params }): Promise<PageServerLoad> {
	let readme = '';
	try {
		readme = await getReadme(params.repo, API_KEY);
	} catch (ex) {
		throw error(400, ex.toString());
	}
	return { readme };
}
