<script lang="ts">
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let tooltip: string;
	let buttonComponent: ThemeButton;

	export function focus() {
		buttonComponent.focus();
	}
</script>

<ThemeButton bind:this={buttonComponent} {color} {tooltip} {disabled} classList={['square-button']} on:click />
