import { addStringValuesToCssColor, clampColorComponents, copyCssColor, isGrayscaleColor } from '$lib/color/util';
import type { CssColorBase, CssColorForColorSpace } from '$lib/types';

export const EPSILON = 0.00001;

export function normalizeGrayScaleValues(color: CssColorBase): CssColorBase {
	if (isGrayscaleColor(color)) {
		color.hsl.h = 0;
		color.hsl.s = 0;
		color.lab.a = 0;
		color.lab.b = 0;
		color.lch.c = 0;
		color.lch.h = 0;
		color.okhsl.h = 0;
		color.okhsl.s = 0;
		color.oklab.a = 0;
		color.oklab.b = 0;
		color.oklch.c = 0;
		color.oklch.h = 0;
	}
	return color;
}

export const finalizeColorInGamut = (color: CssColorBase): CssColorForColorSpace =>
	clampColorComponents<CssColorForColorSpace>(addStringValuesToCssColor(normalizeGrayScaleValues(copyCssColor(color))));
