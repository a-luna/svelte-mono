<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';
</script>

<ThemeButton tooltip={'Add New Palette'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'plus'} />
	</svelte:fragment>
	<svelte:fragment slot="label">New Palette</svelte:fragment>
</ThemeButton>
