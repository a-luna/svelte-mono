import type { ThemeEditorState } from '$lib/types/';
import type { CssColor, ThemeColor } from '@a-luna/shared-ui';
import type { Writable } from 'svelte/store';

export interface ThemeEditorStore {
	set: Writable<ThemeEditorState>['set'];
	subscribe: Writable<ThemeEditorState>['subscribe'];
	createNewPalette: (e: CustomEvent<null>) => void;
	deletePalette: (e: CustomEvent<{paletteId: string}>) => void;
	changeSelectedPalette: (id: string) => void;
	changeSelectedColor: (color: ThemeColor) => void;
	updateThemeColor: (e: CustomEvent<{ color: CssColor }>) => void;
	deselectColor: (e: CustomEvent<null>) => void;
	addColorToPalette: (color: ThemeColor) => void;
	deleteColorFromPalette: (color: ThemeColor) => void;
}
