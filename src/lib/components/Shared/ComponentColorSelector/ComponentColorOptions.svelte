<script lang="ts">
	import Option from '$lib/components/Shared/Select/Option.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let options: SelectMenuOption[] = [];
	export let menuId: string = '';
	export let fontSize: string = '0.95rem';
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
		{fontSize}
		on:click={() => dispatch('click', option.optionNumber)}
		on:click={(e) => handleOptionClicked(e.detail)}
	>
		<div class="color-swatch" style="background-color: var(--{option.value}-fg-color)" />
	</Option>
{/each}

<style lang="postcss">
	.color-swatch {
		width: 15px;
		height: 15px;
		padding: 3px;
		border: 1px solid var(--black2);
	}
</style>
