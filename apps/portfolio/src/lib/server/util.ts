import { PROJECT_CATEGORIES, PROJECT_TYPES, TECH_LIST } from '$lib/constants';
import type { LanguageOrTech, ProjectCategory } from '$lib/types';

export const isProjectCategory = (category: string): category is ProjectCategory => {
	const categoriesLower = [...PROJECT_TYPES, ...PROJECT_CATEGORIES].map((cat) => cat.toLowerCase());
	return categoriesLower.includes((category as ProjectCategory).toLowerCase());
};

export const isLanguageOrTech = (tech: string): tech is LanguageOrTech => {
	const techListLower = TECH_LIST.map((t) => t.toLowerCase());
	return techListLower.includes((tech as LanguageOrTech).toLowerCase());
};

export const unslugify = (slug: string): string =>
	slug
		.split('-')
		.map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
		.join(' ');

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export async function replaceAsync(
	string: string,
	regexp: RegExp,
	replacerFunction: (match: RegExpMatchArray) => Promise<string>
) {
	const replacements = await Promise.all(Array.from(string.matchAll(regexp), (match) => replacerFunction(match)));
	return string.replace(regexp, () => replacements.shift() ?? '');
}
