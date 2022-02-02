<script lang="ts">
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let tooltip: string;

	$: colorStyles = `--bg-color: var(--${color}-bg-color); --bg-hov-color: var(--${color}-hover-bg-color);`;
</script>

<ThemeButton {color} {tooltip} {disabled} classList={['square-button']} on:click />
