<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number | string;
	export let label: string;
	export let optionNumber: number;
	export let active: boolean = false;
	export let menuId: string;
	export let fontSize: string;
	const dispatch = createEventDispatcher();
</script>

<div
	class:active
	style="font-size: {fontSize}"
	data-value={value ? value : optionNumber}
	role="menuitem"
	tabindex="-1"
	id={menuId ? `${menuId}-option-${optionNumber}` : `option-${optionNumber}`}
	data-testid={menuId ? `${menuId}-option-${optionNumber}` : `option-${optionNumber}`}
	on:click={() => dispatch('click', optionNumber)}
>
	<slot>
		{label}
	</slot>
</div>

<style lang="postcss">
	div {
		display: block;
		color: var(--select-text-color);
		line-height: 1.25rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	div:first-child {
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}

	div:last-child {
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
	}

	.active {
		background-color: var(--selected-item-bg-color);
	}
</style>
