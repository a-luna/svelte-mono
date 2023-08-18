import type { HslColor, LabColor, LchColor, OkhslColor, OklabColor, OklchColor, RgbColor } from '$lib/types';

export interface CssColor {
	hex: string;
	hsl: HslColor;
	lab: LabColor;
	lch: LchColor;
	okhsl: OkhslColor;
	oklab: OklabColor;
	oklch: OklchColor;
	rgb: RgbColor;
	rgbString: string;
	hslString: string;
	labString: string;
	lchString: string;
	okhslString: string;
	oklabString: string;
	oklchString: string;
	name: string;
}

export type CssColorPreview = Pick<
	CssColor,
	'hex' | 'hsl' | 'lab' | 'lch' | 'okhsl' | 'oklab' | 'oklch' | 'rgb' | 'name'
>;
