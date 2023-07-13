import { format } from 'date-fns';
import type { hasDate, ISortByDateFunction } from './types';

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

export const sortByDate = <T extends hasDate>(asc = true): ISortByDateFunction<T> => {
	if (asc) {
		return (a: T, b: T) => {
			if (typeof a.date == 'string' && typeof b.date == 'string') {
				return new Date(a.date).valueOf() - new Date(b.date).valueOf();
			}
			if (typeof a.date != 'string' && typeof b.date != 'string') {
				return a.date.valueOf() - b.date.valueOf();
			}
			return 0;
		};
	}
	return (a: T, b: T) => {
		if (typeof a.date == 'string' && typeof b.date == 'string') {
			return new Date(b.date).valueOf() - new Date(a.date).valueOf();
		}
		if (typeof a.date != 'string' && typeof b.date != 'string') {
			return b.date.valueOf() - a.date.valueOf();
		}
		return 0;
	};
};
