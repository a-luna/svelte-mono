<script lang="ts">
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { getAppContext } from '$lib/stores';
	import { defaultCssColorForColorSpace } from '@a-luna/shared-ui';

	let { themeEditor } = getAppContext();
	let displayName: string;
	let tooltip: string;

	$: swatchColor = $themeEditor.colorSelected ? $themeEditor.selectedColor.colorInGamut : defaultCssColorForColorSpace;
	$: displayName = $themeEditor.colorSelected ? $themeEditor.selectedColor.displayName ?? '' : '';
	$: tooltip = $themeEditor.colorSelected
		? `${$themeEditor.selectedColor.displayName} is the selected palette`
		: 'No Theme Color Selected';
</script>

<div class="option-wrapper" title={tooltip}>
	{#if $themeEditor.colorSelected}
		<div class="swatch-border">
			<ColorSwatch variant={'small'} color={swatchColor} />
		</div>
	{/if}
	<span>{displayName}</span>
</div>

<style lang="postcss">
	.option-wrapper {
		flex: 0 1 auto;
		display: grid;
		background-color: var(--active-bg-color);
		grid-template-columns: 1fr auto 8px 200px 1fr;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		border: 1px solid var(--fg-color);
		border-radius: 6px;

		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
	}

	.swatch-border {
		--swatch-width: 15px;
		--swatch-height: 15px;
		--swatch-border-radius: 0;

		border: 2px inset var(--color-swatch-button-border-color);
		grid-column: 2 / span 1;
	}

	span {
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		grid-column: 4 / span 1;
	}
</style>
