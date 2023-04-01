<script lang="ts">
	import CopyColorString from '$lib/components/ColorPicker/ColorLabel/CopyColorString.svelte';
	import EditColorString from '$lib/components/ColorPicker/ColorLabel/EditColorString.svelte';
	import { getColorPickerStore } from '$lib/context';
	import { copyToClipboard } from '$lib/util';
	import { onDestroy } from 'svelte';

	export let pickerId: string;
	let currentColor: string;
	let state = getColorPickerStore(pickerId);
	let timeout: NodeJS.Timeout;

	$: inactiveStyle = 'background-color: var(--white3); color: var(--input-text-color);';
	$: copiedStyle = 'background-color: var(--light-gray2)';
	$: editStyle = 'background-color: var(--button-bg-color); color: var(--button-fg-color)';
	$: successStyle = 'background-color: var(--white3); color: var(--green2)';
	$: errorStyle = 'background-color: var(--white3); color: var(--red2)';
	$: style =
		$state?.labelState === 'copied'
			? copiedStyle
			: $state?.labelState === 'edit'
			? editStyle
			: $state?.labelState === 'success'
			? successStyle
			: $state?.labelState === 'error'
			? errorStyle
			: inactiveStyle;

	async function handleCopyButtonClicked(colorString: string) {
		await copyToClipboard(colorString);
		clearTimeout(timeout);
		$state.labelState = 'copied';
		timeout = setTimeout(() => ($state.labelState = 'inactive'), 500);
	}

	function handleEditButtonClicked() {
		if ($state.editable) {
			$state.labelState = 'edit';
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<div class:edit-mode={$state?.labelState === 'edit'} class="color-label" {style}>
	{#if $state?.labelState === 'edit'}
		<EditColorString value={currentColor} on:updateColor on:keepCurrentColor={() => ($state.labelState = 'inactive')} />
	{:else}
		<CopyColorString
			color={$state?.color}
			alphaEnabled={$state.alphaEnabled}
			editable={$state?.editable}
			bind:currentColor
			on:copyColorString={(e) => handleCopyButtonClicked(e.detail)}
			on:editColorString={() => handleEditButtonClicked()}
		/>
	{/if}
</div>

<style lang="postcss">
	.color-label {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.75rem;
		border: 1px solid var(--fg-color, --light-gray2);
		border-radius: 6px;
		transition: background-color, color 350ms ease-out;
		width: 230px;
		padding: 6px 9px;
		height: 30px;
	}

	.color-label.edit-mode {
		display: grid;
		grid-template-columns: 6px auto 6px 1fr 6px auto 6px;
		gap: 0;
		padding: 6px 0;
	}
</style>
