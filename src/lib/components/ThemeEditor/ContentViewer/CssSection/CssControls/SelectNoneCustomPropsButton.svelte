<script lang="ts">
	import SelectNone from '$lib/components/Icons/SelectNone.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let componentColor: ComponentColor;
	export let disabled = false;
	export let style: string = '';
</script>

<ThemeButton
	color={componentColor}
	gridStyle={style}
	tooltip={'Deselect All CSS Custom Properties'}
	{disabled}
	iconWidth={'18px'}
	on:click
>
	<svelte:fragment slot="icon">
		<SelectNone />
	</svelte:fragment>
	<svelte:fragment slot="label">Deselect All</svelte:fragment>
</ThemeButton>
