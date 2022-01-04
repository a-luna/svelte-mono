export type ColorSpace = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
export type LabelState =
	| 'prerender'
	| 'inactive'
	| 'copied'
	| 'edit'
	| 'pick'
	| 'success'
	| 'error';

export interface Result<T> {
	success: boolean;
	error?: string;
	value?: T;
}

export interface RgbColor {
	r: number;
	g: number;
	b: number;
	a?: number;
}

export interface HslColor {
	h: number;
	s: number;
	l: number;
	a?: number;
}

export interface CssColor {
	hex: string;
	rgb: RgbColor;
	hsl: HslColor;
	hasAlpha: boolean;
	rgbString: string;
	hslString: string;
}

export interface ColorPickerState {
	pickerId: string;
	color: CssColor;
	colorSpace: ColorSpace;
	labelState: LabelState;
}

export interface SelectMenuOption {
	text: string;
	value: number | string;
	optionNumber: number;
	active: boolean;
}
