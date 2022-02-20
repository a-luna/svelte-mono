<script lang="ts">
	import InputBase64EncodingRadioButtons from '$lib/components/RadioButtons/InputBase64EncodingRadioButtons.svelte';
	import InputStringEncodingRadioButtons from '$lib/components/RadioButtons/InputStringEncodingRadioButtons.svelte';
	import OutputBase64EncodingRadioButtons from '$lib/components/RadioButtons/OutputBase64EncodingRadioButtons.svelte';
	import InputResults from '$lib/components/SettingsForm/InputResults.svelte';
	import OutputResults from '$lib/components/SettingsForm/OutputResults.svelte';
	import { app } from '$lib/stores/app';
</script>

<div class="settings-form">
	{#if $app.encoderMode}
		<InputStringEncodingRadioButtons />
	{:else}
		<InputBase64EncodingRadioButtons />
	{/if}
	<InputResults />
	{#if $app.encoderMode}
		<OutputBase64EncodingRadioButtons />
	{:else}
		<div class="placeholder" />
	{/if}
	<OutputResults />
</div>

<style lang="postcss">
	.settings-form {
		display: grid;
		grid-template-columns: 135px auto;
		grid-template-rows: 71px 71px;
		grid-auto-flow: row;
		grid-gap: 0.5rem 0.75rem;
	}
</style>
