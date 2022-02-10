<script lang="ts">
	import { Base64Decoder, Base64Encoder } from '$lib/base64';
	import LookupTables from '$lib/components/LookupTables.svelte';
	import Visualization from '$lib/components/Visualization.svelte';
	import type { AppMode, Base64Encoding, StringEncoding } from '$lib/types';

	let mode: AppMode = 'encode';
	let highlightAscii: string;
	let highlightBase64: string;
	const inputTextEncoding: StringEncoding = 'ASCII';
	const base64Encoding: Base64Encoding = 'base64';
	const encoder = new Base64Encoder();
	const encodingOutput = encoder.encode('this is a test', inputTextEncoding, base64Encoding);
	const decoder = new Base64Decoder();
	const decodingOutput = decoder.decode('dGhpcyBpcyBhIHRlc3Q=', base64Encoding);

	function handleHighlightAsciiValue(e: CustomEvent<{ highlight: boolean; ascii: string }>) {
		const { highlight, ascii } = e.detail;
		highlightAscii = highlight ? ascii : null;
	}

	function handleHighlightBase64Value(e: CustomEvent<{ highlight: boolean; base64: string }>) {
		const { highlight, base64 } = e.detail;
		highlightBase64 = highlight ? base64 : null;
	}
</script>

<!-- <div class="main-form">
	<div class="form-group">
		<FormTitle on:formToggled={formToggled} on:resetForm={resetForm} />
    {#if showEncodeForm}
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
    {/if}
	</div>
	<FormResults bind:this={results} />
</div> -->
<span on:click={() => (mode = mode === 'encode' ? 'decode' : 'encode')}>{mode}</span>
<Visualization
	{mode}
	{encodingOutput}
	{decodingOutput}
	on:highlightAsciiValue={handleHighlightAsciiValue}
	on:highlightBase64Value={handleHighlightBase64Value}
/>
<LookupTables {mode} {encodingOutput} {decodingOutput} {highlightAscii} {highlightBase64} />

<!-- <style lang="postcss">
  .main-form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 0 0 15px 0;
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
</style> -->
