<script lang="ts">
	import { app } from '$lib/stores/app';
</script>

<fieldset class="results-in">
	<legend>Input</legend>
	<div class="details-wrapper">
		<div class="encoding">Encoding: {$app.inputEncoding}</div>
		{#if $app.encoderMode}
			<div class="byte-length">Total Bytes: {$app.totalBytesIn}</div>
		{/if}
	</div>
	<textarea id="copyable-input-text" readonly rows="1" bind:value={$app.inputText} />
</fieldset>

<style lang="postcss">
	.results-in {
		color: var(--pri-color);
	}
	#copyable-input-text {
		font-family: 'Roboto Mono', monospace;
		line-height: 1rem;
		margin: 0;
		white-space: normal;
		word-break: break-all;
		margin: 0;
		word-break: break-word;
		width: 100%;
		background-color: inherit;
		color: inherit;
		border: none;
		overflow: auto;
		outline: none;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		resize: vertical;
		padding: 0.4375rem 0 0.375rem 0;
	}
	fieldset {
		border: 1px solid rgba(216, 216, 216, 0.45);
		border-radius: 4px;
		padding: 0.5rem 0.75rem 0.25rem 0.75rem;
		font-size: 0.9rem;
		line-height: 1;
	}
	fieldset:last-child {
		margin: 0;
	}
	legend {
		color: #f2f2f2;
		font-weight: 400;
		padding: 0 3px;
	}
	.details-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 0.7rem;
		color: #7f7f7f;
		font-weight: 400;
		gap: 0.25rem;
	}
</style>
