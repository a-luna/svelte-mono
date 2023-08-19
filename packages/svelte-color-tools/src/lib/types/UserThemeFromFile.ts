import type { ColorFormat, ComponentColor } from '@a-luna/shared-ui';
import type { ColorPalleteFromFile } from '.';

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

export type UserThemeSettings = Pick<
	UserThemeFromFile,
	'themeName' | 'usesPrefix' | 'themePrefix' | 'colorFormat' | 'uiColor'
>;
