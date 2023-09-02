<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
	export let wrapperWidth: string = '';
	export let style: string = '';
</script>

<ThemeButton
	gridStyle={style}
	tooltip={'Deselect All CSS Custom Properties'}
	{disabled}
	iconWidth={'18px'}
	{wrapperWidth}
	on:click
>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'selectnone'} width={'18px'} />
	</svelte:fragment>
	<svelte:fragment slot="label">Deselect All</svelte:fragment>
</ThemeButton>
