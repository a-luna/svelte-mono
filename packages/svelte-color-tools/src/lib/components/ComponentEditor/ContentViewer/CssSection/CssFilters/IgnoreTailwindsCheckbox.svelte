<script lang="ts">
	import { Checkbox, type ComponentColor } from '@a-luna/shared-ui';

	export let checked: boolean;
	export let componentColor: ComponentColor;
	const style = `grid-column: 4 / span 1; grid-row: 2 / span 1;`;
</script>

<Checkbox id={'ignore-tailwinds-checkbox'} {style} bind:checked>
	<svelte:fragment slot="leftLabel">Ignore Tailwinds?</svelte:fragment>
</Checkbox>
