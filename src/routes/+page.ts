import { userRepos } from '$lib/stores';
import type { GHRepo } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let allRepos: GHRepo[];
	const storedValue = get(userRepos);
	if (!storedValue || !storedValue.length) {
		allRepos = await fetch('/repos.json').then((r) => r.json());
		userRepos.set(allRepos);
	} else {
		allRepos = storedValue;
	}

	return { allRepos };
};
