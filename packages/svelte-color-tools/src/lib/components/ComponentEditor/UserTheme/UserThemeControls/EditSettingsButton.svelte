<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
</script>

<ThemeButton tooltip={'Edit Theme Settings'} {disabled} iconWidth={'21px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'gear'} width={'21px'} />
	</svelte:fragment>
</ThemeButton>
