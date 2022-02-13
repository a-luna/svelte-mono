import type { AppMode, DecoderInput, DecoderOutput, EncoderInput, EncoderOutput } from '.';

export interface AppSettings {
	mode: AppMode;
	highlightHexByte: number;
	highlightBase64: string;
	highlightHexBitGroup: string;
	highlightB64BitGroup: string;
	decoderInput: DecoderInput;
	decoderOutput: DecoderOutput;
	encoderInput: EncoderInput;
	encoderOutput: EncoderOutput;
}
