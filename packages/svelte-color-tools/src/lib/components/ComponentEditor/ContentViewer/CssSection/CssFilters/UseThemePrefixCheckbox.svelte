<script lang="ts">
	import { Checkbox, type ComponentColor } from '@a-luna/shared-ui';

	export let checked: boolean;
	export let componentColor: ComponentColor;
	export let disabled: boolean;
	const style = `grid-column: 2 / span 1; grid-row: 2 / span 1;`;
</script>

<Checkbox id={'use-theme-prefix-checkbox'} {style} bind:checked {disabled} on:change>
	<svelte:fragment slot="leftLabel">Use Theme Prefix?</svelte:fragment>
</Checkbox>
