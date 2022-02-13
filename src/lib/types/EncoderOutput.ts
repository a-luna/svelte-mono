import type { Base64Encoding, OutputChunk, StringEncoding } from '.';

export interface EncoderOutput {
	input: string;
	inputEncoding: StringEncoding;
	isASCII: boolean;
	output: string;
	bytes: number[];
	outputEncoding: Base64Encoding;
	chunks: OutputChunk[];
}
