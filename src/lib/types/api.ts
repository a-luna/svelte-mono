import type { HTTP_METHODS } from '$lib/constants';

export type HttpMethod = typeof HTTP_METHODS[number];
export type HttpError = { status: number; message: string };
export type HttpResult =
	| { success: true; value: Response; error: null }
	| { success: false; error: HttpError; value: null };

export interface UnicodeCharInfo {
	character: string;
	name: string;
	codePoint: string;
	block: string;
	plane: string;
	category: string;
	bidirectionalClass: string;
	combiningClass: string;
	isMirrored: boolean;
	htmlEntities: string[];
	encoded: string;
	utf8: string;
	utf16: string;
	utf32: string;
	hexBytes: string[];
	decBytes: number[];
}
