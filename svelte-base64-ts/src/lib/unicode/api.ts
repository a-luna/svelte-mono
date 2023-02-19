import type { HttpResponse, Result, UnicodeCharInfo } from '$lib/types';
import { COMPLEX_SYMBOL_REGEX } from '$lib/unicode/regex';
import { strictUriEncode } from '$lib/util';
import { apiMocks } from './mocks';

export async function getUnicodeCharInfo(s: string): Promise<Result<HttpResponse>> {
	const charData: HttpResponse = [];
	for (const utf8 of s.match(COMPLEX_SYMBOL_REGEX)) {
		const fetchMethod = import.meta.env.MODE !== 'test' ? fetchUnicodeCharInfo : mockFetchUnicodeCharInfo;
		try {
			const results = await fetchMethod(utf8);
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
	const response = await fetch(getUrlForApiRequest(utf8), {
		method: 'GET',
		headers: { Accept: 'application/json' },
	});
	if (response.ok) {
		const results = await response.text().then<UnicodeCharInfo[]>((t: string) => JSON.parse(t) as UnicodeCharInfo[]);
		if (results) {
			return results;
		} else {
			return Promise.reject(new Error(response.statusText));
		}
	} else {
		return Promise.reject('Unknown error occurred!');
	}
}

const getApiBaseUrl = (): string =>
	import.meta.env.MODE === 'production' ? 'https://unicode-api.aaronluna.dev/v1' : 'http://localhost:3507/v1';

function getUrlForApiRequest(utf8: string): string {
	const endpoint = `characters/${strictUriEncode(utf8)}`;
	return `${getApiBaseUrl()}/${endpoint}?show_props=UTF8`;
}

function mockFetchUnicodeCharInfo(utf8: string): UnicodeCharInfo[] {
	const encodedChar = strictUriEncode(utf8);
	if (Object.keys(apiMocks).includes(encodedChar)) {
		return apiMocks[encodedChar];
	}
}
