import { createEmptyColorPalette } from '$lib/color';
import { defaultThemeEditorState } from '$lib/constants';
import type { ThemeColor, ThemeEditorState, ThemeEditorStore } from '$lib/types';
import { writable } from 'svelte/store';

const getDefaultEditorState = (editorId: string): ThemeEditorState => ({ ...defaultThemeEditorState, editorId });

export function createThemeEditorStore(editorId: string): ThemeEditorStore {
	const { set, subscribe, update } = writable<ThemeEditorState>(getDefaultEditorState(editorId));

	function createNewPalette(state: ThemeEditorState): ThemeEditorState {
		state.userTheme.palettes = [
			...state.userTheme.palettes,
			createEmptyColorPalette(`palette ${state.userTheme.palettes.length + 1}`),
		];
		return state;
	}

	function deletePalette(paletteId: string, state: ThemeEditorState): ThemeEditorState {
		state.userTheme.palettes = [...state.userTheme.palettes.filter((p) => p.id !== paletteId)];
		if (state.selectedPaletteId === paletteId) {
			state.selectedPaletteId = '';
			state.selectedPalette = null;
		}
		return state;
	}

	function changeSelectedPalette(paletteId: string, state: ThemeEditorState): ThemeEditorState {
		if (paletteId) {
			state.selectedPaletteId = paletteId;
			const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
			if (selectedPalette) {
				state.selectedPalette = selectedPalette;
				state.selectedPalette.colors = [...selectedPalette.colors];
				state.userTheme.palettes = [...state.userTheme.palettes];
				state.selectedPalette.updated = true;
			}
		} else {
			state.selectedPalette = null;
		}
		return state;
	}

	function addColorToPalette(newColor: ThemeColor, state: ThemeEditorState): ThemeEditorState {
		state.selectedPalette.colors = [...state.selectedPalette.colors, newColor];
		state.userTheme.palettes = [...state.userTheme.palettes];
		state.selectedPalette.updated = true;
		return state;
	}

	function deleteColorFromPalette(color: ThemeColor, state: ThemeEditorState): ThemeEditorState {
		const removeIndex = state.selectedPalette.colors.indexOf(color);
		state.selectedPalette.colors = [
			...state.selectedPalette.colors.slice(0, removeIndex),
			...state.selectedPalette.colors.slice(removeIndex + 1),
		];
		state.userTheme.palettes = [...state.userTheme.palettes];
		state.selectedPalette.updated = true;
		return state;
	}

	return {
		set,
		subscribe,
		createNewPalette: () => update((state) => createNewPalette(state)),
		deletePalette: (id: string) => update((state) => deletePalette(id, state)),
		changeSelectedPalette: (id: string) => update((state) => changeSelectedPalette(id, state)),
		addColorToPalette: (color: ThemeColor) => update((state) => addColorToPalette(color, state)),
		deleteColorFromPalette: (color: ThemeColor) => update((state) => deleteColorFromPalette(color, state)),
	};
}
