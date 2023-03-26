import { createAppStore } from '$lib/stores/app';
import type { AppStore, ColorPickerState, ThemeEditorStore } from '$lib/types';
import { getContext, setContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';
import { get } from 'svelte/store';

function setService<T>(key: string, service: T): T {
	setContext(key, service);
	return service;
}

function getService<T>(key: string): () => T {
	return () => getContext(key);
}

export function initThemeEditorStore(themeEditor: ThemeEditorStore): ThemeEditorStore {
	return setService<ThemeEditorStore>(get(themeEditor).editorId, themeEditor);
}

export const getThemeEditorStore = (editorId: string): ThemeEditorStore => getService<ThemeEditorStore>(editorId)();

export function initColorPickerStore(colorPicker: Writable<ColorPickerState>): Writable<ColorPickerState> {
	return setService<Writable<ColorPickerState>>(get(colorPicker).pickerId, colorPicker);
}

export const getColorPickerStore = (pickerId: string): Writable<ColorPickerState> =>
	getService<Writable<ColorPickerState>>(pickerId)();

export function initAppStore(
	themeEditorState: ThemeEditorStore,
	colorPickerState: Writable<ColorPickerState>,
): Readable<AppStore> {
	const key = `${get(themeEditorState).editorId}-app`;
	const app = createAppStore(themeEditorState, colorPickerState);
	return setService<Readable<AppStore>>(key, app);
}

export const getAppStore = (editorId: string): Readable<AppStore> =>
	getService<Readable<AppStore>>(`${editorId}-app`)();
