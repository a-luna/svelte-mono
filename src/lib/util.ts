import { PROJECT_CATEGORIES, PROJECT_TYPES, REPO_NAMES, TECH_LIST } from '$lib/constants';
import type { LanguageOrTech, ProjectCategory, RepoName } from '$lib/types';
import { format } from 'date-fns';

export const formatDateString = (date: Date) => format(date, 'PPP');

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export const getRandomArrayItem = <T>(array: readonly T[]): T => array[Math.floor(Math.random() * array.length)];

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export const isUserRepo = (repoName: string): repoName is RepoName => REPO_NAMES.includes(repoName as RepoName);

export const isValidLanguage = (language: string): language is LanguageOrTech =>
	TECH_LIST.includes(language as LanguageOrTech);

export const isProjectCategory = (category: string): category is ProjectCategory => {
	const categoriesLower = [...PROJECT_TYPES, ...PROJECT_CATEGORIES].map((cat) => cat.toLowerCase());
	return categoriesLower.includes((category as ProjectCategory).toLowerCase());
};

export const isLanguageOrTech = (tech: string): tech is LanguageOrTech => {
	const techListLower = TECH_LIST.map((t) => t.toLowerCase());
	return techListLower.includes((tech as LanguageOrTech).toLowerCase());
};

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

export const unslugify = (slug: string): string =>
	slug
		.split('-')
		.map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
		.join(' ');

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

export async function replaceAsync(
	string: string,
	regexp: RegExp,
	replacerFunction: (match: RegExpMatchArray) => Promise<string>
) {
	const replacements = await Promise.all(Array.from(string.matchAll(regexp), (match) => replacerFunction(match)));
	return string.replace(regexp, () => replacements.shift() ?? '');
}
