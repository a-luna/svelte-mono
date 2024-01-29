import type { Result } from '$lib/types';
import { objectIsEmpty } from '$lib/util';
import { BROWSER } from 'esm-env';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function createLocalStorageValue<T extends object>(key: string, defaultValue: T): Result<Writable<T>> {
	let clientValue = defaultValue;
	if (BROWSER) {
		clientValue = JSON.parse(window.localStorage.getItem(key) ?? '{}');
		if (objectIsEmpty(clientValue)) {
			window.localStorage.setItem(key, JSON.stringify(defaultValue));
			clientValue = defaultValue;
		}
		const store = writable(clientValue);
		store.subscribe((value) => window.localStorage.setItem(key, JSON.stringify(value)));
		return { success: true, value: store };
	}
	return {
		success: false,
		error: Error('This function (createLocalStorageValue) must be run in browser (client-side)'),
	};
}

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
		return { success: false, error: Error('This function (getPageHeight) must be run in browser (client-side)') };
	}
	const svelteDiv = document.getElementById('svelte');
	return svelteDiv
		? { success: true, value: syncHeight(svelteDiv) }
		: { success: false, error: Error('The DOM element with id="svelte" does not exist') };
};

export const getPageWidth = (): Result<Writable<number>> => {
	if (typeof window === 'undefined') {
		return { success: false, error: Error('This function (getPageWidth) must be run in browser (client-side)') };
	}
	const svelteDiv = document.getElementById('svelte');
	return svelteDiv
		? { success: true, value: syncWidth(svelteDiv) }
		: { success: false, error: Error('The DOM element with id="svelte" does not exist') };
};

export const getViewportHeight = (): Result<Writable<number>> => {
	if (typeof window === 'undefined') {
		return { success: false, error: Error('This function (getViewportHeight) must be run in browser (client-side)') };
	}
	const body = document.getElementsByTagName('body')[0];
	return body
		? { success: true, value: syncHeight(body) }
		: { success: false, error: Error("'body' element was not found. Please ensure the DOM is rendered correctly") };
};

export const getViewportWidth = (): Result<Writable<number>> => {
	if (typeof window === 'undefined') {
		return { success: false, error: Error('This function (getViewportWidth) must be run in browser (client-side)') };
	}
	const body = document.getElementsByTagName('body')[0];
	return body
		? { success: true, value: syncWidth(body) }
		: { success: false, error: Error("'body' element was not found. Please ensure the DOM is rendered correctly") };
};
