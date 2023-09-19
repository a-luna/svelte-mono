<script lang="ts">
	import CopyColorString from '$lib/components/ColorPicker/ColorLabel/CopyColorString.svelte';
	import EditColorString from '$lib/components/ColorPicker/ColorLabel/EditColorString.svelte';
	import { getColorPickerStore } from '$lib/stores';
	import { copyToClipboard } from '$lib/util';
	import type { ColorFormat } from '@a-luna/shared-ui';
	import { onDestroy } from 'svelte';

	export let pickerId: string;
	let currentColor: string;
	let picker = getColorPickerStore(pickerId);
	let timeout: NodeJS.Timeout;
	let copyColorString: CopyColorString;

	export function setColorFormat(colorFormat: ColorFormat) {
		copyColorString.setColorFormat(colorFormat);
	}

	$: inactiveStyle = 'background-color: var(--theme-default-background-color); color: var(--theme-default-text-color);';
	$: copiedStyle = 'background-color: var(--theme-default-background-color-active)';
	$: editStyle =
		'background-color: var(--theme-default-background-color-hover); color: var(--theme-default-text-color)';
	$: successStyle = 'background-color: var(--theme-default-background-color-active); color: var(--green2)';
	$: errorStyle = 'background-color: var(--theme-default-background-color-active); color: var(--red2)';
	$: style =
		$picker?.labelState === 'copied'
			? copiedStyle
			: $picker?.labelState === 'edit'
			? editStyle
			: $picker?.labelState === 'success'
			? successStyle
			: $picker?.labelState === 'error'
			? errorStyle
			: inactiveStyle;

	async function handleCopyButtonClicked(e: CustomEvent<{ currentColor: string }>) {
		const { currentColor } = e.detail;
		await copyToClipboard(currentColor);
		clearTimeout(timeout);
		$picker.labelState = 'copied';
		timeout = setTimeout(() => ($picker.labelState = 'inactive'), 500);
	}

	function handleEditButtonClicked(e: CustomEvent<{}>) {
		if ($picker.editable) {
			$picker.labelState = 'edit';
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<div class:edit-mode={$picker?.labelState === 'edit'} class="color-label" {style}>
	{#if $picker?.labelState === 'edit'}
		<EditColorString
			value={currentColor}
			on:stringValueChanged
			on:keepCurrentColor={() => ($picker.labelState = 'inactive')}
		/>
	{:else}
		<CopyColorString
			{pickerId}
			bind:this={copyColorString}
			color={$picker?.colorInGamut}
			editable={$picker?.editable}
			bind:currentColor
			on:copyColorString={handleCopyButtonClicked}
			on:editColorString={handleEditButtonClicked}
		/>
	{/if}
</div>

<style lang="postcss">
	.color-label {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.25rem;
		border: 1px solid var(--fg-color, --light-gray2);
		border-radius: 6px;
		transition: background-color, color 350ms ease-out;
		width: 245px;
		padding: 6px 9px;
		height: 30px;
	}

	.color-label.edit-mode {
		display: grid;
		grid-template-columns: 6px auto 6px 1fr 6px auto 6px;
		gap: 0;
		padding: 3px 0;
	}
</style>
