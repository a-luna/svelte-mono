<script lang="ts">
	import ColorPalettes from '$lib/components/Shared/Palettes/ColorPalettes.svelte';
	import InitializeUserTheme from '$lib/components/ThemeEditor/UserTheme/InitializeUserTheme/InitializeUserTheme.svelte';
	import PaletteEditor from '$lib/components/ThemeEditor/UserTheme/PaletteEditor/PaletteEditor.svelte';
	import ThemeName from '$lib/components/ThemeEditor/UserTheme/ThemeName.svelte';
	import UserThemeControls from '$lib/components/ThemeEditor/UserTheme/UserThemeControls/UserThemeControls.svelte';
	import { getAppStore, getThemeEditorStore } from '$lib/context';
	import type { ColorFormat, ColorPalette, ComponentColor } from '$lib/types';

	export let editorId: string;
	export let componentColor: ComponentColor;
	export let colorFormat: ColorFormat;
	export let initialized = false;
	export let themeColorPalettes: ColorPalette[];
	export let x11PalettesShown: boolean;
	let state = getThemeEditorStore(editorId);
	let app = getAppStore(editorId);
</script>

{#if !initialized}
	<InitializeUserTheme on:importUserTheme on:newUserTheme />
{:else}
	<div class="user-theme">
		<UserThemeControls
			{editorId}
			{componentColor}
			{themeColorPalettes}
			{x11PalettesShown}
			on:importUserTheme
			on:newUserTheme
			on:editThemeSettings
			on:saveUserTheme
			on:exportUserTheme
			on:closeUserTheme
		/>
		{#if !$state.editMode}
			<ThemeName themeName={$state?.userTheme?.themeName} {componentColor} />
		{/if}
		{#if $state.editMode}
			<PaletteEditor {editorId} color={'teal'} on:deletePalette on:createPalette />
		{:else}
			<ColorPalettes
				{colorFormat}
				palettes={$state?.userTheme?.palettes}
				allowMultiplePalettesOpen={false}
				displayColorName={true}
				columns={1}
				on:paletteSelected
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
		gap: 1rem;
	}
</style>
