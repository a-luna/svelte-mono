<script lang="ts">
	import InitializeUserTheme from '$lib/components/ComponentEditor/UserTheme/InitializeUserTheme/InitializeUserTheme.svelte';
	import PaletteEditor from '$lib/components/ComponentEditor/UserTheme/PaletteEditor/PaletteEditor.svelte';
	import ThemeName from '$lib/components/ComponentEditor/UserTheme/ThemeName.svelte';
	import UserThemeControls from '$lib/components/ComponentEditor/UserTheme/UserThemeControls/UserThemeControls.svelte';
	import ColorPalettes from '$lib/components/Shared/Palettes/ColorPalettes.svelte';
	import { getAppContext } from '$lib/context';
	import type { ColorPalette } from '@a-luna/shared-ui';

	export let initialized = false;
	export let themeColorPalettes: ColorPalette[];
	export let x11PalettesShown: boolean;
	let { themeEditor } = getAppContext();
</script>

{#if !initialized}
	<InitializeUserTheme on:importUserTheme on:newUserTheme />
{:else}
	<div class="user-theme">
		<UserThemeControls
			{themeColorPalettes}
			{x11PalettesShown}
			on:importUserTheme
			on:newUserTheme
			on:editThemeSettings
			on:saveUserTheme
			on:exportUserTheme
			on:closeUserTheme
		/>
		{#if !$themeEditor.editMode}
			<ThemeName themeName={$themeEditor?.userTheme?.themeName} />
		{/if}
		{#if $themeEditor.editMode}
			<PaletteEditor on:deletePalette on:createPalette />
		{:else}
			<ColorPalettes
				palettes={$themeEditor?.userTheme?.palettes}
				allowMultiplePalettesOpen={false}
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
