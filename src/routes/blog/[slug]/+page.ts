import { parseBlogPost } from '$lib/ghContent';
import { blogPosts } from '$lib/stores';
import type { BlogPost } from '$lib/types';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	let allBlogposts: BlogPost[];
	const storedValue = get(blogPosts);
	if (!storedValue || !storedValue.length) {
		allBlogposts = await fetch('/blog.json').then((r) => r.json());
		blogPosts.set(allBlogposts);
	} else {
		allBlogposts = storedValue;
	}
	if (!allBlogposts.length) {
		throw error(404, 'No blog posts were found!');
	}
	const { slug } = params;
	const blogpost = allBlogposts.find((post) => post.slug === slug);
	if (blogpost) {
		return { blogPost: parseBlogPost(blogpost) };
	}
	throw error(404, `No blog post found matching slug: '${slug}'`);
};
