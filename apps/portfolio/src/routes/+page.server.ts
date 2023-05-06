import { blogPosts, tutorialSections } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let allBlogPosts = get(blogPosts);
	if (!allBlogPosts || !allBlogPosts.length) {
		allBlogPosts = await fetch('/blog.json').then((r) => r.json());
		blogPosts.set(allBlogPosts);
	}

	let allTutorialSections = get(tutorialSections);
	if (!allTutorialSections || !allTutorialSections.length) {
		allTutorialSections = await fetch('/series/flask-api-tutorial.json').then((r) => r.json());
		tutorialSections.set(allTutorialSections);
	}
	return { allBlogPosts, allTutorialSections };
};
