import type { Base64Encoding, EncodingOutput, StringEncoding, IResult } from '.';

export interface Encoder {
	validateInput: (input: string, encoding: StringEncoding) => IResult<boolean> | IResult;
	encode: (input: string, stringEncoding: StringEncoding, b64Encoding: Base64Encoding) => EncodingOutput;
}
