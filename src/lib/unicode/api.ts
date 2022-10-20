import { api } from '$lib/api';
import type { UnicodeCharInfo } from '$lib/types';
import { strictUriEncode } from '$lib/util';
import { COMPLEX_SYMBOL_REGEX } from '.';
import { apiMocks } from './mocks';

export async function getUnicodeCharInfo(s: string): Promise<{ char: string; results: UnicodeCharInfo[] }[]> {
	const charData: { char: string; results: UnicodeCharInfo[] }[] = [];
	for (const utf8 of s.match(COMPLEX_SYMBOL_REGEX)) {
		const results = import.meta.env.MODE !== 'test' ? await getLiveUnicodeCharInfo(utf8) : getMockUnicodeCharInfo(utf8);
		charData.push({ char: utf8, results });
	}
	return charData.flat();
}

async function getLiveUnicodeCharInfo(utf8: string): Promise<UnicodeCharInfo[]> {
	const endpoint = `char/${strictUriEncode(utf8)} `;
	return await api.get(endpoint).then<UnicodeCharInfo[]>((result) => {
		if (!result.success) {
			const { status, message } = result.error;
			throw `API Request Failed! Error: ${message} (${status})`;
		}
		const response = result.value;
		const charInfo: UnicodeCharInfo[] = response.text().then<UnicodeCharInfo[]>((t) => JSON.parse(t));
		return charInfo;
	});
}

function getMockUnicodeCharInfo(utf8: string): UnicodeCharInfo[] {
	const encodedChar = strictUriEncode(utf8);
	if (Object.keys(apiMocks).includes(encodedChar)) {
		return apiMocks[encodedChar];
	}
}
