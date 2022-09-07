<script lang="ts">
	import ComponentColorOptions from '$lib/components/Shared/ComponentColorSelector/ComponentColorOptions.svelte';
	import Select from '$lib/components/Shared/Select/Select.svelte';
	import type { ComponentColor, SelectMenuOption } from '$lib/types';

	export let value: ComponentColor = 'black';
	export let disabled = false;
	export const menuId: string = 'select-component-color';
	let selectComponent: Select;
	const width = '55px';
	const buttonHeight = '30px';
	const fontSize = '0.875rem';
	const buttonPadding = '4px 10px';
	const margin = '0 6px 0 0';

	const options: SelectMenuOption[] = [
		{ label: '', value: 'black', optionNumber: 1, active: false },
		{ label: '', value: 'red', optionNumber: 2, active: false },
		{ label: '', value: 'orange', optionNumber: 3, active: false },
		{ label: '', value: 'yellow', optionNumber: 4, active: false },
		{ label: '', value: 'green', optionNumber: 5, active: false },
		{ label: '', value: 'teal', optionNumber: 6, active: false },
		{ label: '', value: 'blue', optionNumber: 7, active: false },
		{ label: '', value: 'indigo', optionNumber: 8, active: false },
	];
	const menuLabel = '';

	function handleComponentColorChanged(color: ComponentColor) {
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
	on:changed={(e) => handleComponentColorChanged(e.detail)}
>
	<svelte:fragment slot="options">
		<ComponentColorOptions {options} {menuId} {fontSize} on:changed={(e) => handleComponentColorChanged(e.detail)} />
	</svelte:fragment>

	<svelte:fragment slot="selectedValue">
		<div class="color-swatch" style="background-color: var(--{value}-fg-color)" />
	</svelte:fragment>
</Select>

<style lang="postcss">
	.color-swatch {
		width: 15px;
		height: 15px;
		padding: 3px;
		border: 1px solid var(--black2);
	}
</style>
