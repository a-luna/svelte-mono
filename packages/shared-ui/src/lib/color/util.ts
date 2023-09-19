import { X11_NAMED_COLORS } from '$lib/constants';
import type {
	ColorFormat,
	ColorPalette,
	ColorSpace,
	CssColor,
	CssColorBase,
	CssColorForColorSpace,
	HasHueAndLightness,
	HslColor,
	LabColor,
	LchColor,
	OkhslColor,
	OklabColor,
	OklchColor,
	RgbColor,
	ThemeColor,
} from '$lib/types';
import { copyObject, getRandomArrayItem, getRandomHexString } from '$lib/util';

export const getRandomHueValue = (): number =>
	getRandomArrayItem<number>(Array.from({ length: 360 }, (_, i) => i)) || 0;
export const toFixedFloat = (f: number, precision = 2): string => f.toFixed(precision);
export const toFixedPercent = (f: number, precision = 2): string => `${clampString(clean(100 * f), precision)}%`;
export const decimalToOpacityValue = (decimal: number): number => parseFloat(toFixedFloat(decimal / 255.0));

const signedInteger = /-?\d*\.0+$/;

const clamp = (n: number, p = 2): number =>
	Math.abs(n) < 1
		? Object.is(parseFloat(n.toFixed(3)), -0)
			? 0
			: parseFloat(n.toFixed(3))
		: Object.is(n, -0)
		? 0
		: signedInteger.test(n.toFixed(2))
		? parseInt(n.toFixed(0))
		: parseFloat(n.toFixed(p));

function clampString(n: number, p = 2): string {
	let clamped =
		Math.abs(n) < 1
			? Object.is(parseFloat(n.toFixed(3)), -0)
				? '0'
				: n.toFixed(3)
			: isIntValue(n)
			? n.toFixed(0)
			: n.toFixed(p);

	if (clamped.includes('.')) {
		while (clamped.endsWith('0')) {
			clamped = clamped.slice(0, -1);
		}
		if (clamped.endsWith('.')) {
			clamped = clamped.slice(0, -1);
		}
	}
	return clamped;
}

function isIntValue(n: number): boolean {
	const decimal = parseInt(n.toFixed(5).split('.', 2).at(-1) ?? '0');
	return !decimal;
}

// Hack to avoid ,999999 because of float bug implementation
function clean(value: number, precision = 2): number {
	return Math.round(parseFloat((value * 10 ** precision).toFixed(precision))) / 10 ** precision;
}

export const byteIntToHexString = (byteInt: number): string =>
	0 <= byteInt && byteInt <= 255
		? Math.round(byteInt).toString(16).toUpperCase().padStart(2, '0')
		: byteInt < 0
		? '00'
		: 'FF';

export const rgbToString = ({ r, g, b, a }: RgbColor): string =>
	a < 1.0
		? `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)} / ${clampString(a)})`
		: `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)})`;

export const hslToString = ({ h, s, l, a }: HslColor): string =>
	a < 1.0
		? `hsl(${clampString(h)} ${toFixedPercent(s / 100.0)} ${toFixedPercent(l / 100.0)} / ${clampString(a)})`
		: `hsl(${clampString(h)} ${toFixedPercent(s / 100.0)} ${toFixedPercent(l / 100.0)})`;

export const okhslToString = ({ h, s, l, a }: OkhslColor): string =>
	a < 1.0
		? `okhsl(${clampString(h)} ${toFixedPercent(s / 100.0)} ${toFixedPercent(l / 100.0)} / ${clampString(a)})`
		: `okhsl(${clampString(h)} ${toFixedPercent(s / 100.0)} ${toFixedPercent(l / 100.0)})`;

export const labToString = ({ l, a, b, A }: LabColor): string =>
	A < 1.0
		? `lab(${clampString(l)} ${clampString(a)} ${clampString(b)} / ${toFixedPercent(A, 1)})`
		: `lab(${clampString(l)} ${clampString(a)} ${clampString(b)})`;

export const oklabToString = ({ l, a, b, A }: OklabColor): string =>
	A < 1.0
		? `oklab(${clampString(l)}% ${clampString(a, 3)} ${clampString(b, 3)} / ${toFixedPercent(A, 1)})`
		: `oklab(${clampString(l)}% ${clampString(a, 3)} ${clampString(b, 3)})`;

export const lchToString = ({ l, c, h, a }: LchColor): string =>
	a < 1.0
		? `lch(${clampString(l)} ${clampString(c)} ${clampString(h)} / ${toFixedPercent(a, 1)})`
		: `lch(${clampString(l)} ${clampString(c)} ${clampString(h)})`;

export const oklchToString = ({ l, c, h, a }: OklchColor): string =>
	a < 1.0
		? `oklch(${toFixedPercent(l / 100.0)} ${clampString(c, 3)} ${clampString(h)} / ${toFixedPercent(a, 1)})`
		: `oklch(${toFixedPercent(l / 100.0)} ${clampString(c, 3)} ${clampString(h)})`;

export const sortColors = (a: CssColor | CssColorForColorSpace, b: CssColor | CssColorForColorSpace): number =>
	a.hsl.h - b.hsl.h || a.hsl.s - b.hsl.s || a.hsl.l - b.hsl.l;

export const sortByLightnessAscending = (a: HasHueAndLightness, b: HasHueAndLightness): number => a.l - b.l;

export function colorNameisCustomized(color: ThemeColor): boolean {
	const cssColorStrings = [
		color?.colorInGamut?.hex ?? '',
		color?.colorInGamut?.hslString ?? '',
		color?.colorInGamut?.rgbString ?? '',
		color?.colorInGamut?.okhslString ?? '',
		color?.colorInGamut?.labString ?? '',
		color?.colorInGamut?.oklabString ?? '',
		color?.colorInGamut?.lchString ?? '',
		color?.colorInGamut?.oklchString ?? '',
	];

	return color?.color?.name ? !cssColorStrings.includes(color.color.name) : false;
}

export const normalize = (s: string): string =>
	s.toLowerCase().trim().replace(/\s+/g, '').replaceAll('-', '').replaceAll('_', '');

export const copyCssColor = (color: CssColorBase): CssColorBase => copyObject<CssColorBase>(color);

export const clampColorComponents = <T extends CssColor | CssColorForColorSpace>(color: T): T => ({
	...color,
	rgb: {
		r: Math.floor(color.rgb.r),
		g: Math.floor(color.rgb.g),
		b: Math.floor(color.rgb.b),
		a: clamp(color.rgb.a),
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

export const addStringValuesToCssColor = (color: CssColorBase): CssColorForColorSpace => ({
	...color,
	rgbString: rgbToString(color.rgb),
	hslString: hslToString(color.hsl),
	labString: labToString(color.lab),
	lchString: lchToString(color.lch),
	okhslString: okhslToString(color.okhsl),
	oklabString: oklabToString(color.oklab),
	oklchString: oklchToString(color.oklch),
});

export function changeColorName(color: CssColorForColorSpace, newName: string): CssColorForColorSpace {
	const updatedColor = copyObject<CssColorForColorSpace>(color);
	updatedColor.name = newName;
	return updatedColor;
}

export function getX11ColorNamesNormalized(): Map<string, string> {
	const x11ColorNames = new Map<string, string>();
	X11_NAMED_COLORS.forEach((color) => x11ColorNames.set(normalize(color), color));
	return x11ColorNames;
}

export function createEmptyColorPalette(name = 'custom palette'): ColorPalette {
	const id = getRandomHexString({ length: 4 });
	return {
		id,
		propName: `palette-${id}`,
		displayName: name,
		colors: [],
		componentColor: 'black',
	};
}

export function getCssColorString(color: CssColor, space: ColorSpace, format: ColorFormat): string {
	const colorInGamut = space === 'srgb' ? color.srbgColor : color.space === 'srgb' ? color.srbgColor : color.p3Color;
	const colorStrings = {
		hex: colorInGamut.hex,
		rgb: colorInGamut.rgbString,
		hsl: colorInGamut.hslString,
		lab: colorInGamut.labString,
		lch: colorInGamut.lchString,
		okhsl: colorInGamut.hslString,
		oklab: colorInGamut.oklabString,
		oklch: colorInGamut.oklchString,
	};
	return colorStrings[format];
}

export const isGrayscaleColor = (color: CssColorBase): boolean =>
	color.rgb.r === color.rgb.g && color.rgb.g === color.rgb.b;
