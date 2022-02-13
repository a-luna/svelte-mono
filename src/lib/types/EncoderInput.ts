import type { Base64Encoding, EncoderInputChunk, Result, StringEncoding } from '.';

export interface EncoderInput {
	inputText: string;
	inputEncoding: StringEncoding;
	outputEncoding: Base64Encoding;
	validationResult: Result<string>;
	bytes?: number[];
	hex?: string;
	ascii?: string;
	binary?: string;
	totalChunks?: number;
	lastChunkPadded?: boolean;
	padLength?: number;
	chunks?: EncoderInputChunk[];
}
