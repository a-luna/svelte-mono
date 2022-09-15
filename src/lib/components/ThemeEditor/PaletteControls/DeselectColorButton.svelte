<script lang="ts">
	import Deselect from '$lib/components/Icons/Deselect.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let style: string = '';
</script>

<ThemeButton
	{color}
	gridStyle={style}
	tooltip={'Deselect Theme Color'}
	{disabled}
	iconWidth={'22px'}
	wrapperWidth={'32px'}
	on:click
>
	<svelte:fragment slot="icon">
		<Deselect />
	</svelte:fragment>
</ThemeButton>
