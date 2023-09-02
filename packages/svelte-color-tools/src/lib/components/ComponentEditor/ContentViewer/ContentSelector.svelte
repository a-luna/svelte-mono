<script lang="ts">
	import { getAppContext } from '$lib/context';

	let { themeEditor } = getAppContext();

	$: componentShown = $themeEditor.currentlyViewing === 'component';
	$: cssShown = $themeEditor.currentlyViewing === 'css';
	$: jsonShown = $themeEditor.currentlyViewing === 'json';
</script>

<div class="button-wrapper">
	<button
		type="button"
		title="View Component"
		class:active={componentShown}
		class="first"
		on:click={() => ($themeEditor.currentlyViewing = 'component')}>Component</button
	>
	<button
		type="button"
		title="View CSS Variables"
		class:active={cssShown}
		on:click={() => ($themeEditor.currentlyViewing = 'css')}>CSS</button
	>
	<button
		type="button"
		title="Download Theme JSON"
		class:active={jsonShown}
		class="last"
		on:click={() => ($themeEditor.currentlyViewing = 'json')}>JSON</button
	>
	<div class="placeholder" />
</div>

<style lang="postcss">
	.button-wrapper {
		display: grid;
		grid-template-columns: repeat(3, auto) 1fr;
		place-items: center;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		background-color: transparent;

		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
	}

	button {
		background-color: var(--bg-color);
		color: var(--fg-color);
		padding: 0.5rem 1rem;
		font-weight: 500;
		font-size: 0.85rem;
		min-width: 110px;
		border-top: 1px solid var(--fg-color);
		border-left: 0.5px solid var(--fg-color);
		border-right: 0.5px solid var(--fg-color);
		border-bottom: 1px solid var(--fg-color);
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}

	button:hover {
		background-color: var(--hover-bg-color);
	}
	button.active,
	button:active,
	button:focus,
	button:active:focus {
		background-color: var(--active-bg-color);
		border-bottom: 1px solid transparent;
	}
	button.first {
		border-left: 1px solid var(--fg-color);
	}
	button.last {
		border-right: 1px solid var(--fg-color);
	}
	.placeholder {
		background-color: var(--white1);
		width: 100%;
		flex: 1;
		height: 100%;
		align-items: flex-end;
	}
</style>
