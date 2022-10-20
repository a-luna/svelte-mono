import type { BlogPost, GHRepo, JsonValue } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function createLocalStorageValue<T extends JsonValue>(
	key: string,
	defaultValue: T
): Writable<T> {
	let clientValue;
	if (typeof window !== 'undefined') {
		clientValue = JSON.parse(window.localStorage.getItem(key) ?? '{}');
		if (!clientValue) window.localStorage.setItem(key, JSON.stringify(defaultValue));
	}
	const store = writable(clientValue || defaultValue);
	store.subscribe((value) => {
		if (typeof window !== 'undefined' && value) {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	});
	return store;
}

export const userRepos = createLocalStorageValue<GHRepo[]>('repos', []);

export const blogPosts = writable<BlogPost[]>([]);
