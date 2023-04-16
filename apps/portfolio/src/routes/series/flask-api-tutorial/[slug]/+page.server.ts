import { tutorialSections } from '$lib/stores';
import type { TutorialSection } from '$lib/types';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	let checkSections = get(tutorialSections);
	if (!checkSections || !checkSections.length) {
		checkSections = await fetch('/series/flask-api-tutorial.json').then((r) => r.json());
		tutorialSections.set(checkSections);
	}
	if (!checkSections.length) {
		throw error(404, 'No blog posts were found!');
	}
	const { slug } = params;
	const tutorialSection: TutorialSection = await fetch(`/series/flask-api-tutorial/${slug}.json`).then((r) => r.json());
	return { allTutorialSections: checkSections, tutorialSection };
};
