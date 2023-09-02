<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
	export let tooltip: string;
</script>

<ThemeButton {tooltip} {disabled} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'minus'} />
	</svelte:fragment>
</ThemeButton>
