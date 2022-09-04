import type {
	ByteEncodingMap,
	Utf8ComplexCharacterMap,
	Utf8StandardCharacterMap,
	Utf8StringComposition,
} from '$lib/types';
import { getBlockContainingCodepoint } from '$lib/unicode/blockNames';
import { unicodeCharNames } from '$lib/unicode/charNames';
import { reComplexSymbol } from '$lib/unicode/regex';
import {
	genericStringToByteArray,
	hexStringFromByte,
	hexStringToByte,
	strictUriEncode,
	UnicodeCodepointFromUtf8ByteArray,
} from '$lib/util';
import { validateAsciiBytes } from '$lib/validation';

const utf8ToCharArray = (s: string): RegExpMatchArray => s.match(reComplexSymbol);

export function decomposeUtf8String(s: string): Utf8StringComposition {
	const complexCharMap: Utf8ComplexCharacterMap[] = utf8ToCharArray(s).map((utf8) => {
		const charMap: Utf8StandardCharacterMap[] = [...utf8].map((char) => {
			const charData = getUtf8EncodedByteMaps(char).map((byteMap) => ({ hex: byteMap.hex, byte: byteMap.byte }));
			const hexBytes = charData.map((data) => data.hex);
			const bytes = charData.map((data) => data.byte);
			const totalBytes = bytes.length;
			const codepoints = totalBytes <= 4 ? UnicodeCodepointFromUtf8ByteArray(bytes) : null;
			const codepoint = codepoints?.hex;
			const decimalCodepoint = codepoints?.dec;
			const unicodeName = unicodeCharNames[decimalCodepoint];
			const unicodeBlock = getBlockContainingCodepoint(decimalCodepoint);
			const isASCII = validateAsciiBytes(bytes);
			return {
				char,
				isASCII,
				hexBytes,
				bytes,
				codepoint,
				decimalCodepoint,
				unicodeName,
				unicodeBlock,
				totalBytes,
				encoded: strictUriEncode(char),
			};
		});
		const hexBytes = charMap.map((charMap) => charMap.hexBytes).flat();
		const bytes = charMap.map((charMap) => charMap.bytes).flat();
		const codepoints = charMap.map((charMap) => charMap.codepoint).flat();
		const decimalCodepoints = charMap.map((charMap) => charMap.decimalCodepoint).flat();
		const isCombined = charMap.length > 1;
		const unicodeNames = isCombined
			? charMap.map((charMap) => charMap.unicodeName).flat()
			: [unicodeCharNames[decimalCodepoints[0]]];
		const unicodeBlocks = isCombined
			? charMap.map((charMap) => charMap.unicodeBlock).flat()
			: [getBlockContainingCodepoint(decimalCodepoints[0])];
		const isASCII = validateAsciiBytes(bytes);
		const complexCharMap: Utf8ComplexCharacterMap = {
			char: utf8,
			isCombined,
			isASCII,
			hexBytes,
			bytes,
			codepoints,
			decimalCodepoints,
			unicodeNames,
			unicodeBlocks,
			totalBytes: bytes.length,
			encoded: strictUriEncode(utf8),
		};
		if (isCombined) {
			complexCharMap.charMap = charMap;
		}
		return complexCharMap;
	});
	const hexBytes = complexCharMap.map((charMap) => charMap.hexBytes).flat();
	const bytes = complexCharMap.map((charMap) => charMap.bytes).flat();
	return {
		utf8: s,
		hasCombinedChars: complexCharMap.some((charMap) => charMap.isCombined),
		stringLength: complexCharMap.length,
		encoded: strictUriEncode(s),
		totalBytes: bytes.length,
		hexBytes,
		bytes,
		charMap: complexCharMap,
	};
}

function getUtf8EncodedByteMaps(s: string): ByteEncodingMap[] {
	const utf8Encoded = strictUriEncode(s);
	const utf8ByteMaps = getUtf8ByteMaps(utf8Encoded);
	const asciiByteMaps: ByteEncodingMap[] = utf8ByteMaps.length
		? findMissingAsciiBytes(utf8ByteMaps, utf8Encoded)
		: getAsciiByteMaps(utf8Encoded, 0, utf8Encoded.length);
	return [...utf8ByteMaps, ...asciiByteMaps].sort((a, b) => a.start - b.start);
}

function getUtf8ByteMaps(utf8Encoded: string): ByteEncodingMap[] {
	const encodedUtf8Bytes = [...utf8Encoded.matchAll(/%(?<encodedByte>[0-9A-F]{2,2})/g)];
	return encodedUtf8Bytes.map((match) => ({
		byte: hexStringToByte(match.groups.encodedByte),
		hex: match.groups.encodedByte,
		start: match.index,
		end: match.index + match[0].length,
	}));
}

function findMissingAsciiBytes(utf8ByteMaps: ByteEncodingMap[], utf8Encoded: string) {
	let index = utf8ByteMaps.at(0).start;
	const missingAsciiBytes = utf8ByteMaps
		.map((byte) => {
			const missingByteMaps = getAsciiByteMaps(utf8Encoded, index, byte.start);
			index = missingByteMaps?.length ? index + missingByteMaps.length : byte.end;
			return missingByteMaps;
		})
		.flat();
	return [
		...getAsciiByteMaps(utf8Encoded, 0, utf8ByteMaps.at(0).start),
		...missingAsciiBytes,
		...getAsciiByteMaps(utf8Encoded, utf8ByteMaps.at(-1).end, utf8Encoded.length),
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
