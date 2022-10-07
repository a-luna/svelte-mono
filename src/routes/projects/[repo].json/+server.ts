import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { GH_USER } from '$lib/siteConfig';
import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeFormat from 'rehype-format';
import rehypeParse from 'rehype-parse';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, setHeaders }: RequestEvent) => {
	const endpoint = `repos/${GH_USER}/${params.repo}/readme`;
	const result = await api.get(endpoint, API_KEY, 'application/vnd.github.html');
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	let readme = await response.text().catch(() => '');
	readme = (await compile(readme))?.code || '';

	const html = await unified()
		.use(rehypeParse)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings)
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(readme);

	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`
	});
	return new Response(String(html));
};
