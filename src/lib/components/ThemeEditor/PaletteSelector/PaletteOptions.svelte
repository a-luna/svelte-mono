<script lang="ts">
	import Option from '$lib/components/Shared/Select/Option.svelte';
	import { getThemeEditorStore } from '$lib/context';
	import type { ComponentColor, SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let editorId: string;
	export let options: SelectMenuOption[] = [];
	export let menuId: string = '';
	export let fontSize: string = '0.95rem';
	let selectedOption: SelectMenuOption;
	let state = getThemeEditorStore(editorId);
	const dispatch = createEventDispatcher();

	function getPaletteSwatchColor(paletteId: string | number): ComponentColor {
		return $state.userTheme.palettes.find((p) => p.id === paletteId)?.componentColor ?? 'black';
	}

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
		<div class="option-wrapper">
			<div class="color-swatch" style="background-color: var(--{getPaletteSwatchColor(option.value)}-fg-color)" />
			<span>{option.label}</span>
		</div>
	</Option>
{/each}

<style lang="postcss">
	.option-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 0.5rem;
	}

	.color-swatch {
		width: 15px;
		height: 15px;
		padding: 3px;
		border: 1px solid var(--black2);
	}
</style>
