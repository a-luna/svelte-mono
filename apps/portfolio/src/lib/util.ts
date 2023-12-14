import { format } from 'date-fns';
import type { ISortByDateFunction } from './types';

export const formatDateString = (date: Date) => format(date, 'PPP');

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export const getRandomArrayItem = <T>(array: readonly T[], defaultValue: T): T =>
	array.at(Math.floor(Math.random() * array.length)) ?? defaultValue;

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();

export const slugify = (text: string): string =>
	text
		.normalize('NFKD')
		.toLowerCase()
		.trim()
		.replace(/[\s_]+/g, '-')
		.replace(/([^A-Za-z0-9-])+/g, '')
		.replace(/--+/g, '-')
		.replace(/(^-|-$)/g, '');

export function getScrollbarWidth() {
	if (typeof window === 'undefined') return;
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll';
	document.body.appendChild(outer);
	const inner = document.createElement('div');
	outer.appendChild(inner);
	const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
	outer?.parentNode?.removeChild(outer);
	return scrollbarWidth;
}

export const sortByDate = <T, K extends keyof T>(key: K, asc = true): ISortByDateFunction<T> => {
	if (asc) {
		return (a: T, b: T) => {
			if (typeof a[key] == 'string' && typeof b[key] == 'string') {
				return new Date(a[key]).valueOf() - new Date(b[key]).valueOf();
			}
			if (typeof a[key] != 'string' && typeof b[key] != 'string') {
				return a[key].valueOf() - b[key].valueOf();
			}
			return 0;
		};
	}
	return (a: T, b: T) => {
		if (typeof a[key] == 'string' && typeof b[key] == 'string') {
			return new Date(b[key]).valueOf() - new Date(a[key]).valueOf();
		}
		if (typeof a[key] != 'string' && typeof b[key] != 'string') {
			return b[key].valueOf() - a[key].valueOf();
		}
		return 0;
	};
};
