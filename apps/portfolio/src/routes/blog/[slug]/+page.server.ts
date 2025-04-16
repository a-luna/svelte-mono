import { blogPosts } from '$lib/stores';
import type { BlogPost } from '$lib/types';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	let allPosts = get(blogPosts);
	if (!allPosts || !allPosts.length) {
		allPosts = await fetch('/blog.json').then((r) => r.json());
		blogPosts.set(allPosts);
	}
	if (!allPosts.length) {
		throw error(404, 'No blog posts were found!');
	}
	const { slug } = params;
	const blogPost: BlogPost = await fetch(`/blog/${slug}.json`).then((r) => r.json());
	return { blogPost, allPosts };
};
