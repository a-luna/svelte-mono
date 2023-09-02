import { convertThemePalettesToCss } from '$lib/theme';
import type { AppStore, ColorPickerStore, ThemeEditorStore } from '$lib/types';
import { defaultColorPalette, type ColorFormat, type ColorPalette, type ColorSpace } from '@a-luna/shared-ui';
import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';

export function createAppStore(themeEditor: ThemeEditorStore, picker: ColorPickerStore): Readable<AppStore> {
	return derived([themeEditor, picker], ([$themeEditor, $picker]) => {
		const getThemePalette = (): ColorPalette =>
			$themeEditor && $themeEditor.userTheme
				? $themeEditor.userTheme.palettes.find((p) => p.id === $themeEditor.selectedPaletteId) ?? defaultColorPalette
				: defaultColorPalette;

		const getCurrentColorSpace = (): ColorSpace => ($themeEditor.selectedColor.color.space === 'srgb' ? 'srgb' : 'p3');

		const getCurrentColorFormat = (): ColorFormat =>
			!$themeEditor.selectedColor
				? 'oklch'
				: $themeEditor.selectedColor.color.space === 'srgb'
				? $themeEditor.userTheme.colorFormatSrgb
				: $themeEditor.userTheme.colorFormatP3;

		return {
			x11PalettesShown: $picker?.x11PalettesShown,
			themeColorPalettes: $themeEditor?.userTheme?.palettes,
			selectedThemePalette: getThemePalette(),
			themeCurrentColor: $themeEditor?.selectedColor,
			currentColorInGamut: $themeEditor?.selectedColor?.colorInGamut,
			currentColorSpace: getCurrentColorSpace(),
			currentColorFormat: getCurrentColorFormat(),
			componentStyles: convertThemePalettesToCss($themeEditor?.userTheme),
		};
	});
}
