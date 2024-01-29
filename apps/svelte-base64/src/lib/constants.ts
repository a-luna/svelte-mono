import type {
	Base64ByteMap,
	DecoderInput,
	DecoderInputChunk,
	DecoderOutput,
	EncoderInput,
	EncoderInputChunk,
	EncoderOutput,
	HexByteMap,
	OutputChunk,
	Utf8ComplexCharacterMap,
	Utf8StandardCharacterMap,
	Utf8StringComposition,
} from '$lib/types';

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT'] as const;

export const APP_MODES = ['encode', 'decode'] as const;
export const BASE64_ENCODINGS = ['base64', 'base64url'] as const;
export const TEXT_ENCODINGS = ['ascii', 'utf8'] as const;
export const DATA_ENCODINGS = ['hex', 'bin'] as const;
export const B64_ALPHABET_COMMON = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg'] as const;

export const BUTTON_COLORS = [
	'pri',
	'sec',
	'red',
	'pink',
	'orange',
	'teal',
	'green',
	'blue',
	'gray',
	'yellow',
	'indigo',
] as const;

export const BIN_TO_HEX: { [index: string]: string } = {
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
	'1111': 'F',
};

export const rotatingColors = [
	'--red4',
	'--green3',
	'--orange3',
	'--teal4',
	'--orange-yellow3',
	'--purple3',
	'--green4',
	'--yellow3',
	'--pink4',
	'--yellow-green3',
	'--blue-green4',
];

export const defaultBase64ByteMap: Base64ByteMap = {
	bin: '',
	dec: 0,
	b64: '',
	isPad: false,
	groupId: '',
	bitGroups: [
		{
			groupId: '',
			bits: '',
		},
	],
};

export const defaultDecoderInputChunk: DecoderInputChunk = {
	base64: '',
	binary: '',
	encoding: 'base64',
	isPadded: false,
	padLength: 0,
	inputMap: [defaultBase64ByteMap],
};

export const defaultHexByteMap: HexByteMap = {
	byte: 0,
	bin_word1: '',
	bin_word2: '',
	hex_word1: '',
	hex_word2: '',
	ascii: '',
	char: '',
	isWhiteSpace: false,
	groupId: '',
	bitGroups: [
		{
			groupId: '',
			bits: '',
		},
	],
	characterId: '',
};

export const defaultEncoderInputChunk: EncoderInputChunk = {
	bytes: [],
	encoding: 'ascii',
	hex: '',
	hexBytes: [],
	ascii: '',
	binary: '',
	isPadded: false,
	padLength: 0,
	inputMap: [defaultHexByteMap],
};

export const defaultOutputChunk: OutputChunk = {
	base64: '',
	binary: '',
	ascii: '',
	hex: '',
	hexBytes: [],
	bytes: [],
	isASCII: true,
	hexMap: [defaultHexByteMap],
	base64Map: [defaultBase64ByteMap],
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
	chunks: [defaultDecoderInputChunk],
};

export const defaultDecoderOutput: DecoderOutput = {
	input: '',
	inputEncoding: 'base64',
	output: '',
	bytes: [],
	outputEncoding: 'ascii',
	chunks: [defaultOutputChunk],
};

export const defaultUtf8StandardCharacterMap: Utf8StandardCharacterMap = {
	char: '',
	isCombined: false,
	isASCII: false,
	hexBytes: [],
	bytes: [],
	codepoint: '',
	unicodeName: '',
	unicodeBlock: '',
	totalBytes: 0,
	encoded: '',
	hexMap: [defaultHexByteMap],
};

export const defaultUtf8ComplexCharacterMap: Utf8ComplexCharacterMap = {
	char: '',
	isCombined: false,
	isASCII: false,
	hexBytes: [],
	bytes: [],
	codepoints: [],
	unicodeNames: [],
	unicodeBlocks: [],
	totalBytes: 0,
	encoded: '',
	charMap: [defaultUtf8StandardCharacterMap],
	hexMap: [defaultHexByteMap],
};

export const defaultUtf8StringComposition: Utf8StringComposition = {
	utf8: '',
	hasCharacterNames: false,
	hasCombinedChars: false,
	stringLength: 0,
	encoded: '',
	totalBytes: 0,
	hexBytes: [],
	hexMap: [defaultHexByteMap],
	bytes: [],
	charMap: [defaultUtf8ComplexCharacterMap],
};

export const defaultEncoderInput: EncoderInput = {
	inputText: '',
	inputEncoding: 'utf8',
	outputEncoding: 'base64',
	validationResult: { success: true },
	bytes: [],
	hexBytes: [],
	hex: '',
	ascii: '',
	utf8: defaultUtf8StringComposition,
	binary: '',
	totalChunks: 0,
	lastChunkPadded: false,
	padLength: 0,
	chunks: [defaultEncoderInputChunk],
};

export const defaultEncoderOutput: EncoderOutput = {
	input: '',
	inputEncoding: 'ascii',
	isASCII: true,
	output: '',
	bytes: [],
	outputEncoding: 'base64',
	chunks: [defaultOutputChunk],
};
