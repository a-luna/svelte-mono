<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let compact = true;
	export let disabled = false;
	export let width: string = 'auto';
</script>

{#if compact}
	<ThemeButton tooltip={'Import Color Theme'} {disabled} iconWidth={'16px'} wrapperWidth={'32px'} on:click>
		<svelte:fragment slot="icon">
			<BasicIconRenderer icon={'open'} width={'16px'} />
		</svelte:fragment>
	</ThemeButton>
{:else}
	<ThemeButton tooltip={'Import Color Theme'} {disabled} iconWidth={'16px'} wrapperWidth={width} on:click>
		<svelte:fragment slot="icon">
			<BasicIconRenderer icon={'open'} width={'16px'} />
		</svelte:fragment>
		<svelte:fragment slot="label">Load Theme</svelte:fragment>
	</ThemeButton>
{/if}
