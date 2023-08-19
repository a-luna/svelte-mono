<script lang="ts">
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { getThemeEditorStore } from '$lib/context';
	import { defaultCssColor } from '@a-luna/shared-ui';
	import { parseCssColor } from '@a-luna/shared-ui/color/parsers';
	import { addStringValuesToCssColor, clampColorComponents } from '@a-luna/shared-ui/color/util';

	export let editorId: string;
	let state = getThemeEditorStore(editorId);
	let bgColor: string;
	let displayName: string;
	let tooltip: string;

	$: bgColor = $state.colorSelected ? 'var(--white4)' : 'var(--white1)';
	$: swatchColor = $state.colorSelected
		? $state.selectedColor.color
		: clampColorComponents(addStringValuesToCssColor(parseCssColor('hsl(0, 0%, 85%)') ?? defaultCssColor));
	$: displayName = $state.colorSelected ? $state.selectedColor.displayName ?? '' : '';
	$: tooltip = $state.colorSelected
		? `${$state.selectedColor.displayName} is the selected palette`
		: 'No Theme Color Selected';
</script>

<div class="option-wrapper" title={tooltip} style="background-color: {bgColor}">
	{#if $state.colorSelected}
		<div class="swatch-border">
			<ColorSwatch color={swatchColor} />
		</div>
	{/if}
	<span>{displayName}</span>
</div>

<style lang="postcss">
	.option-wrapper {
		flex: 0 1 auto;
		display: grid;
		grid-template-columns: 1fr auto 8px 200px 1fr;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		border: 1px solid var(--black1);
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
