<svelte:options accessors />

<script lang="ts">
	import CaretDown from '$lib/components/Icons/CaretDown.svelte';
	import { clickOutside } from '$lib/helpers';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Option from './Option.svelte';

	export let menuLabel: string = 'Options';
	export let options: SelectMenuOption[] = [];
	export let selectedValue: number | string;
	export let flexStyles = 'flex-initial';
	export let width: string = 'auto';
	export let margin: string = '0';
	export let fontSize: string = '0.95rem';
	export let disabled: boolean = false;
	export let displaySelectedOptionText = true;
	export let menuId: string = '';
	export let buttonHeight = '36px';
	export let buttonLayout = 'inline-flex items-center justify-between gap-2.5 w-full';
	export let buttonPadding = '10px 8px';
	export let buttonBorder =
		'border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-800';
	export let menuLayout = 'absolute right-0 z-10 w-full mt-2';
	export let menuBorder = 'rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none';
	export let dropdownShown: boolean = false;
	let selectedOption: SelectMenuOption;
	const dispatch = createEventDispatcher();

	$: label = displaySelectedOptionText ? selectedOption?.label ?? menuLabel : menuLabel;
	$: noSelection = selectedValue === '';
	$: buttonStyles = `font-medium ${buttonLayout} ${buttonBorder}`;
	$: menuStyles = `origin-top-right ${menuLayout} ${menuBorder}`;
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
	class="relative inline-block text-left {flexStyles}"
	style="width: {width ? width : 'auto'}; margin: {margin ? margin : '0'}"
	data-testid={menuId}
	use:clickOutside={{ enabled: dropdownShown, cb: () => (dropdownShown = !dropdownShown) }}
>
	<div>
		<button
			type="button"
			class={buttonStyles}
			class:disabled
			class:no-selection={noSelection}
			id="open-list-button"
			data-testid="open-list-button"
			aria-expanded={dropdownShown}
			aria-haspopup="true"
			style="font-size: {fontSize}; height: {buttonHeight}; padding: {buttonPadding}"
			on:click={() => handleButtonClicked()}
		>
			<span class="leading-none whitespace-nowrap mx-auto">
				<slot name="selectedValue">
					{label}
				</slot>
			</span>
			<div style="width: {fontSize}; height: {fontSize}">
				<CaretDown />
			</div>
		</button>
	</div>

	{#if dropdownShown}
		<div
			class="dropdown {menuStyles}"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="open-list-button"
			tabindex="-1"
			in:scale={{ duration: 100, start: 0.95, easing: cubicOut }}
			out:scale={{ duration: 75, start: 0.95, easing: cubicIn }}
		>
			<slot name="options">
				{#each options as option}
					<Option {...option} {menuId} {fontSize} on:click={(e) => handleOptionClicked(e.detail)} />
				{/each}
			</slot>
		</div>
	{/if}
</div>

<style lang="postcss">
	#open-list-button,
	.dropdown {
		background-color: var(--select-bg-color, var(--white2));
		color: var(--select-text-color, var(--black2));
	}

	#open-list-button:hover {
		background-color: var(--select-bg-color-hov, var(--white4));
	}

	#open-list-button.disabled {
		cursor: default;
		color: var(--select-text-color-disabled, var(--dark-gray2));
		background-color: var(--select-bg-color-disabled, var(--light-gray1));
	}

	#open-list-button.no-selection {
		color: var(--select-text-color-no-selection, var(--gray4));
	}

	.dropdown {
		border: 1px solid var(--light-gray2);
	}
</style>
