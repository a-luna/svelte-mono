<script lang="ts">
	import ContentSections from '$lib/components/ThemeEditor/ContentViewer/ContentSections.svelte';
	import ContentSelector from '$lib/components/ThemeEditor/ContentViewer/ContentSelector.svelte';
	import type { ComponentColor } from '$lib/types';
	import irBlack from 'svelte-highlight/styles/ir-black';

	export let editorId: string;
	export let componentColor: ComponentColor;
	export let usesTheme: boolean;
	export let themePrefix: string;
	let contentSections: ContentSections;

	$: buttonType = componentColor !== 'black' ? 'color' : 'black';
	$: viewerStyle = `color: var(--${componentColor}-fg-color);`;
	$: bgLeftStyle = `border-left: 1px solid var(--${componentColor}-fg-color); border-bottom: 1px solid var(--${componentColor}-fg-color);`;
	$: bgRightStyle = `border-top: 1px solid var(--${componentColor}-fg-color); border-right: 1px solid var(--${componentColor}-fg-color); border-bottom: 1px solid var(--${componentColor}-fg-color);`;
	$: style = `--button-hue: var(--${componentColor}-hue); --select-menu-width: 110px; ${viewerStyle}`;

	export const changeComponentPrefix = (usesTheme: boolean, newPrefix: string) =>
		contentSections.changeComponentPrefix(usesTheme, newPrefix);
</script>

<svelte:head>
	{@html irBlack}
</svelte:head>

<div class="content-viewer" {style} class:black={buttonType === 'black'} class:color={buttonType === 'color'}>
	<ContentSelector {editorId} />
	<div class="bg-left" style={bgLeftStyle} />
	<div class="bg-right" style={bgRightStyle} />
	<div class="content-wrapper">
		<ContentSections bind:this={contentSections} {editorId} {componentColor} {usesTheme} {themePrefix}>
			<slot />
		</ContentSections>
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
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto 1fr;
		border-radius: 6px;
	}

	.bg-left,
	.bg-right {
		background-color: var(--button-hover-bg-color);
		z-index: 1;

		grid-row: 2 / span 1;
	}

	.bg-left {
		border-bottom-left-radius: 6px;
		border-top-left-radius: 0;

		grid-column: 1 / span 1;
	}

	.bg-right {
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
		width: 100%;

		grid-column: 1 / span 2;
		grid-row: 2 / span 1;
	}
</style>
