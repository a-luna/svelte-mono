<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';
	import type { ComponentColor } from '@a-luna/shared-ui/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let style: string = '';

	$: tooltip = disabled ? 'Select a palette from the list above' : 'Add color to the selected palette';
</script>

<ThemeButton {color} {tooltip} {disabled} gridStyle={style} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'plus'} />
	</svelte:fragment>
</ThemeButton>
