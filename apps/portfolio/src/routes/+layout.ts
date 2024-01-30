import { url as pageUrl } from '$lib/stores';
import type { LayoutLoad } from './$types';

export const load = (async ({ url }) => {
	pageUrl.set(url.pathname);
	return {
		url: url.pathname,
	};
}) satisfies LayoutLoad;
