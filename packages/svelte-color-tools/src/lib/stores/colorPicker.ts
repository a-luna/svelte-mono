import type { ColorPickerState, ColorPickerStore } from '$lib/types';
import { ColorParser, defaultCssColor, getX11ColorPalettes, type ColorFormat, type CssColor } from '@a-luna/shared-ui';
import { getColorFormatFromCssString } from '@a-luna/shared-ui/color/parsers';
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

	function parseColor(css: string, state: ColorPickerState): ColorPickerState {
		const result = ColorParser.parse(css);
		if (result.success && result.value) {
			const color = result.value;
			state = setColor(color, _getColorFormatFromStringValue(css, state), state);
			state.labelState = 'success';
		} else {
			state.labelState = 'error';
		}
		return state;
	}

	function _getColorFormatFromStringValue(css: string, state: ColorPickerState): ColorFormat {
		const colorFormat = getColorFormatFromCssString(css);
		if (!colorFormat) return state.colorFormat;
		if (colorFormat === 'hex') return 'rgb';
		return colorFormat;
	}

	function setColor(color: CssColor, colorFormat: ColorFormat, state: ColorPickerState): ColorPickerState {
		state.color = color;
		state.colorSpace = color.space;
		state.colorInGamut = color.space === 'srgb' ? color.srbgColor : color.p3Color;
		state = _updateColorFormat(color, colorFormat, state);
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
		parseColor: (css: string) => update((state) => parseColor(css, state)),
		setColor: (color: CssColor, colorFormat: ColorFormat) => update((state) => setColor(color, colorFormat, state)),
		setColorFormat: (colorFormat: ColorFormat) => update((state) => setColorFormat(colorFormat, state)),
	};
}
