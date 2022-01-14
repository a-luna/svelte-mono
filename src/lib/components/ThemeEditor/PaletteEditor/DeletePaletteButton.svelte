<script lang="ts">
	import Minus from '$lib/components/Icons/Minus.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let tooltip: string;
</script>

<ThemeButton {color} {tooltip} {disabled} on:click>
	<svelte:fragment slot="icon">
		<Minus />
	</svelte:fragment>
</ThemeButton>
