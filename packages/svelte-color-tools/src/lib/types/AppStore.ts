import type { ColorFormat, ColorPalette, ColorSpace, CssColorForColorSpace, ThemeColor } from '@a-luna/shared-ui';

export interface AppStore {
	x11PalettesShown: boolean;
	themeColorPalettes: ColorPalette[];
	selectedThemePalette: ColorPalette;
	themeCurrentColor: ThemeColor;
	currentColorInGamut: CssColorForColorSpace;
	currentColorSpace: ColorSpace;
	currentColorFormat: ColorFormat;
	componentStyles: string;
}
