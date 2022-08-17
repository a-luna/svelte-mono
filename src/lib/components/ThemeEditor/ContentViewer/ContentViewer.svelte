<script lang="ts">
	import ContentSelector from '$lib/components/ThemeEditor/ContentViewer/ContentSelector.svelte';
	import { getAppStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';
	import irBlack from 'svelte-highlight/styles/ir-black';

	export let editorId: string;
	export let componentColor: ComponentColor;
	let app = getAppStore(editorId);

	$: viewerStyle = `color: var(--${componentColor}-fg-color); background-color: var(--${componentColor}-hover-bg-color);`;
	$: wrapperStyle = `border-bottom: 1px solid var(--${componentColor}-fg-color); border-right: 1px solid var(--${componentColor}-fg-color); border-left: 1px solid var(--${componentColor}-fg-color);`;
</script>

<svelte:head>
	{@html irBlack}
</svelte:head>

<div class="content-viewer" style="{viewerStyle} {$app.componentStyles}">
	<ContentSelector {componentColor} {editorId} />
	<div class="component-wrapper" style={wrapperStyle}>
		<slot />
	</div>
</div>

<style lang="postcss">
	.content-viewer {
		display: flex;
		flex-flow: column nowrap;
		border-radius: 6px;
	}

	.component-wrapper {
		background-color: inherit;
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
		border-top-left-radius: 0;
		border-top-right-radius: 6px;
		line-height: 1.4;
		font-size: 0.875rem;
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		padding: 1rem;
	}
</style>
