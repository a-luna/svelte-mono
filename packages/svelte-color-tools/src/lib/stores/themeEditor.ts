import { defaultThemeEditorState } from '$lib/constants';
import { getColorFormatForColor, getCssValueForThemeColor } from '$lib/theme';
import type { ThemeEditorState, ThemeEditorStore } from '$lib/types';
import { createEmptyColorPalette, type CssColor, type ThemeColor } from '@a-luna/shared-ui';
import { writable } from 'svelte/store';

export function createThemeEditorStore(): ThemeEditorStore {
	const { set, subscribe, update } = writable<ThemeEditorState>(defaultThemeEditorState);

	function createNewPalette(state: ThemeEditorState): ThemeEditorState {
		state.userTheme.palettes = [
			...state.userTheme.palettes,
			createEmptyColorPalette(`palette ${state.userTheme.palettes.length + 1}`),
		];
		return state;
	}

	function deletePalette(e: CustomEvent<{paletteId: string}>, state: ThemeEditorState): ThemeEditorState {
		const { paletteId } = e.detail;
		state.userTheme.palettes = [...state.userTheme.palettes.filter((p) => p.id !== paletteId)];
		if (state.selectedPaletteId === paletteId) {
			state.selectedPaletteId = '';
		}
		return state;
	}

	function changeSelectedPalette(paletteId: string, state: ThemeEditorState): ThemeEditorState {
		if (paletteId) {
			state.selectedPaletteId = paletteId;
			state = _resetAllColorsInPalette(state);
		} else {
			state.selectedPaletteId = '';
		}
		return deselectColor(state);
	}

	function changeSelectedColor(color: ThemeColor, state: ThemeEditorState): ThemeEditorState {
		state = _resetAllColorsInPalette(state);
		state.colorSelected = true;
		state.selectedColor = color;
		state.selectedColor.isSelected = true;
		return state;
	}

	function _resetAllColorsInPalette(state: ThemeEditorState): ThemeEditorState {
		const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
		if (selectedPalette) {
			selectedPalette.colors.forEach((c) => (c.isSelected = false));
			selectedPalette.colors = [...selectedPalette.colors];
			state.userTheme.palettes = [...state.userTheme.palettes];
			selectedPalette.updated = true;
		}
		return state;
	}

	function updateThemeColor(e: CustomEvent<{ color: CssColor }>, state: ThemeEditorState): ThemeEditorState {
		const { color } = e.detail;
		const cssValue = getCssValueForThemeColor(
			state.selectedColor,
			getColorFormatForColor(state.selectedColor.color, state.userTheme),
		);
		color.name = state.selectedColor.displayName ?? cssValue;
		state.selectedColor.color = color;
		state.selectedColor.colorSpace = color.space;
		state.selectedColor.colorInGamut = color.space === 'srgb' ? color.srbgColor : color.p3Color;
		state.selectedColor.value = cssValue;
		state.selectedColor.isSelected = true;
		return updatePaletteColors(state);
	}

	function deselectColor(state: ThemeEditorState): ThemeEditorState {
		state.colorSelected = false;
		state.selectedColor.isSelected = false;
		return state;
	}

	function addColorToPalette(newColor: ThemeColor, state: ThemeEditorState): ThemeEditorState {
		const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
		if (selectedPalette) {
			selectedPalette.colors = [...selectedPalette.colors, newColor];
		}
		return updatePaletteColors(state);
	}

	function updatePaletteColors(state: ThemeEditorState): ThemeEditorState {
		const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
		if (selectedPalette) {
			selectedPalette.colors = [...selectedPalette.colors];
			state.userTheme.palettes = [...state.userTheme.palettes];
			selectedPalette.updated = true;
		}
		return state;
	}

	function deleteColorFromPalette(color: ThemeColor, state: ThemeEditorState): ThemeEditorState {
		const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
		if (selectedPalette) {
			const removeIndex = selectedPalette.colors.indexOf(color);
			selectedPalette.colors = [
				...selectedPalette.colors.slice(0, removeIndex),
				...selectedPalette.colors.slice(removeIndex + 1),
			];
			state.userTheme.palettes = [...state.userTheme.palettes];
			selectedPalette.updated = true;
		}
		return state;
	}

	return {
		set,
		subscribe,
		createNewPalette: () => update((state) => createNewPalette(state)),
		deletePalette: (e: CustomEvent<{paletteId: string}>) => update((state) => deletePalette(e, state)),
		changeSelectedPalette: (id: string) => update((state) => changeSelectedPalette(id, state)),
		changeSelectedColor: (color: ThemeColor) => update((state) => changeSelectedColor(color, state)),
		updateThemeColor: (e: CustomEvent<{ color: CssColor }>) => update((state) => updateThemeColor(e, state)),
		deselectColor: (_: CustomEvent<null>) => update((state) => deselectColor(state)),
		addColorToPalette: (color: ThemeColor) => update((state) => addColorToPalette(color, state)),
		deleteColorFromPalette: (color: ThemeColor) => update((state) => deleteColorFromPalette(color, state)),
	};
}
