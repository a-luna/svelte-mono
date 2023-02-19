import { createDemoStateStore, demoUIState } from '$lib/stores/demoState';
import type { DemoState, DemoStore, EncodingMachineStateStore, XStateSendEvent } from '$lib/types';
import { createEventLogStore } from '$lib/xstate/b64Encode.test/eventLog';
import type { EventLogStore } from '$lib/xstate/b64Encode.test/types';
import { getContext, setContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';

export interface AppContext {
	state: EncodingMachineStateStore;
	demoState: Readable<DemoStore>;
	demoUIState: Writable<DemoState>;
	eventLog: EventLogStore;
	send: XStateSendEvent;
}

function setService<T>(key: string, service: T): T {
	setContext(key, service);
	return service;
}

function getService<T>(key: string): () => T {
	return () => getContext(key);
}

export function initAppContext(state: EncodingMachineStateStore, send: XStateSendEvent): AppContext {
	const demoState = createDemoStateStore(state);
	const eventLog = createEventLogStore(state);
	return setService<AppContext>('demo', { state, demoState, demoUIState, eventLog, send });
}

export function getAppContext(): AppContext {
	return getService<AppContext>('demo')();
}
