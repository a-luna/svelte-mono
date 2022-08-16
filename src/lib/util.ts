import { browser } from '$app/env';
import { COMPONENT_COLORS, CSS_COLOR_FORMATS } from '$lib/constants';
import { CSS_VAR_PREFIX_REGEX } from '$lib/themes';
import type { ColorFormat, ComponentColor } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const uncapitalize = (s: string): string => s.charAt(0).toLowerCase() + s.substring(1);
export const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.substring(1);
export const normalize = (s: string): string => s.replaceAll(/[\s-_]/g, '').toLowerCase();
export const slugify = (s: string): string => s.replaceAll(/[\s_]/g, '-').toLowerCase();

export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }) {
	const handleOutsideClick = ({ target }) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update(initialEnabled);
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		},
	};
}

export async function copyToClipboard(text: string): Promise<void> {
	if (typeof window !== 'undefined') {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			console.log('Error! Failed to copy text to clipboard.');
		}
	}
}

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export function groupByProperty<T>(array: T[], property: keyof T): Record<string, T[]> {
	return array.reduce((grouped, item) => {
		const groupVal = item[property].toString();
		grouped[groupVal] = grouped[groupVal] || [];
		grouped[groupVal].push(item);
		return grouped;
	}, {});
}

export function getRandomArrayItem<T>(array: readonly T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export const isComponentColor = (arg: string): arg is ComponentColor =>
	COMPONENT_COLORS.includes(arg as ComponentColor);

export const isColorFormat = (arg: string): arg is ColorFormat => CSS_COLOR_FORMATS.includes(arg as ColorFormat);

export const isCSSStyleRule = (rule: CSSRule): rule is CSSStyleRule => rule instanceof CSSStyleRule;

export function createLocalStorageValue<T>(key: string, defaultValue: T): Writable<T> {
	let clientValue: T;
	if (browser) {
		clientValue = JSON.parse(window.localStorage.getItem(key));
		if (!clientValue) window.localStorage.setItem(key, JSON.stringify(defaultValue));
	}
	const store = writable(clientValue || defaultValue);
	store.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	});
	return store;
}

const styleSheetIsInThisDomain = (styleSheet: CSSStyleSheet): boolean =>
	!styleSheet.href || styleSheet.href.indexOf(window.location.origin) === 0;

export function getAllCssVariables(
	args: {
		ignoreTailwinds: boolean;
		ignorePrefixes: string[];
		onlyIncludePrefixes: string[];
		selectors: string[];
	} = {
		ignoreTailwinds: true,
		ignorePrefixes: [],
		onlyIncludePrefixes: [],
		selectors: [],
	},
): { cssVarName: string; value: string }[] {
	if (typeof window === 'undefined') return [];

	const { ignoreTailwinds, ignorePrefixes, onlyIncludePrefixes, selectors } = args;
	const invalidPrefixes = [...ignorePrefixes, ...onlyIncludePrefixes].filter(
		(prefix) => !CSS_VAR_PREFIX_REGEX.test(prefix),
	);
	if (invalidPrefixes.length) {
		const invalidPrefixList = invalidPrefixes.map((p) => `"${p}"`).join(', ');
		const maybePlural = invalidPrefixes.length > 1 ? 'are invalid prefixes' : 'is an invalid prefix';
		throw new Error(`${invalidPrefixList} ${maybePlural} for CSS variable names`);
	}

	let cssRules = Array.from(document.styleSheets)
		.filter(styleSheetIsInThisDomain)
		.map((sheet) => sheet.cssRules)
		.map((ruleList) => Array.from(ruleList).filter(isCSSStyleRule))
		.flat();

	if (selectors.length) {
		cssRules = cssRules.filter((rule) => selectors.some((selector) => rule.selectorText.includes(selector)));
	}

	let cssVarNameAndValueList = cssRules
		.map((rule) =>
			Array.from(rule.style)
				.filter((propName) => propName.indexOf('--') === 0)
				.map((propName) => [propName.trim(), rule.style.getPropertyValue(propName).trim()]),
		)
		.flat();

	if (onlyIncludePrefixes.length) {
		cssVarNameAndValueList = onlyIncludePrefixes
			.map((prefix) => cssVarNameAndValueList.filter((rule) => rule[0].indexOf(`${prefix}-`) === 0))
			.flat();
	} else {
		if (ignoreTailwinds) {
			ignorePrefixes.push('--tw');
		}
		for (const prefix of ignorePrefixes) {
			cssVarNameAndValueList = cssVarNameAndValueList.filter((rule) => rule[0].indexOf(`${prefix}-`) === -1);
		}
	}
	return cssVarNameAndValueList.map((rule) => ({ cssVarName: rule[0], value: rule[1] }));
}
