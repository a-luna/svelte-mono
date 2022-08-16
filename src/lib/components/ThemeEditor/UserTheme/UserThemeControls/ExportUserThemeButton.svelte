<script lang="ts">
	import Export from '$lib/components/Icons/Export.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
</script>

<ThemeButton {color} tooltip={'Export User Theme (CSS)'} {disabled} iconWidth={'25px'} padding={'0'} on:click>
	<svelte:fragment slot="icon">
		<Export />
	</svelte:fragment>
</ThemeButton>
