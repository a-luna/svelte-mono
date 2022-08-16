<script lang="ts">
	import Modal from '$lib/components/Shared/Modal.svelte';
	import { getAppStore } from '$lib/context';
	import { copyThemeColor } from '$lib/themes';
	import type { ThemeColor, ThemeColorShallowCopy } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let editorId: string;
	let color: ThemeColor;
	let originalColor: ThemeColorShallowCopy;
	let modal: Modal;
	let closed: boolean;
	let propName: string;
	let value: string;
	let cssVarName: string;
	let displayName: string;
	let app = getAppStore(editorId);
	const dispatch = createEventDispatcher();

	export function toggleModal(editColor: ThemeColor) {
		if (closed) {
			propName = editColor?.propName;
			value = editColor?.value;
			cssVarName = editColor?.cssVarName;
			displayName = editColor?.displayName;
			color = editColor;
			originalColor = copyThemeColor(editColor);
		}
		modal.toggleModal();
		$app.themeEditorState.modalOpen = !$app.themeEditorState.modalOpen;
	}
	function saveChanges() {
		color.propName = propName;
		color.cssVarName = cssVarName;
		color.displayName = displayName;
		propName = '';
		cssVarName = '';
		displayName = '';
		modal.toggleModal();
		dispatch('colorDetailsChanged');
	}
	function discardChanges() {
		color.propName = originalColor.propName;
		color.cssVarName = originalColor.cssVarName;
		color.displayName = originalColor.displayName;
		propName = '';
		cssVarName = '';
		displayName = '';
		modal.toggleModal();
	}
</script>

<Modal
	bind:this={modal}
	bind:closed
	title={'Edit Color Details'}
	on:discardChanges={() => discardChanges()}
	on:saveChanges={() => saveChanges()}
>
	<div class="color-details">
		<label for="color-prop-name">JSON Property Name</label>
		<input type="text" id="color-prop-name" name="color-prop-name" bind:value={propName} />
		<label for="css-var-name">CSS Variable Name</label>
		<input type="text" id="css-var-name" name="css-var-name" bind:value={cssVarName} />
		<label for="display-name">Display Name</label>
		<input type="text" id="display-name" name="display-name" bind:value={displayName} />
		<label for="color-prop-value">CSS/JSON Value</label>
		<input type="text" readonly id="color-prop-value" name="color-prop-value" {value} />
	</div>
</Modal>

<style lang="postcss">
	.color-details {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(4, auto);
		row-gap: 0.5rem;
		column-gap: 1rem;
		align-items: center;
	}
	label {
		font-weight: 500;
		text-align: right;
	}
	input {
		padding: 0.25rem;
		border-radius: 6px;
	}
	input[readonly] {
		pointer-events: none;
		background-color: var(--modal-body-bg-color);
	}
</style>
