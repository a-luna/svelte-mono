import { ColorParser } from '$lib/color';
import type { ComponentColor, HslColor } from '$lib/types';
import { COMPONENT_COLORS } from './constants';

export const normalize = (s: string): string => s.replaceAll(/[\s-_]/g, '').toLowerCase();
export const getVariableName = (x: object) => Object.keys(x)[0];
export const objectIsEmpty = (obj: object) => JSON.stringify(obj) === '{}';
export const divmod = (x: number, y: number): [number, number] => [(x / y) | 0, x % y];

export function getRandomHexString(options: { length: number }): string {
	const { length } = options;
	return Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');
}

export const copyObject = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export function groupByProperty<T>(array: T[], property: keyof T): { [k: string]: T[] } {
	return array.reduce(
		(grouped, item) => {
			const groupVal = item[property] as string;
			grouped[groupVal] = grouped[groupVal] || [];
			grouped[groupVal]?.push(item);
			return grouped;
		},
		{} as { [k: string]: T[] },
	);
}

export function getRandomArrayItem<T>(array: readonly T[]): T | undefined {
	return array[Math.floor(Math.random() * array.length)];
}

export const getRandomThemeColor = () => getRandomArrayItem<ComponentColor>(COMPONENT_COLORS);

export function getCssPropertyValue(
	element: HTMLElement,
	propName: string,
	valueType: 'numeric' | 'string',
): CSSUnitValue | string | undefined {
	const styleValue = element.computedStyleMap().get(propName);
	if (!styleValue) {
		return undefined;
	}
	switch (valueType) {
		case 'string':
			return styleValue.toString();
		case 'numeric':
			return CSSNumericValue.parse(styleValue.toString()) as CSSUnitValue;
	}
}

export function getThemeCSSPropertyValue(
	element: HTMLElement,
	propName: string,
	defaultPropName: string,
	valueType: 'numeric' | 'string',
): CSSUnitValue | string | undefined {
	return (
		getCssPropertyValue(element, propName, valueType) ??
		getCssPropertyValue(element, defaultPropName, valueType) ??
		undefined
	);
}

export const getCssPropertyHslColorValue = (element: HTMLElement, propName: string) =>
	parseHslColorFromCssValue(getCssPropertyValue(element, propName, 'string') as string);

export const getThemeCSSPropertyHslColorValue = (
	element: HTMLElement,
	propName: string,
	defaultPropName: string,
): HslColor =>
	parseHslColorFromCssValue(getThemeCSSPropertyValue(element, propName, defaultPropName, 'string') as string);

function parseHslColorFromCssValue(value: string): HslColor {
	const result = ColorParser.parse(value);
	if (result.success) {
		return result.value.hsl;
	}
	return { h: 0, s: 0, l: 0, a: 1 };
}

export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }: { enabled: boolean; cb: () => void }) {
	const handleOutsideClick = ({ target }: { target: EventTarget | null }) => {
		if (target instanceof Node) {
			if (!node.contains(target)) {
				cb();
			}
		}
	};

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		},
	};
}

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}
