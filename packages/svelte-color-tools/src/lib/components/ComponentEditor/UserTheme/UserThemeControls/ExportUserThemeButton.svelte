<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
</script>

<ThemeButton tooltip={'Export User Theme'} {disabled} iconWidth={'18px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'export'} width={'18px'} />
	</svelte:fragment>
</ThemeButton>
