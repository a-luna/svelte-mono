<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number | string;
	export let label: string;
	export let optionNumber: number;
	export let active = false;
	export let menuId: string;
	const dispatch = createEventDispatcher();
</script>

<button
	class="menu-item"
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
</button>

<style lang="postcss">
	button {
		display: block;
		cursor: pointer;
		flex: 1;
		line-height: 1.25rem;
		border: none;
		height: auto;
		z-index: 10;
		width: 100%;
		font-size: var(--select-list-font-size, var(--select-list-default-font-size));
		background-color: transparent;
		color: var(--select-list-dropdown-text-color, var(--select-list-default-dropdown-text-color));
		padding: var(--select-list-menu-item-padding, var(--select-list-default-menu-item-padding));
	}

	.menu-item:first-child {
		border-top-left-radius: var(--select-list-border-radius, var(--select-list-default-border-radius));
		border-top-right-radius: var(--select-list-border-radius, var(--select-list-default-border-radius));
	}

	.menu-item:last-child {
		border-bottom-left-radius: var(--select-list-border-radius, var(--select-list-default-border-radius));
		border-bottom-right-radius: var(--select-list-border-radius, var(--select-list-default-border-radius));
	}

	button:hover,
	button:focus,
	button:active,
	button:active:focus,
	.active {
		background-color: var(
			--select-list-selected-item-background-color,
			var(--select-list-default-selected-item-background-color)
		);
	}
</style>
