<script lang="ts">
	import { BasicIconRenderer, ThemeButton, type ComponentColor } from '@a-luna/shared-ui';

	export let color: ComponentColor;
</script>

<ThemeButton {color} tooltip={'Save Changes'} alignSelf={'center'} iconWidth={'14px'} on:click>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'check'} width={'14px'} />
	</svelte:fragment>
</ThemeButton>
