<script lang="ts">
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { defaultCssColorForColorSpace } from '@a-luna/shared-ui';
	import { parseCssColor } from '@a-luna/shared-ui/color/parsers';
	import { ListOption } from '@a-luna/shared-ui/components';
	import type { CssColorForColorSpace, SelectListOption } from '@a-luna/shared-ui/types';
	import { createEventDispatcher } from 'svelte';

	export let options: SelectListOption[] = [];
	export let menuId: string = '';
	let selectedOption: SelectListOption;
	const dispatch = createEventDispatcher<{ selectedOptionChanged: { selected: string | number } }>();

	export function handleSelectedOptionChanged(e: CustomEvent<{ optionNumber: number }>) {
		const { optionNumber } = e.detail;
		if (options.length > 0) {
			options.forEach((menuOption) => (menuOption.active = false));
			selectedOption = options.find((menuOption) => menuOption.optionNumber == optionNumber) ?? selectedOption;
			selectedOption.active = true;
			if (typeof selectedOption.value === 'string') {
				dispatch('selectedOptionChanged', { selected: selectedOption.value });
			}
		}
	}

	function getCssColorForListOption(value: string): CssColorForColorSpace {
		const color = parseCssColor(value);
		if (color) {
			return color.space === 'srgb' ? color.srbgColor : color.p3Color;
		}
		return defaultCssColorForColorSpace;
	}
</script>

{#each options as option}
	<ListOption {...option} {menuId} on:selectedOption={handleSelectedOptionChanged}>
		<ColorSwatch
			variant="small"
			color={getCssColorForListOption(String(option.value))}
			style={'border: 1px solid var(--black4);'}
		/>
	</ListOption>
{/each}
