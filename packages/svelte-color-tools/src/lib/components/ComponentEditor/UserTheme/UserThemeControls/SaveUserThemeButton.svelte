<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
</script>

<ThemeButton tooltip={'Download User Theme as JSON'} {disabled} iconWidth={'16px'} wrapperWidth={'32px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'save'} width={'16px'} />
	</svelte:fragment>
</ThemeButton>
