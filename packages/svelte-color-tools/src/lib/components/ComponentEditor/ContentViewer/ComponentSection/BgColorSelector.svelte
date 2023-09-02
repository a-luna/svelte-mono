<script lang="ts">
	import BgColorOptions from '$lib/components/ComponentEditor/ContentViewer/ComponentSection/BgColorOptions.svelte';
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import { ColorParser, defaultCssColor, defaultCssColorForColorSpace } from '@a-luna/shared-ui';
	import { InputSelectList } from '@a-luna/shared-ui/components';
	import type { CssColor, CssColorForColorSpace, SelectListOption } from '@a-luna/shared-ui/types';

	export let value: string = '#00000000';
	export let disabled = false;
	export const menuId: string = 'select-component-background-color';
	let selectComponent: InputSelectList;
	let selectedColor: CssColor = defaultCssColor;
	let selectedColorInGamut: CssColorForColorSpace = defaultCssColorForColorSpace;

	$: {
		const result = ColorParser.parse(value);
		selectedColor = result.success ? result.value : defaultCssColor;
		selectedColorInGamut = selectedColor.space === 'srgb' ? selectedColor.srbgColor : selectedColor.p3Color;
	}

	const options: SelectListOption[] = [
		{ label: '', value: '#00000000', optionNumber: 1, active: false },
		{ label: '', value: '#000000', optionNumber: 2, active: false },
		{ label: '', value: '#FFFFFF', optionNumber: 3, active: false },
		{ label: '', value: '#808080', optionNumber: 4, active: false },
	];
	const menuLabel = '';

	function handleComponentBgColorChanged(e: CustomEvent<{ selected: string | number }>) {
		const { selected } = e.detail;
		if (typeof selected === 'string') {
			value = selected;
		}
		selectComponent.dropdownShown = false;
	}
</script>

<InputSelectList
	bind:this={selectComponent}
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{disabled}
	on:selectedOptionChanged={handleComponentBgColorChanged}
>
	<svelte:fragment slot="options">
		<BgColorOptions {options} {menuId} on:selectedOptionChanged={handleComponentBgColorChanged} />
	</svelte:fragment>

	<svelte:fragment slot="selectedValue">
		{#if !disabled}
			<div class="swatch-border">
				<ColorSwatch variant={'small'} color={selectedColorInGamut} />
			</div>
		{:else}
			<div class="swatch-border" style="width: 15px; height: 15px" />
		{/if}
	</svelte:fragment>
</InputSelectList>

<style lang="postcss">
	.swatch-border {
		--swatch-width: 15px;
		--swatch-height: 15px;
		--swatch-border-radius: 0;

		border: 1px solid var(--black4);
	}
</style>
