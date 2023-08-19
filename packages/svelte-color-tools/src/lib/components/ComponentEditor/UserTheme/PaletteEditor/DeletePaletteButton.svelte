<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';
	import type { ComponentColor } from '@a-luna/shared-ui/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let tooltip: string;
</script>

<ThemeButton {color} {tooltip} {disabled} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'minus'} />
	</svelte:fragment>
</ThemeButton>
