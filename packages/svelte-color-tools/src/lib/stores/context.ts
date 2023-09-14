import { createAppStore } from '$lib/stores/app';
import type { AppStore, ColorPickerStore, ThemeEditorStore } from '$lib/types';
import { getContext, setContext } from 'svelte';
import type { Readable } from 'svelte/store';
import { get } from 'svelte/store';

export interface AppContext {
	picker: ColorPickerStore;
	themeEditor: ThemeEditorStore;
	app: Readable<AppStore>;
}

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

export const getThemeEditorStore = (): ThemeEditorStore => getService<ThemeEditorStore>('theme-editor')();

export function initColorPickerStore(colorPicker: ColorPickerStore): ColorPickerStore {
	return setService<ColorPickerStore>(get(colorPicker).pickerId, colorPicker);
}

export const getColorPickerStore = (pickerId: string): ColorPickerStore => getService<ColorPickerStore>(pickerId)();

export function initAppContext(picker: ColorPickerStore, themeEditor: ThemeEditorStore): AppContext {
	themeEditor = initThemeEditorStore(themeEditor);
	const app = createAppStore(themeEditor, picker);
	return setService<AppContext>('theme-editor', { picker, themeEditor, app });
}
export const getAppContext = (): AppContext => getService<AppContext>('theme-editor')();

export const getAppStore = (): Readable<AppStore> => getService<Readable<AppStore>>('theme-editor')();
