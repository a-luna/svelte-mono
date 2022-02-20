import { Base64Decoder, Base64Encoder } from '$lib/base64';
import { defaultDecoderInput, defaultDecoderOutput, defaultEncoderInput, defaultEncoderOutput } from '$lib/constants';
import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
import type { AppMode, AppSettings, AppState, Base64Encoding, DecoderInput, EncoderInput, Encoding } from '$lib/types';
import { writable } from 'svelte/store';

const getDefaultAppSettings = (mode: AppMode, resetPerformed: boolean): AppSettings => ({
	mode,
	resetPerformed,
	highlightHexByte: null,
	highlightBase64: '',
	highlightHexBitGroup: '',
	highlightB64BitGroup: '',
	decoderInput: defaultDecoderInput,
	decoderOutput: defaultDecoderOutput,
	encoderInput: defaultEncoderInput,
	encoderOutput: defaultEncoderOutput
});

function createAppStateStore(mode: AppMode): AppState {
	const { set, subscribe, update } = writable<AppSettings>(getDefaultAppSettings(mode, false));
	const encoder = new Base64Encoder();
	const decoder = new Base64Decoder();
	const reset = (mode: AppMode): AppSettings => getDefaultAppSettings(mode, true);

	function changeInputText(input: string, settings: AppSettings): AppSettings {
		console.log(`### changeInputText(input=${input}) ###`);
		if (settings.mode === 'encode') {
			settings.encoderInput.inputText = input;
			console.log({ encoderInput: settings.encoderInput });
		} else {
			settings.decoderInput.inputText = input;
			console.log({ decoderInput: settings.decoderInput });
		}
		return validateInput(settings);
	}

	function changeInputEncoding(encoding: Encoding, settings: AppSettings): AppSettings {
		console.log(`### changeInputText(encoding=${encoding}) ###`);
		settings = reset(settings.mode);
		if (settings.mode === 'encode' && isStringEncoding(encoding)) {
			settings.encoderInput.inputEncoding = encoding;
			console.log({ encoderInput: settings.encoderInput });
		} else if (settings.mode === 'decode' && isBase64Encoding(encoding)) {
			settings.decoderInput.inputEncoding = encoding;
			console.log({ decoderInput: settings.decoderInput });
		}
		return validateInput(settings);
	}

	function changeOutputEncoding(encoding: Base64Encoding, settings: AppSettings): AppSettings {
		console.log(`### changeOutputEncoding(encoding=${encoding}) ###`);
		settings = reset(settings.mode);
		if (settings.mode === 'encode') {
			settings.encoderInput.outputEncoding = encoding;
			console.log({ encoderInput: settings.encoderInput });
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

	function validateInput(settings: AppSettings): AppSettings {
		console.log(`### validateInput() ###`);
		if (settings.mode === 'encode') {
			const result = validateEncoderInput(settings);
			console.log({ result });
			settings.encoderInput = validateEncoderInput(settings);
			if (!settings.encoderInput.inputText) {
				settings.encoderInput.validationResult = { success: true };
			}
			console.log({ encoderInput: settings.encoderInput });
		} else {
			const result = validateDecoderInput(settings);
			console.log({ result });
			settings.decoderInput = validateDecoderInput(settings);
			if (!settings.decoderInput.inputText) {
				settings.decoderInput.validationResult = { success: true };
			}
			console.log({ decoderInput: settings.decoderInput });
		}
		return settings;
	}

	function execute(settings: AppSettings): AppSettings {
		console.log(`### execute() ###`);
		if (settings.mode === 'encode' && settings.encoderInput.validationResult.success) {
			settings.encoderOutput = encoder.encode(settings.encoderInput);
		} else if (settings.mode === 'decode' && settings.decoderInput.validationResult.success) {
			settings.decoderOutput = decoder.decode(settings.decoderInput);
		}
		return settings;
	}

	return {
		set,
		subscribe,
		changeMode: (mode: AppMode) => update((_) => reset(mode)),
		setInputText: (input: string) => update((settings) => changeInputText(input, settings)),
		setInputEncoding: (encoding: Encoding) => update((settings) => changeInputEncoding(encoding, settings)),
		setOutputEncoding: (encoding: Base64Encoding) => update((settings) => changeOutputEncoding(encoding, settings)),
		validateInput: () => update((settings) => validateInput(settings)),
		execute: () => update((settings) => execute(settings)),
		reset: () => update((settings) => reset('encode'))
	};
}

export const state = createAppStateStore('encode');
