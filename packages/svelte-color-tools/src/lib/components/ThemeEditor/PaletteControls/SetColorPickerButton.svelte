<script lang="ts">
	import HandPointUp from '$lib/components/Icons/HandPointUp.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let style: string = '';
</script>

<ThemeButton
	{color}
	gridStyle={style}
	tooltip={'Set Color Picker Value to Selected Color'}
	{disabled}
	iconWidth={'13px'}
	wrapperWidth={'32px'}
	on:click
>
	<svelte:fragment slot="icon">
		<HandPointUp />
	</svelte:fragment>
</ThemeButton>
