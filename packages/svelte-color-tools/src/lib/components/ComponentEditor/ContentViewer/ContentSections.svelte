<script lang="ts">
	import ComponentSection from '$lib/components/ComponentEditor/ContentViewer/ComponentSection/ComponentSection.svelte';
	import CssSection from '$lib/components/ComponentEditor/ContentViewer/CssSection/CssSection.svelte';
	import JsonSection from '$lib/components/ComponentEditor/ContentViewer/JsonSection/JsonSection.svelte';
	import { getAppContext } from '$lib/stores';
	import type { ComponentColor } from '@a-luna/shared-ui';

	export let componentColor: ComponentColor;
	export let themeInitialized: boolean;
	let { themeEditor } = getAppContext();
	let cssSection: CssSection;

	export const changeComponentPrefix = (usePrefix: boolean, newPrefix: string) =>
		cssSection.handleUserThemeChanged(usePrefix, newPrefix);
</script>

<div
	class="component-wrapper"
	class:visible={$themeEditor.currentlyViewing === 'component'}
	class:invisible={$themeEditor.currentlyViewing !== 'component'}
>
	<ComponentSection {componentColor}>
		<slot />
	</ComponentSection>
</div>
<div
	class="css-section-wrapper"
	class:visible={$themeEditor.currentlyViewing === 'css'}
	class:invisible={$themeEditor.currentlyViewing !== 'css'}
>
	<CssSection bind:this={cssSection} {componentColor} {themeInitialized} />
</div>
<div
	class="json-section-wrapper"
	class:visible={$themeEditor.currentlyViewing === 'json'}
	class:invisible={$themeEditor.currentlyViewing !== 'json'}
>
	<JsonSection />
</div>

<style lang="postcss">
	.component-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;

		padding: 1rem;
		background-color: var(--panel-bg-color);
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
