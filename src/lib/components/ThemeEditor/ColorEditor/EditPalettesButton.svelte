<script lang="ts">
	import EditFilled from '$lib/components/Icons/EditFilled.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
</script>

<ThemeButton {color} tooltip={'Edit Theme Palettes'} {disabled} on:click>
	<svelte:fragment slot="icon">
		<EditFilled />
	</svelte:fragment>
	<svelte:fragment slot="label">Edit Palettes</svelte:fragment>
</ThemeButton>
