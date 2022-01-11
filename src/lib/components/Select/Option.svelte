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
	class="block px-4 py-2 text-sm cursor-pointer"
	class:active
	style="font-size: {fontSize}"
	data-value={value ? value : optionNumber}
	role="menuitem"
	tabindex="-1"
	id={menuId ? `${menuId}-option-${optionNumber}` : `option-${optionNumber}`}
	data-testid={menuId ? `${menuId}-option-${optionNumber}` : `option-${optionNumber}`}
	on:click={() => dispatch('click', optionNumber)}
>
	{label}
</div>

<style lang="postcss">
	div {
		color: var(--select-text-color);
	}

	.active {
		background-color: var(--selected-item-bg-color);
	}
</style>
