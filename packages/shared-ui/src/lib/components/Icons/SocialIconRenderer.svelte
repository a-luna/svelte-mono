<script lang="ts">
	import { SOCIAL_ICON_MAP } from '$lib/components/Icons/iconMaps';
	import type { SocialIconName } from '$lib/types/Icons';

	export let icon: SocialIconName;
	export let title = '';
	export let width = 'auto';
	export let height = 'auto';
	export let margin = '';

	$: style = `height: ${height}; width: ${width};${margin ? ` margin: ${margin}` : ''}`;
</script>

<div class="icon-wrapper" {style}>
	<svelte:component this={SOCIAL_ICON_MAP.get(icon)} {title} />
</div>
