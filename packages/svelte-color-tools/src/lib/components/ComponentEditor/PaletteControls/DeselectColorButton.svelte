<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';
	import type { ComponentColor } from '@a-luna/shared-ui/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let style: string = '';
</script>

<ThemeButton
	{color}
	gridStyle={style}
	tooltip={'Deselect Theme Color'}
	{disabled}
	iconWidth={'22px'}
	wrapperWidth={'32px'}
	on:click
>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'deselect'} width={'22px'} />
	</svelte:fragment>
</ThemeButton>
