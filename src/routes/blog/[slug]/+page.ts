import type { PageLoad } from './$types';

export async function load({ data, setHeaders }): Promise<PageLoad> {
	setHeaders({
		'Cache-Control': 'max-age=3600'
	});
	return { blogPost: data.blogPost };
}
