import type { HTTP_METHODS } from '$lib/constants';

export type HttpMethod = typeof HTTP_METHODS[number];
export type HttpError = { status: number; message: string };
export type HttpResult =
	| { success: true; value: Response; error: null }
	| { success: false; error: HttpError; value: null };

export interface UnicodeCharInfo {
	character: string;
	name: string;
	codepoint: string;
	block: string;
	plane: string;
	category: string;
	bidirectionalClass: string;
	combiningClass: string;
	isMirrored: boolean;
	htmlEntities: string[];
	uriEncoded: string;
	utf8: string;
	utf16: string;
	utf32: string;
	utf8HexBytes: string[];
	utf8DecBytes: number[];
}

export type HttpResponse = { char: string; results: UnicodeCharInfo[] }[]