import type { CSS_COLOR_PROP_TYPES, CSS_STRING_PROP_TYPES, LABEL_STATES, VIEW_OPTIONS } from '$lib/constants';

export type LabelState = (typeof LABEL_STATES)[number];
export type ViewOption = (typeof VIEW_OPTIONS)[number];
export type CssStringPropType = (typeof CSS_STRING_PROP_TYPES)[number];
export type CssColorPropType = (typeof CSS_COLOR_PROP_TYPES)[number];
export type CssProptype = CssStringPropType | CssColorPropType;
