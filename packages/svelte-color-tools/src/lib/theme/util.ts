import type { ThemeColorShallowCopy, UserThemeImported } from '$lib/types';
import type { ColorFormat, CssColor, ThemeColor } from '@a-luna/shared-ui';

// TODO: Investigate error raised when updating/adding new color to palette which sais that the PROP_NAME_REGEX is an invalid regular expression.

export const CAMEL_CASE_REGEX = /^[a-z](?=.*[A-Z])[A-Za-z]*[^[-`]$/;
export const PROP_NAME_REGEX = /^[a-z]+$|^[a-z](?=.*[A-Z])[A-Za-z]*[^\[-`]$/;
export const CSS_VAR_NAME_REGEX = /^--[A-Za-z][0-9A-Za-z-]*$/;

export function getCssValueForThemeColor(color: ThemeColor, colorFormat: ColorFormat): string {
	if (color && color.value && (color.value === 'currentColor' || color.value === 'inherit')) {
		return color.value;
	}

	const colorFormatToCssValueMap = new Map<ColorFormat, string>();
	colorFormatToCssValueMap.set('hex', color.colorInGamut.hex);
	colorFormatToCssValueMap.set('rgb', color.colorInGamut.rgbString);
	colorFormatToCssValueMap.set('hsl', color.colorInGamut.hslString);
	colorFormatToCssValueMap.set('lab', color.colorInGamut.labString);
	colorFormatToCssValueMap.set('lch', color.colorInGamut.lchString);
	colorFormatToCssValueMap.set('oklab', color.colorInGamut.oklabString);
	colorFormatToCssValueMap.set('oklch', color.colorInGamut.oklchString);
	return colorFormatToCssValueMap.get(colorFormat) ?? '';
}

export function copyThemeColor(color: ThemeColor): ThemeColorShallowCopy {
	const copy: ThemeColorShallowCopy = {};
	Object.entries(color).forEach(([prop, val]) => {
		if (prop !== 'color') {
			copy[prop as keyof ThemeColorShallowCopy] = val;
		}
	});
	return copy;
}

export const getColorFormatForColor = (color: CssColor, userTheme: UserThemeImported): ColorFormat =>
	color.space === 'srgb' ? userTheme.colorFormatSrgb : userTheme.colorFormatP3;
