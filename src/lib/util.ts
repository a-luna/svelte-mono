import { REPO_NAMES, TECH_LIST } from '$lib/constants';
import type { LanguageOrTech, RepoName } from '$lib/types';

export function formatDateString(date: Date) {
	return new Date(date).toDateString().slice(3);
}

export const getAuthToken = (ghToken: string): { Authorization: string } => ({
	Authorization: `token ${ghToken ?? ''}`
});

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export function getRandomArrayItem<T>(array: readonly T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export const isUserRepo = (repoName: string): repoName is RepoName =>
	REPO_NAMES.includes(repoName as RepoName);

export const isValidLanguage = (language: string): language is LanguageOrTech =>
	TECH_LIST.includes(language as LanguageOrTech);

export const slugify = (text: string): string =>
	text
		.normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string
		.replace(/\s+/g, '-') // Replace spaces with hyphen
		.replace(/[^\w]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple hyphen with single hyphen
		.replace(/(^-|-$)/g, ''); // Remove leading or trailing hyphen
