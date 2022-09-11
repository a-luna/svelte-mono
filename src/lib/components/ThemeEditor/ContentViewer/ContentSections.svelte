<script lang="ts">
	import { alphaBgPattern } from '$lib/constants';
	import { getAppStore, getThemeEditorStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';
	import CssSection from './CssSection/CssSection.svelte';
	import JsonSection from './JsonSection/JsonSection.svelte';

	export let editorId: string;
	export let componentColor: ComponentColor;
	export let usesTheme: boolean;
	export let themePrefix: string;
	let app = getAppStore(editorId);
	let state = getThemeEditorStore(editorId);
	let cssSection: CssSection;

	$: paddingBorder = `border: 1px solid var(--${componentColor}-fg-color);`;

	export const changeComponentPrefix = (usesTheme: boolean, newPrefix: string) =>
		cssSection.changeComponentPrefix(usesTheme, newPrefix);
</script>

<div
	class="component-wrapper"
	class:visible={$state.currentlyViewing === 'component'}
	class:invisible={$state.currentlyViewing !== 'component'}
>
	<div class="component-padding" style="{alphaBgPattern} {paddingBorder} {$app.componentStyles}">
		<slot />
	</div>
</div>
<div
	class="css-section-wrapper"
	class:visible={$state.currentlyViewing === 'css'}
	class:invisible={$state.currentlyViewing !== 'css'}
	style="--bg-color: var(--{componentColor}-bg-color); --fg-color: var(--{componentColor}-fg-color); --active-fg-color: var(--{componentColor}-active-fg-color); --disabled-bg-color: var(--{componentColor}-hover-bg-color);  --hover-bg-color: var(--{componentColor}-hover-bg-color);"
>
	<CssSection bind:this={cssSection} {componentColor} {usesTheme} {themePrefix} />
</div>
<div
	class="json-section-wrapper"
	class:visible={$state.currentlyViewing === 'json'}
	class:invisible={$state.currentlyViewing !== 'json'}
>
	<JsonSection />
</div>

<style lang="postcss">
	.component-wrapper {
		padding: 1rem;
		background-color: var(--hover-bg-color);
	}

	.component-padding {
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid;
		width: auto;
	}
	.css-section-wrapper {
		--sst-font-size: 13px;
		--sst-table-wrapper-margin: 0;

		display: flex;
		flex-flow: column nowrap;
	}
	.invisible {
		visibility: hidden;
		height: 1px;
		padding: 0;
	}
	.visible {
		visibility: visible;
	}
</style>
