import { getX11ColorPalettes } from '$lib/color';
import { defaultCssColor } from '$lib/constants';
import { ColorParser } from '$lib/parser';
import type { ColorPickerState } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function createColorPickerStore(pickerId: string): Writable<ColorPickerState> {
	return writable<ColorPickerState>({
		pickerId,
		color: ColorParser.parse('rgb(128 128 128)')?.value ?? defaultCssColor,
		x11PalettesShown: false,
		x11ColorPalettes: getX11ColorPalettes(),
		colorSpace: 'rgb',
		labelState: 'prerender',
		editable: true,
		alphaEnabled: false,
	});
}
