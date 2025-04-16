import { cacheIsStale } from '$lib/projectMetaData';
import { userRepos } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const { repos, cachedAt } = get(userRepos);
	if (!repos || !Object.keys(repos).length || cacheIsStale(cachedAt)) {
		userRepos.set(await fetch('/repos.json').then((r) => r.json()));
	}
};
