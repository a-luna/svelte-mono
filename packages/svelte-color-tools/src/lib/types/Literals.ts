import type {
	CSS_COLOR_PROPERTIES,
	CSS_CUSTOM_PROP_TYPES,
	CSS_STRING_PROPERTIES,
	LABEL_STATES,
	VIEW_OPTIONS,
} from '$lib/constants';

export type Subset<K, T extends K> = T;
export type LabelState = (typeof LABEL_STATES)[number];
export type TemporaryLabelState = Subset<LabelState, 'copied' | 'error' | 'success'>;
export type ViewOption = (typeof VIEW_OPTIONS)[number];
export type CssCustomPropertyType = (typeof CSS_CUSTOM_PROP_TYPES)[number];
export type CssStringPropertyName = (typeof CSS_STRING_PROPERTIES)[number];
export type CssColorPropertyName = (typeof CSS_COLOR_PROPERTIES)[number];
export type CssPropertyName = CssStringPropertyName | CssColorPropertyName;
