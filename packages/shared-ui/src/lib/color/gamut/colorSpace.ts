import {
	labToP3,
	labToRec2020,
	labToRgb,
	lchToLab,
	oklabToP3,
	oklabToRec2020,
	oklabToRgb,
	oklchToOklab,
} from '$lib/color/converters';
import type { ColorSpace, LchColor, OklchColor, RgbColor } from '$lib/types';

export function getLabColorSpace(lch: LchColor): ColorSpace {
	if (isLchColorWithinSrgbGamut(lch)) return 'srgb';
	if (isLchColorWithinP3Gamut(lch)) return 'p3';
	if (isLchColorWithinRec2020Gamut(lch)) return 'rec2020';
	return 'out';
}

export function getOklabColorSpace(oklch: OklchColor): ColorSpace {
	if (isOklchColorWithinSrgbGamut(oklch)) return 'srgb';
	if (isOklchColorWithinP3Gamut(oklch)) return 'p3';
	if (isOklchColorWithinRec2020Gamut(oklch)) return 'rec2020';
	return 'out';
}

function isColorWithinColorSpace(rgb: RgbColor): boolean {
	const { r, g, b } = {
		r: rgb.r / 255.0,
		g: rgb.g / 255.0,
		b: rgb.b / 255.0,
	};
	return [r, g, b].every((value) => 0.0 < value && value < 1.0);
}

export const isLchColorWithinSrgbGamut = (lch: LchColor): boolean => isColorWithinColorSpace(labToRgb(lchToLab(lch)));

export const isLchColorWithinP3Gamut = (lch: LchColor): boolean => isColorWithinColorSpace(labToP3(lchToLab(lch)));

export const isLchColorWithinRec2020Gamut = (lch: LchColor): boolean =>
	isColorWithinColorSpace(labToRec2020(lchToLab(lch)));

export const isOklchColorWithinSrgbGamut = (oklch: OklchColor): boolean =>
	isColorWithinColorSpace(oklabToRgb(oklchToOklab(oklch)));

export const isOklchColorWithinP3Gamut = (oklch: OklchColor): boolean =>
	isColorWithinColorSpace(oklabToP3(oklchToOklab(oklch)));

export const isOklchColorWithinRec2020Gamut = (oklch: OklchColor): boolean =>
	isColorWithinColorSpace(oklabToRec2020(oklchToOklab(oklch)));
