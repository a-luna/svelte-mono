<script lang="ts">
	import FormResults from '$lib/components/FormResults.svelte';
	import FormTitle from '$lib/components/FormTitle.svelte';
	import LookupTables from '$lib/components/LookupTables.svelte';
	import Visualization from '$lib/components/Visualization.svelte';
</script>

<div class="main-form">
	<FormTitle />
	<div class="outer-form-wrapper">
		<div class="form-group">
			<!-- {#if showEncodeForm}
      <EncodeForm
        bind:this={encodeForm}
        on:inputTextChanged={plainTextChanged}
        on:inputEncodingChanged={plainTextEncodingChanged}
        on:outputEncodingChanged={outputBase64EncodingChanged}
        on:encodingSucceeded={encodingSucceeded}
        on:errorOccurred={errorOccurred} />
    {:else}
      <DecodeForm
        bind:this={decodeForm}
        on:inputTextChanged={encodedTextChanged}
        on:inputEncodingChanged={inputBase64EncodingChanged}
        on:decodingSucceeded={decodingSucceeded}
        on:errorOccurred={errorOccurred} />
    {/if} -->
		</div>
		<FormResults />
	</div>
</div>

<Visualization />
<LookupTables />

<style lang="postcss">
	.main-form {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		gap: 1.5rem;
	}
	.outer-form-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.form-group {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-self: flex-start;
		margin: 0 15px auto 0;
		flex: 0 0 340px;
	}

	@media screen and (max-width: 670px) {
		.main-form {
			flex-flow: row wrap;
		}
		.form-group {
			min-height: 0;
			margin: auto auto 15px auto;
		}
		.form-group {
			flex: 0 0 100%;
		}
	}
</style>
