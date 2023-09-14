import {
	labFromRgbInColorSpace,
	labToLch,
	oklabToOklch,
	oklabToRgb,
	oklchToOklab,
	rgbToHex,
	rgbToHsl,
	rgbToOkhsl,
} from '$lib/color/converters';
import {
	getOklabColorSpace,
	isOklchColorWithinP3Gamut,
	isOklchColorWithinRec2020Gamut,
	isOklchColorWithinSrgbGamut,
} from '$lib/color/gamut/colorSpace';
import { EPSILON, finalizeColorInGamut, normalizeGrayScaleValues } from '$lib/color/gamut/util';
import { copyCssColor } from '$lib/color/util';
import type {
	ColorSpace,
	CssColor,
	CssColorBase,
	HslColor,
	LabColor,
	LchColor,
	OkhslColor,
	OklabColor,
	OklchColor,
	RgbColor,
} from '$lib/types';

function getRgbAndLabColorsFromOklabColor(
	oklab: OklabColor,
	colorSpace: ColorSpace,
): [RgbColor, string, HslColor, OkhslColor, LabColor, LchColor] {
	const rgb = oklabToRgb(oklab);
	const hex = rgbToHex(rgb);
	const hsl = rgbToHsl(rgb);
	const okhsl = rgbToOkhsl(rgb);
	const lab = labFromRgbInColorSpace(rgb, colorSpace);
	const lch = labToLch(lab);
	return [rgb, hex, hsl, okhsl, lab, lch];
}

export function createCssColorBaseFromOklabColor(oklab: OklabColor): CssColorBase {
	const oklch = oklabToOklch(oklab);
	const colorSpace = getOklabColorSpace(oklch);
	const [rgb, hex, hsl, okhsl, lab, lch] = getRgbAndLabColorsFromOklabColor(oklab, colorSpace);
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

export function createCssColorBaseFromOklchColor(oklch: OklchColor): CssColorBase {
	const colorSpace = getOklabColorSpace(oklch);
	const oklab = oklchToOklab(oklch);
	const [rgb, hex, hsl, okhsl, lab, lch] = getRgbAndLabColorsFromOklabColor(oklab, colorSpace);
	return {
		hex,
		rgb,
		hsl,
		lab,
		lch,
		oklab,
		oklch,
		okhsl,
		name: hex,
	};
}

export function finalizeOklabColor(color: CssColorBase): CssColor {
	const space = getOklabColorSpace(color.oklch);
	if (space === 'out') {
		const rec2020 = constrainOutOfGamutOklabColorToRec2020(copyCssColor(color));
		const p3 = constrainRec2020OklabColorToP3(copyCssColor(rec2020));
		const srbg = constrainP3OklabColorToSRGB(copyCssColor(p3));
		return {
			...normalizeGrayScaleValues(copyCssColor(color)),
			space,
			rec2020Color: finalizeColorInGamut(rec2020),
			p3Color: finalizeColorInGamut(p3),
			srbgColor: finalizeColorInGamut(srbg),
		};
	}
	if (space === 'rec2020') {
		const p3 = constrainRec2020OklabColorToP3(copyCssColor(color));
		const srbg = constrainP3OklabColorToSRGB(copyCssColor(p3));
		return {
			...normalizeGrayScaleValues(copyCssColor(color)),
			space,
			rec2020Color: finalizeColorInGamut(color),
			p3Color: finalizeColorInGamut(p3),
			srbgColor: finalizeColorInGamut(srbg),
		};
	}
	if (space === 'p3') {
		const srbg = constrainP3OklabColorToSRGB(copyCssColor(color));
		return {
			...normalizeGrayScaleValues(copyCssColor(color)),
			space,
			p3Color: finalizeColorInGamut(color),
			srbgColor: finalizeColorInGamut(srbg),
		};
	}
	return {
		...normalizeGrayScaleValues(copyCssColor(color)),
		space,
		srbgColor: finalizeColorInGamut(color),
	};
}

function constrainOklabColorToGamut(color: CssColorBase, withinGamut: (oklch: OklchColor) => boolean): CssColorBase {
	if (withinGamut({ ...color.oklch })) return { ...color };

	let { c } = color.oklch;
	let hiC = c;
	let loC = 0;
	c /= 2;
	while (hiC - loC > EPSILON) {
		if (withinGamut({ ...color.oklch, c })) {
			loC = c;
		} else {
			hiC = c;
		}
		c = (hiC + loC) / 2;
	}
	const c_trunc = c.toString().match(/^-?\d+(?:\.\d{0,3})?/)?.[0];
	c = c_trunc ? parseFloat(c_trunc) : c;
	return createCssColorBaseFromOklchColor({ ...color.oklch, c });
}

const constrainP3OklabColorToSRGB = (color: CssColorBase): CssColorBase =>
	constrainOklabColorToGamut(color, isOklchColorWithinSrgbGamut);

const constrainRec2020OklabColorToP3 = (color: CssColorBase): CssColorBase =>
	constrainOklabColorToGamut(color, isOklchColorWithinP3Gamut);

const constrainOutOfGamutOklabColorToRec2020 = (color: CssColorBase): CssColorBase =>
	constrainOklabColorToGamut(color, isOklchColorWithinRec2020Gamut);
