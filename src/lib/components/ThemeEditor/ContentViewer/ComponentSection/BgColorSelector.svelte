<script lang="ts">
	import { parseColorFromString } from '$lib/color';
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import Select from '$lib/components/Shared/Select/Select.svelte';
	import BgColorOptions from '$lib/components/ThemeEditor/ContentViewer/ComponentSection/BgColorOptions.svelte';
	import type { SelectMenuOption } from '$lib/types';

	export let value: string = '#00000000';
	export let disabled = false;
	export const menuId: string = 'select-component-bg-color';
	let selectComponent: Select;

	const options: SelectMenuOption[] = [
		{ label: '', value: '#00000000', optionNumber: 1, active: false },
		{ label: '', value: '#000000', optionNumber: 2, active: false },
		{ label: '', value: '#FFFFFF', optionNumber: 3, active: false },
		{ label: '', value: '#808080', optionNumber: 4, active: false },
	];
	const menuLabel = '';

	function handleComponentBgColorChanged(color: string) {
		value = color;
		selectComponent.dropdownShown = false;
	}
</script>

<Select
	bind:this={selectComponent}
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{disabled}
	on:changed={(e) => handleComponentBgColorChanged(e.detail)}
>
	<svelte:fragment slot="options">
		<BgColorOptions {options} {menuId} on:changed={(e) => handleComponentBgColorChanged(e.detail)} />
	</svelte:fragment>

	<svelte:fragment slot="selectedValue">
		<div class="swatch-border">
			<ColorSwatch color={parseColorFromString(value).value} swatchWidth={'15px'} swatchHeight={'15px'} />
		</div>
	</svelte:fragment>
</Select>

<style lang="postcss">
	.swatch-border {
		border: 1px solid var(--black4);
	}
</style>
