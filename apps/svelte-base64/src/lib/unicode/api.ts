import { dev } from '$app/environment';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { HttpResponse, Result, UnicodeCharInfo } from '$lib/types';
import { UnicodeCharInfoSchema } from '$lib/types/api';
import { COMPLEX_SYMBOL_REGEX } from '$lib/unicode/regex';
import { sleep, strictUriEncode } from '$lib/util';
import { z } from 'zod';
import { apiMocks } from './mocks';

export async function getUnicodeCharInfo(s: string): Promise<Result<HttpResponse[]>> {
	const fetchMethod = import.meta.env.MODE !== 'test' ? fetchUnicodeCharInfo : mockFetchUnicodeCharInfo;
	const charData: HttpResponse[] = [];
	const charsInString = s.match(COMPLEX_SYMBOL_REGEX) || [];
	for (const utf8 of charsInString) {
		try {
			const results = await fetchMethod(utf8);
			charData.push({ char: utf8, results });
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { success: false, error };
			}
		}
	}
	return { success: true, value: charData.flat() };
}

async function fetchUnicodeCharInfo(utf8: string): Promise<UnicodeCharInfo[]> {
	const api_base_url = dev ? PUBLIC_API_BASE_URL : 'https://unicode-api.aaronluna.dev/v1';
	const endpoint = `${api_base_url}/characters/-/${strictUriEncode(utf8)}?show_props=UTF8&show_props=Basic`;
	const response = await fetch(endpoint, {
		method: 'GET',
		headers: { Accept: 'application/json', 'x-unicodeapi-test': 'true' },
	});
	if (!response.ok) {
		return Promise.reject(Error(`Error! ${response.statusText} (${response.status})`));
	}
	const resultsJson = await response.json().catch(() => ({}));
	return z.array(UnicodeCharInfoSchema).parse(resultsJson);
}

async function mockFetchUnicodeCharInfo(utf8: string): Promise<UnicodeCharInfo[]> {
	await sleep(1);
	return apiMocks?.[strictUriEncode(utf8)] || [];
}
