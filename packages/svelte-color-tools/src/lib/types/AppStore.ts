import type { ColorPalette, ThemeColor } from '.';

export interface AppStore {
	x11PalettesShown: boolean;
	themeColorPalettes: ColorPalette[];
	selectedThemePalette: ColorPalette;
	themeCurrentColor: ThemeColor;
	pickerColorHasAlpha: boolean;
	componentStyles: string;
}
