import { convertThemePalettesToCss } from '$lib/themes';
import type { AppStore, ColorPalette, ColorPickerState, ThemeEditorStore } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived } from 'svelte/store';

export function createAppStore(
	themeEditorState: ThemeEditorStore,
	colorPickerState: Writable<ColorPickerState>,
): Readable<AppStore> {
	return derived([themeEditorState, colorPickerState], ([$themeEditorState, $colorPickerState]) => {
		function getThemePalette(): ColorPalette {
			if ($themeEditorState && $themeEditorState.userTheme) {
				return $themeEditorState.userTheme.palettes.find((p) => p.id === $themeEditorState.selectedPaletteId);
			}
		}

		return {
			x11PalettesShown: $colorPickerState?.x11PalettesShown,
			themeColorPalettes: $themeEditorState?.userTheme?.palettes,
			selectedThemePalette: getThemePalette(),
			themeCurrentColor: $themeEditorState?.selectedColor,
			themeColorHasAlpha: $themeEditorState?.selectedColor?.color?.hasAlpha,
			pickerCurrentColor: $colorPickerState?.color,
			pickerColorHasAlpha: $colorPickerState?.alphaEnabled,
			componentStyles: convertThemePalettesToCss($themeEditorState?.userTheme),
		};
	});
}
