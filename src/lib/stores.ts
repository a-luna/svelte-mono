import type { BlogPost, BlogPostDateMap, GHRepo, JsonValue } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';

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

function checkBodyIsScrollable(el: HTMLElement): Writable<boolean> {
	return writable<boolean>(false, (set) => {
		if (typeof window === 'undefined') {
			return;
		}
		const ro = new ResizeObserver(() => el && set(el.scrollHeight > window.innerHeight));
		ro.observe(el);
		return () => ro.disconnect();
	});
}

export const getBodyIsScrollable = (): Writable<boolean> => checkBodyIsScrollable(document.body);

export const blogPostDateMap: Readable<BlogPostDateMap[]> = derived(blogPosts, ($blogPosts) =>
	$blogPosts.map(({ slug, date, title }) => ({ slug, date, title }))
);
