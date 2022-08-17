<script lang="ts">
	import { getThemeEditorStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';

	export let editorId: string;
	export let componentColor: ComponentColor;
	let state = getThemeEditorStore(editorId);

	$: buttonType = componentColor !== 'black' ? 'color' : 'black';
	$: style = `--button-hue: var(--${componentColor}-hue)`;
	$: componentShown = $state.currentlyViewing === 'component';
	$: cssShown = $state.currentlyViewing === 'css';
	$: jsonShown = $state.currentlyViewing === 'json';
</script>

<div class="button-wrapper" {style} class:black={buttonType === 'black'} class:color={buttonType === 'color'}>
	<button
		type="button"
		title="View Component"
		class:active={componentShown}
		class="first"
		on:click={() => ($state.currentlyViewing = 'component')}>Component</button
	>
	<button
		type="button"
		title="View CSS Variables"
		class:active={cssShown}
		on:click={() => ($state.currentlyViewing = 'css')}>CSS</button
	>
	<button
		type="button"
		title="Download Theme JSON"
		class:active={jsonShown}
		class="last"
		on:click={() => ($state.currentlyViewing = 'json')}>JSON</button
	>
	<div class="placeholder" />
</div>

<style lang="postcss">
	.button-wrapper.color {
		--button-bg-color: hsl(var(--button-hue, 0), var(--bg-sat, 0%), 90%);
		--button-hover-bg-color: hsl(var(--button-hue, 0), var(--bg-sat, 0%), 99%);
		--button-fg-color: hsl(var(--button-hue, 0), var(--fg-sat, 0%), var(--fg-light, 10%));
		--section-bg-color: hsl(var(--button-hue, 0), var(--bg-sat, 0%), 95%);
		--button-border-color: hsl(var(--button-hue, 0), 63%, 26%);
	}

	.button-wrapper.black {
		--button-bg-color: var(--white2);
		--button-hover-bg-color: var(--white3);
		--button-fg-color: var(--black2);
		--button-border-color: var(--black2);
	}

	.button-wrapper {
		display: grid;
		grid-template-columns: repeat(3, auto) 1fr;
		place-items: center;
		background-color: var(--section-bg-color);
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		background-color: var(--white1);
	}

	button {
		background-color: var(--section-bg-color);
		color: var(--button-fg-color);
		padding: 0.5rem 1rem;
		font-weight: 500;
		font-size: 0.85rem;
		min-width: 110px;
		border-bottom: 1px solid var(--button-border-color);
		border-top: 1px solid var(--button-border-color);
		border-left: 0.5px solid var(--button-border-color);
		border-right: 0.5px solid var(--button-border-color);
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}

	button.active {
		border-bottom: 1px solid var(--button-hover-bg-color);
	}

	button:hover,
	button:active,
	button:focus,
	button:active:focus {
		background-color: var(--button-bg-color);
	}
	button.active {
		background-color: var(--button-hover-bg-color);
	}
	button.first {
		border-left: 1px solid var(--button-border-color);
	}
	button.last {
		border-right: 1px solid var(--button-border-color);
	}
	.placeholder {
		background-color: var(--white1);
		width: 100%;
		flex: 1;
		height: 100%;
		align-items: flex-end;
		border-bottom: 1px solid var(--button-border-color);
	}
</style>
