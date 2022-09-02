import type { ColorFormat, ColorPalette, ComponentColor } from '.';

export interface UserThemeImported {
	themeName: string;
	usesPrefix: boolean;
	themePrefix: string;
	createdAt: string;
	modifiedAt: string;
	colorFormat: ColorFormat;
	uiColor: ComponentColor;
	palettes: ColorPalette[];
}
