<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { getRandomHexString } from '$lib/util';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let sectionId = `section-${getRandomHexString(4)}`;
	export let title = '';
	export let classList: string[] = [];
	export let detailsElement: HTMLDetailsElement | undefined = undefined;
	let open = false;

	const toggleDetailsElement = createEventDispatcher<{
		toggleSection: { sectionId: string };
	}>();

	function handleSectionToggled() {
		if (!detailsElement) return;
		open = detailsElement.open;
		toggleDetailsElement('toggleSection', { sectionId });
	}

	beforeNavigate(() => {
		if (detailsElement) {
			detailsElement.open = false;
		}
	});
</script>

<details
	id={sectionId}
	class={`expandable ${classList.join(', ')}`}
	bind:this={detailsElement}
	on:toggle={() => handleSectionToggled()}
>
	<summary>
		<div class="summary-wrapper">
			<slot name="summary">
				<div class="details-icon"><BasicIconRenderer icon={'chevron'} /></div>
				<span class="summary-text">{title}</span>
			</slot>
		</div>
	</summary>
	{#if open}
		<div class="toc-wrapper" in:slide={{ duration: 300, delay: 100 }} out:slide={{ duration: 300, delay: 100 }}>
			<slot />
		</div>
	{/if}
</details>

<style lang="postcss">
	details {
		flex: 1;
		width: 100%;
		padding: 0;
		margin: 0.5rem 0 0 0;
		background-color: var(--toggle-section-bg-color);
	}
	summary {
		display: list-item;
		list-style: none;
		color: var(--link-color);
		border-width: 1.5px;
		border-style: solid;
		border-color: var(--dark-gray);
		line-height: 1;
		padding: 0.75rem 0.5rem;
		cursor: pointer;
		white-space: nowrap;
		transition: background-color 0.3s ease-in;
	}
	summary:hover {
		color: var(--link-color);
		border-color: var(--link-color);
	}
	details[open] > summary {
		color: var(--toggle-section-bg-color);
		background-color: var(--link-color);
		border-color: var(--link-color);
	}
	summary > .summary-wrapper {
		display: flex;
		gap: 1rem;
		align-items: center;
		font-size: 0.9rem;
		width: 100%;
		margin: 0 0 0 0.5rem;
	}
	details[open] .details-icon {
		transform: rotate(90deg);
	}
	::marker {
		color: var(--link-color);
	}
	summary::-webkit-details-marker {
		/* Hides marker on Safari */
		display: none;
	}
	.summary-text {
		flex: 1;
	}
	.expandable :global(.code),
	.expandable :global(a code) {
		color: var(--body-text);
		background-color: var(--page-bg-color);
		font-size: 0.75rem;
		padding: 2px 3px;
		border-radius: 4px;
		box-shadow: none;
		text-decoration: none;
	}
	.details-icon {
		height: 0.9rem;
		flex: 0 1 9px;
		transition: transform 0.3s ease-in;
	}

	.toc-wrapper {
		background-color: var(--toggle-section-bg-color);
		border-top: none;
		border-left-width: 1.5px;
		border-left-style: solid;
		border-left-color: var(--dark-gray);
		border-right-width: 1.5px;
		border-right-style: solid;
		border-right-color: var(--dark-gray);
		border-bottom-width: 1.5px;
		border-bottom-style: solid;
		border-bottom-color: var(--dark-gray);
	}
	details[open] .toc-wrapper {
		border-color: var(--link-color);
	}

	@media (min-width: 640px) {
		summary {
			border-width: 2px;
			padding: 0.75rem;
		}
		summary > .summary-wrapper {
			font-size: 1rem;
		}
		.expandable :global(code),
		.expandable :global(a code) {
			font-size: 0.8rem;
		}
		.details-icon {
			height: 1rem;
			flex: 0 1 10px;
		}
		.toc-wrapper {
			border-left-width: 2px;
			border-right-width: 2px;
			border-bottom-width: 2px;
		}
	}
</style>
