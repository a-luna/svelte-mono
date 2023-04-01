import type { ComponentColor } from '$lib/types';

export interface HueRange {
	hueStart: number;
	hueEnd: number;
	name: string;
	componentColor: ComponentColor;
}
