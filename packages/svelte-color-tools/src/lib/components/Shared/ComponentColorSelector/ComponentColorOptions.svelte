<script lang="ts">
	import { ListOption } from '@a-luna/shared-ui/components';
	import { isComponentColor } from '@a-luna/shared-ui/typeguards';
	import type { ComponentColor, SelectListOption } from '@a-luna/shared-ui/types';
	import { createEventDispatcher } from 'svelte';

	export let options: SelectListOption[] = [];
	export let menuId: string = '';
	let selectedOption: SelectListOption;
	const dispatch = createEventDispatcher<{ changed: { selectedValue: ComponentColor } }>();

	export function handleSelectedOptionChanged(e: CustomEvent<{ optionNumber: number }>) {
		const { optionNumber } = e.detail;
		if (options.length > 0) {
			options.forEach((menuOption) => (menuOption.active = false));
			selectedOption = options.find((menuOption) => menuOption.optionNumber == optionNumber) ?? selectedOption;
			selectedOption.active = true;
			if (typeof selectedOption.value === 'string' && isComponentColor(selectedOption.value)) {
				dispatch('changed', { selectedValue: selectedOption.value });
			}
		}
	}
</script>

{#each options as option}
	<ListOption {...option} {menuId} on:selectedOption={handleSelectedOptionChanged}>
		<div class="color-swatch" style="background-color: var(--{option.value}-fg-color)" />
	</ListOption>
{/each}

<style lang="postcss">
	.color-swatch {
		width: 15px;
		height: 15px;
		padding: 3px;
		border: 1px solid var(--black2);
	}
</style>
