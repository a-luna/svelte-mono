<script lang="ts">
	import ComponentColorOptions from '$lib/components/Shared/ComponentColorSelector/ComponentColorOptions.svelte';
	import { InputSelectList } from '@a-luna/shared-ui/components';
	import type { ComponentColor, SelectListOption } from '@a-luna/shared-ui/types';

	export let value: ComponentColor = 'black';
	export let disabled = false;
	export const menuId: string = 'select-component-color';
	let selectComponent: InputSelectList;
	const fontSize = '0.875rem';

	const options: SelectListOption[] = [
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

	function handleComponentColorChanged(e: CustomEvent<{ selectedValue: ComponentColor }>) {
		const { selectedValue } = e.detail;
		value = selectedValue;
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
	on:changed={handleComponentColorChanged}
>
	<svelte:fragment slot="options">
		<ComponentColorOptions {options} {menuId} on:changed={handleComponentColorChanged} />
	</svelte:fragment>

	<svelte:fragment slot="selectedValue">
		<div class="color-swatch" style="background-color: var(--{value}-fg-color)" />
	</svelte:fragment>
</InputSelectList>

<style lang="postcss">
	.color-swatch {
		width: 15px;
		height: 15px;
		padding: 3px;
		border: 1px solid var(--black2);
	}
</style>
