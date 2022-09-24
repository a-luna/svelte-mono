import type { BlogPost, GHRepo, JsonValue } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function createSessionStorageValue<T extends JsonValue>(
	key: string,
	defaultValue: T
): Writable<T> {
	let clientValue;
	if (typeof window !== 'undefined') {
		clientValue = JSON.parse(window.sessionStorage.getItem(key) ?? '{}');
		if (!clientValue) window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
	}
	const store = writable(clientValue || defaultValue);
	store.subscribe((value) => {
		if (typeof window !== 'undefined' && value) {
			window.sessionStorage.setItem(key, JSON.stringify(value));
		}
	});
	return store;
}

export const userRepos = createSessionStorageValue<GHRepo[]>('repos', []);

export const blogPosts = createSessionStorageValue<BlogPost[]>('blogPosts', []);
