import { convertThemePalettesToCss } from '$lib/themes';
import type { AppStore, ColorPalette, ColorPickerState, ThemeEditorStore } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived } from 'svelte/store';

export function createAppStore(
	themeEditorState: ThemeEditorStore,
	colorPickerState: Writable<ColorPickerState>,
): Readable<AppStore> {
	return derived([themeEditorState, colorPickerState], ([$themeEditorState, $colorPickerState]) => {
		const getThemePalette = (): ColorPalette =>
			$themeEditorState.userTheme.palettes.find((p) => p.id === $themeEditorState.selectedPaletteId);

		return {
			themeEditorStore: themeEditorState,
			themeEditorState: $themeEditorState,
			colorPickerStore: colorPickerState,
			colorPickerState: $colorPickerState,
			themeColorPalettes: $themeEditorState.userTheme.palettes,
			selectedThemePalette: getThemePalette(),
			themeCurrentColor: $themeEditorState.selectedColor,
			themeColorHasAlpha: $themeEditorState.selectedColor.color.hasAlpha,
			pickerCurrentColor: $colorPickerState.color,
			pickerColorHasAlpha: $colorPickerState.color.hasAlpha,
			componentStyles: convertThemePalettesToCss($themeEditorState.userTheme),
		};
	});
}
