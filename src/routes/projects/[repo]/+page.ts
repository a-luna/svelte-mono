import type { PageLoad } from './$types';

export async function load({ data, setHeaders }): Promise<PageLoad> {
	setHeaders({
		'cache-control': 'max-age=3600'
	});
	return { readme: data.readme };
}
