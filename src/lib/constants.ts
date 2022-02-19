import type { DecoderInput, DecoderOutput, EncoderInput, EncoderOutput } from './types';

export const B64_ALPHABET_COMMON = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const BIN_TO_HEX = {
	'0000': '0',
	'0001': '1',
	'0010': '2',
	'0011': '3',
	'0100': '4',
	'0101': '5',
	'0110': '6',
	'0111': '7',
	'1000': '8',
	'1001': '9',
	'1010': 'A',
	'1011': 'B',
	'1100': 'C',
	'1101': 'D',
	'1110': 'E',
	'1111': 'F'
};

export const defaultDecoderInput: DecoderInput = {
	inputText: '',
	inputEncoding: 'base64',
	validationResult: { success: false },
	base64: '',
	binary: '',
	totalChunks: 0,
	lastChunkPadded: false,
	padLength: 0,
	chunks: []
};

export const defaultDecoderOutput: DecoderOutput = {
	input: '',
	inputEncoding: 'base64',
	output: '',
	bytes: [],
	outputEncoding: 'ASCII',
	chunks: []
};

export const defaultEncoderInput: EncoderInput = {
	inputText: '',
	inputEncoding: 'ASCII',
	outputEncoding: 'base64url',
	validationResult: { success: true },
	bytes: [],
	hex: '',
	ascii: '',
	binary: '',
	totalChunks: 0,
	lastChunkPadded: false,
	padLength: 0,
	chunks: []
};

export const defaultEncoderOutput: EncoderOutput = {
	input: '',
	inputEncoding: 'ASCII',
	isASCII: true,
	output: '',
	bytes: [],
	outputEncoding: 'base64',
	chunks: []
};
