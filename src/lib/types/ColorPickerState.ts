import type { ColorPalette, ColorSpace, LabelState, ThemeColor } from '.';

export interface ColorPickerState {
	pickerId: string;
	color: ThemeColor;
	x11PalettesShown: boolean;
	x11ColorPalettes: ColorPalette[];
	colorSpace: ColorSpace;
	labelState: LabelState;
	editable: boolean;

	alphaEnabled: boolean;
}
