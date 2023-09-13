import { BROWSER } from 'esm-env';
import { writable, type Writable } from 'svelte/store';

export const normalize = (s: string): string => s.replaceAll(/[\s-_]/g, '').toLowerCase();
export const getVariableName = (x: object) => Object.keys(x)[0];
export const objectIsEmpty = (obj: object) => JSON.stringify(obj) === '{}';

export function getRandomHexString(options: { length: number }): string {
	const { length } = options;
	return Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');
}

export function groupByProperty<T>(array: T[], property: keyof T): { [k: string]: T[] } {
	return array.reduce((grouped, item) => {
		const groupVal = item[property] as string;
		grouped[groupVal] = grouped[groupVal] || [];
		grouped[groupVal]?.push(item);
		return grouped;
	}, {} as { [k: string]: T[] });
}

export function getRandomArrayItem<T>(array: readonly T[]): T | undefined {
	return array[Math.floor(Math.random() * array.length)];
}

export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }: { enabled: boolean; cb: () => void }) {
	const handleOutsideClick = ({ target }: { target: EventTarget | null }) => {
		if (target instanceof Node) {
			if (!node.contains(target)) {
				cb();
			}
		}
	};

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		},
	};
}

export function createLocalStorageValue<T extends object>(key: string, defaultValue: T): Writable<T> {
	let clientValue = defaultValue;
	if (BROWSER) {
		clientValue = JSON.parse(window.localStorage.getItem(key) ?? '{}');
		if (objectIsEmpty(clientValue)) {
			window.localStorage.setItem(key, JSON.stringify(defaultValue));
			clientValue = defaultValue;
		}
	}
	const store = writable(clientValue);
	store.subscribe((value) => {
		if (BROWSER) {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	});
	return store;
}

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}
