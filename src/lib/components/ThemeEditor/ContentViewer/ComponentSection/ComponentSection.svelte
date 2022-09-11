<script lang="ts">
	import BgColorSelector from '$lib/components/ThemeEditor/ContentViewer/ComponentSection/BgColorSelector.svelte';
	import { alphaBgPattern } from '$lib/constants';
	import { getAppStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';

	export let editorId: string;
	export let componentColor: ComponentColor;
	let bgColorHex: string;
	let app = getAppStore(editorId);

	$: bgColor = bgColorHex === '#00000000' ? alphaBgPattern : `background-color: ${bgColorHex};`;
	$: paddingBorder = `border: 1px solid var(--${componentColor}-fg-color);`;
</script>

<div class="component-padding" style="{bgColor} {paddingBorder} {$app.componentStyles}">
	<slot />
</div>
<div class="bg-color-selector">
	Background Color
	<BgColorSelector bind:value={bgColorHex} />
</div>

<style lang="postcss">
	.component-padding {
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid;
		width: auto;
	}
	.bg-color-selector {
		--select-menu-width: 55px;
		--select-menu-height: 30px;
		--select-menu-margin: 0 6px 0 0;
		--select-menu-padding: 4px 10px;

		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-size: 0.8rem;
		line-height: 1;
		font-weight: 500;
		margin: 0 0 0 auto;
	}
</style>
