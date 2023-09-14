<script lang="ts">
	import ColorSwatch from '$lib/components/Shared/ColorSwatch.svelte';
	import type { CssColorForColorSpace } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	export let color: CssColorForColorSpace;
	const dispatchColorSelected = createEventDispatcher<{ colorSelected: { x11Color: CssColorForColorSpace } }>();

	$: buttonToolTip = `${color.name} (${color.hex}, hue: ${color.hsl.h})`;
</script>

<div class="color-wrapper x11-color named-color">
	<div class="color-wrapper-top">
		<button
			type="button"
			title={buttonToolTip}
			on:click={() => dispatchColorSelected('colorSelected', { x11Color: color })}
		>
			<ColorSwatch {color} />
		</button>
	</div>
</div>

<style lang="postcss">
	.color-wrapper {
		--swatch-width: 28px;
		--swatch-height: 15px;

		display: flex;
		gap: 0.25rem;
		justify-content: flex-start;
		border-radius: 6px;
		-webkit-border-radius: 6px;
	}

	.color-wrapper.x11-color {
	}

	.color-wrapper.named-color {
		flex-flow: column nowrap;
	}

	.color-wrapper-top {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.25rem;
	}

	button {
		flex: 0 1 auto;
		border-width: 2px;
		border-style: inset;
	}

	.x11-color button {
		height: 19px;
	}
</style>
