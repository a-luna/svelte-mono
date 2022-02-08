import type { Base64Encoding, EncodingOutput, Result, StringEncoding } from '.';

export interface Encoder {
	validateInput: (input: string, encoding: StringEncoding) => Result;
	encode: (input: string, stringEncoding: StringEncoding, b64Encoding: Base64Encoding) => EncodingOutput;
}
