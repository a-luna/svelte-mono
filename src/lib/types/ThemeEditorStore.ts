import type { Writable } from 'svelte/store';
import type { ThemeColor, ThemeEditorState } from './';

export interface ThemeEditorStore {
	set: Writable<ThemeEditorState>['set'];
	subscribe: Writable<ThemeEditorState>['subscribe'];
	createNewPalette: () => void;
	deletePalette: (id: string) => void;
	changeSelectedPalette: (id: string) => void;
	addColorToPalette: (color: ThemeColor) => void;
	deleteColorFromPalette: (color: ThemeColor) => void;
}
