import { convertContentToHtml } from '$lib/server';
import { blogPosts } from '$lib/stores';
import { error, json } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, setHeaders }: RequestEvent) => {
	const { slug } = params;
	let blogPost = get(blogPosts).find((post) => post.slug === slug);
	if (!blogPost || !blogPost.content) {
		throw error(404, `Error fetching blogpost matching slug: ${slug}`);
	}

	blogPost = await convertContentToHtml(blogPost);
	setHeaders({ 'Cache-Control': `max-age=0, s-maxage=${3600}` });
	return json(blogPost);
};
