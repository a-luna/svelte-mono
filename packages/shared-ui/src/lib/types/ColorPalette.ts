import type { ComponentColor, ThemeColor } from '$lib/types';

export interface ColorPalette {
	id: string;
	colors: ThemeColor[];
	propName: string;
	displayName: string;
	componentColor: ComponentColor;
	updated?: boolean;
}
