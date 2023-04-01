import type {
	ColorPalette,
	CssColor,
	HslColor,
	LabColor,
	LchColor,
	OkhslColor,
	OklabColor,
	OklchColor,
	RgbColor,
} from '$lib/types';
import { getRandomArrayItem, getRandomHexString } from '$lib/util';

export const getRandomHueValue = (): number => getRandomArrayItem<number>(Array.from({ length: 360 }, (_, i) => i));
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

export const rgbToString = ({ r, g, b, a }: RgbColor, hasAlpha: boolean): string =>
	hasAlpha
		? `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)} / ${Math.round(a)})`
		: `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)})`;

export const hslToString = ({ h, s, l, a }: HslColor, hasAlpha: boolean): string =>
	hasAlpha
		? `hsl(${toFixedFloat(h)} ${toFixedFloat(s)}% ${toFixedFloat(l)}% / ${a})`
		: `hsl(${toFixedFloat(h)} ${toFixedFloat(s)}% ${toFixedFloat(l)}%)`;

export const labToString = ({ l, a, b, A }: LabColor, hasAlpha: boolean): string =>
	hasAlpha
		? `lab(${toFixedFloat(l)} ${toFixedFloat(a)} ${toFixedFloat(b)} / ${opacityAsPercent(A)}%)`
		: `lab(${toFixedFloat(l)} ${toFixedFloat(a)} ${toFixedFloat(b)})`;

export const lchToString = ({ l, c, h, a }: LchColor, hasAlpha: boolean): string =>
	hasAlpha
		? `lch(${toFixedFloat(l)} ${toFixedFloat(c)} ${toFixedFloat(h)} / ${opacityAsPercent(a)}%)`
		: `lch(${toFixedFloat(l)} ${toFixedFloat(c)} ${toFixedFloat(h)})`;

export const okhslToString = ({ h, s, l, a }: OkhslColor, hasAlpha: boolean): string =>
	hasAlpha
		? `okhsl(${toFixedFloat(h)} ${toFixedPercent(s)} ${toFixedPercent(l)} / ${a})`
		: `okhsl(${toFixedFloat(h)} ${toFixedPercent(s)} ${toFixedPercent(l)})`;

export const oklabToString = ({ l, a, b, A }: OklabColor, hasAlpha: boolean): string =>
	hasAlpha
		? `oklab(${toFixedFloat(l)}% ${toFixedFloat(a, 3)} ${toFixedFloat(b, 3)} / ${opacityAsPercent(A)}%)`
		: `oklab(${toFixedFloat(l)}% ${toFixedFloat(a, 3)} ${toFixedFloat(b, 3)})`;

export const oklchToString = ({ l, c, h, a }: OklchColor, hasAlpha: boolean): string =>
	hasAlpha
		? `oklch(${toFixedFloat(l)}% ${toFixedFloat(c, 3)} ${toFixedFloat(h)} / ${opacityAsPercent(a)}%)`
		: `oklch(${toFixedFloat(l)}% ${toFixedFloat(c, 3)} ${toFixedFloat(h)})`;

export const copyCssColor = (color: CssColor): CssColor => ({
	hex: color.hex,
	rgb: { ...color.rgb },
	hsl: { ...color.hsl },
	lab: { ...color.lab },
	lch: { ...color.lch },
	okhsl: { ...color.okhsl },
	oklab: { ...color.oklab },
	oklch: { ...color.oklch },
	rgbString: color.rgbString,
	hslString: color.hslString,
	labString: color.labString,
	okhslString: color.okhslString,
	oklchString: color.oklchString,
	oklabString: color.oklabString,
	lchString: color.lchString,
	hasAlpha: color.hasAlpha,
	name: color.name,
});

export const sortColors = (a: CssColor, b: CssColor): number =>
	a.hsl.h - b.hsl.h || a.hsl.s - b.hsl.s || a.hsl.l - b.hsl.l;

export const colorNameisCustomized = ({ name, hex, hslString, rgbString }: CssColor): boolean =>
	name ? ![hex, hslString, rgbString].includes(name) : false;

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
