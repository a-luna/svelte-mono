<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
</script>

<ThemeButton {disabled} tooltip={'Close User Theme'} iconWidth={'14px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'close'} width={'14px'} />
	</svelte:fragment>
</ThemeButton>
