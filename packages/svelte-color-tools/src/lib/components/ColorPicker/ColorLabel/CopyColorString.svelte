<script lang="ts">
	import { getColorPickerStore } from '$lib/context';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import type { ColorFormat, CssColorForColorSpace } from '@a-luna/shared-ui/types';
	import { createEventDispatcher } from 'svelte';

	export let pickerId: string;
	export let color: CssColorForColorSpace;
	export let editable: boolean;
	export let currentColor = '';
	let picker = getColorPickerStore(pickerId);
	let currentLabelIndex = 0;
	const editColorStringEventDispatcher = createEventDispatcher<{ editColorString: {} }>();
	const copyColorStringEventDispatcher = createEventDispatcher<{ copyColorString: { currentColor: string } }>();

	export function setColorFormat(colorFormat: ColorFormat) {
		currentLabelIndex = getColorFormatIndex(colorFormat);
	}

	$: colorLabels = [
		color.hex,
		color.rgbString,
		color.hslString,
		color.okhslString,
		color.labString,
		color.lchString,
		color.oklabString,
		color.oklchString,
	];
	$: currentColor = colorLabels.at(currentLabelIndex) || color.hex;
	$: currentColorFormat = ['Hex', 'RGB', 'HSL', 'OKHSK', 'LAB', 'LCH', 'OKLAB', 'OKLCH'][currentLabelIndex];
	$: tooltip = 'Click to toggle CSS Color Space string values';
	$: fontSize =
		currentColorFormat === 'RGB' || currentColorFormat === 'Hex'
			? '0.8rem'
			: currentColorFormat === 'OKLAB' || currentColorFormat === 'OKLCH'
			? '0.6rem'
			: '0.65rem';
	$: if ($picker.labelState === 'success') {
		setColorFormat($picker.colorFormat);
	}

	function getColorFormatIndex(colorFormat: ColorFormat): number {
		const colorLabelMap = new Map<ColorFormat, number>();
		colorLabelMap.set('hex', 0);
		colorLabelMap.set('rgb', 1);
		colorLabelMap.set('hsl', 2);
		colorLabelMap.set('okhsl', 3);
		colorLabelMap.set('lab', 4);
		colorLabelMap.set('lch', 5);
		colorLabelMap.set('oklab', 6);
		colorLabelMap.set('oklch', 7);
		return colorLabelMap.get(colorFormat) ?? 0;
	}

	function toggleColorLabel() {
		currentLabelIndex += 1;
		if (currentLabelIndex === colorLabels.length) {
			currentLabelIndex = 0;
		}
	}

	function handleEditColorStringButton() {
		if (editable) {
			editColorStringEventDispatcher('editColorString');
		}
	}
</script>

<button
	type="button"
	id="copy-color-string-button"
	data-testid="copy-color-string-button"
	class="flex-initial h-4 w-4 my-auto cursor-pointer"
	title="Copy {currentColorFormat} value"
	on:click={() => copyColorStringEventDispatcher('copyColorString', { currentColor })}
>
	<BasicIconRenderer icon={'copy'} width={'16px'} height={'16px'} />
</button>
<span
	class="color-string"
	style="font-size: {fontSize}"
	title={tooltip}
	data-testid="color-string"
	on:click={() => toggleColorLabel()}>{currentColor}</span
>
<button
	type="button"
	id="edit-color-string-button"
	data-testid="edit-color-string-button"
	class="flex-initial h-4 w-4 my-auto"
	class:cursor-pointer={editable}
	class:cursor-not-allowed={!editable}
	title="Edit string value"
	on:click={() => handleEditColorStringButton()}
>
	<BasicIconRenderer icon={'edit'} width={'16px'} height={'16px'} />
</button>

<style lang="postcss">
	button {
		background-color: transparent;
		border: none;
	}
	.color-string {
		flex-grow: 1;
		align-self: center;
		font-weight: 500;
		line-height: 1;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		cursor: pointer;
	}
</style>
