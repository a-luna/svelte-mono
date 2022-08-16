<script lang="ts">
	import Gear from '$lib/components/Icons/Gear.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
</script>

<ThemeButton {color} tooltip={'Edit Theme Settings'} {disabled} iconWidth={'21px'} padding={'0'} on:click>
	<svelte:fragment slot="icon">
		<Gear />
	</svelte:fragment>
</ThemeButton>
