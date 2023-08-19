<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';
	import type { ComponentColor } from '@a-luna/shared-ui/types';

	export let componentColor: ComponentColor;
	export let disabled = false;
	export let wrapperWidth: string = '';
	export let style: string = '';
</script>

<ThemeButton
	color={componentColor}
	gridStyle={style}
	tooltip={'Select All CSS Custom Properties'}
	{disabled}
	iconWidth={'18px'}
	{wrapperWidth}
	on:click
>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'selectall'} width={'18px'} />
	</svelte:fragment>
	<svelte:fragment slot="label">Select All</svelte:fragment>
</ThemeButton>
