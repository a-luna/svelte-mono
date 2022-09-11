<script lang="ts">
	import { parseColorFromString } from '$lib/color';
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import Option from '$lib/components/Shared/Select/Option.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let options: SelectMenuOption[] = [];
	export let menuId: string = '';
	let selectedOption: SelectMenuOption;
	const dispatch = createEventDispatcher();

	export function handleOptionClicked(selectedOptionNumber: number) {
		if (options.length > 0) {
			options.forEach((menuOption) => (menuOption.active = false));
			selectedOption = options.find((menuOption) => menuOption.optionNumber == selectedOptionNumber);
			if (selectedOption) {
				selectedOption.active = true;
				dispatch('changed', selectedOption.value);
			}
		}
	}
</script>

{#each options as option}
	<Option
		{...option}
		{menuId}
		on:click={() => dispatch('click', option.optionNumber)}
		on:click={(e) => handleOptionClicked(e.detail)}
	>
		<ColorSwatch
			color={parseColorFromString(String(option.value)).value}
			swatchWidth={'15px'}
			swatchHeight={'15px'}
			style={'border: 1px solid var(--black4);'}
		/>
	</Option>
{/each}
