import { tutorialSections } from '$lib/stores';
import type { TutorialSection } from '$lib/types';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	let allSections = get(tutorialSections);
	if (!allSections || !allSections.length) {
		allSections = await fetch('/series/flask-api-tutorial.json').then((r) => r.json());
		tutorialSections.set(allSections);
	}
	if (!allSections.length) {
		throw error(404, 'No posts were found for this series (flask-api-tutorial)!');
	}
	const { slug } = params;
	const tutorialSection: TutorialSection = await fetch(`/series/flask-api-tutorial/${slug}.json`).then((r) => r.json());
	return { tutorialSection, allSections };
};
