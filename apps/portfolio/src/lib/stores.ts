import { browser } from '$app/environment';
import { initializeProjectData } from '$lib/projectMetaData';
import type { BlogPost, CachedProjectData, OrderedNavItem, Result, TutorialSection } from '$lib/types';
import { sortByDate } from '$lib/util';
import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';

export const initialFadePerformed = writable<boolean>(false);
export const mobileDisplay = writable<boolean>(false);
export const mobileNavOpen = writable<boolean>(false);
export const userRepos = writable<CachedProjectData>(initializeProjectData());
export const blogPosts = writable<BlogPost[]>([]);
export const tutorialSections = writable<TutorialSection[]>([]);

export function createLocalStorageValue<T>(key: string, defaultValue: T): Result<Writable<T>> {
	let clientValue: T;
	let store: Writable<T>;
	if (browser) {
		clientValue = JSON.parse(window.localStorage.getItem(key) ?? '');
		if (clientValue) {
			store = writable(clientValue);
		} else {
			store = writable(defaultValue);
			window.localStorage.setItem(key, JSON.stringify(defaultValue));
		}
		store.subscribe((value) => {
			if (browser) {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		});
		return { success: true, value: store };
	}
	return { success: false, error: 'This function (createLocalStorageValue) must be run in browser (client-side)' };
}

export const blogPostDateMap: Readable<OrderedNavItem[]> = derived(blogPosts, ($blogPosts) =>
	$blogPosts.sort(sortByDate(true)).map(({ slug, title }, i) => ({
		slug,
		title,
		titleCompact: title,
		weight: i,
	})),
);

export const tutorialSectionNumberMap: Readable<OrderedNavItem[]> = derived(tutorialSections, ($tutorialSections) =>
	$tutorialSections
		.sort((a, b) => (a?.series_weight ?? 0) - (b?.series_weight ?? 0))
		.map(({ slug, series_weight, series_part, lead }) => ({
			slug,
			title: lead || series_part || '',
			titleCompact: series_part || '',
			weight: series_weight || 0,
		})),
);

/* c8 ignore start */
function syncHeight(el: HTMLElement): Writable<number> {
	return writable<number>(0, (set) => {
		if (!el) {
			return;
		}
		const ro = new ResizeObserver(() => el && set(el.offsetHeight));
		ro.observe(el);
		return () => ro.disconnect();
	});
}

function syncWidth(el: HTMLElement): Writable<number> {
	return writable<number>(0, (set) => {
		if (!el) {
			return;
		}
		const ro = new ResizeObserver(() => el && set(el.offsetWidth));
		ro.observe(el);
		return () => ro.disconnect();
	});
}

export const getPageHeight = (): Result<Writable<number>> => {
	if (typeof window === 'undefined') {
		return { success: false, error: 'This function (getPageHeight) must be run in browser (client-side)' };
	}
	const svelteDiv = document.getElementById('svelte');
	return svelteDiv
		? { success: true, value: syncHeight(svelteDiv) }
		: { success: false, error: 'The DOM element with id="svelte" does not exist' };
};

export const getPageWidth = (): Result<Writable<number>> => {
	if (typeof window === 'undefined') {
		return { success: false, error: 'This function (getPageWidth) must be run in browser (client-side)' };
	}
	const svelteDiv = document.getElementById('svelte');
	return svelteDiv
		? { success: true, value: syncWidth(svelteDiv) }
		: { success: false, error: 'The DOM element with id="svelte" does not exist' };
};
/* c8 ignore stop */
