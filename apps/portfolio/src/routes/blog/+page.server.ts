import { blogPosts } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let checkBlogPosts = get(blogPosts);
	if (!checkBlogPosts || !checkBlogPosts.length) {
		checkBlogPosts = await fetch('/blog.json').then((r) => r.json());
		blogPosts.set(checkBlogPosts);
	}
	return { allBlogPosts: checkBlogPosts };
};
