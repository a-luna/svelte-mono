<script lang="ts">
	import type { ComponentColor } from '@a-luna/shared-ui';
	import { ThemeButton } from '@a-luna/shared-ui/components';
	import { createEventDispatcher } from 'svelte';

	export let paletteId: string;
	export let activePaletteId: string = '';
	export let color: ComponentColor;
	export let disabled = false;
	export let tooltip: string;
	let buttonComponent: ThemeButton;

	const x11PaletteSelectedEventDispatcher = createEventDispatcher<{ x11PaletteSelected: { paletteId: string } }>();

	$: active = paletteId === activePaletteId;
	$: classList = active ? ['square-button', 'active'] : ['square-button'];

	export function focus() {
		buttonComponent?.focus();
	}
</script>

<ThemeButton
	bind:this={buttonComponent}
	{color}
	{tooltip}
	{disabled}
	{classList}
	on:click={() => x11PaletteSelectedEventDispatcher('x11PaletteSelected', { paletteId })}
/>
