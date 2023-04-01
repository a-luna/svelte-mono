<script lang="ts">
	import { BASIC_ICON_MAP } from '$lib/components/Icons/iconMaps';
	import type { BasicIconName } from '$lib/types/Icons';

	export let icon: BasicIconName;
	export let width = 'auto';
	export let height = 'auto';
	export let margin = '';

	$: style = `height: ${height}; width: ${width};${margin ? ` margin: ${margin}` : ''}`;
</script>

<div class="icon-wrapper" {style}>
	<svelte:component this={BASIC_ICON_MAP.get(icon)} />
</div>
