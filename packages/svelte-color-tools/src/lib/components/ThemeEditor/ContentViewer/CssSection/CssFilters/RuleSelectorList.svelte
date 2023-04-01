<script lang="ts">
	import Select from '$lib/components/Shared/Select/Select.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let disabled = false;
	export let allSelectors: string[] = [];
	let options: SelectMenuOption[] = [];
	const noSelection = { label: '', value: '', optionNumber: 1, active: false };
	const menuId = 'css-rule-selector';
	const menuLabel = '';
	const dispatch = createEventDispatcher();

	$: options = [
		noSelection,
		...allSelectors.map((sel, i) => ({ label: sel, value: sel, optionNumber: i + 2, active: false })),
	];
	$: style = `grid-column: 3 / span 1; grid-row: 2 / span 1;`;

	function handleSelectorChanged(selector: string) {
		value = selector;
		dispatch('cssRuleSelectorChanged', selector);
	}
</script>

<Select
	{menuLabel}
	{options}
	selectedValue={value}
	{menuId}
	{disabled}
	{style}
	on:changed={(e) => handleSelectorChanged(e.detail)}
/>
