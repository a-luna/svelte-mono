<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number | string;
	export let label: string;
	export let optionNumber: number;
	export let active: boolean = false;
	export let menuId: string;
	const dispatch = createEventDispatcher();
</script>

<div
	class:active
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
		cursor: pointer;
		line-height: 1.25rem;
		font-size: var(--select-menu-font-size, var(--select-menu-default-font-size));
		color: var(--select-menu-text-color, var(--select-menu-default-text-color));
		padding: var(--select-menu-item-padding, var(--select-menu-default-item-padding));
	}

	div:first-child {
		border-top-left-radius: var(--select-menu-border-radius, var(--select-menu-default-border-radius));
		border-top-right-radius: var(--select-menu-border-radius, var(--select-menu-default-border-radius));
	}

	div:last-child {
		border-bottom-left-radius: var(--select-menu-border-radius, var(--select-menu-default-border-radius));
		border-bottom-right-radius: var(--select-menu-border-radius, var(--select-menu-default-border-radius));
	}

	.active {
		background-color: var(--select-menu-selected-item-bg-color, var(--select-menu-default-selected-item-bg-color));
	}
</style>
