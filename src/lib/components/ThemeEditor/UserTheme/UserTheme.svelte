<script lang="ts">
	import ColorPalettes from '$lib/components/Shared/Palettes/ColorPalettes.svelte';
	import InitializeUserTheme from '$lib/components/ThemeEditor/UserTheme/InitializeUserTheme/InitializeUserTheme.svelte';
	import PaletteEditor from '$lib/components/ThemeEditor/UserTheme/PaletteEditor/PaletteEditor.svelte';
	import ThemeName from '$lib/components/ThemeEditor/UserTheme/ThemeName.svelte';
	import UserThemeControls from '$lib/components/ThemeEditor/UserTheme/UserThemeControls/UserThemeControls.svelte';
	import { getAppStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';

	export let editorId: string;
	export let componentColor: ComponentColor;
	let app = getAppStore(editorId);
</script>

{#if !$app?.themeEditorState?.userTheme.themeName}
	<InitializeUserTheme on:importUserTheme on:newUserTheme />
{:else}
	<div class="user-theme">
		<UserThemeControls
			{editorId}
			{componentColor}
			on:importUserTheme
			on:newUserTheme
			on:editThemeSettings
			on:saveUserTheme
			on:closeUserTheme
		/>
		{#if !$app.themeEditorState.editMode}
			<ThemeName
				bind:editMode={$app.themeEditorState.editMode}
				themeName={$app.themeEditorState.userTheme.themeName}
				{componentColor}
			/>
		{/if}
		{#if $app.themeEditorState.editMode}
			<PaletteEditor
				bind:themeColorPalettes={$app.themeEditorState.userTheme.palettes}
				color={'teal'}
				on:deletePalette
				on:createPalette
			/>
		{:else}
			<ColorPalettes
				alphaEnabled={$app.themeEditorState.alphaEnabled}
				bind:selectedPaletteId={$app.themeEditorState.selectedPaletteId}
				palettes={$app.themeColorPalettes}
				allowMultiplePalettesOpen={false}
				displayColorName={true}
				columns={1}
				on:colorSelected
				on:editColorDetails
				on:deleteColor
			/>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.user-theme {
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		gap: 0.25rem;
	}
</style>
