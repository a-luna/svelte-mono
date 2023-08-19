import type { ColorPickerState } from '$lib/types';
import { ColorParser, defaultCssColor, getX11ColorPalettes } from '@a-luna/shared-ui';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function createColorPickerStore(pickerId: string): Writable<ColorPickerState> {
	const result = ColorParser.parse('rgb(128 128 128)');
	const color = result.success ? result.value : defaultCssColor;
	return writable<ColorPickerState>({
		pickerId,
		color,
		x11PalettesShown: false,
		x11ColorPalettes: getX11ColorPalettes(),
		colorSpace: 'rgb',
		labelState: 'prerender',
		editable: true,
		alphaEnabled: false,
	});
}
