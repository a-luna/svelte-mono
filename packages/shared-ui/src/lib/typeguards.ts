import { BUTTON_COLORS, COLOR_FORMATS, COMPONENT_COLORS } from '$lib/constants';
import type { AdjustableColorFormat, ButtonColor, ColorFormat, ComponentColor } from '$lib/types';
import type { HasHueAndLightness, HslColor, LchColor, OkhslColor, OklchColor } from './types/ColorFormats';

export const isComponentColor = (arg: string): arg is ComponentColor =>
	COMPONENT_COLORS.includes(arg as ComponentColor);

export const isColorFormat = (arg: string): arg is ColorFormat => COLOR_FORMATS.includes(arg as ColorFormat);

export const isAdjustableColorFormat = (arg: string): arg is AdjustableColorFormat =>
	['hsl', 'lch', 'okhsl', 'oklch'].includes(arg as AdjustableColorFormat);

export const isHslColor = (color: HasHueAndLightness): color is HslColor => 's' in (color as HslColor);
export const isLchColor = (color: HasHueAndLightness): color is LchColor => 'c' in (color as LchColor);
export const isOkhslColor = (color: HasHueAndLightness): color is OkhslColor => 's' in (color as OkhslColor);
export const isOklchColor = (color: HasHueAndLightness): color is OklchColor => 'c' in (color as OklchColor);

export const isButtonColor = (color: string): color is ButtonColor => BUTTON_COLORS.includes(color as ButtonColor);
