import type { Base64Encoding, OutputChunk, StringEncoding } from '.';

export interface EncodingOutput {
	input: string;
	inputEncoding: StringEncoding;
	isASCII: boolean;
	output: string;
	outputEncoding: Base64Encoding;
	chunks: OutputChunk[];
}
