import type { ColorPalette, ColorSpace, CssColor, LabelState } from '.';

export interface ColorPickerState {
	pickerId: string;
	color: CssColor;
	x11ColorPalettes: ColorPalette[];
	colorSpace: ColorSpace;
	labelState: LabelState;
	editable: boolean;
}
