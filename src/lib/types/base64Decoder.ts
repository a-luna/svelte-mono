import type { Base64Encoding, DecodingOutput, Result } from '.';

export interface Decoder {
	validateInput: (input: string, encoding: Base64Encoding) => Result;
	decode: (encodedText: string, base64Encoding: Base64Encoding) => DecodingOutput;
}
