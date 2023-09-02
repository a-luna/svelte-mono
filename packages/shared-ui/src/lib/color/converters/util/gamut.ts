import { labToP3, labToRec2020, labToRgb, lchToLab } from '$lib/color/converters';
import { cssColorFromLch } from '$lib/color/parsers';
import type { ColorSpace, CssColorBase, LabColor, LchColor, RgbColor } from '$lib/types';

const EPSILON = 0.00001;

export const getColorSpace = (color: CssColorBase): ColorSpace =>
	isLchColorWithinSrgbGamut(color.lch)
		? 'srgb'
		: isLchColorWithinP3Gamut(color.lch)
		? 'p3'
		: isLchColorWithinRec2020Gamut(color.lch)
		? 'rec2020'
		: 'out';

function isLchColorWithinColorSpace(lch: LchColor, colorSpaceConverter: (lab: LabColor) => RgbColor) {
	const lab = lchToLab(lch);
	const rgb = colorSpaceConverter(lab);
	const { r, g, b } = {
		r: rgb.r / 255.0,
		g: rgb.g / 255.0,
		b: rgb.b / 255.0,
	};
	return [r, g, b].reduce((a, b) => a && b >= 0 - EPSILON && b <= 1 + EPSILON, true);
}

const isLchColorWithinSrgbGamut = (lch: LchColor): boolean => isLchColorWithinColorSpace(lch, labToRgb);
const isLchColorWithinP3Gamut = (lch: LchColor): boolean => isLchColorWithinColorSpace(lch, labToP3);
const isLchColorWithinRec2020Gamut = (lch: LchColor): boolean => isLchColorWithinColorSpace(lch, labToRec2020);

function constrainColorToGamut(color: CssColorBase, withinGamut: (lch: LchColor) => boolean): CssColorBase {
	if (withinGamut({ ...color.lch })) return { ...color };

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
	return cssColorFromLch({ ...color.lch, c });
}

export const constrainP3ColorToSRGB = (color: CssColorBase): CssColorBase =>
	constrainColorToGamut(color, isLchColorWithinSrgbGamut);

export const constrainRec2020ColorToP3 = (color: CssColorBase): CssColorBase =>
	constrainColorToGamut(color, isLchColorWithinP3Gamut);

export const constrainOutOfGamutColorToRec2020 = (color: CssColorBase): CssColorBase =>
	constrainColorToGamut(color, isLchColorWithinRec2020Gamut);
