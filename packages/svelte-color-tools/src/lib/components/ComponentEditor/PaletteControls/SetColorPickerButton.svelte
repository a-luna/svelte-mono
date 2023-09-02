<script lang="ts">
	import { BasicIconRenderer, ThemeButton } from '@a-luna/shared-ui/components';

	export let disabled = false;
	export let style: string = '';
</script>

<ThemeButton
	gridStyle={style}
	tooltip={'Set Color Picker Value to Selected Color'}
	{disabled}
	iconWidth={'13px'}
	wrapperWidth={'32px'}
	on:click
>
	<svelte:fragment slot="icon">
		<BasicIconRenderer icon={'handpointup'} />
	</svelte:fragment>
</ThemeButton>
