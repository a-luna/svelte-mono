import type { ComponentColor, ThemeColorShallowCopy } from '.';

export interface ColorPalleteFromFile {
	id: string;
	propName: string;
	displayName: string;
	colors: ThemeColorShallowCopy[];
	componentColor: ComponentColor;
}
