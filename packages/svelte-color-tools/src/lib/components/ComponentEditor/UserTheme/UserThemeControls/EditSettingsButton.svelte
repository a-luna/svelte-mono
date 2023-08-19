<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';
	import type { ComponentColor } from '@a-luna/shared-ui/types';

	export let color: ComponentColor;
	export let disabled = false;
</script>

<ThemeButton {color} tooltip={'Edit Theme Settings'} {disabled} iconWidth={'21px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'gear'} width={'21px'} />
	</svelte:fragment>
</ThemeButton>
