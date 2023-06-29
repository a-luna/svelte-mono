<script lang="ts">
	import { getHelpTopicIndex } from '$lib/components/AlgorithmDemo/HelpDocs/_helpSections';
	import { getAppContext } from '$lib/stores/context';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let helpTopic: string = 'why-base64-1';
	export let helpTopicsExpanded = false;
	export let name: string = null;
	export let disabled = false;
	export let margin = '0';
	export let style = '';
	const openHelpModalEventDispatcher = createEventDispatcher<{
		openHelpModal: { helpTopicIndex: number; expanded: boolean };
	}>();
	const { state } = getAppContext();

	$: helpTopicIndex = helpTopic ? getHelpTopicIndex(helpTopic) : 0;

	function openHelpDocsModal() {
		if (!$state.context.autoplay) {
			openHelpModalEventDispatcher('openHelpModal', { helpTopicIndex, expanded: helpTopicsExpanded });
		}
	}
</script>

<button
	type="button"
	title="Open Help Docs"
	{name}
	{disabled}
	on:click={() => openHelpDocsModal()}
	style="margin: {margin};{style}">{label}</button
>

<style lang="postcss">
	button {
		display: inline;
		border: none;
		font-size: inherit;
		font-weight: 700;
		letter-spacing: inherit;
		background-color: inherit;
		color: var(--nav-button-autoplay-bg-color);
		padding: 0;
		height: auto;
		text-align: left;
		cursor: pointer;
		line-height: inherit;
	}

	button:focus,
	button:hover,
	button:active,
	button:active:focus {
		color: var(--sec-color);
		background-color: inherit;
		text-decoration: underline;
	}
</style>
