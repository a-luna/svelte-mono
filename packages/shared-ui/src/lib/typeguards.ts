import { COLOR_FORMATS, COMPONENT_COLORS } from '$lib/constants';
import type { ColorFormat, ComponentColor } from '$lib/types';

export const isComponentColor = (arg: string): arg is ComponentColor =>
	COMPONENT_COLORS.includes(arg as ComponentColor);

export const isColorFormat = (arg: string): arg is ColorFormat => COLOR_FORMATS.includes(arg as ColorFormat);
