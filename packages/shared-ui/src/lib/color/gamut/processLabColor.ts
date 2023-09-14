import {
	labToLch,
	labToRgb,
	lchToLab,
	oklabFromRgbInColorSpace,
	oklabToOklch,
	rgbToHex,
	rgbToHsl,
	rgbToOkhsl,
} from '$lib/color/converters';
import {
	getLabColorSpace,
	isLchColorWithinP3Gamut,
	isLchColorWithinRec2020Gamut,
	isLchColorWithinSrgbGamut,
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

function getRgbAndOklabColorsFromLabColor(
	lab: LabColor,
	colorSpace: ColorSpace,
): [RgbColor, string, HslColor, OkhslColor, OklabColor, OklchColor] {
	const rgb = labToRgb(lab);
	const hex = rgbToHex(rgb);
	const hsl = rgbToHsl(rgb);
	const okhsl = rgbToOkhsl(rgb);
	const oklab = oklabFromRgbInColorSpace(rgb, colorSpace);
	const oklch = oklabToOklch(oklab);
	return [rgb, hex, hsl, okhsl, oklab, oklch];
}

export function createCssColorBaseFromLabColor(lab: LabColor): CssColorBase {
	const lch = labToLch(lab);
	const colorSpace = getLabColorSpace(lch);
	const [rgb, hex, hsl, okhsl, oklab, oklch] = getRgbAndOklabColorsFromLabColor(lab, colorSpace);
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

export function createCssColorBaseFromLchColor(lch: LchColor): CssColorBase {
	const colorSpace = getLabColorSpace(lch);
	const lab = lchToLab(lch);
	const [rgb, hex, hsl, okhsl, oklab, oklch] = getRgbAndOklabColorsFromLabColor(lab, colorSpace);
	return {
		rgb,
		hex,
		hsl,
		okhsl,
		oklab,
		oklch,
		lab,
		lch,
		name: hex,
	};
}

export function finalizeLabColor(color: CssColorBase): CssColor {
	const space = getLabColorSpace(color.lch);
	if (space === 'out') {
		const rec2020 = constrainOutOfGamutLabColorToRec2020(copyCssColor(color));
		const p3 = constrainRec2020LabColorToP3(copyCssColor(rec2020));
		const srbg = constrainP3LabColorToSRGB(copyCssColor(p3));
		return {
			...normalizeGrayScaleValues(copyCssColor(color)),
			space,
			rec2020Color: finalizeColorInGamut(rec2020),
			p3Color: finalizeColorInGamut(p3),
			srbgColor: finalizeColorInGamut(srbg),
		};
	}
	if (space === 'rec2020') {
		const p3 = constrainRec2020LabColorToP3(copyCssColor(color));
		const srbg = constrainP3LabColorToSRGB(copyCssColor(p3));
		return {
			...normalizeGrayScaleValues(copyCssColor(color)),
			space,
			rec2020Color: finalizeColorInGamut(color),
			p3Color: finalizeColorInGamut(p3),
			srbgColor: finalizeColorInGamut(srbg),
		};
	}
	if (space === 'p3') {
		const srbg = constrainP3LabColorToSRGB(copyCssColor(color));
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

function constrainLabColorToGamut(color: CssColorBase, withinGamut: (lch: LchColor) => boolean): CssColorBase {
	if (withinGamut({ ...color.lch })) return copyCssColor(color);

	let { c } = color.lch;
	let hiC = c;
	let loC = 0;
	c /= 2;
	while (hiC - loC > EPSILON) {
		if (withinGamut({ ...color.lch, c })) {
			loC = c;
		} else {
			hiC = c;
		}
		c = (hiC + loC) / 2;
	}
	return createCssColorBaseFromLchColor({ ...color.lch, c });
}

const constrainP3LabColorToSRGB = (color: CssColorBase): CssColorBase =>
	constrainLabColorToGamut(color, isLchColorWithinSrgbGamut);

const constrainRec2020LabColorToP3 = (color: CssColorBase): CssColorBase =>
	constrainLabColorToGamut(color, isLchColorWithinP3Gamut);

const constrainOutOfGamutLabColorToRec2020 = (color: CssColorBase): CssColorBase =>
	constrainLabColorToGamut(color, isLchColorWithinRec2020Gamut);
