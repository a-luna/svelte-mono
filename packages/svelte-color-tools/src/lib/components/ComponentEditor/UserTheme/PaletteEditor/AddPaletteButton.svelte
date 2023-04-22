<script lang="ts">
	import Plus from '$lib/components/Icons/Plus.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
</script>

<ThemeButton {color} tooltip={'Add New Palette'} on:click>
	<svelte:fragment slot="icon">
		<Plus />
	</svelte:fragment>
	<svelte:fragment slot="label">New Palette</svelte:fragment>
</ThemeButton>
