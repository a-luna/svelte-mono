import type { ColorSpace, CssColor, CssColorForColorSpace } from '$lib/types';

export interface ThemeColor {
	color: CssColor;
	colorSpace: ColorSpace;
	colorInGamut: CssColorForColorSpace;
	propName?: string;
	cssVarName?: string;
	displayName?: string;
	value?: string;
	isSelected?: boolean;
}
