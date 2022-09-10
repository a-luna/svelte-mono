<svelte:options accessors />

<script lang="ts">
	import CaretDown from '$lib/components/Icons/CaretDown.svelte';
	import Option from '$lib/components/Shared/Select/Option.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { clickOutside, getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let menuId: string = `select-menu-${getRandomHexString(4)}`;
	export let menuLabel: string = 'Options';
	export let options: SelectMenuOption[] = [];
	export let selectedValue: number | string;
	export let disabled: boolean = false;
	export let displaySelectedOptionText = true;
	export let dropdownShown: boolean = false;
	export let style = '';
	let selectedOption: SelectMenuOption;
	const dispatch = createEventDispatcher();

	$: label = displaySelectedOptionText ? selectedOption?.label ?? menuLabel : menuLabel;
	$: noSelection = selectedValue === '';
	$: if (options && selectedValue !== selectedOption?.value) {
		options.forEach((menuOption) => (menuOption.active = false));
		selectedOption = options.find((menuOption) => menuOption.value == selectedValue);
		if (selectedOption) {
			selectedOption.active = true;
			selectedValue = selectedOption.value;
		}
	}

	export function handleOptionClicked(selectedOptionNumber: number) {
		if (options.length > 0) {
			options.forEach((menuOption) => (menuOption.active = false));
			selectedOption = options.find((menuOption) => menuOption.optionNumber == selectedOptionNumber);
			if (selectedOption) {
				selectedOption.active = true;
				dispatch('changed', selectedOption.value);
			}
			dropdownShown = false;
		}
	}

	const handleButtonClicked = () => {
		if (!disabled) {
			dropdownShown = !dropdownShown;
		}
	};
</script>

<div
	class="select-menu-wrapper"
	data-testid={menuId}
	{style}
	use:clickOutside={{ enabled: dropdownShown, cb: () => (dropdownShown = !dropdownShown) }}
>
	<div>
		<button
			type="button"
			class="open-list-button"
			class:disabled
			class:no-selection={noSelection}
			id="{menuId}-open-list-button"
			data-testid="{menuId}-open-list-button"
			aria-expanded={dropdownShown}
			aria-haspopup="true"
			on:click={() => handleButtonClicked()}
		>
			<span class="selected-value">
				<slot name="selectedValue">
					{label}
				</slot>
			</span>
			<div class="menu-icon">
				<CaretDown />
			</div>
		</button>
	</div>
	{#if dropdownShown}
		<div
			class="dropdown"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="{menuId}-open-list-button"
			tabindex="-1"
			in:scale={{ duration: 100, start: 0.95, easing: cubicOut }}
			out:scale={{ duration: 75, start: 0.95, easing: cubicIn }}
		>
			<slot name="options">
				{#each options as option}
					<Option {...option} {menuId} on:click={(e) => handleOptionClicked(e.detail)} />
				{/each}
			</slot>
		</div>
	{/if}
</div>

<style lang="postcss">
	.select-menu-wrapper {
		--select-menu-default-width: 100%;
		--select-menu-default-margin: 0;
		--select-menu-default-flex: 0 1 auto;
		--select-menu-default-text-color: hsl(0, 0%, 10%);
		--select-menu-default-no-selection-text-color: var(--dark-gray4);
		--select-menu-default-bg-color: hsl(0, 0%, 100%);
		--select-menu-default-hover-bg-color: hsl(0, 0%, 95%);
		--select-menu-default-disabled-text-color: hsl(0, 0%, 30%);
		--select-menu-default-disabled-bg-color: hsl(0, 0%, 80%);
		--select-menu-default-font-size: 0.875rem;
		--select-menu-default-height: 36px;
		--select-menu-default-display: inline-flex;
		--select-menu-default-justify-content: space-between;
		--select-menu-default-align-items: center;
		--select-menu-default-gap: 10px;
		--select-menu-default-padding: 7px 6px;
		--select-menu-default-border-width: 0;
		--select-menu-default-border-style: solid;
		--select-menu-default-border-color: hsl(0, 0%, 75%);
		--select-menu-default-border-radius: 6px;
		--select-menu-default-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		--select-menu-default-focus-outline-width: 0;
		--select-menu-default-focus-outline-style: solid;
		--select-menu-default-focus-outline-color: hsla(217.2 91.2% 59.8% / 0.5);
		--select-menu-default-focus-ring-color: rgb(31 41 55);
		--select-menu-default-focus-ring-offset-color: hsl(220 14.3% 95.9%);
		--select-menu-default-focus-ring-offset-width: 2px;
		--focus-ring-shadow: 0 0 0
			calc(2px + var(--select-menu-focus-ring-offset-width, --select-menu-default-focus-ring-offset-width))
			var(--select-menu-focus-ring-color, --select-menu-default-focus-ring-color);
		--focus-ring-offset-shadow: 0 0 0
			var(--select-menu-focus-ring-offset-width, --select-menu-default-focus-ring-offset-width)
			var(--select-menu-focus-ring-offset-color, --select-menu-default-focus-ring-offset-color);
		--focus-ring-box-shadow: var(--focus-ring-offset-shadow), var(--focus-ring-shadow), 0 0 #0000;

		--select-menu-default-dropdown-height: auto;
		--select-menu-default-dropdown-margin: 0.5rem 0 0 0;
		--select-menu-default-dropdown-box-shadow: 0 0 0 0px #fff, 0 0 0 1px rbg(0 0 0 / 0.05), 0 0 #0000;
		--select-menu-default-selected-item-bg-color: hsl(0, 0%, 90%);
		--select-menu-default-item-padding: 0.5rem 1rem;

		position: relative;
		display: inline-block;
		text-align: left;
		width: var(--select-menu-width, var(--select-menu-default-width));
		margin: var(--select-menu-margin, var(--select-menu-default-margin));
		flex: var(--select-menu-flex, var(--select-menu-default-flex));
	}

	.menu-icon {
		width: var(--select-menu-font-size, var(--select-menu-default-font-size));
		height: var(--select-menu-font-size, var(--select-menu-default-font-size));
	}

	.open-list-button {
		font-size: var(--select-menu-font-size, var(--select-menu-default-font-size));
		height: var(--select-menu-height, var(--select-menu-default-height));
		display: var(--select-menu-display, var(--select-menu-default-display));
		justify-content: var(--select-menu-justify-content, -var(-select-menu-default-justify-content));
		align-items: var(--select-menu-align-items, var(--select-menu-default-align-items));
		gap: var(--select-menu-gap, var(--select-menu-default-gap));
		padding: var(--select-menu-padding, var(--select-menu-default-padding));
		border-width: var(--select-menu-border-width, var(--select-menu-default-border-width));
		border-style: var(--select-menu-border-style, var(--select-menu-default-border-style));
		border-color: var(--select-menu-border-color, var(--select-menu-default-border-color));
		border-radius: var(--select-menu-border-radius, var(--select-menu-default-border-radius));
		box-shadow: var(--select-menu-box-shadow, var(--select-menu-default-box-shadow));
		width: 100%;
	}

	.open-list-button,
	.dropdown {
		background-color: var(--select-menu-bg-color, var(--select-menu-default-bg-color));
		color: var(--select-menu-text-color, var(--select-menu-default-text-color));
		border: 1px solid var(--select-menu-border-color, var(--select-menu-default-border-color));
	}

	.open-list-button:focus {
		outline: 0;
		box-shadow: var(--focus-ring-box-shadow);
	}

	.open-list-button:hover {
		background-color: var(--select-menu-hover-bg-color, var(--select-menu-default-hover-bg-color));
	}

	.open-list-button.disabled {
		cursor: default;
		color: var(--select-menu-disabled-text-color, var(--select-menu-default-disabled-text-color, var(--dark-gray2)));
		background-color: var(
			--select-menu-disabled-bg-color,
			var(--select-menu-default-disabled-bg-color, var(--light-gray1))
		);
	}

	.open-list-button.no-selection {
		color: var(--select-menu-no-selection-text-color, var(--select-menu-default-no-selection-text-color, var(--gray4)));
	}

	.dropdown {
		position: absolute;
		transform-origin: top right;
		right: 0;
		z-index: 10;
		width: 100%;
		overflow-y: auto;
		height: var(--select-menu-dropdown-height, var(--select-menu-default-dropdown-height));
		margin: var(--select-menu-dropdown-margin, var(--select-menu-default-dropdown-margin));
		border-radius: var(--select-menu-border-radius, var(--select-menu-default-border-radius));
		box-shadow: var(--select-menu-dropdown-box-shadow, var(--select-menu-default-dropdown-box-shadow));
	}

	.dropdown:focus {
		outline: 0;
	}

	.selected-value {
		line-height: 1;
		white-space: nowrap;
		margin: 0 auto;
	}
</style>
