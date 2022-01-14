<script lang="ts">
	import Plus from '$lib/components/Icons/Plus.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;

	$: tooltip = disabled ? 'You must select a palette first' : 'Add color to the selected palette';
</script>

<ThemeButton {color} {tooltip} {disabled} on:click>
	<svelte:fragment slot="icon">
		<Plus />
	</svelte:fragment>
	<svelte:fragment slot="label">Add to Palette</svelte:fragment>
</ThemeButton>
