<script lang="ts">
	import Checkbox from '$lib/components/Shared/Checkbox.svelte';
	import type { ComponentColor } from '$lib/types';

	export let checked: boolean;
	export let componentColor: ComponentColor;
	const style = `grid-column: 3 / span 1; grid-row: 2 / span 1;`;
</script>

<Checkbox id={'ignore-tailwinds-checkbox'} color={componentColor} {style} bind:checked>
	<svelte:fragment slot="leftLabel">Ignore Tailwinds?</svelte:fragment>
</Checkbox>
