<script lang="ts">
	import ComponentSection from '$lib/components/ThemeEditor/ContentViewer/ComponentSection/ComponentSection.svelte';
	import CssSection from '$lib/components/ThemeEditor/ContentViewer/CssSection/CssSection.svelte';
	import JsonSection from '$lib/components/ThemeEditor/ContentViewer/JsonSection/JsonSection.svelte';
	import { getThemeEditorStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';

	export let editorId: string;
	export let componentColor: ComponentColor;
	export let themeInitialized: boolean;
	let state = getThemeEditorStore(editorId);
	let cssSection: CssSection;

	export const changeComponentPrefix = (usePrefix: boolean, newPrefix: string) =>
		cssSection.handleUserThemeChanged(usePrefix, newPrefix);
</script>

<div
	class="component-wrapper"
	class:visible={$state.currentlyViewing === 'component'}
	class:invisible={$state.currentlyViewing !== 'component'}
>
	<ComponentSection {editorId} {componentColor}>
		<slot />
	</ComponentSection>
</div>
<div
	class="css-section-wrapper"
	class:visible={$state.currentlyViewing === 'css'}
	class:invisible={$state.currentlyViewing !== 'css'}
	style="--bg-color: var(--{componentColor}-bg-color); --fg-color: var(--{componentColor}-fg-color); --active-fg-color: var(--{componentColor}-active-fg-color); --disabled-bg-color: var(--{componentColor}-hover-bg-color);  --hover-bg-color: var(--{componentColor}-hover-bg-color);"
>
	<CssSection bind:this={cssSection} {editorId} {componentColor} {themeInitialized} />
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
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;

		padding: 1rem;
		background-color: var(--hover-bg-color);
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
