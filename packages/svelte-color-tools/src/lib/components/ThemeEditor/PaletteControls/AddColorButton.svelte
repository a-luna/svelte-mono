<script lang="ts">
	import Plus from '$lib/components/Icons/Plus.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let style: string = '';

	$: tooltip = disabled ? 'Select a palette from the list above' : 'Add color to the selected palette';
</script>

<ThemeButton {color} {tooltip} {disabled} gridStyle={style} on:click>
	<svelte:fragment slot="icon">
		<Plus />
	</svelte:fragment>
</ThemeButton>
