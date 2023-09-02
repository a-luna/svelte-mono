<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
</script>

<ThemeButton tooltip={'Export User Theme'} {disabled} iconWidth={'25px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'export'} width={'25px'} />
	</svelte:fragment>
</ThemeButton>
