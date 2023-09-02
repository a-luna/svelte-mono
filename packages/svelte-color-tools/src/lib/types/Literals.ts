import type {
	CSS_COLOR_PROPERTIES,
	CSS_CUSTOM_PROP_TYPES,
	CSS_STRING_PROPERTIES,
	LABEL_STATES,
	VIEW_OPTIONS,
} from '$lib/constants';

export type LabelState = (typeof LABEL_STATES)[number];
export type ViewOption = (typeof VIEW_OPTIONS)[number];
export type CssCustomPropertyType = (typeof CSS_CUSTOM_PROP_TYPES)[number];
export type CssStringProperty = (typeof CSS_STRING_PROPERTIES)[number];
export type CssColorProperty = (typeof CSS_COLOR_PROPERTIES)[number];
export type CssPropertyName = CssStringProperty | CssColorProperty;
