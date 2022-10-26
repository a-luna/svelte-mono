import { convertContentToHtml } from '$lib/content';
import { tutorialSections } from '$lib/stores';
import type { TutorialSection } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, setHeaders }: RequestEvent) => {
	const { slug } = params;
	let tutorialSection = get(tutorialSections).find((post) => post.slug === slug);
	if (!tutorialSection || !tutorialSection.content) {
		throw error(404, `Error fetching blogpost matching slug: ${slug}`);
	}

	tutorialSection = (await convertContentToHtml(tutorialSection)) as TutorialSection;
	const temp = { ...tutorialSection, content: tutorialSection.content.slice(0, 100) };
	setHeaders({ 'Cache-Control': `max-age=0, s-maxage=${3600}` });
	return json(tutorialSection);
};
