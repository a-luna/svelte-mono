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

<div class="css-controls">
	<div class="button-list">
		<SelectAllCustomPropsButton
			{componentColor}
			disabled={allCustomPropsSelected}
			wrapperWidth={'112px'}
			on:click={() => dispatch('selectAllCustomProperties')}
		/>
		<SelectNoneCustomPropsButton
			{componentColor}
			disabled={!anyCustomPropsSelected}
			wrapperWidth={'112px'}
			on:click={() => dispatch('deselectAllCustomProperties')}
		/>
	</div>
	<span class="total-selected"><strong>{totalSelected}</strong> custom properties selected</span>
</div>

<style lang="postcss">
	.css-controls {
		display: flex;
		align-items: center;
		font-size: 0.8rem;
		gap: 1.5rem;
		padding: 0.5rem 1rem;
		margin: 0.5rem 0 0 0;
	}
	.button-list {
		display: flex;
		gap: 0.5rem;
	}
</style>
