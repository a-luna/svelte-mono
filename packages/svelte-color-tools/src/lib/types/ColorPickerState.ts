import type { LabelState } from '$lib/types';
import type { ColorFormat, ColorSpace, CssColor, CssColorForColorSpace, X11ColorPalette } from '@a-luna/shared-ui';

export interface ColorPickerState {
	pickerId: string;
	color: CssColor;
	cssString: string;
	colorSpace: ColorSpace;
	colorFormat: ColorFormat;
	colorInGamut: CssColorForColorSpace;
	x11PalettesShown: boolean;
	x11ColorPalettes: X11ColorPalette[];
	labelState: LabelState;
	editable: boolean;
}
