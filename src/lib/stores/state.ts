import { Base64Decoder, Base64Encoder } from '$lib/base64';
import { defaultDecoderInput, defaultDecoderOutput, defaultEncoderInput, defaultEncoderOutput } from '$lib/constants';
import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
import type { AppSettings, AppState, Base64Encoding, DecoderInput, EncoderInput, Encoding } from '$lib/types';
import { writable } from 'svelte/store';

export const defaultSettings = {
	decoderInput: defaultDecoderInput,
	decoderOutput: defaultDecoderOutput,
	encoderInput: defaultEncoderInput,
	encoderOutput: defaultEncoderOutput
};

function createAppStateStore(): AppState {
	const { set, subscribe, update } = writable<AppSettings>({
		mode: 'encode',
		highlightHexByte: null,
		highlightBase64: '',
		highlightHexBitGroup: '',
		highlightB64BitGroup: '',
		...defaultSettings
	});
	const encoder = new Base64Encoder();
	const decoder = new Base64Decoder();

	function changeInputText(input: string, settings: AppSettings) {
		if (settings.mode === 'encode') {
			settings.encoderInput.inputText = input;
		} else {
			settings.decoderInput.inputText = input;
		}
		return validateInput(settings);
	}

	function changeInputEncoding(encoding: Encoding, settings: AppSettings) {
		if (settings.mode === 'encode' && isStringEncoding(encoding)) {
			settings.encoderInput.inputEncoding = encoding;
		} else if (settings.mode === 'decode' && isBase64Encoding(encoding)) {
			settings.decoderInput.inputEncoding = encoding;
		}
		return validateInput(settings);
	}

	function changeOutputEncoding(encoding: Base64Encoding, settings: AppSettings) {
		if (settings.mode === 'encode') {
			settings.encoderInput.outputEncoding = encoding;
		}
		return validateInput(settings);
	}

	const validateEncoderInput = (settings: AppSettings): EncoderInput =>
		encoder.validateInput(
			settings.encoderInput.inputText,
			settings.encoderInput.inputEncoding,
			settings.encoderInput.outputEncoding
		);
	const validateDecoderInput = (settings: AppSettings): DecoderInput =>
		decoder.validateInput(settings.decoderInput.inputText, settings.decoderInput.inputEncoding);

	function validateInput(settings: AppSettings) {
		if (settings.mode === 'encode') {
			settings.encoderInput = settings.encoderInput.inputText
				? validateEncoderInput(settings)
				: { validationResult: { success: true }, ...settings.encoderInput };
		} else {
			settings.decoderInput = settings.decoderInput.inputText
				? validateDecoderInput(settings)
				: { validationResult: { success: true }, ...settings.decoderInput };
		}
		return settings;
	}

	function execute(settings: AppSettings) {
		if (settings.mode === 'encode' && settings.encoderInput.validationResult.success) {
			settings.encoderOutput = encoder.encode(settings.encoderInput);
		} else if (settings.mode === 'decode' && settings.decoderInput.validationResult.success) {
			settings.decoderOutput = decoder.decode(settings.decoderInput);
		}
		return settings;
	}

	const reset = (settings: AppSettings): AppSettings => ({
		mode: 'encode',
		highlightHexByte: null,
		highlightBase64: '',
		highlightHexBitGroup: '',
		highlightB64BitGroup: '',
		...defaultSettings
	});

	return {
		set,
		subscribe,
		setInputText: (input: string) => update((settings) => changeInputText(input, settings)),
		setInputEncoding: (encoding: Encoding) => update((settings) => changeInputEncoding(encoding, settings)),
		setOutputEncoding: (encoding: Base64Encoding) => update((settings) => changeOutputEncoding(encoding, settings)),
		validateInput: () => update((settings) => validateInput(settings)),
		execute: () => update((settings) => execute(settings)),
		reset: () => update((settings) => reset(settings))
	};
}

export const state = createAppStateStore();
