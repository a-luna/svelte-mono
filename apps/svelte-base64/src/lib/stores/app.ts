import type { AppState, AppStore, Base64Encoding, ButtonSize, Encoding, OutputChunk } from '$lib/types';
import { hexStringFromByteArray } from '$lib/util';
import type { ButtonColor } from '@a-luna/shared-ui';
import type { Readable, Writable } from 'svelte/store';
import { derived } from 'svelte/store';

export function createAppStore(state: AppState, pageWidth: Writable<number>): Readable<AppStore> {
	return derived([state, pageWidth], ([$state, $pageWidth]) => {
		const encoderMode = (): boolean => $state.mode === 'encode';
		const decoderMode = (): boolean => $state.mode === 'decode';

		const isMobileDisplay = (): boolean => $pageWidth < 540;
		const isDefaultDisplay = (): boolean => $pageWidth < 365;

		const inputStringIsValid = (): boolean =>
			encoderMode() ? $state.encoderInput.validationResult.success : $state.decoderInput.validationResult.success;

		const getInputHexBytes = (): string => hexStringFromByteArray($state.encoderInput.bytes, true, ' ');
		const getOutputHexBytes = (): string => hexStringFromByteArray($state.decoderOutput.bytes, true, ' ');

		const getInputText = (): string =>
			encoderMode()
				? $state.encoderInput.inputEncoding === 'ascii' || $state.encoderInput.inputEncoding === 'utf8'
					? $state.encoderInput.inputText
					: getInputHexBytes()
				: $state.decoderInput.inputText;

		const getOutputText = (): string =>
			encoderMode()
				? $state.encoderInput.inputText
					? $state.encoderOutput.output
					: ''
				: $state.decoderInput.inputText
					? $state.decoderOutput.outputEncoding === 'ascii' || $state.decoderOutput.outputEncoding === 'utf8'
						? $state.decoderOutput.output
						: getOutputHexBytes()
					: '';

		const getTotalBytesIn = (): number => (encoderMode() ? $state.encoderInput.bytes.length : 0);

		const getTotalBytesOut = (): number =>
			encoderMode()
				? $state.encoderInput.inputText
					? $state.encoderOutput.bytes.length
					: 0
				: $state.decoderInput.inputText
					? $state.decoderOutput.bytes.length
					: 0;

		const getInputEncoding = (): Encoding =>
			encoderMode() ? $state.encoderInput.inputEncoding : $state.decoderInput.inputEncoding;

		const getOutputEncoding = (): Encoding =>
			encoderMode() ? $state.encoderInput.outputEncoding : $state.decoderOutput.outputEncoding;

		const isAscii = (): boolean =>
			encoderMode()
				? $state.encoderInput.inputText
					? $state.encoderOutput.inputEncoding === 'ascii' || $state.encoderOutput.inputEncoding === 'utf8'
					: false
				: $state.decoderInput.inputText
					? $state.decoderOutput.outputEncoding === 'ascii' || $state.decoderOutput.outputEncoding === 'utf8'
					: false;

		const getBase64Encoding = (): Base64Encoding =>
			encoderMode()
				? $state.encoderInput.inputText
					? $state.encoderOutput.outputEncoding
					: 'base64'
				: $state.decoderInput.inputText
					? $state.decoderOutput.inputEncoding
					: 'base64';

		const getOutputChunks = (): OutputChunk[] =>
			encoderMode()
				? $state.encoderInput.inputText
					? $state.encoderOutput.chunks
					: []
				: $state.decoderInput.inputText
					? $state.decoderOutput.chunks
					: [];

		const getErrorMessage = (): string =>
			encoderMode()
				? $state.encoderInput.validationResult?.error?.message ?? ''
				: $state.decoderInput.validationResult?.error?.message ?? '';

		const getSwitchModeButtonColor = (): ButtonColor => (encoderMode() ? 'teal' : 'green');
		const getButtonColor = (): ButtonColor => (inputStringIsValid() ? (encoderMode() ? 'teal' : 'green') : 'red');
		const getButtonSize = (): ButtonSize => (isMobileDisplay() ? 'sm' : 'xs');

		return {
			encoderMode: encoderMode(),
			decoderMode: decoderMode(),
			isMobileDisplay: isMobileDisplay(),
			isDefaultDisplay: isDefaultDisplay(),
			inputText: getInputText(),
			outputText: getOutputText(),
			totalBytesIn: getTotalBytesIn(),
			totalBytesOut: getTotalBytesOut(),
			inputEncoding: getInputEncoding(),
			outputEncoding: getOutputEncoding(),
			isAscii: isAscii(),
			base64Encoding: getBase64Encoding(),
			chunks: getOutputChunks(),
			errorMessage: getErrorMessage(),
			formTitle: encoderMode() ? 'Base64 Encoder' : 'Base64 Decoder',
			switchModeButtonColor: getSwitchModeButtonColor(),
			inputStringIsValid: inputStringIsValid(),
			buttonSize: getButtonSize(),
			buttonColor: getButtonColor(),
			buttonLabel: encoderMode() ? 'Encode' : 'Decode',
		};
	});
}
