import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { repo } = params;
	const readme = await fetch(`/projects/${repo}.json`).then((r) => r.json());
	return { readme };
};
