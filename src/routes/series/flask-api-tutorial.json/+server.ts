import { listTutorialSections } from '$lib/content';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ setHeaders }: RequestEvent) => {
	const allTutorialSections = [...(await listTutorialSections())].sort(
		(a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
	);

	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`
	});
	return json(allTutorialSections);
};
