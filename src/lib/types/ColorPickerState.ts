import type { ColorPalette, ColorSpace, CssColor, LabelState } from '.';

export interface ColorPickerState {
	pickerId: string;
	color: CssColor;
	x11PalettesShown: boolean;
	x11ColorPalettes: ColorPalette[];
	colorSpace: ColorSpace;
	labelState: LabelState;
	editable: boolean;

	alphaEnabled: boolean;
}
