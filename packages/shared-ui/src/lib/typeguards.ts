import { COLOR_FORMATS } from '$lib/constants';
import type { ColorFormat } from '$lib/types';

export const isColorFormat = (colorFormat: string): colorFormat is ColorFormat =>
	COLOR_FORMATS.includes(colorFormat as ColorFormat);
