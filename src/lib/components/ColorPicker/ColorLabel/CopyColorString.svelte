<script lang="ts">
	import CopyButton from '$lib/components/Icons/CopyButton.svelte';
	import Edit from '$lib/components/Icons/Edit.svelte';
	import type { CssColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: CssColor;
	export let alphaEnabled: boolean;
	export let editable: boolean;
	let currentLabelIndex = 0;
	const dispatch = createEventDispatcher();

	$: colorLabels = alphaEnabled
		? [color?.hexAlpha, color?.rgbaString, color?.hslaString]
		: [color?.hex, color?.rgbString, color?.hslString];
	$: currentColor = colorLabels[currentLabelIndex];
	$: currentColorSpace = alphaEnabled
		? ['Hex', 'RGBA', 'HSLA'][currentLabelIndex]
		: ['Hex', 'RGB', 'HSL'][currentLabelIndex];
	$: tooltip = alphaEnabled
		? 'Click to toggle Hex, RGBA, and HSLA string values'
		: 'Click to toggle Hex, RGB, and HSL string values';
	$: fontSizeAlpha = currentColorSpace === 'HSLA' ? '0.75rem' : '0.8rem';
	$: fontSizeOpaque = currentColorSpace === 'HSL' ? '0.825rem' : '0.85rem';
	$: fontSize = alphaEnabled ? fontSizeAlpha : fontSizeOpaque;

	function toggleColorLabel() {
		currentLabelIndex += 1;
		if (currentLabelIndex === colorLabels.length) {
			currentLabelIndex = 0;
		}
	}
</script>

<div
	id="copy-color-button"
	data-testid="copy-color-button"
	class="flex-initial h-4 w-4 my-auto cursor-pointer"
	title="Copy {currentColorSpace} value"
	on:click={() => dispatch('copyColorString', currentColor)}
>
	<CopyButton />
</div>
<span
	class="cursor-pointer flex-grow text-center self-center font-medium leading-none whitespace-nowrap"
	style="font-size: {fontSize}"
	title={tooltip}
	data-testid="color-string"
	on:click={() => toggleColorLabel()}>{currentColor}</span
>
<div
	id="edit-color-button"
	data-testid="edit-color-button"
	class="flex-initial h-4 w-4 my-auto"
	class:cursor-pointer={!alphaEnabled && editable}
	class:cursor-not-allowed={alphaEnabled || !editable}
	title="Edit string value"
	on:click={() => dispatch('editColorString')}
>
	<Edit />
</div>
