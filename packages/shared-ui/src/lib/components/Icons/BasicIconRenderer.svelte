<script lang="ts">
	import { BASIC_ICON_MAP } from '$lib/components/Icons/iconMaps';
	import type { BasicIconName } from '$lib/types/Icons';

	export let icon: BasicIconName;
	export let asButton = false;
	export let width = 'auto';
	export let height = 'auto';
	export let margin = '';

	$: style = `height: ${height}; width: ${width};${margin ? ` margin: ${margin}` : ''}`;
</script>

{#if asButton}
	<button class="icon-wrapper" {style}>
		<svelte:component this={BASIC_ICON_MAP.get(icon)} />
	</button>
{:else}
	<div class="icon-wrapper" {style}>
		<svelte:component this={BASIC_ICON_MAP.get(icon)} />
	</div>
{/if}

<style lang="postcss">
	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
