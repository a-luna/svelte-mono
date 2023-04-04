<script lang="ts">
	import Copy from '$lib/components/Icons/Copy.svelte';
	import Edit from '$lib/components/Icons/Edit.svelte';
	import type { CssColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: CssColor;
	export let alphaEnabled: boolean;
	export let editable: boolean;
	export let currentColor = '';
	let currentLabelIndex = 0;
	const dispatch = createEventDispatcher();

	$: colorLabels = alphaEnabled
		? [color?.hexAlpha, color?.rgbaString, color?.hslaString]
		: [color?.hex, color?.rgbString, color?.hslString];
	$: currentColor = colorLabels.at(currentLabelIndex) || color.hex;
	$: currentColorSpace = alphaEnabled
		? ['Hex', 'RGBA', 'HSLA'][currentLabelIndex]
		: ['Hex', 'RGB', 'HSL'][currentLabelIndex];
	$: tooltip = alphaEnabled
		? 'Click to toggle Hex, RGBA, and HSLA string values'
		: 'Click to toggle Hex, RGB, and HSL string values';
	$: fontSizeAlpha = currentColorSpace === 'HSLA' ? '0.7rem' : '0.8rem';
	$: fontSizeOpaque = currentColorSpace === 'HSL' ? '0.825rem' : '0.85rem';
	$: fontSize = alphaEnabled ? fontSizeAlpha : fontSizeOpaque;

	function toggleColorLabel() {
		currentLabelIndex += 1;
		if (currentLabelIndex === colorLabels.length) {
			currentLabelIndex = 0;
		}
	}

	function handleEditColorStringButton() {
		if (editable) {
			dispatch('editColorString');
		}
	}
</script>

<button
	type="button"
	id="copy-color-string-button"
	data-testid="copy-color-string-button"
	class="flex-initial h-4 w-4 my-auto cursor-pointer"
	title="Copy {currentColorSpace} value"
	on:click={() => dispatch('copyColorString', currentColor)}
>
	<Copy />
</button>
<span
	class="cursor-pointer flex-grow text-center self-center font-medium leading-none whitespace-nowrap"
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
	<Edit />
</button>

<style lang="postcss">
	button {
		background-color: transparent;
		border: none;
	}
</style>
