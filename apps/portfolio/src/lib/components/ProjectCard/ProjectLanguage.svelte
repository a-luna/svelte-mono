<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { LanguageOrTech } from '$lib/types';

	export let language: LanguageOrTech;

	$: icon = getFilterSettingDetails(language);
	$: languageColor = icon ? `--${icon.color}-icon` : '--accent-color';
	$: displayName = icon?.displayName;
	$: iconSize = icon?.size ?? 16;
	$: margin = Math.max(5, 23 - iconSize);
	$: style = `height: ${iconSize}px; width: ${iconSize}px; color: ${languageColor}; margin-right: ${margin}px;`;
</script>

<div class="project-language">
	<div class="icon-wrapper" {style}>
		<svelte:component this={icon?.icon} {...{ fill: languageColor }} />
	</div>
	<span class="language-name">{displayName}</span>
</div>

<style lang="postcss">
	.project-language {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		color: var(--gray-shade2);
		font-weight: 400;
	}
	.icon-wrapper {
		object-fit: contain;
		vertical-align: middle;
	}
	.language-name {
		font-size: 0.9rem;
	}

	@media screen and (min-width: 768px) {
		.language-name {
			font-size: 1rem;
		}
	}
</style>
