import { BIN_TO_HEX } from './constants';
import { getBase64LookupMap } from './maps';
import type {
	Base64ByteMap,
	Base64Encoding,
	DecodingInputChunk,
	DecodingParameters,
	EncodingInputChunk,
	EncodingParameters,
	HexByteMap,
	StringEncoding
} from './types';
import {
	asciiStringFromByteArray,
	byteArrayToBinaryStringArray,
	divmod,
	hexStringFromByteArray,
	stringToByteArray
} from './util';

export function createEncodingInputChunks(inputText: string, encoding: StringEncoding): EncodingInputChunk[] {
	const inputBytes = stringToByteArray(inputText, encoding);
	const { totalChunks, lastChunkPadded, padLength } = getEncodingParameters(inputBytes);
	return Array.from({ length: totalChunks }, (_, i) => {
		const isPadded = lastChunkPadded && i === totalChunks - 1;
		const bytes = inputBytes.slice(i * 3, Math.min(inputBytes.length, i * 3 + 3));
		const hex = hexStringFromByteArray(inputBytes);
		const ascii = encoding === 'ASCII' ? asciiStringFromByteArray(inputBytes) : '';
		const byteStrings = byteArrayToBinaryStringArray(inputBytes);
		const binary = `${byteStrings.join('')}${'0'.repeat(padLength)}`;
		return {
			bytes,
			encoding,
			hex,
			ascii,
			binary,
			isPadded,
			padLength: isPadded ? padLength : 0,
			inputMap: createHexByteMapsForChunk(inputBytes, encoding, ascii, byteStrings)
		};
	});
}

function getEncodingParameters(bytes: number[]): EncodingParameters {
	const [chunkCount, lastChunkLength] = divmod(bytes.length, 3);
	const lastChunkPadded = lastChunkLength > 0;
	const totalChunks = lastChunkPadded ? chunkCount + 1 : chunkCount;
	const padLength = lastChunkPadded ? (3 - lastChunkLength) * 2 : 0;
	return {
		totalChunks,
		lastChunkPadded,
		padLength
	};
}

export function createHexByteMapsForChunk(
	inputBytes: number[],
	encoding: StringEncoding,
	ascii: string,
	byteStrings: string[]
): HexByteMap[] {
	return Array.from({ length: inputBytes.length }, (_, i) => {
		const word1 = byteStrings[i].substring(0, 4);
		const word2 = byteStrings[i].substring(4, 8);
		return {
			byte: inputBytes[i],
			bin_word1: word1,
			bin_word2: word2,
			hex_word1: BIN_TO_HEX[word1],
			hex_word2: BIN_TO_HEX[word2],
			ascii: encoding === 'ASCII' ? (/^\s+$/.test(ascii[i]) ? 'ws' : ascii[i]) : '',
			isWhiteSpace: /^\s+$/.test(ascii[i])
		};
	});
}

export function createDecodingInputChunks(encodedText: string, encoding: Base64Encoding): DecodingInputChunk[] {
	encodedText = encodedText.replace(/[=]/g, '');
	const { totalChunks, lastChunkPadded, padLength } = getDecodingParameters(encodedText);
	return Array.from({ length: totalChunks }, (_, i) => {
		const isPadded = lastChunkPadded && i === totalChunks - 1;
		const base64 = encodedText.slice(i * 4, Math.min(encodedText.length, i * 4 + 4));
		const inputMap = createBase64ByteMapsForChunk(base64, encoding, isPadded, padLength);
		const binary = inputMap.map((b64Map) => b64Map.bin).join('');
		return {
			base64,
			binary,
			encoding,
			isPadded,
			padLength: isPadded ? padLength : 0,
			inputMap
		};
	});
}

function getDecodingParameters(encodedText: string): DecodingParameters {
	const [chunkCount, lastChunkLength] = divmod(encodedText.length, 4);
	const lastChunkPadded = lastChunkLength > 0;
	const totalChunks = lastChunkPadded ? chunkCount + 1 : chunkCount;
	const padLength = lastChunkPadded ? 4 - lastChunkLength : 0;
	return {
		totalChunks,
		lastChunkPadded,
		padLength
	};
}

function createBase64ByteMapsForChunk(
	base64: string,
	encoding: Base64Encoding,
	isPadded: boolean,
	padLength: number
): Base64ByteMap[] {
	const base64lookup = getBase64LookupMap(encoding);
	const base64Map = base64.split('').map((b64) => {
		const dec = base64lookup[b64];
		const bin = `${'0'.repeat(6 - dec.toString(2).length)}${dec.toString(2)}`;
		return {
			bin,
			dec,
			b64,
			isPad: false
		};
	});
	if (isPadded) {
		Array.from({ length: padLength }, (_, i) => i).forEach(() =>
			base64Map.push({
				bin: '',
				dec: null,
				b64: '=',
				isPad: true
			})
		);
	}
	return base64Map;
}
