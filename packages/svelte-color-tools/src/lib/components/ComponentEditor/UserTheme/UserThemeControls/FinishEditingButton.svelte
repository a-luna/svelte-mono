<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui';
</script>

<ThemeButton tooltip={'Save Changes'} alignSelf={'center'} iconWidth={'14px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'check'} width={'14px'} />
	</svelte:fragment>
</ThemeButton>
