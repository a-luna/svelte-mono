<script lang="ts">
	import SelectAllCustomPropsButton from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssControls/SelectAllCustomPropsButton.svelte';
	import SelectNoneCustomPropsButton from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssControls/SelectNoneCustomPropsButton.svelte';
	import type { ComponentColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let componentColor: ComponentColor;
	export let totalSelected: number;
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
	<span class="total-selected"><strong>{totalSelected}</strong> custom properties selected</span>
</div>

<style lang="postcss">
	.button-list {
		display: flex;
		align-items: center;
		font-size: 0.8rem;
		gap: 0.5rem;
		padding: 1rem;
	}
</style>
