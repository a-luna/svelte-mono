import { cacheIsStale, convertGHRepos } from '$lib/projectMetaData';
import { userRepos } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let { repos, cachedAt } = get(userRepos);
	if (!repos.length || cacheIsStale(cachedAt)) {
		const projectData = await fetch('/repos.json').then((r) => r.json());
		repos = convertGHRepos(projectData.repos);
		cachedAt = projectData.cachedAt
		userRepos.set({ repos, cachedAt });
	}
};
