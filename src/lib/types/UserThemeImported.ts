import type { ColorFormat, ColorPalette, ComponentColor } from '.';

export interface UserThemeImported {
	themeName: string;
	createdAt: string;
	modifiedAt: string;
	usesPrefix: boolean;
	themePrefix: string;
	uiColor: ComponentColor;
	colorFormat: ColorFormat;
	palettes: ColorPalette[];
}
