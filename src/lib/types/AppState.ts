import type { Writable } from 'svelte/store';
import type { AppMode, AppSettings, Base64Encoding, Encoding } from '.';

export interface AppState {
	set: Writable<AppSettings>['set'];
	subscribe: Writable<AppSettings>['subscribe'];
	changeMode: (mode: AppMode) => void;
	setInputText: (input: string) => void;
	setInputEncoding: (encoding: Encoding) => void;
	setOutputEncoding: (encoding: Base64Encoding) => void;
	validateInput: () => void;
	execute: () => void;
	reset: () => void;
}
