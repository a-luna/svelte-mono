import { createAppStore } from '$lib/stores/app';
import { createDemoStateStore, demoUIState } from '$lib/stores/demoState';
import { createAppStateStore } from '$lib/stores/state';
import type { AppState, AppStore, DemoState, DemoStore, EncodingMachineStateStore, XStateSendEvent } from '$lib/types';
import { encodingMachine } from '$lib/xstate/b64Encode';
import { getPageWidth } from '@a-luna/shared-ui/stores';
import { useMachine } from '@xstate/svelte';
import { getContext, setContext } from 'svelte';
import { writable, type Readable, type Writable } from 'svelte/store';

export interface SimpleAppContext {
	state: AppState;
	app: Readable<AppStore>;
}

export interface DemoAppContext {
	state: EncodingMachineStateStore;
	demoState: Readable<DemoStore>;
	demoUIState: Writable<DemoState>;
	send: XStateSendEvent;
}

function setService<T>(key: string, service: T): T {
	setContext(key, service);
	return service;
}

function getService<T>(key: string): () => T {
	return () => getContext(key);
}

export function initSimpleAppContext(): SimpleAppContext {
	let pageWidth = writable(0);
	const getPageWidthResult = getPageWidth();
	if (getPageWidthResult.success) {
		pageWidth = getPageWidthResult.value;
	}

	const state = createAppStateStore('encode');
	const app = createAppStore(state, pageWidth);
	return setService<SimpleAppContext>('simple', { state, app });
}

export function getSimpleAppContext(): SimpleAppContext {
	return getService<SimpleAppContext>('simple')();
}

export function initDemoAppContext(): DemoAppContext {
	let pageWidth = writable(0);
	const getPageWidthResult = getPageWidth();
	if (getPageWidthResult.success) {
		pageWidth = getPageWidthResult.value;
	}

	const { state, send } = useMachine(encodingMachine, { devTools: false });
	const demoState = createDemoStateStore(state, pageWidth);
	return setService<DemoAppContext>('demo', { state, demoState, demoUIState, send });
}

export function getDemoAppContext(): DemoAppContext {
	return getService<DemoAppContext>('demo')();
}
