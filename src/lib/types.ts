export type ColorSpace = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
export type LabelState = 'prerender' | 'inactive' | 'copied' | 'edit' | 'pick' | 'success' | 'error';

export const COMPONENT_COLORS = ['black', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo'] as const;
export type ComponentColor = typeof COMPONENT_COLORS[number];

export interface Result<T> {
	success: boolean;
	error?: string;
	value?: T;
}

export interface RgbColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface HslColor {
	h: number;
	s: number;
	l: number;
	a: number;
}

export interface CssColor {
	hex: string;
	rgb: RgbColor;
	hsl: HslColor;
	hasAlpha: boolean;
	rgbString: string;
	hslString: string;
	name?: string;
}

export interface HueRange {
	hueStart: number;
	hueEnd: number;
	name: string;
	componentColor: ComponentColor;
}

export interface ColorPickerState {
	pickerId: string;
	color: CssColor;
	colorSpace: ColorSpace;
	labelState: LabelState;
	editable: boolean;
}

export interface SelectMenuOption {
	label: string;
	value: number | string;
	optionNumber: number;
	active: boolean;
}

export interface ColorPalette {
	id: string;
	name: string;
	colors: CssColor[];
	componentColor: ComponentColor;
	updated?: boolean;
}
