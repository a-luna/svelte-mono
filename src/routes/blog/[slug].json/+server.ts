import { blogPosts } from '$lib/stores';
import { error, json } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeFormat from 'rehype-format';
import rehypeParse from 'rehype-parse';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { get } from 'svelte/store';
import { unified } from 'unified';
import type { RequestEvent, RequestHandler } from './$types';

const INFO_BOX_REGEX =
	/(?:<p>)?{{< info_box >}}(?:<\/p>)?\n([\s\S][^{]*)\n{{< \/info_box >}}(?:<\/p>)?/g;
const ALERT_BOX_REGEX =
	/(?:<p>)?{{< alert_box >}}(?:<\/p>)?\n([\s\S][^{]*)\n{{< \/alert_box >}}(?:<\/p>)?/g;

export const GET: RequestHandler = async ({ fetch, params, setHeaders }: RequestEvent) => {
	const { slug } = params;
	const allBlogPosts = get(blogPosts);
	let blogPost = allBlogPosts.find((post) => post.slug === slug);

	if (!blogPost || !blogPost.content) {
		throw error(404, `Error fetching blogpost matching slug: ${slug}`);
	}

	const content = (await compile(blogPost.content))?.code
		// https://github.com/pngwn/MDsveX/issues/392
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>')
		.replace(
			INFO_BOX_REGEX,
			'<div class="note note-flex"><div class="note-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="currentColor" fill="currentColor" style="stroke-width: 0; padding: 0;" class="s-x0McpB_FEdHb"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg></div><div class="note-message" style="flex-flow:column wrap"><p>$1</p></div></div>'
		)
		.replace(
			ALERT_BOX_REGEX,
			'<div class="alert alert-flex"><div class="alert-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" stroke="currentColor" fill="currentColor" class="s-x0McpB_FEdHb" style="stroke-width: 0; padding: 0px;"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg></div><div class="alert-message"><p>$1</p></div></div>'
		);

	if (!content) {
		throw error(401, `Error occurred parsing markdown content for blogpost: ${slug}`);
	}

	const html = await unified()
		.use(rehypeParse)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings)
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(content);

	blogPost = { ...blogPost, content: String(html) };
	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`
	});
	return json(blogPost);
};
