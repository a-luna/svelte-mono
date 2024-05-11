<svelte:options accessors />

<script lang="ts">
	import { BasicIconRenderer } from '$lib/components/Icons';
	import ListOption from '$lib/components/Select/ListOption.svelte';
	import type { SelectListOption } from '$lib/types';
	import { clickOutside, getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let menuId = `select-menu-${getRandomHexString({ length: 4 })}`;
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

	export function handleSelectedOptionChanged(e: CustomEvent<{ optionNumber: number }>) {
		const { optionNumber } = e.detail;
		if (options.length > 0) {
			options.forEach((menuOption) => (menuOption.active = false));
			selectedOption = options.find((menuOption) => menuOption.optionNumber == optionNumber);
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
	class="select-list-wrapper"
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
			class:active={dropdownShown}
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
					<ListOption {...option} {menuId} on:selectedOption={handleSelectedOptionChanged} />
				{/each}
			</slot>
		</div>
	{/if}
</div>

<style lang="postcss">
	.select-list-wrapper {
		--select-list-default-width: 100%;
		--select-list-default-margin: 0;
		--select-list-default-flex: 0 1 auto;
		--select-list-default-font-size: var(--theme-font-size, var(--theme-default-font-size));
		--select-list-default-display: inline-flex;
		--select-list-default-justify-content: space-between;
		--select-list-default-align-items: center;
		--select-list-default-gap: 0.625rem;

		--select-list-default-border-radius: var(--theme-border-radius, var(--theme-default-border-radius));
		--select-list-default-border-width: 1px;
		--select-list-default-border-style: solid;

		--select-list-default-open-button-text-color: var(--theme-text-color, var(--theme-default-text-color));
		--select-list-default-open-button-background-color: var(
			--theme-background-color,
			var(--theme-default-background-color)
		);
		--select-list-default-open-button-text-color-hover: var(--theme-text-color, var(--theme-default-text-color));
		--select-list-default-open-button-background-color-hover: var(
			--theme-background-color-hover,
			var(--theme-default-background-color-hover)
		);
		--select-list-default-open-button-text-color-active: var(
			--theme-text-color-active,
			var(--theme-default-text-color-active)
		);
		--select-list-default-open-button-background-color-active: var(
			--theme-background-color-active,
			var(--theme-default-background-color-active)
		);

		--select-list-default-border-color-active: var(--theme-text-color-active, var(--theme-default-text-color-active));
		--select-list-default-border-active: var(--select-list-border-width, var(--select-list-default-border-width))
			var(--select-list-border-style, var(--select-list-default-border-style))
			var(--select-list-border-color-active, var(---select-list-default-border-color-active));

		--select-list-default-open-button-border-color: var(--theme-text-color, var(--theme-default-text-color));
		--select-list-default-open-button-font-weight: 500;
		--select-list-default-open-button-padding: 9px 11px 9px 14px;
		--select-list-default-open-button-height: 33px;
		--select-list-default-open-button-icon-height: 14px;
		--select-list-default-open-button-icon-width: 10px;
		--select-list-default-no-selection-text-color: var(--theme-color-disabled, var(--theme-default-color-disabled));
		--select-list-default-disabled-text-color: var(--theme-color-disabled, var(--theme-default-color-disabled));
		--select-list-default-disabled-background-color: var(
			--theme-background-color-disabled,
			var(--theme-default-background-color-disabled)
		);
		--select-list-default-border-color: var(--theme-text-color, var(--theme-default-text-color));
		--select-list-default-border-radius: var(--theme-border-radius, var(--theme-default-border-radius));
		--select-list-default-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		--select-list-default-border-color-hover: var(--theme-text-color, var(--theme-default-text-color));
		--select-list-default-dropdown-text-color: var(--theme-text-color, var(--theme-default-text-color));
		--select-list-default-dropdown-background-color: var(
			--theme-background-color,
			var(--theme-default-background-color)
		);
		--select-list-default-dropdown-border-color: var(--theme-text-color, var(--theme-default-text-color));
		--select-list-default-dropdown-border-radius: var(--theme-border-radius, var(--theme-default-border-radius));
		--select-list-default-dropdown-height: auto;
		--select-list-default-dropdown-max-height: 300px;
		--select-list-default-dropdown-margin: 0.5rem 0 0 0;
		--select-list-default-dropdown-box-shadow: 0 0 0 0px #fff, 0 0 0 1px rbg(0 0 0 / 0.05), 0 0 #0000;
		--select-list-default-selected-item-background-color: var(
			--theme-background-color-active,
			var(--theme-default-background-color-active)
		);
		--select-list-default-menu-item-background-color-hover: var(
			--theme-background-color-hover,
			var(--theme-default-background-color-hover)
		);
		--select-list-default-menu-item-padding: 0.5rem 1rem;
		--select-list-default-menu-item-text-align: left;

		position: relative;
		display: inline-block;
		text-align: left;
		width: var(--select-list-width, var(--select-list-default-width));
		margin: var(--select-list-margin, var(--select-list-default-margin));
		flex: var(--select-list-flex, var(--select-list-default-flex));
	}

	.open-list-button {
		cursor: pointer;
		display: var(--select-list-display, var(--select-list-default-display));
		justify-content: var(--select-list-justify-content, -var(--select-menu-default-justify-content));
		align-items: var(--select-list-align-items, var(--select-list-default-align-items));
		gap: var(--select-list-gap, var(--select-list-default-gap));

		font-size: var(--select-list-font-size, var(--select-list-default-font-size));
		font-weight: var(--select-list-open-button-font-weight, var(--select-list-default-open-button-font-weight));
		background-color: var(
			--select-list-open-button-background-color,
			var(--select-list-default-open-button-background-color)
		);
		color: var(--select-list-open-button-text-color, var(--select-list-default-open-button-text-color));

		border-width: var(--select-list-border-width, var(--select-list-default-border-width));
		border-style: var(--select-list-border-style, var(--select-list-default-border-style));
		border-color: var(--select-list-border-color, var(--select-list-default-border-color));
		border-radius: var(--select-list-border-radius, var(--select-list-default-border-radius));
		box-shadow: var(--select-list-box-shadow, var(--select-list-default-box-shadow));

		width: 100%;
		height: var(--select-list-open-button-height, var(--select-list-default-open-button-height));
		padding: var(--select-list-open-button-padding, var(--select-list-default-open-button-padding));
	}

	.open-list-button:focus {
		box-shadow: var(--select-list-box-shadow, var(--select-list-default-box-shadow));
	}

	.open-list-button:hover,
	.open-list-button:focus {
		background-color: var(
			--select-list-open-button-background-color-hover,
			var(--select-list-default-open-button-background-color-hover)
		);
		color: var(--select-list-open-button-text-color-hover, var(--select-list-default-open-button-text-color-hover));
		border-color: var(--select-list-border-color-hover, var(--select-list-default-border-color-hover));
	}

	.open-list-button.active {
		color: var(--select-list-open-button-text-color-active, var(--select-list-default-open-button-text-color-active));
		background-color: var(
			--select-list-open-button-background-color-active,
			var(--select-list-default-open-button-background-color-active)
		);
		border: var(--select-list-border-active, var(--select-list-default-border-active));
	}

	.disabled,
	.disabled:hover,
	.disabled:focus {
		cursor: not-allowed;
		color: var(--select-list-disabled-text-color, var(--select-list-default-disabled-text-color));
		background-color: var(
			--select-list-disabled-background-color,
			var(--select-list-default-disabled-background-color)
		);
		border: 1px solid var(--theme-color-disabled, var(--theme-default-color-disabled));
	}

	.open-list-button.no-selection {
		color: var(--select-list-no-selection-text-color, var(--select-list-default-no-selection-text-color));
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
		max-height: var(--select-list-dropdown-max-height, var(--select-list-default-dropdown-max-height));
		margin: var(--select-list-dropdown-margin, var(--select-list-default-dropdown-margin));
		border-radius: var(--select-list-dropdown-border-radius, var(--select-list-default-dropdown-border-radius));
		box-shadow: var(--select-list-dropdown-box-shadow, var(--select-list-default-dropdown-box-shadow));
	}

	.dropdown:focus {
		outline: 0;
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
