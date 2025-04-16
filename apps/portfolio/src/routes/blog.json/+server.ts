import { listBlogPosts } from '$lib/server';
import { sortByDate } from '$lib/util';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ setHeaders }: RequestEvent) => {
	const allBlogPosts = sortByDate([...(await listBlogPosts())], { key: 'date', asc: false });

	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`,
	});
	return json(allBlogPosts);
};
