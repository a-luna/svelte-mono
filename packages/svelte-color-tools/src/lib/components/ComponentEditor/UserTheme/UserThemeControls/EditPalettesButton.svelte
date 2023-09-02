<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
</script>

<ThemeButton tooltip={'Edit Palettes'} {disabled} iconWidth={'14px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'palette'} width={'14px'} />
	</svelte:fragment>
</ThemeButton>
