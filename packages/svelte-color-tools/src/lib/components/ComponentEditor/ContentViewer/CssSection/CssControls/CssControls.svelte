<script lang="ts">
	import SelectAllCustomPropsButton from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssControls/SelectAllCustomPropsButton.svelte';
	import SelectNoneCustomPropsButton from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssControls/SelectNoneCustomPropsButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let totalSelected: number;
	export let allCustomPropsSelected: boolean;
	export let anyCustomPropsSelected: boolean;
	const selectAllCustomPropertiesDispatcher = createEventDispatcher<{ selectAllCustomProperties: {} }>();
	const deselectAllCustomPropertiesDispatcher = createEventDispatcher<{ deselectAllCustomProperties: {} }>();
</script>

<div class="css-controls">
	<div class="button-list">
		<SelectAllCustomPropsButton
			disabled={allCustomPropsSelected}
			wrapperWidth={'100px'}
			on:click={() => selectAllCustomPropertiesDispatcher('selectAllCustomProperties')}
		/>
		<SelectNoneCustomPropsButton
			disabled={!anyCustomPropsSelected}
			wrapperWidth={'112px'}
			on:click={() => deselectAllCustomPropertiesDispatcher('deselectAllCustomProperties')}
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
