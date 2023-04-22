<script lang="ts">
	import Close from '$lib/components/Icons/Close.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
</script>

<ThemeButton {color} {disabled} tooltip={'Close User Theme'} iconWidth={'14px'} on:click>
	<svelte:fragment slot="icon">
		<Close />
	</svelte:fragment>
</ThemeButton>
