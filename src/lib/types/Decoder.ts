import type { Base64Encoding, DecoderInput, DecoderOutput } from '.';

export interface Decoder {
	validateInput: (input: string, base64Encoding: Base64Encoding) => DecoderInput;
	decode: (inupt: DecoderInput) => DecoderOutput;
}
