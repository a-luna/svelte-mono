<script lang="ts">
	import { alphaBgPattern } from '$lib/constants';
	import { getThemeEditorStore } from '$lib/context';
	import type { ComponentColor } from '$lib/types';

	export let editorId: string;
	export let componentColor: ComponentColor;
	let state = getThemeEditorStore(editorId);

	$: paddingBorder = `border: 1px solid var(--${componentColor}-fg-color);`;
</script>

{#if $state.currentlyViewing === 'component'}
	<div class="content-wrapper">
		<div class="component-padding" style="{alphaBgPattern} {paddingBorder}">
			<slot />
		</div>
	</div>
{/if}
{#if $state.currentlyViewing === 'css'}
	<div class="content-wrapper" />
{/if}
{#if $state.currentlyViewing === 'json'}
	<div class="content-wrapper" />
{/if}

<style lang="postcss">
	.content-wrapper {
		line-height: 1.4;
		font-size: 0.875rem;
		display: flex;
		flex-flow: column nowrap;
		padding: 0.5rem;
		gap: 0.5rem;
		z-index: 2;
		margin: 0 auto 0 0;

		grid-column: 1 / span 2;
		grid-row: 2 / span 1;
	}

	.component-padding {
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid;
	}
</style>
