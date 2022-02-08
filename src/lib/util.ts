import type { StringEncoding } from './types';
import { validateAsciiBytes } from './validation';

export const divmod = (x: number, y: number): [number, number] => [(x / y) | 0, x % y];

export const stringToByteArray = (s: string, encoding: StringEncoding): number[] =>
	encoding === 'ASCII' ? asciiStringToByteArray(s) : hexStringToByteArray(s);

export const asciiStringToByteArray = (s: string): number[] => Array.from(s, (_, i) => s.charCodeAt(i));

export const hexStringToByteArray = (hexString: string): number[] =>
	Array.from({ length: hexString.length / 2 }, (_, i) => parseInt(hexString.substr(i * 2, 2), 16));

export const asciiStringFromByteArray = (byteArray: number[]): string => {
	if (validateAsciiBytes(byteArray)) {
		return Array.from(byteArray, (x) => String.fromCharCode(x)).join('');
	}
	return '';
};

export const asciiStringFromHexString = (hexString: string): string =>
	asciiStringFromByteArray(hexStringToByteArray(hexString));

export function hexStringFromByteArray(byteArray: number[]): string {
	let hexString = '';
	let nextHexByte: string;
	for (let i = 0; i < byteArray.length; i++) {
		nextHexByte = byteArray[i].toString(16); // Integer to base 16
		if (nextHexByte.length < 2) {
			nextHexByte = `0${nextHexByte}`; // Otherwise 10 becomes just a instead of 0a
		}
		hexString += nextHexByte;
	}
	return hexString;
}

export const byteArrayToBinaryStringArray = (byteArray: number[]): string[] =>
	byteArray.map((byte) => decimalToBinaryString(byte));

export const decimalToBinaryString = (val: number): string =>
	`${'0'.repeat(8 - val.toString(2).length)}${val.toString(2)}`;

export function chunkify<T>(inputList: T[], chunkSize: number): T[][] {
	const [fullChunkCount, finalChunkLength] = divmod(inputList.length, chunkSize);
	const totalChunks = finalChunkLength > 0 ? fullChunkCount + 1 : fullChunkCount;
	return Array.from({ length: totalChunks }, (_, i) =>
		inputList.slice(i * chunkSize, Math.min(inputList.length, i * chunkSize + chunkSize))
	);
}
