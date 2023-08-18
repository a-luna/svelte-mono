<svelte:options accessors />

<script lang="ts">
	import { BasicIconRenderer } from '$lib/components/Icons';
	import Option from '$lib/components/Select/ListOption.svelte';
	import type { SelectListOption } from '$lib/types';
	import { clickOutside, getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let menuId = `select-menu-${getRandomHexString(4)}`;
	export let menuLabel = 'Options';
	export let options: SelectListOption[] = [];
	export let selectedValue: number | string;
	export let disabled = false;
	export let displaySelectedOptionText = true;
	export let dropdownShown = false;
	export let tooltip = '';
	export let style = '';
	let selectedOption: SelectListOption | undefined;
	const selectedOptionChangedDispatcher = createEventDispatcher<{
		selectedOptionChanged: { selected: string | number };
	}>();
	const iconWidth = 'var(--select-list-open-button-icon-width, var(--select-list-default-open-button-icon-width))';
	const iconHeight = 'var(--select-list-open-button-icon-height, var(--select-list-default-open-button-icon-height))';

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
				selectedOptionChangedDispatcher('selectedOptionChanged', { selected: selectedOption.value });
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
	title={tooltip}
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
				<BasicIconRenderer icon={'caretdown'} height={iconHeight} width={iconWidth} />
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
		--select-list-default-width: 100%;
		--select-list-default-margin: 0;
		--select-list-default-flex: 0 1 auto;
		--select-list-default-font-size: 0.875rem;
		--select-list-default-display: inline-flex;
		--select-list-default-justify-content: space-between;
		--select-list-default-align-items: center;
		--select-list-default-gap: 0.625rem;

		--select-list-default-open-button-text-color: hsl(0, 0%, 10%);
		--select-list-default-open-button-background-color: hsl(0, 0%, 100%);
		--select-list-default-open-button-hover-background-color: hsl(0, 0%, 95%);
		--select-list-default-open-button-border-color: hsl(0, 0%, 75%);
		--select-list-default-open-button-font-weight: 500;
		--select-list-default-open-button-padding: 9px 11px 9px 14px;
		--select-list-default-open-button-height: 33px;
		--select-list-default-open-button-icon-height: 14px;
		--select-list-default-open-button-icon-width: 10px;

		--select-list-default-no-selection-text-color: var(--dark-gray4);
		--select-list-default-disabled-text-color: hsl(0, 0%, 30%);
		--select-list-default-disabled-background-color: hsl(0, 0%, 80%);
		--select-list-default-border-width: 0;
		--select-list-default-border-style: solid;
		--select-list-default-border-color: hsl(0, 0%, 75%);
		--select-list-default-border-radius: 6px;
		--select-list-default-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

		--select-list-default-dropdown-text-color: hsl(0, 0%, 10%);
		--select-list-default-dropdown-background-color: hsl(0, 0%, 100%);
		--select-list-default-dropdown-border-color: hsl(0, 0%, 75%);
		--select-list-default-dropdown-height: auto;
		--select-list-default-dropdown-margin: 0.5rem 0 0 0;
		--select-list-default-dropdown-box-shadow: 0 0 0 0px #fff, 0 0 0 1px rbg(0 0 0 / 0.05), 0 0 #0000;

		--select-list-default-selected-item-background-color: hsl(0, 0%, 90%);
		--select-list-default-menu-item-padding: 0.5rem 1rem;

		position: relative;
		display: inline-block;
		text-align: left;
		width: var(--select-list-width, var(--select-list-default-width));
		margin: var(--select-list-margin, var(--select-list-default-margin));
		flex: var(--select-list-flex, var(--select-list-default-flex));
	}

	button {
		cursor: pointer;
		width: 100%;
		display: var(--select-list-display, var(--select-list-default-display));
		justify-content: var(--select-list-justify-content, -var(--select-menu-default-justify-content));
		align-items: var(--select-list-align-items, var(--select-list-default-align-items));
		gap: var(--select-list-gap, var(--select-list-default-gap));
		border-width: var(--select-list-border-width, var(--select-list-default-border-width));
		border-style: var(--select-list-border-style, var(--select-list-default-border-style));
		border-color: var(--select-list-border-color, var(--select-list-default-border-color));
		border-radius: var(--select-list-border-radius, var(--select-list-default-border-radius));
		box-shadow: var(--select-list-box-shadow, var(--select-list-default-box-shadow));
	}

	button:focus {
		box-shadow: var(--select-list-box-shadow, var(--select-list-default-box-shadow));
	}

	.open-list-button {
		font-size: var(--select-list-font-size, var(--select-list-default-font-size));
		font-weight: var(--select-list-open-button-font-weight, var(--select-list-default-open-button-font-weight));
		height: var(--select-list-open-button-height, var(--select-list-default-open-button-height));
		padding: var(--select-list-open-button-padding, var(--select-list-default-open-button-padding));
		background-color: var(
			--select-list-open-button-background-color,
			var(--select-list-default-open-button-background-color)
		);
		color: var(--select-list-open-button-text-color, var(--select-list-default-open-button-text-color));
		border: 1px solid var(--select-list-open-button-border-color, var(--select-list-default-open-button-border-color));
	}

	.menu-icon {
		width: var(--select-list-open-button-icon-width, var(--select-list-default-open-button-icon-width));
		height: var(--select-list-open-button-icon-height, var(--select-list-default-open-button-icon-height));
	}

	.dropdown {
		position: absolute;
		transform-origin: top right;
		right: 0;
		z-index: 10;
		width: 100%;
		overflow-y: auto;
		background-color: var(
			--select-list-dropdown-background-color,
			var(--select-list-default-dropdown-background-color)
		);
		color: var(--select-list-dropdown-text-color, var(--select-list-default-dropdown-text-color));
		border: 1px solid var(--select-list-dropdown-border-color, var(--select-list-default-dropdown-border-color));
		height: var(--select-list-dropdown-height, var(--select-list-default-dropdown-height));
		margin: var(--select-list-dropdown-margin, var(--select-list-default-dropdown-margin));
		border-radius: var(--select-list-dropdown-border-radius, var(--select-list-default-dropdown-border-radius));
		box-shadow: var(--select-list-dropdown-box-shadow, var(--select-list-default-dropdown-box-shadow));
	}

	.dropdown:focus {
		outline: 0;
	}

	.open-list-button:hover,
	.open-list-button:focus {
		background-color: var(
			--select-list-open-button-hover-background-color,
			var(--select-list-default-open-button-hover-background-color)
		);
		color: var(--select-list-open-button-text-color, var(--select-list-default-open-button-text-color));
		border: 1px solid var(--select-list-open-button-border-color, var(--select-list-default-open-button-border-color));
	}

	.open-list-button.disabled {
		cursor: default;
		color: var(--select-list-disabled-text-color, var(--select-list-default-disabled-text-color));
		background-color: var(
			--select-list-disabled-background-color,
			var(--select-list-default-disabled-background-color)
		);
	}

	.open-list-button.no-selection {
		color: var(--select-list-no-selection-text-color, var(--select-list-default-no-selection-text-color));
	}

	.selected-value {
		line-height: 1;
		white-space: nowrap;
		margin: 0 auto;
	}
	/* 
	.open-list-button:focus {
		outline: 0;
		box-shadow: var(--focus-ring-box-shadow);
	} */
</style>
