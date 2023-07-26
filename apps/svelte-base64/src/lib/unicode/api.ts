import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { HttpResponse, Result, UnicodeCharInfo } from '$lib/types';
import { UnicodeCharInfoSchema } from '$lib/types/api';
import { COMPLEX_SYMBOL_REGEX } from '$lib/unicode/regex';
import { strictUriEncode } from '$lib/util';
import { z } from 'zod';
import { apiMocks } from './mocks';

export async function getUnicodeCharInfo(s: string): Promise<Result<HttpResponse>> {
	const charData: HttpResponse[] = [];
	for (const utf8 of s.match(COMPLEX_SYMBOL_REGEX)) {
		const fetchMethod = import.meta.env.MODE !== 'test' ? fetchUnicodeCharInfo : mockFetchUnicodeCharInfo;
		try {
			const resultsJson = await fetchMethod(utf8);
			const results = z.array(UnicodeCharInfoSchema).parse(resultsJson);
			console.log({ char: utf8, results });
			charData.push({ char: utf8, results });
		} catch (error) {
			return {
				success: false,
				error: Error('Request for unicode character details failed, please check internet connection.'),
			};
		}
	}
	return { success: true, value: charData.flat() };
}

async function fetchUnicodeCharInfo(utf8: string): Promise<UnicodeCharInfo[]> {
	const endpoint = `${PUBLIC_API_BASE_URL}/characters/${strictUriEncode(utf8)}?show_props=UTF8&show_props=Basic`;
	const response = await fetch(endpoint, {
		method: 'GET',
		headers: { Accept: 'application/json' },
	});
	if (!response.ok) {
		return Promise.reject(Error(`Error! ${response.statusText} (${response.status})`));
	}
	return await response.json().catch(() => ({}));
}

function mockFetchUnicodeCharInfo(utf8: string): UnicodeCharInfo[] {
	return apiMocks?.[strictUriEncode(utf8)] || [];
}
