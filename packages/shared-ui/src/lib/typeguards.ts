import {
	BUTTON_COLORS,
	COLOR_FORMATS,
	COMPONENT_COLORS,
	CSS_ABSOLUTE_LENGTH_UNITS,
	CSS_RELATIVE_LENGTH_UNITS,
} from '$lib/constants';
import type {
	AdjustableColorFormat,
	ButtonColor,
	ColorFormat,
	ComponentColor,
	CssAbsoluteLengthUnit,
	CssRelativeLengthUnit,
	HasHueAndLightness,
	HslColor,
	LabColorFormat,
	LchColor,
	OkhslColor,
	OklchColor,
} from '$lib/types';

export const isComponentColor = (arg: string): arg is ComponentColor =>
	COMPONENT_COLORS.includes(arg as ComponentColor);

export const isColorFormat = (arg: string): arg is ColorFormat => COLOR_FORMATS.includes(arg as ColorFormat);

export const isLabColorFormat = (arg: ColorFormat): arg is LabColorFormat =>
	['lab', 'oklab', 'lch', 'oklch'].includes(arg as LabColorFormat);

export const isAdjustableColorFormat = (arg: string): arg is AdjustableColorFormat =>
	['hsl', 'lch', 'okhsl', 'oklch'].includes(arg as AdjustableColorFormat);

export const isHslColor = (color: HasHueAndLightness): color is HslColor => 's' in (color as HslColor);
export const isLchColor = (color: HasHueAndLightness): color is LchColor => 'c' in (color as LchColor);
export const isOkhslColor = (color: HasHueAndLightness): color is OkhslColor => 's' in (color as OkhslColor);
export const isOklchColor = (color: HasHueAndLightness): color is OklchColor => 'c' in (color as OklchColor);

export const isButtonColor = (color: string): color is ButtonColor => BUTTON_COLORS.includes(color as ButtonColor);

export const isAbsoluteLengthUnit = (unit: string): unit is CssAbsoluteLengthUnit =>
	CSS_ABSOLUTE_LENGTH_UNITS.includes(unit as CssAbsoluteLengthUnit);

export const isRelativeLengthUnit = (unit: string): unit is CssRelativeLengthUnit =>
	CSS_RELATIVE_LENGTH_UNITS.includes(unit as CssRelativeLengthUnit);
