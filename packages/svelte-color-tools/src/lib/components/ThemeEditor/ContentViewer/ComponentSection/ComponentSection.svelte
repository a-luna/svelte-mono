<script lang="ts">
	import { parseColorFromString } from '$lib/color';
	import InputTextBox from '$lib/components/Shared/InputTextBox.svelte';
	import BgColorSelector from '$lib/components/ThemeEditor/ContentViewer/ComponentSection/BgColorSelector.svelte';
	import { alphaBgPattern } from '$lib/constants';
	import { getAppStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';
	import UseCustomColorCheckbox from './UseCustomColorCheckbox.svelte';

	export let editorId: string;
	export let componentColor: ComponentColor;
	let useCustomColor = false;
	let bgColorHex: string;
	let customColor = '#000000';
	let customColorTextBox: InputTextBox;
	let app = getAppStore(editorId);

	$: if (useCustomColor && customColorTextBox) customColorTextBox.focus();
	$: parseCustomColorResult = useCustomColor ? parseColorFromString(customColor) : { success: false };
	$: customCssColor = parseCustomColorResult.success ? parseCustomColorResult.value : null;
	$: bgColor = parseCustomColorResult.success
		? `background-color: ${customCssColor.hexAlpha};`
		: bgColorHex === '#00000000'
		? alphaBgPattern
		: `background-color: ${bgColorHex};`;
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
		border: 1px solid;
		width: auto;
	}
	.bg-color-selector {
		--select-menu-width: 58px;
		--select-menu-height: 30px;
		--select-menu-margin: 0 6px 0 0;
		--select-menu-padding: 4px 10px;

		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		line-height: 1;
		font-weight: 500;
		white-space: nowrap;
	}
</style>
