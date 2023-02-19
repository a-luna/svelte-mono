import { REPO_NAMES, TECH_LIST } from '$lib/constants';
import type { LanguageOrTech, RepoName } from '$lib/types';
import { format } from 'date-fns';

export const formatDateString = (date: Date) => format(date, 'PPP');

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export const getRandomArrayItem = <T>(array: readonly T[], defaultValue: T): T =>
	array?.[Math.floor(Math.random() * array.length)] ?? defaultValue;

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export const isUserRepo = (repoName: string): repoName is RepoName => REPO_NAMES.includes(repoName as RepoName);

export const isValidLanguage = (language: string): language is LanguageOrTech =>
	TECH_LIST.includes(language as LanguageOrTech);

export const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();

export const slugify = (text: string): string =>
	text
		.normalize('NFKD')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
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
