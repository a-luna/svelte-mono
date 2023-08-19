import type { ColorFormat, ColorPalette, ComponentColor } from '@a-luna/shared-ui';

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
