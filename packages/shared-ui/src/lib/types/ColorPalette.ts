import type { ComponentColor, ThemeColor, ThemeColorShallowCopy } from '$lib/types';

export interface ColorPalette {
	id: string;
	propName: string;
	displayName: string;
	colors: ThemeColor[];
	componentColor: ComponentColor;
	updated?: boolean;
}

export interface ColorPalleteFromFile {
	id: string;
	propName: string;
	displayName: string;
	colors: ThemeColorShallowCopy[];
	componentColor: ComponentColor;
}
