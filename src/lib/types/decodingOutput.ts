import type { Base64Encoding, OutputChunk, StringEncoding } from '.';

export interface DecodingOutput {
	input: string;
	inputEncoding: Base64Encoding;
	output: string;
	outputEncoding: StringEncoding;
	chunks: OutputChunk[];
}
