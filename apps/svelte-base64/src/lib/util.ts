import { browser } from '$app/environment';
import type { BitGroupDetails, Result, StringEncoding } from '$lib/types';
import { getSimpleUtf8StringDecomposition } from '$lib/unicode/utf8';
import { validateAsciiBytes } from '$lib/validation';

export const HEX_BIT_GROUP_REGEX = /hex-chunk-(?<chunk>\d+)-byte-(?<byte>1|2|3)/;
export const B64_BIT_GROUP_REGEX = /base64-chunk-(?<chunk>\d+)-digit-(?<b64Char>1|2|3|4)/;

export const divmod = (x: number, y: number): [number, number] => [(x / y) | 0, x % y];

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const stringToByteArray = (s: string, encoding: StringEncoding): number[] =>
	encoding === 'hex'
		? hexStringToByteArray(s)
		: encoding === 'bin'
			? binaryStringToByteArray(s)
			: encoding === 'utf8'
				? utf8StringToByteArray(s)
				: genericStringToByteArray(s);

export const hexStringToByte = (hex: string): number => parseInt(hex, 16);

export const hexStringToByteArray = (hex: string): number[] =>
	Array.from({ length: hex.length / 2 }, (_, i) => hexStringToByte(hex.slice(i * 2, i * 2 + 2)));

export const binaryStringToByteArray = (bin: string): number[] =>
	Array.from({ length: bin.length / 8 }, (_, i) => parseInt(bin.slice(i * 8, i * 8 + 8), 2));

export const utf8StringToByteArray = (s: string): number[] => getSimpleUtf8StringDecomposition(s).bytes;

export const genericStringToByteArray = (s: string): number[] =>
	Array.from({ length: s.length }, (_, i) => s.charCodeAt(i));

export const asciiStringFromByteArray = (byteArray: number[]): string =>
	validateAsciiBytes(byteArray) ? Array.from(byteArray, (x) => String.fromCharCode(x)).join('') : '';

export const hexStringFromByte = (byte: number, minLength = 2, upperCase = true): string =>
	upperCase ? byte.toString(16).toUpperCase().padStart(minLength, '0') : byte.toString(16).padStart(minLength, '0');

export const hexStringFromByteArray = (byteArray: number[], upperCase = false, separator = ''): string =>
	byteArray.map((byte) => hexStringFromByte(byte, 2, upperCase)).join(separator);

export const byteArrayToBinaryStringArray = (byteArray: number[]): string[] =>
	byteArray.map((byte) => decimalToBinaryString(byte));

export const decimalToBinaryString = (val: number): string => val.toString(2).padStart(8, '0');

export const strictUriEncode = (s: string): string =>
	encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

export function utf8StringFromByteArray(byteArray: number[]): string {
	try {
		const utfEncoded = byteArray
			.map((byte) => hexStringFromByte(byte))
			.map((hex) => `%${hex}`)
			.join('');
		return decodeURIComponent(utfEncoded);
	} catch (ex) {
		return '';
	}
}

export function unicodeCodepointFromUtf8ByteArray(byteArray: number[]): Result<{ hex: string; dec: number }> {
	if (!validateUtf8Bytes(byteArray)) {
		return { success: false, error: Error('Invalid UTF-8 byte sequence') };
	}
	const utf32 = utf8ByteArrayToUtf32Byte(byteArray);
	return { success: true, value: { hex: `U+${hexStringFromByte(utf32, 4)}`, dec: utf32 } };
}

function validateUtf8Bytes(byteArray: number[]): boolean {
	const [firstByte, ...remainingBytes] = byteArray;
	if (!firstByte) {
		return false;
	}
	const expectedByteCount = validateFirstUtf8Byte(firstByte);
	if (expectedByteCount === 0) {
		return false;
	}
	if (byteArray.length !== expectedByteCount) {
		return false;
	}
	return expectedByteCount === 1 ? true : remainingBytes.every((byte) => (byte & 0xc0) === 0x80);
}

function validateFirstUtf8Byte(byte: number): number {
	if ((byte & 0x80) === 0x00) {
		return 1;
	}
	if ((byte & 0xe0) === 0xc0) {
		return 2;
	}
	if ((byte & 0xf0) === 0xe0) {
		return 3;
	}
	if ((byte & 0xf8) === 0xf0) {
		return 4;
	}
	return 0;
}

function utf8ByteArrayToUtf32Byte(byteArray: number[]): number {
	switch (byteArray.length) {
		case 1:
			return byteArray[0] ? byteArray[0] & 0x7f : 0;
		case 2:
			return byteArray[0] && byteArray[1] ? ((byteArray[0] & 0x1f) << 6) | (byteArray[1] & 0x3f) : 0;
		case 3:
			return byteArray[0] && byteArray[1] && byteArray[2]
				? ((byteArray[0] & 0x0f) << 12) | ((byteArray[1] & 0x3f) << 6) | (byteArray[2] & 0x3f)
				: 0;
		case 4:
			return byteArray[0] && byteArray[1] && byteArray[2] && byteArray[3]
				? ((byteArray[0] & 0x07) << 18) |
						((byteArray[1] & 0x3f) << 12) |
						((byteArray[2] & 0x3f) << 6) |
						(byteArray[3] & 0x3f)
				: 0;
		default:
			return 0;
	}
}

export function chunkify<T>(args: { inputList: T[]; chunkSize: number }): T[][] {
	const { inputList, chunkSize } = args;
	const [fullChunkCount, finalChunkLength] = divmod(inputList.length, chunkSize);
	const totalChunks = finalChunkLength > 0 ? fullChunkCount + 1 : fullChunkCount;
	return Array.from({ length: totalChunks }, (_, i) =>
		inputList.slice(i * chunkSize, Math.min(inputList.length, i * chunkSize + chunkSize)),
	);
}

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }: { enabled: boolean; cb: () => void }) {
	const handleOutsideClick = ({ target }: MouseEvent) => {
		if (target instanceof Node && !node.contains(target)) {
			cb();
		}
	};

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		},
	};
}

export function parseGroupId(groupId: string): BitGroupDetails {
	let match = HEX_BIT_GROUP_REGEX.exec(groupId);
	if (match) {
		const [_, chunk, byte] = match;
		const chunkIndex = parseInt(chunk ?? '0') - 1;
		const byteIndexWithinChunk = parseInt(byte ?? '0') - 1;
		const byteIndex = chunkIndex * 3 + byteIndexWithinChunk;
		return {
			chunkIndex,
			byteIndex,
			byteIndexWithinChunk,
			b64CharIndex: 0,
			b64IndexWithinChunk: 0,
		};
	}
	match = B64_BIT_GROUP_REGEX.exec(groupId);
	if (match) {
		const [_, chunk, b64Char] = match;
		const chunkIndex = parseInt(chunk ?? '0') - 1;
		const b64IndexWithinChunk = parseInt(b64Char ?? '0') - 1;
		const b64CharIndex = chunkIndex * 4 + b64IndexWithinChunk;
		return {
			chunkIndex,
			byteIndex: 0,
			byteIndexWithinChunk: 0,
			b64CharIndex,
			b64IndexWithinChunk,
		};
	}
	return {
		chunkIndex: 0,
		byteIndex: 0,
		byteIndexWithinChunk: 0,
		b64CharIndex: 0,
		b64IndexWithinChunk: 0,
	};
}

export function getBase64CharIndexFromGroupId(groupId: string): number {
	const { b64CharIndex } = parseGroupId(groupId);
	return b64CharIndex ?? 0;
}

export function getHexByteIndexFromGroupId(groupId: string): number {
	const { byteIndex } = parseGroupId(groupId);
	return byteIndex ?? 0;
}

export const getChunkIndexFromByteIndex = (byteIndex: number): number => (byteIndex / 3) | 0;
export const getChunkIndexFromBase64CharIndex = (charIndex: number): number => (charIndex / 4) | 0;

/* c8 ignore start */
export async function copyToClipboard(text: string): Promise<Result> {
	if (browser) {
		try {
			await navigator.clipboard.writeText(text);
			return { success: true };
		} catch {
			return { success: false, error: Error('Error! Failed to copy text to clipboard.') };
		}
	}
	return {
		success: false,
		error: Error('This function (copyToClipboard) must be run in browser (client-side)'),
	};
}
/* c8 ignore stop */
