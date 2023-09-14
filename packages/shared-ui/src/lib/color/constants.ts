import type { ColorPalette, CssColor, CssColorForColorSpace, ThemeColor, X11ColorPalette } from '$lib/types';
import type { ColorSchemeSet } from '$lib/types/ColorScheme';

export const defaultCssColorForColorSpace: CssColorForColorSpace = {
	hex: '#000000',
	rgb: { r: 0, g: 0, b: 0, a: 1 },
	hsl: { h: 0, s: 0, l: 0, a: 1 },
	lab: { l: 0, a: 0, b: 0, A: 1 },
	oklab: { l: 0, a: 0, b: 0, A: 1 },
	lch: { l: 0, c: 0, h: 0, a: 1 },
	oklch: { l: 0, c: 0, h: 0, a: 1 },
	okhsl: { h: 0, s: 0, l: 0, a: 1 },
	name: '#000000',
	rgbString: 'rgb(0 0 0)',
	hslString: 'hsl(0.00 0.00% 0.00%)',
	labString: 'lab(0.00 0.00 0.00 / 100%)',
	lchString: 'lch(0.00 0.00 0.00)',
	okhslString: 'okhsl(0.00 0.00% 0.00%)',
	oklabString: 'oklab(0.00% 0.000 0.000 / 100%)',
	oklchString: 'oklch(0.00% 0.000 0.00)',
};

export const defaultCssColor: CssColor = {
	hex: '#000000',
	rgb: { r: 0, g: 0, b: 0, a: 1 },
	hsl: { h: 0, s: 0, l: 0, a: 1 },
	lab: { l: 0, a: 0, b: 0, A: 1 },
	oklab: { l: 0, a: 0, b: 0, A: 1 },
	lch: { l: 0, c: 0, h: 0, a: 1 },
	oklch: { l: 0, c: 0, h: 0, a: 1 },
	okhsl: { h: 0, s: 0, l: 0, a: 1 },
	name: '#000000',
	space: 'srgb',
	srbgColor: defaultCssColorForColorSpace,
};

export const defaultThemeColor: ThemeColor = {
	color: defaultCssColor,
	colorSpace: 'srgb',
	colorInGamut: defaultCssColorForColorSpace,
};

export const defaultColorPalette: ColorPalette = {
	id: '',
	displayName: '',
	componentColor: 'black',
	propName: '',
	colors: [defaultThemeColor],
	updated: false,
};

export const defaultX11ColorPalette: X11ColorPalette = {
	id: '',
	displayName: '',
	componentColor: 'black',
	colors: [defaultCssColorForColorSpace],
};

export const defaultColorSchemeSet: ColorSchemeSet = {
	base: [],
	complementary: [],
	split: [],
	analogous: [],
	triadic: [],
	tetradic: [],
	square: [],
	monochrome: [],
};
