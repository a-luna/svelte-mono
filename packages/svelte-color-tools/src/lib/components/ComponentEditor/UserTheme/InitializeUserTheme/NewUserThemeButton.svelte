<script lang="ts">
	import Palette from '$lib/components/Icons/Palette.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let compact = true;
	export let color: ComponentColor = 'black';
	export let disabled = false;
	export let width: string = null;
</script>

{#if compact}
	<ThemeButton {color} tooltip={'Create New Color Theme'} {disabled} iconWidth={'16px'} wrapperWidth={'32px'} on:click>
		<svelte:fragment slot="icon">
			<Palette />
		</svelte:fragment>
	</ThemeButton>
{:else}
	<ThemeButton {color} tooltip={'Create New Color Theme'} {disabled} iconWidth={'16px'} wrapperWidth={width} on:click>
		<svelte:fragment slot="icon">
			<Palette />
		</svelte:fragment>
		<svelte:fragment slot="label">New Theme</svelte:fragment>
	</ThemeButton>
{/if}
