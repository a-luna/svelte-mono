import { API_KEY } from '$env/static/private';
import { listGithubContent } from '$lib/ghContent';
import type { ContentItem } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// export const prerender = true; // turned off so it refreshes quickly
export async function load(): Promise<PageServerLoad> {
	let items: ContentItem[] = [];
	try {
		const ghItems = await listGithubContent(API_KEY);
		// const localItems = await listLocalContent();
		items = ghItems.sort((a, b) => b.date.valueOf() - a.date.valueOf());
	} catch (ex) {
		throw error(400, ex.toString());
	}
	return { items };
}
