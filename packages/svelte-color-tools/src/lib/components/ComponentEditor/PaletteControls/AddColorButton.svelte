<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
	export let style: string = '';

	$: tooltip = disabled ? 'Select a palette from the list above' : 'Add color to the selected palette';
</script>

<ThemeButton {tooltip} {disabled} gridStyle={style} iconWidth={'16px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'plus'} />
	</svelte:fragment>
</ThemeButton>
