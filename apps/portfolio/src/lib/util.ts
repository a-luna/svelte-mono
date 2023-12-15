import { isDate, isDateLike } from '$lib/typeguards';
import { format } from 'date-fns';

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

export function sortByDate<T, K extends keyof T>(list: T[], options: {key: K; asc?: boolean}): T[] {
	const { key, asc } = {...{asc: true }, ...options}
	let byDate: (a: T, b: T) => number;
	if (asc) {
		byDate = (a: T, b: T) => {
			const [aVal, bVal] = [a[key], b[key]];
			if (isDate(aVal) && isDate(bVal)) {
				return aVal.valueOf() - bVal.valueOf();
			}
			if (isDateLike(aVal) && isDateLike(bVal)) {
				return new Date(aVal).valueOf() - new Date(bVal).valueOf();
			}
			return 0;
		};
	} else {
		byDate = (a: T, b: T) => {
			const [aVal, bVal] = [a[key], b[key]];
			if (isDate(aVal) && isDate(bVal)) {
				return bVal.valueOf() - aVal.valueOf();
			}
			if (isDateLike(aVal) && isDateLike(bVal)) {
				return new Date(bVal).valueOf() - new Date(aVal).valueOf();
			}
			return 0;
		};
	}    
	
	return list.sort(byDate);
};
