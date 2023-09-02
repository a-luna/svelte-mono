import type { ColorPalleteFromFile } from '$lib/types';
import type { ColorFormat, ColorPalette, ComponentColor } from '@a-luna/shared-ui';

export interface UserThemeBase {
	themeName: string;
	usesPrefix: boolean;
	themePrefix: string;
	createdAt: string;
	modifiedAt: string;
	colorFormatSrgb: ColorFormat;
	colorFormatP3: ColorFormat;
	uiColor: ComponentColor;
}

export interface UserThemeFromFile extends UserThemeBase {
	palettes: ColorPalleteFromFile[];
}

export interface UserThemeImported extends UserThemeBase {
	palettes: ColorPalette[];
}

export type UserThemeSettings = Pick<
	UserThemeBase,
	'themeName' | 'usesPrefix' | 'themePrefix' | 'colorFormatSrgb' | 'colorFormatP3' | 'uiColor'
>;
