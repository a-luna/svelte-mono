import { writable } from 'svelte/store';
import { Base64Decoder, Base64Encoder } from './base64';
import { isBase64Encoding, isStringEncoding } from './typeguards';
import type { AppSettings, AppState, Base64Encoding, Encoding, StringEncoding } from './types';

const defaultSettings = {
	decoderInput: {
		inputText: '',
		inputEncoding: 'base64' as Base64Encoding,
		validationResult: { success: false },
		base64: '',
		binary: '',
		totalChunks: 0,
		lastChunkPadded: false,
		padLength: 0,
		chunks: []
	},
	decoderOutput: {
		input: '',
		inputEncoding: 'base64' as Base64Encoding,
		output: '',
		bytes: [],
		outputEncoding: 'ASCII' as StringEncoding,
		chunks: []
	},
	encoderInput: {
		inputText: '',
		inputEncoding: 'ASCII' as StringEncoding,
		outputEncoding: 'base64' as Base64Encoding,
		validationResult: { success: false },
		bytes: [],
		hex: '',
		ascii: '',
		binary: '',
		totalChunks: 0,
		lastChunkPadded: false,
		padLength: 0,
		chunks: []
	},
	encoderOutput: {
		input: '',
		inputEncoding: 'ASCII' as StringEncoding,
		isASCII: true,
		output: '',
		bytes: [],
		outputEncoding: 'base64' as Base64Encoding,
		chunks: []
	}
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
			settings.encoderInput.validationResult = { success: false };
		} else {
			settings.decoderInput.inputText = input;
			settings.decoderInput.validationResult = { success: false };
		}
		return settings;
	}

	function changeInputEncoding(encoding: Encoding, settings: AppSettings) {
		if (settings.mode === 'encode' && isStringEncoding(encoding)) {
			settings.encoderInput.inputEncoding = encoding;
			settings.encoderInput.validationResult = { success: false };
		} else if (settings.mode === 'decode' && isBase64Encoding(encoding)) {
			settings.decoderInput.inputEncoding = encoding;
			settings.decoderInput.validationResult = { success: false };
		}
		return settings;
	}

	function changeOutputEncoding(encoding: Base64Encoding, settings: AppSettings) {
		if (settings.mode === 'encode') {
			settings.encoderInput.outputEncoding = encoding;
		}
		return settings;
	}

	function validateInput(settings: AppSettings) {
		if (settings.mode === 'encode') {
			settings.encoderInput = encoder.validateInput(
				settings.encoderInput.inputText,
				settings.encoderInput.inputEncoding,
				settings.encoderInput.outputEncoding
			);
		} else {
			settings.decoderInput = decoder.validateInput(
				settings.decoderInput.inputText,
				settings.decoderInput.inputEncoding
			);
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

	const reset = (settings: AppSettings): AppSettings => ({ ...settings, ...defaultSettings });

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
