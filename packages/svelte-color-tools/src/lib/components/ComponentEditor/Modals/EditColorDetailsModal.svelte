<script lang="ts">
	import { getThemeEditorStore } from '$lib/context';
	import { copyThemeColor } from '$lib/theme';
	import type { ThemeColorShallowCopy } from '$lib/types';
	import { Modal, type ThemeColor } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import ColorSettings from './ColorSettings.svelte';

	export let editorId: string;
	let color: ThemeColor;
	let originalColor: ThemeColorShallowCopy;
	let modal: Modal;
	let closed: boolean;
	let propName: string;
	let value: string;
	let cssVarName: string;
	let displayName: string;
	let disableSaveButton = false;
	let state = getThemeEditorStore(editorId);
	const dispatch = createEventDispatcher();

	export function openModal(editColor: ThemeColor) {
		if (closed) {
			propName = editColor?.propName ?? '';
			value = editColor?.value ?? '';
			cssVarName = editColor?.cssVarName ?? '';
			displayName = editColor?.displayName ?? '';
			color = editColor;
			originalColor = copyThemeColor(editColor);
			toggleModal();
		}
	}

	export function toggleModal() {
		modal.toggleModal();
		$state.modalOpen = !$state.modalOpen;
	}
	function saveChanges() {
		color.propName = propName;
		color.cssVarName = cssVarName;
		color.displayName = displayName;
		color.color.name = displayName;
		color.value = value;
		propName = '';
		cssVarName = '';
		displayName = '';
		dispatch('colorDetailsChanged');
		toggleModal();
	}
	function discardChanges() {
		color.propName = originalColor.propName;
		color.cssVarName = originalColor.cssVarName;
		color.displayName = originalColor.displayName;
		color.color.name = originalColor.displayName ?? '';
		color.value = originalColor.value;
		propName = '';
		cssVarName = '';
		displayName = '';
		toggleModal();
	}

	function submitForm() {
		if (!disableSaveButton) {
			saveChanges();
		}
	}
</script>

<Modal
	bind:this={modal}
	bind:closed
	title={'Edit Color Details'}
	{disableSaveButton}
	on:discardChanges={() => discardChanges()}
	on:saveChanges={() => saveChanges()}
>
	<div class="color-details">
		<ColorSettings
			{editorId}
			bind:propName
			bind:propValue={value}
			bind:displayName
			bind:cssVarNameFinal={cssVarName}
			bind:validationError={disableSaveButton}
			on:submit={() => submitForm()}
		/>
	</div>
</Modal>

<style lang="postcss">
	.color-details {
		--input-text-font-size: 0.9rem;

		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(4, auto);
		row-gap: 0.5rem;
		column-gap: 1rem;
		align-items: center;
	}
</style>
