<script lang="ts">
	import Save from '$lib/components/Icons/Save.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let style: string = '';
</script>

<ThemeButton
	{color}
	gridStyle={style}
	tooltip={'Update Theme Color'}
	{disabled}
	iconWidth={'16px'}
	wrapperWidth={'32px'}
	on:click
>
	<svelte:fragment slot="icon">
		<Save />
	</svelte:fragment>
</ThemeButton>
