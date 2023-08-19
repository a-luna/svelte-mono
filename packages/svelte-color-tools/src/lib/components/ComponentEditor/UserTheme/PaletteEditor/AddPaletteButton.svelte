<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';
	import type { ComponentColor } from '@a-luna/shared-ui/types';

	export let color: ComponentColor;
</script>

<ThemeButton {color} tooltip={'Add New Palette'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'plus'} />
	</svelte:fragment>
	<svelte:fragment slot="label">New Palette</svelte:fragment>
</ThemeButton>
