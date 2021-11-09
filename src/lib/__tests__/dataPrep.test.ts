/// <reference types="jest" />
import { createEncodingInputChunks, createDecodingInputChunks } from '../dataPrep';

describe('createEncodingInputChunks', () => {
	it('can create a map (no whitespace, no pad characters) for a 3-byte chunk of an ASCII string', () => {
		expect(createEncodingInputChunks('dog', 'ASCII')).toEqual([
			{
				bytes: [100, 111, 103],
				encoding: 'ASCII',
				hex: '646f67',
				ascii: 'dog',
				binary: '011001000110111101100111',
				isPadded: false,
				padLength: 0,
				inputMap: [
					{
						bin_word1: '0110',
						bin_word2: '0100',
						byte: 100,
						hex_word1: '6',
						hex_word2: '4',
						ascii: 'd',
						isWhiteSpace: false
					},
					{
						bin_word1: '0110',
						bin_word2: '1111',
						byte: 111,
						hex_word1: '6',
						hex_word2: 'F',
						ascii: 'o',
						isWhiteSpace: false
					},
					{
						bin_word1: '0110',
						bin_word2: '0111',
						byte: 103,
						hex_word1: '6',
						hex_word2: '7',
						ascii: 'g',
						isWhiteSpace: false
					}
				]
			}
		]);
	});

	it('can create a map (no whitespace, WITH pad characters) for a 3-byte chunk of an ASCII string', () => {
		expect(createEncodingInputChunks('do', 'ASCII')).toEqual([
			{
				bytes: [100, 111],
				encoding: 'ASCII',
				hex: '646f',
				ascii: 'do',
				binary: '011001000110111100',
				isPadded: true,
				padLength: 2,
				inputMap: [
					{
						bin_word1: '0110',
						bin_word2: '0100',
						byte: 100,
						hex_word1: '6',
						hex_word2: '4',
						ascii: 'd',
						isWhiteSpace: false
					},
					{
						bin_word1: '0110',
						bin_word2: '1111',
						byte: 111,
						hex_word1: '6',
						hex_word2: 'F',
						ascii: 'o',
						isWhiteSpace: false
					}
				]
			}
		]);
	});

	it('can create a map (WITH whitespace, no pad characters) for a single chunk of an ASCII string', () => {
		expect(createEncodingInputChunks(' do', 'ASCII')).toEqual([
			{
				bytes: [32, 100, 111],
				encoding: 'ASCII',
				hex: '20646f',
				ascii: ' do',
				binary: '001000000110010001101111',
				isPadded: false,
				padLength: 0,
				inputMap: [
					{
						bin_word1: '0010',
						bin_word2: '0000',
						byte: 32,
						hex_word1: '2',
						hex_word2: '0',
						ascii: 'ws',
						isWhiteSpace: true
					},
					{
						bin_word1: '0110',
						bin_word2: '0100',
						byte: 100,
						hex_word1: '6',
						hex_word2: '4',
						ascii: 'd',
						isWhiteSpace: false
					},
					{
						bin_word1: '0110',
						bin_word2: '1111',
						byte: 111,
						hex_word1: '6',
						hex_word2: 'F',
						ascii: 'o',
						isWhiteSpace: false
					}
				]
			}
		]);
	});

	it('can create a map (WITH whitespace, WITH pad characters) for a 3-byte chunk of an ASCII string', () => {
		expect(createEncodingInputChunks(' d', 'ASCII')).toEqual([
			{
				bytes: [32, 100],
				encoding: 'ASCII',
				hex: '2064',
				ascii: ' d',
				binary: '001000000110010000',
				isPadded: true,
				padLength: 2,
				inputMap: [
					{
						bin_word1: '0010',
						bin_word2: '0000',
						byte: 32,
						hex_word1: '2',
						hex_word2: '0',
						ascii: 'ws',
						isWhiteSpace: true
					},
					{
						bin_word1: '0110',
						bin_word2: '0100',
						byte: 100,
						hex_word1: '6',
						hex_word2: '4',
						ascii: 'd',
						isWhiteSpace: false
					}
				]
			}
		]);
	});

	it('can create a map (no whitespace, no pad characters) for a 3-byte chunk of a hex string', () => {
		expect(createEncodingInputChunks('5f3c0a', 'hex')).toEqual([
			{
				bytes: [95, 60, 10],
				encoding: 'hex',
				hex: '5f3c0a',
				ascii: '',
				binary: '010111110011110000001010',
				isPadded: false,
				padLength: 0,
				inputMap: [
					{
						bin_word1: '0101',
						bin_word2: '1111',
						byte: 95,
						hex_word1: '5',
						hex_word2: 'F',
						ascii: '',
						isWhiteSpace: false
					},
					{
						bin_word1: '0011',
						bin_word2: '1100',
						byte: 60,
						hex_word1: '3',
						hex_word2: 'C',
						ascii: '',
						isWhiteSpace: false
					},
					{
						bin_word1: '0000',
						bin_word2: '1010',
						byte: 10,
						hex_word1: '0',
						hex_word2: 'A',
						ascii: '',
						isWhiteSpace: false
					}
				]
			}
		]);
	});
});

describe('createDecodingInputChunks', () => {
	it('can create a map for a base64 string (encoding: base64, length: 4, padding: None)', () => {
		expect(createDecodingInputChunks('ZG9n', 'base64')).toEqual([
			{
				base64: 'ZG9n',
				binary: '011001000110111101100111',
				encoding: 'base64',
				isPadded: false,
				padLength: 0,
				inputMap: [
					{
						bin: '011001',
						dec: 25,
						b64: 'Z',
						isPad: false
					},
					{
						bin: '000110',
						dec: 6,
						b64: 'G',
						isPad: false
					},
					{
						bin: '111101',
						dec: 61,
						b64: '9',
						isPad: false
					},
					{
						bin: '100111',
						dec: 39,
						b64: 'n',
						isPad: false
					}
				]
			}
		]);
	});

	it('can create a map for a base64 string (encoding: base64, length: 3, padding: 1)', () => {
		expect(createDecodingInputChunks('ZG8=', 'base64')).toEqual([
			{
				base64: 'ZG8',
				binary: '011001000110111100',
				encoding: 'base64',
				isPadded: true,
				padLength: 1,
				inputMap: [
					{
						bin: '011001',
						dec: 25,
						b64: 'Z',
						isPad: false
					},
					{
						bin: '000110',
						dec: 6,
						b64: 'G',
						isPad: false
					},
					{
						bin: '111100',
						dec: 60,
						b64: '8',
						isPad: false
					},
					{
						bin: '',
						dec: null,
						b64: '=',
						isPad: true
					}
				]
			}
		]);
	});
});
