import type {
	COLOR_SPACES,
	COMPONENT_COLORS,
	CSS_COLOR_FORMATS,
	CSS_COLOR_PROP_TYPES,
	CSS_STRING_PROP_TYPES,
	LABEL_STATES,
	VIEW_OPTIONS,
} from '$lib/constants';

export type ComponentColor = typeof COMPONENT_COLORS[number];
export type ColorFormat = typeof CSS_COLOR_FORMATS[number];
export type ColorSpace = typeof COLOR_SPACES[number];
export type LabelState = typeof LABEL_STATES[number];
export type ViewOption = typeof VIEW_OPTIONS[number];
export type CssStringPropType = typeof CSS_STRING_PROP_TYPES[number];
export type CssColorPropType = typeof CSS_COLOR_PROP_TYPES[number];
export type CssProptype = CssStringPropType | CssColorPropType;
