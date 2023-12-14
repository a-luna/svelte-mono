import { cacheIsStale, convertGHRepos } from '$lib/projectMetaData';
import { userRepos } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const allBlogPosts = await fetch('/blog.json').then((r) => r.json());
	const allTutorialSections = await fetch('/series/flask-api-tutorial.json').then((r) => r.json());

	let { repos, cachedAt } = get(userRepos);
	if (!repos.length || cacheIsStale(cachedAt)) {
		const projectData = await fetch('/repos.json').then((r) => r.json());
		repos = convertGHRepos(projectData.repos);
		cachedAt = projectData.cachedAt
	}

	return { allBlogPosts, allTutorialSections, allRepos: repos, reposCachedAt: cachedAt };
};
