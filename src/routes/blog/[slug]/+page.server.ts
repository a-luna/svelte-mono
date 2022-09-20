import { API_KEY } from '$env/static/private';
import { nullContentItem } from '$lib/constants';
import { getGithubContent } from '$lib/ghContent';
import type { ContentItem } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// // export const prerender = true; // turned off so it refreshes quickly
// export async function load({ params }): Promise<PageServerLoad> {
// 	const slug = params.slug;

// 	let match: ContentItem = nullContentItem;
// 	try {
// 		const localItems = await listLocalContent();
// 		const localMatch = localItems.find((post) => post.slug === slug);
// 		if (localMatch) {
// 			match = localMatch;
// 		} else {
// 			const ghItems = await listGithubContent(API_KEY);
// 			match = ghItems.find((post) => post.slug === slug);
// 		}
// 	} catch (ex) {
// 		throw error(400, ex.toString());
// 	}
// 	return { json: match };
// }

export async function load({ params }): Promise<PageServerLoad> {
	const slug = params.slug;

	let blogPost: ContentItem = nullContentItem;
	try {
		blogPost = await getGithubContent(slug, API_KEY);
	} catch (ex) {
		throw error(400, ex.toString());
	}
	return { blogPost };
}
