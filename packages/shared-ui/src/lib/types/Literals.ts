import type {
	COLOR_FORMATS,
	COLOR_SPACE_COMPONENTS,
	COMPONENT_COLORS,
	HEX_STRING_FORMATS,
	NUMBER_TYPES,
} from '$lib/constants';

export interface IsEnumerable {
	length: number;
}

export type Subset<K, T extends K> = T;
export type ComponentColor = (typeof COMPONENT_COLORS)[number];
export type ColorFormat = (typeof COLOR_FORMATS)[number];
export type NumberType = (typeof NUMBER_TYPES)[number];
export type HexNumberType = Subset<NumberType, 'hex' | 'decimal'>;
export type HexStringFormat = (typeof HEX_STRING_FORMATS)[number];
export type RgbNumberType = Subset<NumberType, 'decimal' | 'float' | 'percent'>;
export type RgbStringFormat = Subset<NumberType, 'decimal' | 'percent'>;
export type HslLabNumberType = Subset<NumberType, 'degree' | 'rad' | 'turn' | 'percent' | 'float'>;
type ColorSpaceComponents = (typeof COLOR_SPACE_COMPONENTS)[number];
export type RgbHexComponent = Subset<ColorSpaceComponents, 'red' | 'green' | 'blue' | 'alpha'>;
export type HslComponent = Subset<ColorSpaceComponents, 'hue' | 'sat' | 'light' | 'alpha'>;
export type LchComponent = Subset<ColorSpaceComponents, 'light' | 'chroma' | 'hue' | 'alpha'>;
export type LabComponent = Subset<ColorSpaceComponents, 'light' | 'aaxis' | 'baxis' | 'alpha'>;
