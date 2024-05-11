<script lang="ts">
	import { Checkbox } from '@a-luna/shared-ui';

	export let checked: boolean;
</script>

<Checkbox id={'use-custom-color-checkbox'} bind:checked>
	<svelte:fragment slot="rightLabel">Use Custom Color</svelte:fragment>
</Checkbox>
