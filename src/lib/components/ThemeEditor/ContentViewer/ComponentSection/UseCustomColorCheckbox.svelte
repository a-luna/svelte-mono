<script lang="ts">
	import Checkbox from '$lib/components/Shared/Checkbox.svelte';
	import type { ComponentColor } from '$lib/types';

	export let checked: boolean;
	export let componentColor: ComponentColor;
</script>

<Checkbox id={'use-custom-color-checkbox'} color={componentColor} bind:checked>
	<svelte:fragment slot="rightLabel">Use Custom Color</svelte:fragment>
</Checkbox>
