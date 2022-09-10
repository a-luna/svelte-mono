<script lang="ts">
	import SelectAll from '$lib/components/Icons/SelectAll.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let componentColor: ComponentColor;
	export let disabled = false;
	export let style: string = '';
</script>

<ThemeButton
	color={componentColor}
	gridStyle={style}
	tooltip={'Select All CSS Custom Properties'}
	{disabled}
	iconWidth={'18px'}
	on:click
>
	<svelte:fragment slot="icon">
		<SelectAll />
	</svelte:fragment>
	<svelte:fragment slot="label">Select All</svelte:fragment>
</ThemeButton>
