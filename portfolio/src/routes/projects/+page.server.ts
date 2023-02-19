import { cacheIsStale, convertGHRepos } from '$lib/projectMetaData';
import { userRepos } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const { repos, cachedAt } = get(userRepos);
	if (!repos.length || cacheIsStale(cachedAt)) {
		const projectData = await fetch('/repos.json').then((r) => r.json());
		userRepos.set({ repos: convertGHRepos(projectData.repos), cachedAt: projectData.cachedAt });
	}
};
