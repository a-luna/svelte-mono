import { cssColorFromOklch } from '$lib/color/parsers';
import { sortColors } from '$lib/color/util';
import type { CssColor, Result } from '$lib/types';

export const getColorSchemes = (color: CssColor): { [key: string]: CssColor[] } => ({
	base: [color],
	complementary: [getComplementaryColor(color)],
	split: getSplitComplementaryColors(color),
	analogous: getAnalogousColors(color),
	triadic: getTriadicColors(color),
	tetradic: getRectangularColors(color, -60),
	square: getSquareColors(color),
	monochrome: getMonochromePalette(color, 10, 5),
});

export const getComplementaryColor = (color: CssColor): CssColor => adjustHue(color, 180);
export const getTriadicColors = (color: CssColor): CssColor[] => [adjustHue(color, 120), adjustHue(color, 240)];
export const getAnalogousColors = (color: CssColor): CssColor[] => [adjustHue(color, 30), adjustHue(color, -30)];
export const getTetradicColors = (color: CssColor): CssColor[] => getRectangularColors(color, -60);
export const getSquareColors = (color: CssColor): CssColor[] => getRectangularColors(color, 90);

export const getSplitComplementaryColors = (color: CssColor): CssColor[] =>
	getAnalogousColors(getComplementaryColor(color));

const getRectangularColors = (color: CssColor, hueChange: number): CssColor[] => [
	adjustHue(color, hueChange),
	adjustHue(color, 180),
	adjustHue(color, 180 + hueChange),
];

function getMonochromePalette(color: CssColor, paletteSize: number, stepSize: number): CssColor[] {
	const idealNumberOfShadesAndTints = Math.floor(paletteSize / 2);
	const palette = [...getShadesForColor(color, stepSize), color, ...getTintsForColor(color, stepSize)].sort(sortColors);
	const colorIndex = palette.findIndex((pColor) => pColor.hsl.l === color.hsl.l);
	return colorIndex < idealNumberOfShadesAndTints
		? palette.slice(0, paletteSize + 1)
		: colorIndex >= palette.length - idealNumberOfShadesAndTints
		? palette.slice(-(paletteSize + 1))
		: palette.slice(colorIndex - idealNumberOfShadesAndTints, colorIndex + idealNumberOfShadesAndTints + 1);
}

function getShadesForColor(color: CssColor, stepSize: number): CssColor[] {
	const shades = [];
	let l = color.oklch.l;
	let result: Result<CssColor> = { success: true, value: color };
	while (result.success) {
		l -= stepSize;
		result = adjustLightness(color, l);
		if (result.success) {
			shades.push(result.value);
		}
	}
	return shades.sort(sortColors);
}

function getTintsForColor(color: CssColor, stepSize: number): CssColor[] {
	const tints = [];
	let l = color.oklch.l;
	let result: Result<CssColor> = { success: true, value: color };
	while (result.success) {
		l += stepSize;
		result = adjustLightness(color, l);
		if (result.success) {
			tints.push(result.value);
		}
	}
	return tints.sort(sortColors);
}

function adjustHue({ oklch, hasAlpha }: CssColor, hueChange: number): CssColor {
	let h = oklch.h + hueChange;
	if (h > 360) h -= 360;
	if (h < 0) h += 360;
	return cssColorFromOklch({ ...oklch, h }, hasAlpha);
}

function adjustLightness({ oklch, hasAlpha }: CssColor, lightChange: number): Result<CssColor> {
	const l = oklch.l + lightChange;
	return l >= 0 && l <= 100
		? { success: true, value: cssColorFromOklch({ ...oklch, l }, hasAlpha) }
		: { success: false, error: Error(`Lightness must be within range 0-100`) };
}
