<script lang="ts">
	import { hslToString } from '$lib/color';
	import ColorSwatches from '$lib/components/Icons/ColorSwatches.svelte';
	import { createEventDispatcher, getContext } from 'svelte';

	export let pickerId: string;
	export let alphaEnabled: boolean;
	let { state } = getContext(pickerId);
	const dispatch = createEventDispatcher();

	$: alphaStyles = `background-image: linear-gradient(${$state?.color?.hslaString}, ${$state?.color?.hslaString}), url("./ps-neutral.png")`;
	$: opaqueStyles = `background-color: ${$state?.color?.hslString}`;
	$: borderColor = { ...$state.color.hsl, l: $state.color.hsl.l - 20 };
	$: borderStyles = `border: 2px solid ${hslToString(borderColor)}`;
	$: tooltip = alphaEnabled ? 'Color picker does not support RGBA/HSLA color space' : 'Click to open color picker';

	function showColorPicker() {
		if (!alphaEnabled && $state.editable) {
			$state.labelState = 'pick';
			dispatch('showColorPicker');
		}
	}
</script>

<div
	class="swatch-wrapper flex-grow"
	class:cursor-pointer={!alphaEnabled && $state.editable}
	class:cursor-not-allowed={alphaEnabled || !$state.editable}
	style="{alphaEnabled ? alphaStyles : opaqueStyles}; width: 104px; height: 104px; {borderStyles}"
	title={tooltip}
	on:click={() => showColorPicker()}
>
	<div class="swatch" style={alphaEnabled ? alphaStyles : opaqueStyles} />
	<div class="icon" title="Click to view X11 color palettes" on:click={() => dispatch('showX11Palettes')}>
		<ColorSwatches />
	</div>
</div>

<style lang="postcss">
	.swatch-wrapper {
		border-radius: 6px;
	}

	.swatch {
		position: relative;
	}

	.icon {
		cursor: pointer;
		position: relative;
		color: var(--black4);
		width: 25px;
		height: 25px;
		bottom: -71px;
		left: 4px;
	}
</style>
