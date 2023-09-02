import type { ComponentColor, CssColorForColorSpace, ThemeColor } from '$lib/types';

export interface ColorPaletteBase {
	id: string;
	displayName: string;
	componentColor: ComponentColor;
}

export interface ColorPalette extends ColorPaletteBase {
	propName: string;
	colors: ThemeColor[];
	updated?: boolean;
}

export interface X11ColorPalette extends ColorPaletteBase {
	colors: CssColorForColorSpace[];
}
