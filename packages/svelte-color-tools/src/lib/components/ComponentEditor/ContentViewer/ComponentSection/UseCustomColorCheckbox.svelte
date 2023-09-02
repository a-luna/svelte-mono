<script lang="ts">
	import { Checkbox, type ComponentColor } from '@a-luna/shared-ui';

	export let checked: boolean;
	export let componentColor: ComponentColor;
</script>

<Checkbox id={'use-custom-color-checkbox'} bind:checked>
	<svelte:fragment slot="rightLabel">Use Custom Color</svelte:fragment>
</Checkbox>
