<script lang="ts">
	import CopyButton from '$lib/components/Icons/CopyButton.svelte';
	import EditButton from '$lib/components/Icons/EditButton.svelte';
	import type { CssColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: CssColor;
	export let alphaEnabled: boolean;
	let currentLabelIndex = 0;
	const dispatch = createEventDispatcher();

	$: colorLabels = [color?.hex, color?.rgbString, color?.hslString];
	$: currentColor = colorLabels[currentLabelIndex];
	$: currentColorSpace = alphaEnabled
		? ['Hex', 'RGBA', 'HSLA'][currentLabelIndex]
		: ['Hex', 'RGB', 'HSL'][currentLabelIndex];
	$: tooltip = alphaEnabled
		? 'Click to toggle Hex, RGBA, and HSLA string values'
		: 'Click to toggle Hex, RGB, and HSL string values';

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
	class="cursor-pointer flex-grow text-center text-sm font-medium leading-none whitespace-nowrap"
	title={tooltip}
	data-testid="color-string"
	on:click={() => toggleColorLabel()}>{currentColor}</span
>
<div
	id="edit-color-button"
	data-testid="edit-color-button"
	class="flex-initial h-4 w-4 my-auto cursor-pointer"
	title="Edit string value"
	on:click={() => dispatch('editColorString')}
>
	<EditButton />
</div>
