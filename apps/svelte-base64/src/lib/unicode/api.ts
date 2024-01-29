import { dev } from '$app/environment';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { HttpResponse, Result } from '$lib/types';
import { UnicodeCharInfoSchema, type FlattenedError, type UnicodeCharInfoParseResult } from '$lib/types/api';
import { apiMocks } from '$lib/unicode/mocks';
import { COMPLEX_SYMBOL_REGEX } from '$lib/unicode/regex';
import { sleep, strictUriEncode } from '$lib/util';
import { z } from 'zod';

export async function getUnicodeCharInfo(s: string): Promise<Result<HttpResponse[], FlattenedError>> {
	const fetchMethod = import.meta.env.MODE !== 'test' ? fetchUnicodeCharInfo : mockFetchUnicodeCharInfo;
	const charData: HttpResponse[] = [];
	const charsInString = s.match(COMPLEX_SYMBOL_REGEX) || [];
	for (const utf8 of charsInString) {
		try {
			const result = await fetchMethod(utf8);
			if (result.success) {
				charData.push({ char: utf8, results: result.data });
			} else {
				return { success: false, error: result.error.flatten() };
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				return {
					success: false,
					error: {
						formErrors: [error.message],
						fieldErrors: {},
					},
				};
			}
		}
	}
	return { success: true, value: charData.flat() };
}

async function fetchUnicodeCharInfo(utf8: string): Promise<UnicodeCharInfoParseResult> {
	const api_base_url = dev ? PUBLIC_API_BASE_URL : 'https://unicode-api.aaronluna.dev/v1';
	const endpoint = `${api_base_url}/characters/-/${strictUriEncode(utf8)}?show_props=UTF8&show_props=Basic`;
	const response = await fetch(endpoint, {
		method: 'GET',
		headers: { Accept: 'application/json' },
	});
	if (!response.ok) {
		return Promise.reject(Error(`Error! ${response.statusText} (${response.status})`));
	}
	const resultsJson = await response.json().catch(() => ({}));
	return z.array(UnicodeCharInfoSchema).safeParse(resultsJson);
}

async function mockFetchUnicodeCharInfo(utf8: string): Promise<UnicodeCharInfoParseResult> {
	await sleep(1);
	return { success: true, data: apiMocks?.[strictUriEncode(utf8)] || [] };
}
