import { defaultColorPalette } from '$lib/constants';
import { convertThemePalettesToCss } from '$lib/theme';
import type { AppStore, ColorPalette, ColorPickerState, ThemeEditorStore } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived } from 'svelte/store';

export function createAppStore(
	themeEditorState: ThemeEditorStore,
	colorPickerState: Writable<ColorPickerState>,
): Readable<AppStore> {
	return derived([themeEditorState, colorPickerState], ([$themeEditorState, $colorPickerState]) => {
		const getThemePalette = (): ColorPalette =>
			$themeEditorState && $themeEditorState.userTheme
				? $themeEditorState.userTheme.palettes.find((p) => p.id === $themeEditorState.selectedPaletteId) ??
				  defaultColorPalette
				: defaultColorPalette;

		return {
			x11PalettesShown: $colorPickerState?.x11PalettesShown,
			themeColorPalettes: $themeEditorState?.userTheme?.palettes,
			selectedThemePalette: getThemePalette(),
			themeCurrentColor: $themeEditorState?.selectedColor,
			themeColorHasAlpha: $themeEditorState?.selectedColor?.color?.hasAlpha,
			pickerColorHasAlpha: $colorPickerState?.alphaEnabled,
			componentStyles: convertThemePalettesToCss($themeEditorState?.userTheme),
		};
	});
}
