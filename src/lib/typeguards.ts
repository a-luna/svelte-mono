import { BASE64_ENCODINGS, DATA_ENCODINGS, TEXT_ENCODINGS } from '$lib/constants';
import type { Base64Encoding, Encoding, StringEncoding, TextEncoding } from '$lib/types';

export const isBase64Encoding = (encoding: string): encoding is Base64Encoding =>
	BASE64_ENCODINGS.includes(encoding as Base64Encoding);

export const isStringEncoding = (encoding: string): encoding is StringEncoding =>
	[...TEXT_ENCODINGS, ...DATA_ENCODINGS].includes(encoding as StringEncoding);

export const isEncoding = (value: string): value is Encoding =>
	[...BASE64_ENCODINGS, ...TEXT_ENCODINGS, ...DATA_ENCODINGS].includes(value as Encoding);

export const isTextEncoding = (encoding: string): encoding is TextEncoding =>
	encoding === 'ascii' || encoding === 'utf8';
