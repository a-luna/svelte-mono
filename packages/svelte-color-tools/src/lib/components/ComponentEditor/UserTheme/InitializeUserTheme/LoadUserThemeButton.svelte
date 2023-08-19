<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';
	import type { ComponentColor } from '@a-luna/shared-ui/types';

	export let compact = true;
	export let color: ComponentColor = 'black';
	export let disabled = false;
	export let width: string = 'auto';
</script>

{#if compact}
	<ThemeButton {color} tooltip={'Import Color Theme'} {disabled} iconWidth={'16px'} wrapperWidth={'32px'} on:click>
		<svelte:fragment slot="icon">
			<BasicIconRenderer icon={'open'} width={'16px'} />
		</svelte:fragment>
	</ThemeButton>
{:else}
	<ThemeButton {color} tooltip={'Import Color Theme'} {disabled} iconWidth={'16px'} wrapperWidth={width} on:click>
		<svelte:fragment slot="icon">
			<BasicIconRenderer icon={'open'} width={'16px'} />
		</svelte:fragment>
		<svelte:fragment slot="label">Load Theme</svelte:fragment>
	</ThemeButton>
{/if}
