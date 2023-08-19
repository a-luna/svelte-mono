import type { ThemeColorShallowCopy } from '$lib/types';
import type { ComponentColor } from '@a-luna/shared-ui';

export interface ColorPalleteFromFile {
	id: string;
	propName: string;
	displayName: string;
	colors: ThemeColorShallowCopy[];
	componentColor: ComponentColor;
}
