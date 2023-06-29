import type { Writable } from 'svelte/store';
import type { AppSettings, Base64Encoding, Encoding } from '.';

export interface AppState {
	set: Writable<AppSettings>['set'];
	subscribe: Writable<AppSettings>['subscribe'];
	toggleMode: () => void;
	changeInputText: (input: string) => void;
	changeInputEncoding: (encoding: Encoding) => void;
	changeOutputEncoding: (encoding: Base64Encoding) => void;
	validateInput: () => void;
	execute: () => void;
	reset: () => void;
}
