import type { Base64Encoding, DecodingOutput, IResult } from '.';

export interface Decoder {
	validateInput: (input: string, encoding: Base64Encoding) => IResult<boolean> | IResult;
	decode: (encodedText: string, base64Encoding: Base64Encoding) => DecodingOutput;
}
