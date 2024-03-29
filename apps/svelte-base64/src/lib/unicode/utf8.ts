import type {
	ByteEncodingMap,
	Result,
	UnicodeCharInfo,
	Utf8ComplexCharacterMap,
	Utf8StandardCharacterMap,
	Utf8StringComposition,
} from '$lib/types';
import type { FlattenedError } from '$lib/types/api';
import { getUnicodeCharInfo } from '$lib/unicode/api';
import { COMPLEX_SYMBOL_REGEX } from '$lib/unicode/regex';
import {
	genericStringToByteArray,
	hexStringFromByte,
	hexStringToByte,
	strictUriEncode,
	unicodeCodepointFromUtf8ByteArray,
} from '$lib/util';
import { validateAsciiBytes } from '$lib/validation';

const isUnihanChar = (charData: UnicodeCharInfo): boolean =>
	charData.block.toLowerCase().includes('cjk unified ideographs') ||
	charData.block.toLowerCase().includes('cjk compatibility ideographs');

export async function getUtf8StringDecomposition(s: string): Promise<Utf8StringComposition> {
	const result = await getFullUtf8StringDecomposition(s);
	// if (result.error) {
	// 	const { formErrors, fieldErrors } = result.error;
	// 	console.log({ formErrors, fieldErrors });
	// }
	return result.success && result.value ? result.value : getSimpleUtf8StringDecomposition(s);
}

async function getFullUtf8StringDecomposition(s: string): Promise<Result<Utf8StringComposition, FlattenedError>> {
	const result = await getUnicodeCharInfo(s);
	if (!result.success) {
		return { success: false, error: result.error };
	}
	const unicodeInfo = result.value ?? [];
	const complexCharMap: Utf8ComplexCharacterMap[] = unicodeInfo?.map(({ char, results }) => {
		const charMap = results.map((charData) => {
			return {
				char: charData.character,
				isCombined: false,
				isASCII: validateAsciiBytes(charData.utf8DecBytes),
				hexBytes: charData.utf8HexBytes,
				bytes: charData.utf8DecBytes,
				codepoint: charData.codepoint,
				unicodeName: isUnihanChar(charData) ? charData.description?.toUpperCase() || '' : charData.name,
				unicodeBlock: charData.block,
				totalBytes: charData.utf8DecBytes.length,
				encoded: charData.uriEncoded,
			};
		});
		const bytes = charMap.map((charMap) => charMap.bytes).flat();
		const isCombined = charMap.length > 1;
		const complexCharMap: Utf8ComplexCharacterMap = {
			char,
			isCombined,
			isASCII: validateAsciiBytes(bytes),
			hexBytes: charMap.map((charMap) => charMap.hexBytes).flat(),
			bytes,
			codepoints: charMap.map((charMap) => charMap.codepoint).flat(),
			unicodeNames: charMap.map((charMap) => charMap.unicodeName),
			unicodeBlocks: charMap.map((charMap) => charMap.unicodeBlock),
			totalBytes: bytes.length,
			encoded: charMap.map((charMap) => charMap.encoded).join(''),
		};
		if (isCombined) {
			complexCharMap.charMap = charMap;
		}
		return complexCharMap;
	});
	const bytes = complexCharMap.map((charMap) => charMap.bytes).flat();
	const stringDecomp = {
		utf8: s,
		hasCharacterNames: true,
		hasCombinedChars: complexCharMap.some((charMap) => charMap.isCombined),
		stringLength: complexCharMap.length,
		encoded: complexCharMap.map((charMap) => charMap.encoded).join(''),
		totalBytes: bytes.length,
		hexBytes: complexCharMap.map((charMap) => charMap.hexBytes).flat(),
		hexMap: [],
		bytes,
		charMap: complexCharMap,
	};
	return { success: true, value: stringDecomp };
}

export function getSimpleUtf8StringDecomposition(s: string): Utf8StringComposition {
	const complexCharMap: Utf8ComplexCharacterMap[] | undefined = s.match(COMPLEX_SYMBOL_REGEX)?.map((utf8) => {
		const charMap: Utf8StandardCharacterMap[] = [...utf8].map((char) => {
			const charData = getUtf8EncodedByteMaps(char).map((byteMap) => ({ hex: byteMap.hex, byte: byteMap.byte }));
			const hexBytes = charData.map((data) => data.hex);
			const bytes = charData.map((data) => data.byte);

			let codepoints = { hex: '', dec: 0 };
			const result = unicodeCodepointFromUtf8ByteArray(bytes);
			if (result.success) {
				codepoints = result.value ?? { hex: '', dec: 0 };
			}

			return {
				char,
				isCombined: false,
				isASCII: validateAsciiBytes(bytes),
				hexBytes,
				bytes,
				codepoint: codepoints.hex,
				decimalCodepoint: codepoints.dec,
				totalBytes: bytes.length,
				encoded: strictUriEncode(char),
			};
		});
		const bytes = charMap.map((charMap) => charMap.bytes).flat();
		const isCombined = charMap.length > 1;
		const complexCharMap: Utf8ComplexCharacterMap = {
			char: utf8,
			isCombined,
			isASCII: validateAsciiBytes(bytes),
			hexBytes: charMap.map((charMap) => charMap.hexBytes).flat(),
			bytes,
			codepoints: charMap.map((charMap) => charMap.codepoint).flat(),
			totalBytes: bytes.length,
			encoded: strictUriEncode(utf8),
		};
		if (isCombined) {
			complexCharMap.charMap = charMap;
		}
		return complexCharMap;
	});
	const bytes = complexCharMap?.map((charMap) => charMap.bytes).flat();
	return {
		utf8: s,
		hasCharacterNames: false,
		hasCombinedChars: complexCharMap?.some((charMap) => charMap.isCombined) ?? false,
		stringLength: complexCharMap?.length ?? 0,
		encoded: strictUriEncode(s),
		totalBytes: bytes?.length ?? 0,
		hexBytes: complexCharMap?.map((charMap) => charMap.hexBytes).flat() ?? [],
		hexMap: [],
		bytes: bytes ?? [],
		charMap: complexCharMap ?? [],
	};
}

export function getUtf8EncodedByteMaps(s: string): ByteEncodingMap[] {
	const utf8Encoded = strictUriEncode(s);
	const utf8ByteMaps = getUtf8ByteMaps(utf8Encoded);
	const asciiByteMaps: ByteEncodingMap[] =
		utf8ByteMaps.length > 0
			? findMissingAsciiBytes(utf8ByteMaps, utf8Encoded)
			: getAsciiByteMaps(utf8Encoded, 0, utf8Encoded.length);
	return [...utf8ByteMaps, ...asciiByteMaps].sort((a, b) => a.start - b.start);
}

function getUtf8ByteMaps(utf8Encoded: string): ByteEncodingMap[] {
	const encodedUtf8Bytes = [...utf8Encoded.matchAll(/%(?<encodedByte>[0-9A-F]{2,2})/g)];
	return encodedUtf8Bytes.map((match) => ({
		byte: hexStringToByte(match.groups?.encodedByte ?? '0'),
		hex: match.groups?.encodedByte ?? '',
		start: match.index ?? 0,
		end: (match.index ?? 0) + match[0].length,
	}));
}

function findMissingAsciiBytes(utf8ByteMaps: ByteEncodingMap[], utf8Encoded: string) {
	let index = utf8ByteMaps.at(0)?.start ?? 0;
	const missingAsciiBytes = utf8ByteMaps
		.map((byte) => {
			const missingByteMaps = getAsciiByteMaps(utf8Encoded, index, byte.start);
			index = missingByteMaps?.length ? index + missingByteMaps.length : byte.end;
			return missingByteMaps;
		})
		.flat();
	return [
		...getAsciiByteMaps(utf8Encoded, 0, utf8ByteMaps.at(0)?.start ?? 0),
		...missingAsciiBytes,
		...getAsciiByteMaps(utf8Encoded, utf8ByteMaps.at(-1)?.end ?? 0, utf8Encoded.length),
	];
}

function getAsciiByteMaps(utf8Encoded: string, start: number, end: number): ByteEncodingMap[] {
	const substring = utf8Encoded.slice(start, end);
	return substring.length
		? genericStringToByteArray(substring).map((byte, i) => ({
				byte,
				hex: hexStringFromByte(byte),
				start: start + i,
				end: start + i + 1,
			}))
		: [];
}
