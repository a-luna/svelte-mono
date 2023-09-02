<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let compact = true;
	export let disabled = false;
	export let width: string = 'auto';
</script>

{#if compact}
	<ThemeButton tooltip={'Create New Color Theme'} {disabled} iconWidth={'16px'} wrapperWidth={'32px'} on:click>
		<svelte:fragment slot="icon">
			<BasicIconRenderer icon={'palette'} width={'16px'} />
		</svelte:fragment>
	</ThemeButton>
{:else}
	<ThemeButton tooltip={'Create New Color Theme'} {disabled} iconWidth={'16px'} wrapperWidth={width} on:click>
		<svelte:fragment slot="icon">
			<BasicIconRenderer icon={'palette'} width={'16px'} />
		</svelte:fragment>
		<svelte:fragment slot="label">New Theme</svelte:fragment>
	</ThemeButton>
{/if}
