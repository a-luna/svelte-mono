<script lang="ts">
	import Checkbox from '$lib/components/Shared/Checkbox.svelte';
	import type { ComponentColor } from '$lib/types';

	export let checked: boolean;
	export let componentColor: ComponentColor;
	export let disabled: boolean;
	const style = `grid-column: 2 / span 1; grid-row: 2 / span 1;`;
</script>

<Checkbox id={'use-theme-prefix-checkbox'} color={componentColor} {style} bind:checked {disabled} on:change>
	<svelte:fragment slot="leftLabel">Use Theme Prefix?</svelte:fragment>
</Checkbox>
