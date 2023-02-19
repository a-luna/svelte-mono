import type { AppMode, DecoderInput, DecoderOutput, EncoderInput, EncoderOutput } from '.';

export interface AppSettings {
	mode: AppMode;
	resetPerformed: boolean;
	highlightHexByte: number;
	highlightBase64: string;
	highlightHexBitGroup: string;
	highlightBase64BitGroup: string;
	decoderInput: DecoderInput;
	decoderOutput: DecoderOutput;
	encoderInput: EncoderInput;
	encoderOutput: EncoderOutput;
}
