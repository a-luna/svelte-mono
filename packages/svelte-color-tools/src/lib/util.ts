import { browser } from '$app/environment';
import { COMPONENT_COLORS, CSS_COLOR_FORMATS, SCOPED_CSS_REGEX } from '$lib/constants';
import type { ColorFormat, ComponentColor, CssVariable } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
export const normalize = (s: string): string => s.replaceAll(/[\s-_]/g, '').toLowerCase();
export const slugify = (s: string): string => s.replaceAll(/[\s_]/g, '-').toLowerCase();
export const removeScopedCssClassNames = (s: string): string => s.replaceAll(SCOPED_CSS_REGEX, '');

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

export const isCssStyleRule = (rule: CSSRule): rule is CSSStyleRule => rule instanceof CSSStyleRule;

export function getAllCssVariables(args: {
	ignoreTailwinds?: boolean;
	removeScopedCssClasses?: boolean;
	prefixBlackList?: string[];
	prefixWhiteList?: string[];
	selectorBlackList?: string[];
	selectorWhiteList?: string[];
}): CssVariable[] {
	if (typeof window === 'undefined') return [];
	const defaultArgs = {
		ignoreTailwinds: true,
		removeScopedCssClasses: true,
		prefixBlackList: [],
		prefixWhiteList: [],
		selectorBlackList: [],
		selectorWhiteList: [],
	};
	const {
		ignoreTailwinds,
		removeScopedCssClasses,
		prefixBlackList,
		prefixWhiteList,
		selectorBlackList,
		selectorWhiteList,
	} = {
		...defaultArgs,
		...args,
	};
	const invalidPrefixes = [...prefixBlackList, ...prefixWhiteList].filter((prefix) => prefix.indexOf('--') !== 0);
	if (invalidPrefixes.length) {
		const invalidPrefixList = invalidPrefixes.map((p) => `"${p}"`).join(', ');
		const maybePlural = invalidPrefixes.length > 1 ? 'are invalid prefixes' : 'is an invalid prefix';
		throw new Error(`${invalidPrefixList} ${maybePlural} for CSS variable names`);
	}

	let cssRules = Array.from(document.styleSheets)
		.filter(styleSheetIsInThisDomain)
		.map((sheet) => sheet.cssRules)
		.map((ruleList) => Array.from(ruleList).filter(isCssStyleRule))
		.flat();

	if (selectorBlackList.length) {
		cssRules = cssRules.filter((rule) => !selectorBlackList.some((selector) => rule.selectorText.includes(selector)));
	}

	if (selectorWhiteList.length) {
		cssRules = cssRules.filter((rule) => selectorWhiteList.some((selector) => rule.selectorText.includes(selector)));
	}

	let cssVariables = cssRules
		.map((rule) => {
			const ruleSelector = removeScopedCssClasses ? removeScopedCssClassNames(rule.selectorText) : rule.selectorText;
			return Array.from(rule.style)
				.filter((propName) => propName.indexOf('--') === 0)
				.map((propName, i) => ({
					id: (i + 1).toString(),
					name: propName.trim(),
					selector: ruleSelector,
					value: rule.style.getPropertyValue(propName).trim(),
					addToTheme: false,
				}));
		})
		.flat();

	if (ignoreTailwinds) {
		cssVariables = cssVariables.filter((cssVar) => cssVar.name.indexOf('--tw') === -1);
	}
	if (prefixWhiteList.length) {
		cssVariables = prefixWhiteList
			.map((prefix) => cssVariables.filter((cssVar) => cssVar.name.indexOf(`${prefix}-`) === 0))
			.flat();
	} else {
		for (const prefix of prefixBlackList) {
			cssVariables = cssVariables.filter((cssVar) => cssVar.name.indexOf(`${prefix}-`) === -1);
		}
	}
	return cssVariables.sort(
		(a, b) => String(a.name).localeCompare(String(b.name)) || String(a.selector).localeCompare(String(b.selector)),
	);
}

export const getThemeEditorSlotExampleCode = (): string => `<script lang="ts">
\timport { ComponentCssEditor } from '@a-luna/svelte-color-tools';
\timport YourComponent from 'YourComponent.svelte';
</script>

<ComponentCssEditor>
\t<YourComponent />
</ComponentCssEditor>`;
