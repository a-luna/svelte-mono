import type { ComponentColor, ThemeColor } from '.';

export interface ColorPalette {
	id: string;
	colors: ThemeColor[];
	propName: string;
	displayName: string;
	componentColor: ComponentColor;
	updated?: boolean;
}
