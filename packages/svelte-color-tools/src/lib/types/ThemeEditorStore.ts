import type { CssColor, ThemeColor } from '@a-luna/shared-ui';
import type { Writable } from 'svelte/store';
import type { ThemeEditorState } from './';

export interface ThemeEditorStore {
	set: Writable<ThemeEditorState>['set'];
	subscribe: Writable<ThemeEditorState>['subscribe'];
	createNewPalette: () => void;
	deletePalette: (id: string) => void;
	changeSelectedPalette: (id: string) => void;
	changeSelectedColor: (color: ThemeColor) => void;
	updateThemeColor: (color: CssColor) => void;
	deselectColor: () => void;
	addColorToPalette: (color: ThemeColor) => void;
	deleteColorFromPalette: (color: ThemeColor) => void;
}
