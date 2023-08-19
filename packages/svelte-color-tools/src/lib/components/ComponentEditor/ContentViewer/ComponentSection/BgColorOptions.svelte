<script lang="ts">
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { defaultCssColor } from '@a-luna/shared-ui';
	import { parseCssColor } from '@a-luna/shared-ui/color/parsers';
	import { addStringValuesToCssColor, clampColorComponents } from '@a-luna/shared-ui/color/util';
	import { ListOption } from '@a-luna/shared-ui/components';
	import type { SelectListOption } from '@a-luna/shared-ui/types';
	import { createEventDispatcher } from 'svelte';

	export let options: SelectListOption[] = [];
	export let menuId: string = '';
	let selectedOption: SelectListOption;
	const selectedOptionChangedDispatcher = createEventDispatcher<{
		selectedOptionChanged: { selected: string | number };
	}>();

	export function handleSelectedOptionChanged(e: CustomEvent<{ optionNumber: number }>) {
		const { optionNumber } = e.detail;
		if (options.length > 0) {
			options.forEach((menuOption) => (menuOption.active = false));
			selectedOption = options.find((menuOption) => menuOption.optionNumber == optionNumber) ?? selectedOption;
			selectedOption.active = true;
			if (typeof selectedOption.value === 'string') {
				selectedOptionChangedDispatcher('selectedOptionChanged', { selected: selectedOption.value });
			}
		}
	}
</script>

{#each options as option}
	<ListOption {...option} {menuId} on:selectedOption={handleSelectedOptionChanged}>
		<ColorSwatch
			color={clampColorComponents(addStringValuesToCssColor(parseCssColor(String(option.value)) ?? defaultCssColor))}
			style={'border: 1px solid var(--black4);'}
		/>
	</ListOption>
{/each}
