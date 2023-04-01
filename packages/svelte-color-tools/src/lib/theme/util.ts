import type { ThemeColor, ThemeColorShallowCopy } from '$lib/types';

export const CAMEL_CASE_REGEX = /^[a-z](?=.*[A-Z])[A-Za-z]*[^[-`]$/;
export const PROP_NAME_REGEX = /^[a-z]+$|^[a-z](?=.*[A-Z])[A-Za-z]*[^[-`]$/;
export const CSS_VAR_NAME_REGEX = /^--[\w-]*$/;

export const getCssValueForColor = (color: ThemeColor, colorFormat: 'hex' | 'rgb' | 'hsl'): string =>
	['currentcolor', 'inherit'].includes(color.value)
		? color.value
		: colorFormat === 'hsl'
		? color.color.hasAlpha
			? color.color.hslaString
			: color.color.hslString
		: colorFormat === 'rgb'
		? color.color.hasAlpha
			? color.color.rgbaString
			: color.color.rgbString
		: color.color.hasAlpha
		? color.color.hexAlpha
		: color.color.hex;

export function copyThemeColor(color: ThemeColor): ThemeColorShallowCopy {
	const copy: ThemeColorShallowCopy = {};
	Object.entries(color).forEach(([prop, val]) => {
		if (prop !== 'color') {
			copy[prop] = val;
		}
	});
	return copy;
}
