import type { ColorFormat, ColorPalleteFromFile } from './';

export interface UserThemeFromFile {
	themeName: string;
	usesPrefix: boolean;
	themePrefix: string;
	createdAt: string;
	modifiedAt: string;
	colorFormat: ColorFormat;
	palettes: ColorPalleteFromFile[];
}
