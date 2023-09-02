import type { CssColor } from '$lib/types';

export interface ColorSchemeSet {
	base: CssColor[];
	complementary: CssColor[];
	split: CssColor[];
	analogous: CssColor[];
	triadic: CssColor[];
	tetradic: CssColor[];
	square: CssColor[];
	monochrome: CssColor[];
}

export interface ColorSchemeSetForColorFormat {
	base: string[];
	complementary: string[];
	split: string[];
	analogous: string[];
	triadic: string[];
	tetradic: string[];
	square: string[];
	monochrome: string[];
}

export interface ColorSchemeComparison {
	hsl: ColorSchemeSet;
	lch: ColorSchemeSet;
	okhsl: ColorSchemeSet;
	oklch: ColorSchemeSet;
}

export interface ColorSchemeComparisonForAllColorFormats {
	hex: ColorSchemeSetForColorFormat;
	rgb: ColorSchemeSetForColorFormat;
	hsl: ColorSchemeSetForColorFormat;
	lab: ColorSchemeSetForColorFormat;
	lch: ColorSchemeSetForColorFormat;
	okhsl: ColorSchemeSetForColorFormat;
	oklab: ColorSchemeSetForColorFormat;
	oklch: ColorSchemeSetForColorFormat;
}
