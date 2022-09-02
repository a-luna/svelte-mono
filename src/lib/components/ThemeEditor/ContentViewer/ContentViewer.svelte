<script lang="ts">
	import ContentSelector from '$lib/components/ThemeEditor/ContentViewer/ContentSelector.svelte';
	import { getAppStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';
	import irBlack from 'svelte-highlight/styles/ir-black';

	export let editorId: string;
	export let componentColor: ComponentColor;
	let app = getAppStore(editorId);

	$: buttonType = componentColor !== 'black' ? 'color' : 'black';
	$: viewerStyle = `color: var(--${componentColor}-fg-color);`;
	$: wrapperStyle = `border: 1px solid var(--${componentColor}-fg-color);`;
	$: style = `--button-hue: var(--${componentColor}-hue); ${viewerStyle} ${$app.componentStyles}`;
</script>

<svelte:head>
	{@html irBlack}
</svelte:head>

<div class="content-viewer" {style} class:black={buttonType === 'black'} class:color={buttonType === 'color'}>
	<ContentSelector {editorId} />
	<div class="component-wrapper" style={wrapperStyle}>
		<slot />
	</div>
</div>

<style lang="postcss">
	.content-viewer.color {
		--button-bg-color: hsl(var(--button-hue, 0), var(--bg-sat, 0%), 90%);
		--button-hover-bg-color: hsl(var(--button-hue, 0), var(--bg-sat, 0%), 99%);
		--button-fg-color: hsl(var(--button-hue, 0), var(--fg-sat, 0%), var(--fg-light, 10%));
		--section-bg-color: hsl(var(--button-hue, 0), var(--bg-sat, 0%), 95%);
		--button-border-color: hsl(var(--button-hue, 0), 63%, 26%);
	}

	.content-viewer.black {
		--button-bg-color: var(--white2);
		--button-hover-bg-color: var(--white3);
		--button-fg-color: var(--black2);
		--button-border-color: var(--black2);
	}
	.content-viewer {
		display: flex;
		flex-flow: column nowrap;
		border-radius: 6px;
	}

	.component-wrapper {
		background-color: var(--button-hover-bg-color);
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
