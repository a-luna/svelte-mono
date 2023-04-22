<script lang="ts">
	import ContentSections from '$lib/components/ComponentEditor/ContentViewer/ContentSections.svelte';
	import ContentSelector from '$lib/components/ComponentEditor/ContentViewer/ContentSelector.svelte';
	import type { ComponentColor } from '$lib/types';
	import irBlack from 'svelte-highlight/styles/ir-black';

	export let editorId: string;
	export let componentColor: ComponentColor;
	export let themeInitialized: boolean;
	let contentSections: ContentSections;

	export const changeComponentPrefix = (usePrefix: boolean, newPrefix: string) =>
		contentSections.changeComponentPrefix(usePrefix, newPrefix);
</script>

<svelte:head>
	{@html irBlack}
</svelte:head>

<div class="content-viewer">
	<ContentSelector {editorId} />
	<div class="bg-left" />
	<div class="bg-right" />
	<div class="content-wrapper">
		<ContentSections bind:this={contentSections} {editorId} {componentColor} {themeInitialized}>
			<slot />
		</ContentSections>
	</div>
</div>

<style lang="postcss">
	.content-viewer {
		--select-menu-width: 110px;

		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto 1fr;
		border-radius: 6px;
		color: var(--fg-color, --black2);
	}

	.bg-left,
	.bg-right {
		background-color: var(--button-hover-bg-color);
		z-index: 1;

		grid-row: 2 / span 1;
	}

	.bg-left {
		border-left: 1px solid var(--fg-color, --black2);
		border-bottom: 1px solid var(--fg-color, --black2);
		border-bottom-left-radius: 6px;
		border-top-left-radius: 0;

		grid-column: 1 / span 1;
	}

	.bg-right {
		border-top: 1px solid var(--fg-color, --black2);
		border-right: 1px solid var(--fg-color, --black2);
		border-bottom: 1px solid var(--fg-color, --black2);
		border-bottom-right-radius: 6px;
		border-top-right-radius: 6px;
		margin-top: -1px;

		grid-column: 2 / span 1;
	}

	.content-wrapper {
		line-height: 1.4;
		font-size: 0.875rem;
		display: flex;
		flex-flow: column nowrap;
		z-index: 2;
		margin: 0 auto 0 0;
		padding: 2px;
		width: 100%;

		grid-column: 1 / span 2;
		grid-row: 2 / span 1;
	}
</style>
