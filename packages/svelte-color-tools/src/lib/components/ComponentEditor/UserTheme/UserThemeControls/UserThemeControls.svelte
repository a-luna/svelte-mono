<script lang="ts">
	import CloseUserThemeButton from '$lib/components/ComponentEditor/UserTheme/UserThemeControls/CloseUserThemeButton.svelte';
	import EditPalettesButton from '$lib/components/ComponentEditor/UserTheme/UserThemeControls/EditPalettesButton.svelte';
	import EditSettingsButton from '$lib/components/ComponentEditor/UserTheme/UserThemeControls/EditSettingsButton.svelte';
	import ExportUserThemeButton from '$lib/components/ComponentEditor/UserTheme/UserThemeControls/ExportUserThemeButton.svelte';
	import FinishEditingButton from '$lib/components/ComponentEditor/UserTheme/UserThemeControls/FinishEditingButton.svelte';
	import SaveUserThemeButton from '$lib/components/ComponentEditor/UserTheme/UserThemeControls/SaveUserThemeButton.svelte';
	import { getAppContext } from '$lib/stores';
	import type { ColorPalette } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	export let themeColorPalettes: ColorPalette[];
	export let x11PalettesShown: boolean;
	let { themeEditor } = getAppContext();
	const dispatch = createEventDispatcher();

	$: disabled = !themeColorPalettes.length || $themeEditor.editMode || x11PalettesShown;
</script>

<div class="user-theme-controls">
	<div class="buttons-left">
		{#if $themeEditor.editMode}
			<FinishEditingButton on:click={() => ($themeEditor.editMode = false)} />
		{:else}
			<EditPalettesButton on:click={() => ($themeEditor.editMode = true)} {disabled} />
		{/if}
		<EditSettingsButton {disabled} on:click={() => dispatch('editThemeSettings')} />
		<SaveUserThemeButton {disabled} on:click={() => dispatch('saveUserTheme')} />
		<ExportUserThemeButton {disabled} on:click={() => dispatch('exportUserTheme')} />
	</div>
	<div class="buttons-right">
		<CloseUserThemeButton {disabled} on:click={() => dispatch('closeUserTheme')} />
	</div>
</div>

<style lang="postcss">
	.user-theme-controls {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.25rem;
	}
	.buttons-left,
	.buttons-right {
		display: flex;
		gap: 0.25rem;
	}
	.buttons-left {
		grid-column: 1 / span 1;
	}
	.buttons-right {
		grid-column: 3 / span 1;
	}
</style>
