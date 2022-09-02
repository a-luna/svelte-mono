<script lang="ts">
	import { hslToString } from '$lib/color';
	import ColorSwatches from '$lib/components/Icons/ColorSwatches.svelte';
	import { getColorPickerStore } from '$lib/context';
	import { createEventDispatcher } from 'svelte';

	export let pickerId: string;
	let state = getColorPickerStore(pickerId);
	const dispatch = createEventDispatcher();

	$: alphaBg = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E"); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;`;
	$: swatchBgStyles = $state.alphaEnabled ? alphaBg : 'background-color: inherit';
	$: bgColor = `background-color: ${$state?.color?.hslaString};`;
	$: borderColor = { ...$state?.color?.hsl, l: $state?.color?.hsl.l - 20 };
	$: borderStyles = `border: 2px solid ${hslToString(borderColor)};`;
	$: pointerStyles = $state.editable ? '' : `pointer-events: none`;
	$: tooltip = $state.alphaEnabled
		? 'Color picker does not support RGBA/HSLA color space'
		: 'Click to open color picker';

	function showColorPicker() {
		if (!$state.alphaEnabled && $state.editable) {
			$state.labelState = 'pick';
			dispatch('showColorPicker');
		}
	}
</script>

<div
	class="swatch-wrapper flex-grow"
	class:cursor-pointer={!$state.alphaEnabled && $state?.editable}
	class:cursor-not-allowed={$state.alphaEnabled || !$state?.editable}
	style="width: 104px; height: 104px; {borderStyles} {pointerStyles}"
	title={tooltip}
	on:click={() => showColorPicker()}
>
	<div class="swatch" style={swatchBgStyles} />
	<div class="swatch-overlay" style={bgColor} />
	<div class="icon" title="Open X11 Color Palettes" on:click={() => dispatch('showX11Palettes')}>
		<ColorSwatches />
	</div>
</div>

<style lang="postcss">
	.swatch-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 25px;
		border-radius: 6px;
	}

	.swatch {
		z-index: 1;
		position: relative;
		border-radius: 4px;

		grid-column: 1 / span 1;
		grid-row: 1 / span 2;
	}

	.swatch-overlay {
		z-index: 2;
		border-radius: 4px;

		grid-column: 1 / span 1;
		grid-row: 1 / span 2;
	}

	.icon {
		z-index: 3;
		cursor: pointer;
		color: var(--black4);
		width: 25px;
		height: 25px;
		padding: 0 0 0.25rem 0.25rem;

		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}
</style>
