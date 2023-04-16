import { tutorialSections } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let checkSections = get(tutorialSections);
	if (!checkSections || !checkSections.length) {
		checkSections = await fetch('/series/flask-api-tutorial.json').then((r) => r.json());
		tutorialSections.set(checkSections);
	}
	return { allTutorialSections: checkSections };
};
