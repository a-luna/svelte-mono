import { blogPosts } from '$lib/stores';
import type { BlogPost } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let allBlogPosts: BlogPost[];
	const storedValue = get(blogPosts);
	if (!storedValue || !storedValue.length) {
		allBlogPosts = await fetch('/blog.json').then((r) => r.json());
		blogPosts.set(allBlogPosts);
	} else {
		allBlogPosts = storedValue;
	}
	return { allBlogPosts };
};
