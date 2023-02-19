import type {
	APP_MODES,
	BASE64_ENCODINGS,
	BUTTON_COLORS,
	BUTTON_SIZES,
	DATA_ENCODINGS,
	TEXT_ENCODINGS,
} from '$lib/constants';

export type AppMode = typeof APP_MODES[number];
export type DataEncoding = typeof DATA_ENCODINGS[number];
export type TextEncoding = typeof TEXT_ENCODINGS[number];
export type Base64Encoding = typeof BASE64_ENCODINGS[number];
export type StringEncoding = DataEncoding | TextEncoding;
export type Encoding = StringEncoding | Base64Encoding;
export type ButtonSize = typeof BUTTON_SIZES[number];
export type ButtonColor = typeof BUTTON_COLORS[number];
