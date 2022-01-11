<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';

	export let pickerId: string;
	export let alphaEnabled: boolean;
	let { state } = getContext(pickerId);
	const dispatch = createEventDispatcher();

	$: alphaStyles = `background-color: ${$state?.color?.hex}; background-image: url("./ps-neutral.png")`;
	$: opaqueStyles = `background-color: ${$state?.color?.hex}`;
	$: tooltip = alphaEnabled ? 'Color picker does not support RGBA/HSLA color space' : 'Click to open color picker';

	function showColorPicker() {
		if (!alphaEnabled && $state.editable) {
			$state.labelState = 'pick';
			dispatch('showColorPicker');
		}
	}
</script>

<div
	class="swatch flex-grow"
	class:cursor-pointer={!alphaEnabled && $state.editable}
	class:cursor-not-allowed={alphaEnabled || !$state.editable}
	style="{alphaEnabled ? alphaStyles : opaqueStyles}; width: 104px; height: 104px"
	title={tooltip}
	on:click={() => showColorPicker()}
/>

<style lang="postcss">
	.swatch {
		border: 1px solid var(--gray4);
	}
</style>
