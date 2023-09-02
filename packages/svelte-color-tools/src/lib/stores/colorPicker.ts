import type { ColorPickerState, ColorPickerStore } from '$lib/types';
import { ColorParser, defaultCssColor, getX11ColorPalettes, type ColorFormat, type CssColor } from '@a-luna/shared-ui';
import { writable } from 'svelte/store';

export function createColorPickerStore(pickerId: string): ColorPickerStore {
	const result = ColorParser.parse('rgba(128 128 128 / 0.9)');
	const color = result.success ? result.value : defaultCssColor;
	const { set, subscribe, update } = writable<ColorPickerState>({
		pickerId,
		color,
		x11PalettesShown: false,
		x11ColorPalettes: getX11ColorPalettes(),
		colorSpace: color.space,
		colorFormat: 'rgb',
		colorInGamut: color.srbgColor,
		labelState: 'prerender',
		editable: true,
	});

	function setColor(color: CssColor, colorFormat: ColorFormat, state: ColorPickerState): ColorPickerState {
		state.color = color;
		state.colorSpace = color.space;
		state.colorInGamut = color.space === 'srgb' ? color.srbgColor : color.p3Color;
		state = _updateColorFormat(color, colorFormat, state);
		state.labelState = 'success';
		return state;
	}

	function _updateColorFormat(
		changedColor: CssColor,
		colorFormat: ColorFormat,
		state: ColorPickerState,
	): ColorPickerState {
		if (['hex', 'hsl', 'rgb', 'okhsl'].includes(colorFormat) && changedColor.space === 'p3') {
			state.colorFormat = 'oklch';
		} else {
			state.colorFormat = colorFormat;
		}
		return state;
	}

	function setColorFormat(colorFormat: ColorFormat, state: ColorPickerState): ColorPickerState {
		if (['hex', 'hsl', 'rgb', 'okhsl'].includes(colorFormat)) {
			state.colorSpace = 'srgb';
			state.colorInGamut = state.color.srbgColor;
		}
		if (['lab', 'oklab', 'lch', 'oklch'].includes(colorFormat)) {
			state.colorSpace = state.color.space;
			state.colorInGamut = state.color.space === 'srgb' ? state.color.srbgColor : state.color.p3Color;
		}
		return state;
	}

	return {
		set,
		subscribe,
		update,
		setColor: (color: CssColor, colorFormat: ColorFormat) => update((state) => setColor(color, colorFormat, state)),
		setColorFormat: (colorFormat: ColorFormat) => update((state) => setColorFormat(colorFormat, state)),
	};
}
