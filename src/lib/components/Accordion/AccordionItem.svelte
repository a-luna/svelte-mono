<script lang="ts">
	import { getRandomHexString } from '$lib/helpers';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let id: string = getRandomHexString(4);
	export let parentId: string;
	export let collapsed = true;
	const dispatch = createEventDispatcher();

	function toggleSection() {
		collapsed = !collapsed;
		dispatch('toggleSection', { id, expanding: !collapsed });
	}
</script>

<div id="accordion-item-{id}" class="accordion-item">
	<button
		class="accordion-button transition"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#accordion-content-{id}"
		aria-expanded="false"
		aria-controls="accordion-content-{id}"
	>
		<h2 class="accordion-heading mb-0" id="accordion-heading-{id}" on:click={() => toggleSection()}>
			<slot name="heading" />
		</h2>
	</button>
	<div
		transition:slide
		id="accordion-content-{id}"
		class="accordion-content collapsed"
		aria-labelledby="accordion-heading-{id}"
		data-bs-parent="accordion-{parentId}"
	>
		<slot name="body" />
	</div>
</div>

<style lang="postcss">
	.accordion-item {
		background-color: var(--accordion-bg-color, var(--light-gray1));
		border-radius: 0px;
		border-top-width: 0px;
		border-left-width: 0px;
		border-right-width: 0px;
		border-bottom-width: 1px;
		border-color: var(--accordion-border-color, var(--black2));
	}

	.accordion-heading {
		margin: 0;
	}

	:global(.accordion-heading.active) {
		background-color: var(--accordion-button-active-bg-color, var(--accordion-bg-color, var(--light-gray1)));
		color: var(--accordion-button-active-text-color, var(--indigo2));
	}

	.accordion-button {
		display: flex;
		position: relative;
		align-items: center;
		background-color: var(--accordion-button-bg-color, var(--accordion-bg-color, var(--light-gray1)));
		color: var(--accordion-button-text-color, var(--dark-gray2));
		text-align: left;
		font-size: 1rem;
		line-height: 1.5rem;
		border-radius: 0px;
		border-width: 0px;
		outline: 2px solid transparent;
		outline-offset: 2px;
		padding: 1rem 1.25rem;
		width: 100%;
	}

	.accordion-content {
		border-width: 0px;
		padding: 1rem 1.25rem;
	}

	.collapsed {
		display: none;
	}

	:global(.expanded) {
		display: block;
	}

	.transition {
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow,
			transform, filter, backdrop-filter;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
