<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number | string;
	export let label: string;
	export let optionNumber: number;
	export let active = false;
	export let menuId: string;
	export let fontSize: string;
	const dispatch = createEventDispatcher();
</script>

<button
	class="menu-item"
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
</button>

<style lang="postcss">
	button {
		display: block;
		cursor: pointer;
		flex: 1;
		background-color: transparent;
		color: var(--select-text-color);
		border: none;
		height: auto;
		line-height: 1.25rem;
		padding: 0.5rem 1rem;
		z-index: 10;
		width: 100%;
	}

	button:hover,
	button:focus,
	button:active,
	button:active:focus,
	.active {
		background-color: var(--selected-item-bg-color);
	}

	.menu-item:first-child {
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
	}

	.menu-item:last-child {
		border-bottom-right-radius: 4px;
		border-bottom-left-radius: 4px;
	}
</style>
