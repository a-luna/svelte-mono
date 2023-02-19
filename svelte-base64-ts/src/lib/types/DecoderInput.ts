import type { Base64Encoding, DecoderInputChunk, Result } from '.';

export interface DecoderInput {
	inputText: string;
	inputEncoding: Base64Encoding;
	validationResult: Result;
	base64?: string;
	binary?: string;
	totalChunks?: number;
	lastChunkPadded?: boolean;
	padLength?: number;
	chunks?: DecoderInputChunk[];
}
