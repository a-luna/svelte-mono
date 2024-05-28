import type {
	BUTTON_COLORS,
	BUTTON_SIZES,
	COLOR_FORMATS,
	COLOR_FORMAT_COMPONENTS,
	COLOR_SCHEMES,
	COLOR_SPACES,
	COMPONENT_COLORS,
	CSS_ABSOLUTE_LENGTH_UNITS,
	CSS_ANGLE_UNITS,
	CSS_RELATIVE_LENGTH_UNITS,
	HEX_STRING_FORMATS,
	NUMBER_TYPES,
	UI_THEME_VALUES,
} from '$lib/constants';

export interface IsEnumerable {
	length: number;
}

export type Subset<K, T extends K> = T;
export type ComponentColor = (typeof COMPONENT_COLORS)[number];
export type UiThemeValue = (typeof UI_THEME_VALUES)[number];
export type ColorSpace = (typeof COLOR_SPACES)[number];
export type ColorFormat = (typeof COLOR_FORMATS)[number];
export type ColorScheme = (typeof COLOR_SCHEMES)[number];
export type AdjustableColorFormat = Subset<ColorFormat, 'hsl' | 'lch' | 'okhsl' | 'oklch'>;
export type LabColorFormat = Subset<ColorFormat, 'lab' | 'oklab' | 'lch' | 'oklch'>;
export type NumberType = (typeof NUMBER_TYPES)[number];
export type HexNumberType = Subset<NumberType, 'hex' | 'decimal'>;
export type HexStringFormat = (typeof HEX_STRING_FORMATS)[number];
export type RgbNumberType = Subset<NumberType, 'decimal' | 'float' | 'percent'>;
export type RgbStringFormat = Subset<NumberType, 'decimal' | 'percent'>;
export type HslLabNumberType = Subset<NumberType, 'degree' | 'rad' | 'turn' | 'percent' | 'float'>;
type ColorFormatComponents = (typeof COLOR_FORMAT_COMPONENTS)[number];
export type RgbHexComponent = Subset<ColorFormatComponents, 'red' | 'green' | 'blue' | 'alpha'>;
export type HslComponent = Subset<ColorFormatComponents, 'hue' | 'sat' | 'light' | 'alpha'>;
export type LchComponent = Subset<ColorFormatComponents, 'light' | 'chroma' | 'hue' | 'alpha'>;
export type LabComponent = Subset<ColorFormatComponents, 'light' | 'aaxis' | 'baxis' | 'alpha'>;
export type ButtonColor = (typeof BUTTON_COLORS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export type CssAbsoluteLengthUnit = (typeof CSS_ABSOLUTE_LENGTH_UNITS)[number];
export type CssRelativeLengthUnit = (typeof CSS_RELATIVE_LENGTH_UNITS)[number];
export type CssAngleUnit = (typeof CSS_ANGLE_UNITS)[number];
