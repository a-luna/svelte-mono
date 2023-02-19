import type { StateValue } from 'xstate';

export interface DemoStore {
	dev: boolean;
	test: boolean;
	prod: boolean;
	pageWidth: number;
	errorOccurred: boolean;
	machineState: StateValue;
	machineSubState: StateValue;
	startedSubProcess: boolean;
	isMobileDisplay: boolean;
	validInputEncodings: string[];
	showInputBytes: boolean;
	showInputChunks: boolean;
	showOutputChunks: boolean;
	showOutputBytePlaceholders: boolean;
	showOutputBytes: boolean;
	showAsciiTable: boolean;
	showBase64Table: boolean;
	getUtf8StringDecomposition: boolean;
}
