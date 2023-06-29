import type { Base64Encoding, EncoderInput, EncoderOutput, StringEncoding } from '.';

export interface Encoder {
	validateInput: (input: string, stringEncoding: StringEncoding, base64Encoding: Base64Encoding) => EncoderInput;
	encode: (input: EncoderInput) => EncoderOutput;
}
