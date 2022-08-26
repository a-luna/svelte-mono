import { API_KEY } from '$env/static/private';
import type { GHRepo } from '$lib/types';
import { listUserRepos } from '$lib/userRepos';
import { userRepos } from '$lib/util';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

async function getAllRepos() {
	let allRepos: GHRepo[];
	const storedValue = get(userRepos);
	if (!storedValue || !storedValue.length) {
		allRepos = await listUserRepos(API_KEY);
		userRepos.set(allRepos);
	} else {
		allRepos = storedValue;
	}
	return allRepos;
}

export async function load(): Promise<PageServerLoad> {
	let allRepos = [];
	try {
		allRepos = await getAllRepos();
	} catch (ex) {
		throw error(400, ex.toString());
	}
	return { allRepos };
}
