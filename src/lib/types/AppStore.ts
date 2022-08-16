import type { Writable } from 'svelte/store';
import type { ColorPalette, ColorPickerState, CssColor, ThemeColor, ThemeEditorState, ThemeEditorStore } from '.';

export interface AppStore {
	themeEditorState: ThemeEditorState;
	themeEditorStore: ThemeEditorStore;
	colorPickerState: ColorPickerState;
	colorPickerStore: Writable<ColorPickerState>;
	themeColorPalettes: ColorPalette[];
	selectedThemePalette: ColorPalette;
	themeCurrentColor: ThemeColor;
	themeColorHasAlpha: boolean;
	pickerCurrentColor: CssColor;
	pickerColorHasAlpha: boolean;
	componentStyles: string;
}
