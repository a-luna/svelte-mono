<script lang="ts">
	import InputForm from '$lib/components/InputForm.svelte';
	import InputResults from '$lib/components/InputResults.svelte';
	import OutputResults from '$lib/components/OutputResults.svelte';
	import InputBase64EncodingRadioButtons from '$lib/components/RadioButtons/InputBase64EncodingRadioButtons.svelte';
	import InputStringEncodingRadioButtons from '$lib/components/RadioButtons/InputStringEncodingRadioButtons.svelte';
	import OutputBase64EncodingRadioButtons from '$lib/components/RadioButtons/OutputBase64EncodingRadioButtons.svelte';
	import Visualization from '$lib/components/Visualization.svelte';
	import { state } from '$lib/stores/state';
</script>

<InputForm />
<div class="outer-form-wrapper">
	{#if $state.mode === 'encode'}
		<InputStringEncodingRadioButtons />
	{:else}
		<InputBase64EncodingRadioButtons />
	{/if}
	<InputResults />
	{#if $state.mode === 'encode'}
		<OutputBase64EncodingRadioButtons />
	{:else}
		<div class="placeholder" />
	{/if}
	<OutputResults />
</div>
<Visualization />

<style lang="postcss">
	.outer-form-wrapper {
		display: grid;
		grid-template-columns: 135px auto;
		grid-template-rows: repeat(2, auto);
		grid-auto-flow: row;
		grid-gap: 0.5rem 0.75rem;
	}
</style>
