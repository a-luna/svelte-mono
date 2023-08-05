import type { HTTP_METHODS } from '$lib/constants';
import { z } from 'zod';

export type HttpMethod = (typeof HTTP_METHODS)[number];
export type HttpError = { status: number; message: string };
export type HttpResult =
	| { success: true; value: Response; error: null }
	| { success: false; error: HttpError; value: null };

export const UnicodeCharInfoSchema = z.object({
	character: z.string(),
	name: z.string(),
	description: z.string().optional(),
	codepoint: z.string(),
	block: z.string(),
	plane: z.string(),
	uriEncoded: z.string(),
	utf8: z.string(),
	utf8HexBytes: z.array(z.string()),
	utf8DecBytes: z.array(z.coerce.number()),
});

export const HttpResponseSchema = z.object({
	char: z.string(),
	results: z.array(UnicodeCharInfoSchema),
});

export type UnicodeCharInfo = z.infer<typeof UnicodeCharInfoSchema>;
export type HttpResponse = z.infer<typeof HttpResponseSchema>;
