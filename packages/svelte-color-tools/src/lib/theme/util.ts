import type { ThemeColor, ThemeColorShallowCopy } from '$lib/types';
import type { ColorFormat } from '@a-luna/shared-ui';

export const CAMEL_CASE_REGEX = /^[a-z](?=.*[A-Z])[A-Za-z]*[^[-`]$/;
export const PROP_NAME_REGEX = /^[a-z]+$|^[a-z](?=.*[A-Z])[A-Za-z]*[^[-`]$/;
export const CSS_VAR_NAME_REGEX = /^--[\w-]*$/;

export const getCssValueForColor = (color: ThemeColor, colorFormat: ColorFormat): string =>
	['currentcolor', 'inherit'].includes(color?.value ?? '')
		? color?.value ?? ''
		: colorFormat === 'hsl'
		? color.color.hslString
		: colorFormat === 'rgb'
		? color.color.rgbString
		: colorFormat === 'hex'
		? color.color.hex
		: colorFormat === 'lch'
		? color.color.lchString
		: colorFormat === 'oklch'
		? color.color.oklchString
		: colorFormat === 'lab'
		? color.color.labString
		: color.color.oklabString;

export function copyThemeColor(color: ThemeColor): ThemeColorShallowCopy {
	const copy: ThemeColorShallowCopy = {};
	Object.entries(color).forEach(([prop, val]) => {
		if (prop !== 'color') {
			copy[prop as keyof ThemeColorShallowCopy] = val;
		}
	});
	return copy;
}
