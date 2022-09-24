import { blogPosts } from '$lib/stores';
import type { BlogPost } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let allBlogposts: BlogPost[];
	const storedValue = get(blogPosts);
	if (!storedValue || !storedValue.length) {
		allBlogposts = await fetch('/blog.json').then((r) => r.json());
		blogPosts.set(allBlogposts);
	} else {
		allBlogposts = storedValue;
	}

	return { allBlogposts };
};
