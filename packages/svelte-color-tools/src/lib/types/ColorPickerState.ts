import type { ColorFormat, ColorPalette, CssColor } from '@a-luna/shared-ui';
import type { LabelState } from '.';

export interface ColorPickerState {
	pickerId: string;
	color: CssColor;
	x11PalettesShown: boolean;
	x11ColorPalettes: ColorPalette[];
	colorSpace: ColorFormat;
	labelState: LabelState;
	editable: boolean;

	alphaEnabled: boolean;
}
