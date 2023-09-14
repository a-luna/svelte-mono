import { labToLch, oklabToOklch, rgbToHex, rgbToHsl, rgbToLab, rgbToOkhsl, rgbToOklab } from '$lib/color/converters';
import { finalizeColorInGamut, normalizeGrayScaleValues } from '$lib/color/gamut/util';
import { copyCssColor } from '$lib/color/util';
import type { CssColor, CssColorBase, RgbColor } from '$lib/types';

export function createCssColorBaseFromRgbColor(rgb: RgbColor): CssColorBase {
	const hex = rgbToHex(rgb);
	const hsl = rgbToHsl(rgb);
	const okhsl = rgbToOkhsl(rgb);
	const lab = rgbToLab(rgb);
	const lch = labToLch(lab);
	const oklab = rgbToOklab(rgb);
	const oklch = oklabToOklch(oklab);
	return {
		rgb,
		hex,
		hsl,
		okhsl,
		lab,
		lch,
		oklab,
		oklch,
		name: hex,
	};
}

export const finalizeRgbColor = (color: CssColorBase): CssColor => ({
	...normalizeGrayScaleValues(copyCssColor(color)),
	space: 'srgb',
	srbgColor: finalizeColorInGamut(color),
});
