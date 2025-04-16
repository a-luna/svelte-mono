import { cacheIsStale } from '$lib/projectMetaData';
import { blogPosts, tutorialSections, userRepos } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let { repos, cachedAt } = get(userRepos);
	if (!repos || !Object.keys(repos).length || cacheIsStale(cachedAt)) {
		({ repos, cachedAt } = await fetch('/repos.json').then((r) => r.json()));
		userRepos.set({ repos, cachedAt });
	}
	const allPosts = await fetch('/blog.json').then((r) => r.json());
	blogPosts.set(allPosts);

	const allSections = await fetch('/series/flask-api-tutorial.json').then((r) => r.json());
	tutorialSections.set(allSections);
	return { repos, allPosts, allSections };
};
