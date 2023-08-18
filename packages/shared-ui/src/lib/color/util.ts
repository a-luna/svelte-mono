import { X11_NAMED_COLORS } from '$lib/constants';
import type {
	ColorPalette,
	CssColor,
	CssColorPreview,
	HslColor,
	LabColor,
	LchColor,
	OkhslColor,
	OklabColor,
	OklchColor,
	RgbColor,
} from '$lib/types';
import { getRandomArrayItem, getRandomHexString } from '$lib/util';

export const getRandomHueValue = (): number =>
	getRandomArrayItem<number>(Array.from({ length: 360 }, (_, i) => i)) || 0;
export const toFixedFloat = (f: number, precision = 2): string => f.toFixed(precision);
export const toFixedPercent = (f: number, precision = 2): string => `${(f * 100.0).toFixed(precision)}%`;
export const decimalToOpacityValue = (decimal: number): number => parseFloat(toFixedFloat(decimal / 255.0));
export const opacityAsPercent = (opacity: number): number => parseFloat(toFixedFloat(opacity * 100.0));

export const byteIntToHexString = (byteInt: number): string =>
	0 <= byteInt && byteInt <= 255
		? Math.round(byteInt).toString(16).toUpperCase().padStart(2, '0')
		: byteInt < 0
		? '00'
		: 'FF';

export const rgbToString = ({ r, g, b, a }: RgbColor): string =>
	a < 1.0
		? `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)} / ${Math.round(a)})`
		: `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)})`;

export const hslToString = ({ h, s, l, a }: HslColor): string =>
	a < 1.0
		? `hsl(${toFixedFloat(h)} ${toFixedFloat(s)}% ${toFixedFloat(l)}% / ${a})`
		: `hsl(${toFixedFloat(h)} ${toFixedFloat(s)}% ${toFixedFloat(l)}%)`;

export const labToString = ({ l, a, b, A }: LabColor): string =>
	a < 1.0
		? `lab(${toFixedFloat(l)} ${toFixedFloat(a)} ${toFixedFloat(b)} / ${opacityAsPercent(A)}%)`
		: `lab(${toFixedFloat(l)} ${toFixedFloat(a)} ${toFixedFloat(b)})`;

export const lchToString = ({ l, c, h, a }: LchColor): string =>
	a < 1.0
		? `lch(${toFixedFloat(l)} ${toFixedFloat(c)} ${toFixedFloat(h)} / ${opacityAsPercent(a)}%)`
		: `lch(${toFixedFloat(l)} ${toFixedFloat(c)} ${toFixedFloat(h)})`;

export const okhslToString = ({ h, s, l, a }: OkhslColor): string =>
	a < 1.0
		? `okhsl(${toFixedFloat(h)} ${toFixedPercent(s)} ${toFixedPercent(l)} / ${a})`
		: `okhsl(${toFixedFloat(h)} ${toFixedPercent(s)} ${toFixedPercent(l)})`;

export const oklabToString = ({ l, a, b, A }: OklabColor): string =>
	a < 1.0
		? `oklab(${toFixedFloat(l)}% ${toFixedFloat(a, 3)} ${toFixedFloat(b, 3)} / ${opacityAsPercent(A)}%)`
		: `oklab(${toFixedFloat(l)}% ${toFixedFloat(a, 3)} ${toFixedFloat(b, 3)})`;

export const oklchToString = ({ l, c, h, a }: OklchColor): string =>
	a < 1.0
		? `oklch(${toFixedFloat(l)}% ${toFixedFloat(c, 3)} ${toFixedFloat(h)} / ${opacityAsPercent(a)}%)`
		: `oklch(${toFixedFloat(l)}% ${toFixedFloat(c, 3)} ${toFixedFloat(h)})`;

export const sortColors = (a: CssColor, b: CssColor): number =>
	a.hsl.h - b.hsl.h || a.hsl.s - b.hsl.s || a.hsl.l - b.hsl.l;

export const colorNameisCustomized = ({ name, hex, hslString, rgbString }: CssColor): boolean =>
	name ? ![hex, hslString, rgbString].includes(name) : false;

export const normalize = (s: string): string =>
	s.toLowerCase().trim().replace(/\s+/g, '').replaceAll('-', '').replaceAll('_', '');

export const copyCssColor = (color: CssColor): CssColor => ({
	...color,
	rgb: { ...color.rgb },
	hsl: { ...color.hsl },
	lab: { ...color.lab },
	lch: { ...color.lch },
	okhsl: { ...color.okhsl },
	oklab: { ...color.oklab },
	oklch: { ...color.oklch },
});

const signedInteger = /-?\d*\.0?$/;

const clamp = (n: number): number =>
	Math.abs(n) < 1
		? Object.is(parseFloat(n.toFixed(4)), -0)
			? 0
			: parseFloat(n.toFixed(4))
		: signedInteger.test(n.toFixed(2))
		? parseInt(n.toFixed(2))
		: parseFloat(n.toFixed(2));

export const clampColorComponents = (color: CssColor): CssColor => ({
	...color,
	rgb: {
		r: Math.round(color.rgb.r),
		g: Math.round(color.rgb.g),
		b: Math.round(color.rgb.b),
		a: Math.round(color.rgb.a),
	},
	hsl: {
		h: clamp(color.hsl.h),
		s: clamp(color.hsl.s),
		l: clamp(color.hsl.l),
		a: clamp(color.hsl.a),
	},
	lab: {
		l: clamp(color.lab.l),
		a: clamp(color.lab.a),
		b: clamp(color.lab.b),
		A: clamp(color.lab.A),
	},
	lch: {
		l: clamp(color.lch.l),
		c: clamp(color.lch.c),
		h: clamp(color.lch.h),
		a: clamp(color.lch.a),
	},
	okhsl: {
		h: clamp(color.okhsl.h),
		s: clamp(color.okhsl.s),
		l: clamp(color.okhsl.l),
		a: clamp(color.okhsl.a),
	},
	oklab: {
		l: clamp(color.oklab.l),
		a: clamp(color.oklab.a),
		b: clamp(color.oklab.b),
		A: clamp(color.oklab.A),
	},
	oklch: {
		l: clamp(color.oklch.l),
		c: clamp(color.oklch.c),
		h: clamp(color.oklch.h),
		a: clamp(color.oklch.a),
	},
});

export const addStringValuesToCssColor = (color: CssColorPreview): CssColor => ({
	...color,
	rgbString: rgbToString(color.rgb),
	hslString: hslToString(color.hsl),
	labString: labToString(color.lab),
	lchString: lchToString(color.lch),
	okhslString: okhslToString(color.okhsl),
	oklabString: oklabToString(color.oklab),
	oklchString: oklchToString(color.oklch),
});

export function changeColorName(color: CssColor, newName: string): CssColor {
	const updatedColor = copyCssColor(color);
	updatedColor.name = newName;
	return updatedColor;
}

export function getX11ColorNamesNormalized(): Map<string, string> {
	const x11ColorNames = new Map<string, string>();
	X11_NAMED_COLORS.forEach((color) => x11ColorNames.set(normalize(color), color));
	return x11ColorNames;
}

export function createEmptyColorPalette(name = 'custom palette'): ColorPalette {
	const id = getRandomHexString(4);
	return {
		id,
		propName: `palette-${id}`,
		displayName: name,
		colors: [],
		componentColor: 'black',
	};
}
