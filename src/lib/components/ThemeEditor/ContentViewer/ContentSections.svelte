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
	class="component-padding"
	class:visible={$state.currentlyViewing === 'component'}
	class:invisible={$state.currentlyViewing !== 'component'}
	style="{alphaBgPattern} {paddingBorder} {$app.componentStyles}"
>
	<slot />
</div>
<div
	class="css-section-wrapper"
	class:visible={$state.currentlyViewing === 'css'}
	class:invisible={$state.currentlyViewing !== 'css'}
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
	.component-padding {
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid;
		width: auto;
	}
	.css-section-wrapper {
		--sst-font-size: 13px;

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
