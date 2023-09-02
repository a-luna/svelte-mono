import type { HslColor, LabColor, LchColor, OkhslColor, OklabColor, OklchColor, RgbColor } from '$lib/types';

export interface CssColorBase {
	hex: string;
	hsl: HslColor;
	lab: LabColor;
	lch: LchColor;
	okhsl: OkhslColor;
	oklab: OklabColor;
	oklch: OklchColor;
	rgb: RgbColor;
	name: string;
}

export interface CssColorForColorSpace extends CssColorBase {
	rgbString: string;
	hslString: string;
	labString: string;
	lchString: string;
	okhslString: string;
	oklabString: string;
	oklchString: string;
}

export interface SrgbColor extends CssColorBase {
	space: 'srgb';
	srbgColor: CssColorForColorSpace;
}

export interface P3Color extends CssColorBase {
	space: 'p3';
	p3Color: CssColorForColorSpace;
	srbgColor: CssColorForColorSpace;
}

export interface Rec2020Color extends CssColorBase {
	space: 'rec2020';
	rec2020Color: CssColorForColorSpace;
	p3Color: CssColorForColorSpace;
	srbgColor: CssColorForColorSpace;
}

export interface OutsideGamutColor extends CssColorBase {
	space: 'out';
	rec2020Color: CssColorForColorSpace;
	srbgColor: CssColorForColorSpace;
	p3Color: CssColorForColorSpace;
}

export type CssColor = SrgbColor | P3Color | Rec2020Color | OutsideGamutColor;
