<script lang="ts">
	import Palette from '$lib/components/Icons/Palette.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
</script>

<ThemeButton {color} tooltip={'Edit Palettes'} {disabled} iconWidth={'14px'} on:click>
	<svelte:fragment slot="icon">
		<Palette />
	</svelte:fragment>
</ThemeButton>
