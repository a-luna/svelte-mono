import { state } from '$lib/stores/state';
import type { AppState, AppStore, Base64Encoding, ButtonColor, Encoding, OutputChunk } from '$lib/types';
import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';

function createAppStore(state: AppState): Readable<AppStore> {
	return derived([state], ([$state]) => {
		const encoderMode = (): boolean => $state.mode === 'encode';
		const decoderMode = (): boolean => $state.mode === 'decode';

		const inputStringIsValid = (): boolean =>
			encoderMode() ? $state.encoderInput.validationResult.success : $state.decoderInput.validationResult.success;

		const getInputHexBytes = (): string =>
			$state.encoderInput.bytes.map((byte) => byte.toString(16).toUpperCase().padStart(2, '0')).join(' ');

		const getOutputHexBytes = (): string =>
			$state.decoderOutput.bytes.map((byte) => byte.toString(16).toUpperCase().padStart(2, '0')).join(' ');

		const getInputText = (): string =>
			encoderMode()
				? $state.encoderInput.inputEncoding === 'ASCII'
					? $state.encoderInput.inputText
					: getInputHexBytes()
				: $state.decoderInput.inputText;

		const getOutputText = (): string =>
			encoderMode()
				? $state.encoderOutput.output
				: $state.decoderOutput.outputEncoding === 'ASCII'
				? $state.decoderOutput.output
				: getOutputHexBytes();

		const getTotalBytesIn = (): number => (encoderMode() ? $state.encoderInput.bytes.length : 0);

		const getTotalBytesOut = (): number =>
			encoderMode() ? $state.encoderOutput.bytes.length : $state.decoderOutput.bytes.length;

		const getInputEncoding = (): Encoding =>
			encoderMode() ? $state.encoderInput.inputEncoding : $state.decoderInput.inputEncoding;

		const getOutputEncoding = (): Encoding =>
			encoderMode() ? $state.encoderInput.outputEncoding : $state.decoderOutput.outputEncoding;

		const isAscii = (): boolean =>
			encoderMode() ? $state.encoderInput.inputEncoding === 'ASCII' : $state.decoderOutput.outputEncoding === 'ASCII';

		const getBase64Encoding = (): Base64Encoding =>
			encoderMode() ? $state.encoderOutput.outputEncoding : $state.decoderOutput.inputEncoding;

		const getOutputChunks = (): OutputChunk[] =>
			encoderMode() ? $state.encoderOutput.chunks : $state.decoderOutput.chunks;

		const getErrorMessage = (): string =>
			encoderMode()
				? $state.encoderInput.validationResult?.error?.message
				: $state.decoderInput.validationResult?.error?.message;

		const getSwitchModeButtonColor = (): ButtonColor => (encoderMode() ? 'teal' : 'green');
		const getButtonColor = (): ButtonColor => (inputStringIsValid() ? (encoderMode() ? 'teal' : 'green') : 'red');

		return {
			encoderMode: encoderMode(),
			decoderMode: decoderMode(),
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
			buttonColor: getButtonColor(),
			buttonLabel: encoderMode() ? 'Encode' : 'Decode',
			b64AlphabetDetail: getBase64Encoding() == 'base64' ? 'Standard' : 'URL and Filename safe'
		};
	});
}

export const app = createAppStore(state);
