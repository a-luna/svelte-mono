<script lang="ts">
	import BgColorSelector from '$lib/components/ComponentEditor/ContentViewer/ComponentSection/BgColorSelector.svelte';
	import UseCustomColorCheckbox from '$lib/components/ComponentEditor/ContentViewer/ComponentSection/UseCustomColorCheckbox.svelte';
	import { alphaBgPattern } from '$lib/constants';
	import { getAppContext } from '$lib/stores';
	import { ColorParser, InputTextBox, type ComponentColor, type CssColor, type Result } from '@a-luna/shared-ui';

	export let componentColor: ComponentColor;
	let useCustomColor = false;
	let bgColorHex: string;
	let parseCustomColorResult: Result<CssColor>;
	let customColor = '#000000';
	let customColorTextBox: InputTextBox;
	let bgColor = '';
	let { app } = getAppContext();

	$: if (useCustomColor && customColorTextBox) customColorTextBox.focus();
	$: if (useCustomColor) {
		parseCustomColorResult = ColorParser.parse(customColor);
		if (parseCustomColorResult.success) {
			const customCssColor = parseCustomColorResult.value;
			bgColor = `background-color: ${customCssColor.hex};`;
		}
	} else {
		bgColor = bgColorHex === '#00000000' ? alphaBgPattern : `background-color: ${bgColorHex};`;
	}
	$: paddingBorder = `border: 1px solid var(--${componentColor}-fg-color);`;
</script>

<div class="component-padding" style="{bgColor} {paddingBorder} {$app.componentStyles}">
	<slot />
</div>
<div class="bg-color-selector">
	Background Color
	<BgColorSelector bind:value={bgColorHex} disabled={useCustomColor} />
	<UseCustomColorCheckbox {componentColor} bind:checked={useCustomColor} />
	{#if useCustomColor}
		<InputTextBox
			bind:this={customColorTextBox}
			bind:inputText={customColor}
			error={!parseCustomColorResult.success}
			disabled={!useCustomColor}
		/>
	{/if}
</div>

<style lang="postcss">
	.component-padding {
		padding: 0.75rem;
		border-radius: 6px;
		width: auto;
	}
	.bg-color-selector {
		--select-list-width: 58px;
		--select-list-height: 30px;
		--select-list-flex: 0 0 var(--select-list-width);
		--select-list-margin: 0;
		--select-list-padding: 4px 10px;
		--swatch-width: 15px;
		--swatch-height: 15px;
		--swatch-border-radius: 0;
		--select-list-menu-item-text-align: center;

		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		line-height: 1;
		font-weight: 500;
		white-space: nowrap;
	}
</style>
