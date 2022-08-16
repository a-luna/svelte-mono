import type { ComponentColor, ThemeColor } from '.';

export interface ColorPalette {
	id: string;
	propName: string;
	displayName: string;
	colors: ThemeColor[];
	componentColor: ComponentColor;
	updated?: boolean;
}
