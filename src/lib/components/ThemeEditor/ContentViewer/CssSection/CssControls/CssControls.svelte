<script lang="ts">
	import SelectAllCustomPropsButton from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssControls/SelectAllCustomPropsButton.svelte';
	import SelectNoneCustomPropsButton from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssControls/SelectNoneCustomPropsButton.svelte';
	import type { ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let componentColor: ComponentColor;
	export let allCustomPropsSelected: boolean;
	export let anyCustomPropsSelected: boolean;
	const dispatch = createEventDispatcher();
</script>

<div class="button-list">
	<SelectAllCustomPropsButton
		{componentColor}
		disabled={allCustomPropsSelected}
		on:click={() => dispatch('selectAllCustomProperties')}
	/>
	<SelectNoneCustomPropsButton
		{componentColor}
		disabled={!anyCustomPropsSelected}
		on:click={() => dispatch('deselectAllCustomProperties')}
	/>
</div>

<style lang="postcss">
	.button-list {
		display: flex;
		gap: 0.25rem;
	}
</style>
