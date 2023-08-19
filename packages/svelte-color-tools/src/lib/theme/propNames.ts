import { CSS_VAR_NAME_REGEX, PROP_NAME_REGEX } from '$lib/theme';
import type { UserThemeImported } from '$lib/types';
import { capitalize } from '$lib/util';

export const getWordsFromCamelCase = (input: string): string[] => {
	if (input) {
		let start = 0;
		let words = [];
		words = Array.from({ length: input.length }, (_, i) => input.charCodeAt(i))
			.map((n, i) => ({ isUpper: n < 97, index: i }))
			.filter((x) => x.isUpper)
			.map((x) => x.index)
			.map((boundary) => {
				const word = input.slice(start, boundary);
				start = boundary;
				return word;
			});
		words.push(input.slice(start, input.length));
		return words.filter((word) => word !== '');
	}
	return [];
};

export function getWordsFromCssVariableName(input: string): string[] {
	if (CSS_VAR_NAME_REGEX.test(input)) {
		return input.slice(2).split('-');
	}
	return [];
}

export function convertPropNameToDisplayName(propName: string): string {
	if (!propName || !PROP_NAME_REGEX.test(propName)) {
		return '';
	}
	const words = getWordsFromCamelCase(propName);
	if (words) {
		return words.map((w) => capitalize(w)).join(' ');
	}
	return '';
}

export function convertPropNameToCssVarName(userTheme: UserThemeImported, propName: string): string {
	if (!propName || !PROP_NAME_REGEX.test(propName)) {
		return '';
	}
	const words = getWordsFromCamelCase(propName);
	if (words) {
		const cssVarName = `${words.map((w) => w.toLowerCase()).join('-')}`;
		if (userTheme.usesPrefix && `--${cssVarName}`.indexOf(`${userTheme.themePrefix}-`) === 0) {
			return `--${cssVarName}`.replace(`${userTheme.themePrefix}-`, '');
		}
		return cssVarName;
	}
	return '';
}

export function convertCssVarNameToPropName(userTheme: UserThemeImported, cssVarName: string): string {
	if (!cssVarName || !CSS_VAR_NAME_REGEX.test(cssVarName)) {
		return '';
	}
	if (userTheme.usesPrefix) {
		cssVarName = cssVarName.replace(userTheme.themePrefix, '-');
	}
	const words = getWordsFromCssVariableName(cssVarName);
	if (words) {
		return `${words[0]}${words
			.slice(1)
			.map((w) => capitalize(w))
			.join('')}`;
	}
	return '';
}

export function convertCssVarNameToDisplayName(userTheme: UserThemeImported, cssVarName: string): string {
	if (!cssVarName || !CSS_VAR_NAME_REGEX.test(cssVarName)) {
		return '';
	}
	if (userTheme.usesPrefix) {
		cssVarName = cssVarName.replace(userTheme.themePrefix, '-');
	}
	const words = getWordsFromCssVariableName(cssVarName);
	if (words) {
		return `${capitalize(words?.[0] ?? '')} ${words
			.slice(1)
			.map((w) => capitalize(w))
			.join(' ')}`;
	}
	return '';
}

export function convertDisplayNameToCssVarName(userTheme: UserThemeImported, displayName: string): string {
	if (!displayName) {
		return '';
	}
	const words = displayName.split(' ');
	if (words) {
		const cssVarName = `${words.map((w) => w.toLowerCase()).join('-')}`;
		if (userTheme.usesPrefix && `--${cssVarName}`.indexOf(`${userTheme.themePrefix}-`) === 0) {
			return `--${cssVarName}`.replace(`${userTheme.themePrefix}-`, '');
		}
		return cssVarName;
	}
	return '';
}

export function convertDisplayNameToPropName(displayName: string): string {
	if (!displayName) {
		return '';
	}
	const words = displayName.split(' ');
	if (words) {
		return `${(words?.[0] ?? '').toLowerCase()}${words
			.slice(1)
			.map((w) => capitalize(w))
			.join('')}`;
	}
	return '';
}
