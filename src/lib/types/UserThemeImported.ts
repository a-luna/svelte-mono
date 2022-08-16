import type { ColorFormat, ColorPalette } from '.';

export interface UserThemeImported {
	themeName: string;
	usesPrefix: boolean;
	themePrefix: string;
	createdAt: string;
	modifiedAt: string;
	colorFormat: ColorFormat;
	palettes: ColorPalette[];
}
