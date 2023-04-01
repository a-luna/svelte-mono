import { HEX_REGEX, HSL_REGEX, LAB_REGEX, LCH_REGEX, OKLAB_REGEX, OKLCH_REGEX, RGB_REGEX } from '$lib/color/regex';
import { X11_NAMED_COLORS } from '$lib/constants';
import type { CssColor, Result } from '$lib/types';
import { normalize } from '$lib/util';
import { parseHex, parseHsl, parseLab, parseLch, parseOklab, parseOklch, parseRgb } from '.';

export function parseColorFromString(s: string): Result<CssColor> {
	const color = parseColorFromCssString(s);
	return color ? { success: true, value: color } : parseNamedColor(s);
}

function parseColorFromCssString(s: string): CssColor | undefined {
	s = s.trim();
	let match = HEX_REGEX.exec(s);
	if (match && match.groups) {
		return parseHex(match.groups);
	}
	match = RGB_REGEX.exec(s);
	if (match && match.groups) {
		return parseRgb(match.groups);
	}
	match = HSL_REGEX.exec(s);
	if (match && match.groups) {
		return parseHsl(match.groups);
	}
	match = LAB_REGEX.exec(s);
	if (match && match.groups) {
		return parseLab(match.groups);
	}
	match = OKLAB_REGEX.exec(s);
	if (match && match.groups) {
		return parseOklab(match.groups);
	}
	match = LCH_REGEX.exec(s);
	if (match && match.groups) {
		return parseLch(match.groups);
	}
	match = OKLCH_REGEX.exec(s);
	if (match && match.groups) {
		return parseOklch(match.groups);
	}
	return;
}

export function parseNamedColor(name: string): Result<CssColor> {
	const namedColor = X11_NAMED_COLORS.find((color) => color.toLowerCase() === normalize(name));
	if (!namedColor) {
		const error = `Unable to parse "${name}" as a valid color value`;
		return { success: false, error: Error(error) };
	}
	if (typeof window === 'undefined') {
		const error = `Code for parsing named color values can only run in browser`;
		return { success: false, error: Error(error) };
	}
	const rgb = namedColorToRgb(namedColor) ?? '';
	const color = parseColorFromCssString(rgb);
	return color ? { success: true, value: color } : { success: false };
}

function namedColorToRgb(name: string): string | undefined {
	if (typeof window !== 'undefined') {
		const testDiv = document.createElement('div');
		testDiv.style.color = name;
		document.body.appendChild(testDiv);
		const compStyles = window.getComputedStyle(testDiv);
		const rgb = compStyles.getPropertyValue('color');
		document.body.removeChild(testDiv);
		return rgb;
	}
	return;
}
