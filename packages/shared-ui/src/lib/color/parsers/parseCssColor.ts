import {
	parseHex,
	parseHsl,
	parseLab,
	parseLch,
	parseOkhsl,
	parseOklab,
	parseOklch,
	parseRgb,
} from '$lib/color/parsers';
import {
	HEX_REGEX,
	HSL_REGEX,
	LAB_REGEX,
	LCH_REGEX,
	OKHSL_REGEX,
	OKLAB_REGEX,
	OKLCH_REGEX,
	RGB_REGEX,
} from '$lib/color/regex';
import { clampColorComponents, getX11ColorNamesNormalized } from '$lib/color/util';
import type { ColorFormat, CssColor, Result } from '$lib/types';
import { normalize } from '$lib/util';

export function parseColorFromString(s: string, clamped = true): Result<CssColor> {
	const color = parseCssColor(s);
	if (color) {
		const cssColor = clamped ? clampColorComponents(color) : color;
		return { success: true, value: cssColor as CssColor };
	}
	return { success: false };
}

export function parseCssColor(s: string): CssColor | undefined {
	s = s.trim();
	let color = undefined;
	let match = HEX_REGEX.exec(s);
	if (match && match.groups) {
		color = parseHex(match.groups);
	}
	match = RGB_REGEX.exec(s);
	if (match && match.groups) {
		color = parseRgb(match.groups);
	}
	match = HSL_REGEX.exec(s);
	if (match && match.groups) {
		color = parseHsl(match.groups);
	}
	match = OKHSL_REGEX.exec(s);
	if (match && match.groups) {
		color = parseOkhsl(match.groups);
	}
	match = LAB_REGEX.exec(s);
	if (match && match.groups) {
		color = parseLab(match.groups);
	}
	match = OKLAB_REGEX.exec(s);
	if (match && match.groups) {
		color = parseOklab(match.groups);
	}
	match = LCH_REGEX.exec(s);
	if (match && match.groups) {
		color = parseLch(match.groups);
	}
	match = OKLCH_REGEX.exec(s);
	if (match && match.groups) {
		color = parseOklch(match.groups);
	}
	if (!color) {
		const result = parseNamedColor(s);
		if (result.success) {
			color = result.value;
		}
	}
	return color;
}

export function getColorFormatFromCssString(s: string): ColorFormat | null {
	if (HEX_REGEX.test(s)) return 'hex';
	if (RGB_REGEX.test(s)) return 'rgb';
	if (HSL_REGEX.test(s)) return 'hsl';
	if (OKHSL_REGEX.test(s)) return 'okhsl';
	if (LAB_REGEX.test(s)) return 'lab';
	if (OKLAB_REGEX.test(s)) return 'oklab';
	if (LCH_REGEX.test(s)) return 'lch';
	if (OKLCH_REGEX.test(s)) return 'oklch';
	return null;
}

export function parseNamedColor(name: string): Result<CssColor> {
	const namedColor = getX11ColorNamesNormalized().get(normalize(name));
	if (!namedColor) {
		const error = `Unable to parse "${name}" as a valid color value`;
		return { success: false, error: Error(error) };
	}
	const getRgbStringResult = namedColorToRgb(namedColor);
	if (!getRgbStringResult.success) {
		return { success: false, error: getRgbStringResult.error };
	}
	const color = parseCssColor(getRgbStringResult.value);
	if (!color) {
		return { success: false };
	}
	color.name = name;
	return { success: true, value: color };
}

function namedColorToRgb(name: string): Result<string> {
	if (typeof window === 'undefined') {
		const error = `Code for parsing named color values can only run in browser`;
		return { success: false, error: Error(error) };
	}
	const testDiv = document.createElement('div');
	testDiv.style.color = name;
	document.body.appendChild(testDiv);
	const compStyles = window.getComputedStyle(testDiv);
	const rgb = compStyles.getPropertyValue('color');
	document.body.removeChild(testDiv);
	return { success: true, value: rgb };
}
