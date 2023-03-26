import type { HslColor, RgbColor } from '.';

export interface CssColor {
	hex: string;
	rgb: RgbColor;
	rgbString: string;
	hsl: HslColor;
	hslString: string;
	hasAlpha: boolean;
	hexAlpha: string;
	rgbaString: string;
	hslaString: string;
	name?: string;
}
