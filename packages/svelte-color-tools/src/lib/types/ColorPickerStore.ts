import type { ColorFormat, CssColor } from '@a-luna/shared-ui';
import type { Writable } from 'svelte/store';
import type { ColorPickerState } from './ColorPickerState';

export interface ColorPickerStore {
	set: Writable<ColorPickerState>['set'];
	subscribe: Writable<ColorPickerState>['subscribe'];
	update: Writable<ColorPickerState>['update'];
	setColor: (color: CssColor, colorFormat: ColorFormat) => void;
	setColorFormat: (colorFormat: ColorFormat) => void;
}
