import type { ColorFormat, ColorPalleteFromFile, ComponentColor } from './';

export interface UserThemeFromFile {
	themeName: string;
	usesPrefix: boolean;
	themePrefix: string;
	createdAt: string;
	modifiedAt: string;
	colorFormat: ColorFormat;
	uiColor: ComponentColor;
	palettes: ColorPalleteFromFile[];
}
