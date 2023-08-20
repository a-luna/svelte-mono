<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import type { CssColor } from '@a-luna/shared-ui/types';
	import { createEventDispatcher } from 'svelte';

	export let color: CssColor;
	export let editable: boolean;
	export let currentColor = '';
	let currentLabelIndex = 0;
	const editColorStringEventDispatcher = createEventDispatcher<{ editColorString: {} }>();
	const copyColorStringEventDispatcher = createEventDispatcher<{ copyColorString: { currentColor: string } }>();

	$: colorLabels = [
		color.hex,
		color.rgbString,
		color.hslString,
		color.labString,
		color.lchString,
		color.oklabString,
		color.oklchString,
	];
	$: currentColor = colorLabels.at(currentLabelIndex) || color.hex;
	$: currentColorSpace = ['Hex', 'RGB', 'HSL', 'LAB', 'LCH', 'OKLAB', 'OKLCH'][currentLabelIndex];
	$: tooltip = 'Click to toggle CSS Color Space string values';
	$: fontSize =
		currentColorSpace === 'RGB' || currentColorSpace === 'Hex'
			? '0.8rem'
			: currentColorSpace === 'OKLAB' || currentColorSpace === 'OKLCH'
			? '0.6rem'
			: '0.65rem';

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
	title="Copy {currentColorSpace} value"
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
