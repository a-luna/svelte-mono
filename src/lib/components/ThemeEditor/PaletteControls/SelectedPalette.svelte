<script lang="ts">
	import { getThemeEditorStore } from '$lib/context';

	export let editorId: string;
	const state = getThemeEditorStore(editorId);

	$: bgColor = $state?.selectedPaletteId ? 'var(--white3)' : 'var(--white1)';
	$: swatchColor = $state?.selectedPaletteId ? `var(--${$state?.selectedPalette.componentColor}-fg-color)` : 'inherit';
	$: displayName = $state?.selectedPaletteId ? $state?.selectedPalette.displayName : 'No Palette Selected';
	$: tooltip = $state?.selectedPaletteId
		? `${$state?.selectedPalette.displayName} is the selected palette`
		: 'No Palette Selected';
</script>

<div class="option-wrapper" title={tooltip} style="background-color: {bgColor}">
	<div class="color-swatch" style="background-color: {swatchColor}" />
	<span>{displayName}</span>
</div>

<style lang="postcss">
	.option-wrapper {
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		gap: 0.5rem;
		border: 1px solid var(--black1);
		border-radius: 6px;
	}

	.color-swatch {
		width: 15px;
		height: 15px;
		padding: 3px;
		border: 1px solid var(--black2);
	}
</style>
