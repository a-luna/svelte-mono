import { blogPosts } from '$lib/stores';
import type { BlogPost } from '$lib/types';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	let allBlogPosts: BlogPost[];
	const storedValue = get(blogPosts);
	if (!storedValue || !storedValue.length) {
		allBlogPosts = await fetch('/blog.json').then((r) => r.json());
		blogPosts.set(allBlogPosts);
	} else {
		allBlogPosts = storedValue;
	}
	if (!allBlogPosts.length) {
		throw error(404, 'No blog posts were found!');
	}
	const { slug } = params;
	const blogPost: BlogPost = await fetch(`/blog/${slug}.json`).then((r) => r.json());
	return { blogPost };
};
