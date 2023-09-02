<script lang="ts">
	import { InputSelectList } from '@a-luna/shared-ui/components';
	import type { SelectListOption } from '@a-luna/shared-ui/types';
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let disabled = false;
	export let allSelectors: string[] = [];
	let options: SelectListOption[] = [];
	const noSelection = { label: '', value: '', optionNumber: 1, active: false };
	const menuId = 'css-rule-selector';
	const menuLabel = '';
	const dispatch = createEventDispatcher<{ cssRuleSelectorChanged: { selector: string } }>();

	$: options = [
		noSelection,
		...allSelectors.map((sel, i) => ({ label: sel, value: sel, optionNumber: i + 2, active: false })),
	];
	$: style = `grid-column: 3 / span 1; grid-row: 2 / span 1; --select-list-width: 100%;`;

	function handleSelectorChanged(e: CustomEvent<{ selected: string | number }>) {
		const { selected } = e.detail;
		if (typeof selected === 'string') {
			value = selected;
			dispatch('cssRuleSelectorChanged', { selector: selected });
		}
	}
</script>

<InputSelectList
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{disabled}
	{style}
	on:selectedOptionChanged={handleSelectorChanged}
/>
