<script lang="ts">
	import CloseUserThemeButton from '$lib/components/ThemeEditor/UserTheme/UserThemeControls/CloseUserThemeButton.svelte';
	import EditPalettesButton from '$lib/components/ThemeEditor/UserTheme/UserThemeControls/EditPalettesButton.svelte';
	import EditSettingsButton from '$lib/components/ThemeEditor/UserTheme/UserThemeControls/EditSettingsButton.svelte';
	import ExportUserThemeButton from '$lib/components/ThemeEditor/UserTheme/UserThemeControls/ExportUserThemeButton.svelte';
	import FinishEditingButton from '$lib/components/ThemeEditor/UserTheme/UserThemeControls/FinishEditingButton.svelte';
	import SaveUserThemeButton from '$lib/components/ThemeEditor/UserTheme/UserThemeControls/SaveUserThemeButton.svelte';
	import { getAppStore, getThemeEditorStore } from '$lib/context';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let editorId: string;
	export let componentColor: ComponentColor;
	export let themeColorPalettes: ColorPalette[];
	export let x11PalettesShown: boolean;
	let app = getAppStore(editorId);
	let state = getThemeEditorStore(editorId);
	const dispatch = createEventDispatcher();

	$: disabled = !themeColorPalettes.length || $state.editMode || x11PalettesShown;
</script>

<div class="user-theme-controls">
	<div class="buttons-left">
		{#if $state.editMode}
			<FinishEditingButton color={componentColor} on:click={() => ($state.editMode = false)} />
		{:else}
			<EditPalettesButton color={componentColor} on:click={() => ($state.editMode = true)} {disabled} />
		{/if}
		<EditSettingsButton color={componentColor} {disabled} on:click={() => dispatch('editThemeSettings')} />
		<SaveUserThemeButton color={componentColor} {disabled} on:click={() => dispatch('saveUserTheme')} />
		<ExportUserThemeButton color={componentColor} {disabled} on:click={() => dispatch('exportUserTheme')} />
	</div>
	<div class="buttons-right">
		<CloseUserThemeButton color={componentColor} {disabled} on:click={() => dispatch('closeUserTheme')} />
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
