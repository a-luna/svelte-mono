import type { Base64Encoding, OutputChunk, StringEncoding } from '.';

export interface DecoderOutput {
	input: string;
	inputEncoding: Base64Encoding;
	output: string;
	bytes: number[];
	outputEncoding: StringEncoding;
	chunks: OutputChunk[];
}
