<script lang="ts">
	import AuthorName from '$lib/components/AlgorithmDemo/AuthorName.svelte';
	import DemoIntro from '$lib/components/AlgorithmDemo/DemoIntro/DemoIntro.svelte';
	import DemoResults from '$lib/components/AlgorithmDemo/DemoResults/DemoResults.svelte';
	import DemoText from '$lib/components/AlgorithmDemo/DemoText/DemoText.svelte';
	import FinalResults from '$lib/components/AlgorithmDemo/FinalResults.svelte';
	import HelpDocsModal from '$lib/components/AlgorithmDemo/HelpDocs/HelpDocsModal.svelte';
	import InputForm from '$lib/components/AlgorithmDemo/InputForm/InputForm.svelte';
	import LookupTables from '$lib/components/AlgorithmDemo/LookupTables.svelte';
	import FormTitle from '$lib/components/FormTitle.svelte';
	import { defaultEncoderInput } from '$lib/constants';
	import { alert } from '$lib/stores/alert';
	import { getDemoAppContext } from '$lib/stores/context';
	import type { Base64Encoding, StringEncoding } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';

	const { state, demoState, demoUIState, send } = getDemoAppContext();
	let inputText = defaultEncoderInput.inputText;
	let inputTextEncoding: StringEncoding = defaultEncoderInput.inputEncoding;
	let outputBase64Encoding: Base64Encoding = defaultEncoderInput.outputEncoding;
	let helpModal: HelpDocsModal;

	// $: if ($state.context.autoplay && $state.value) eventLog.add({ type: 'AUTOPLAYING' });
	$: if (inputText) updateInputText(inputText, inputTextEncoding, outputBase64Encoding);
	$: if ($demoState?.errorOccurred) $alert = $state.context.input.validationResult.error?.message ?? '';
	$: if ($demoState?.startedSubProcess) {
		$demoUIState.highlightHexByte = undefined;
		$demoUIState.highlightBase64 = '';
	}
	$: if ($state?.matches({ encodeInput: 'autoPlayEncodeByte' }) || $state?.matches({ encodeInput: 'encodeByte' })) {
		$demoUIState.highlightHexByte = $state.context.currentByte.byte;
	}
	$: if (
		$state?.matches({ encodeOutput: 'autoPlayEncodeBase64' }) ||
		$state?.matches({ encodeOutput: 'encodeBase64' })
	) {
		$demoUIState.highlightBase64 = $state.context.currentBase64Char.b64;
	}
	$: if ($state?.context.resetForm) {
		inputText = defaultEncoderInput.inputText;
		inputTextEncoding = defaultEncoderInput.inputEncoding;
		outputBase64Encoding = defaultEncoderInput.outputEncoding;
	}
	$: bottomRowHeight = $demoState?.isMobileDisplay ? 'auto' : '260px';
	$: formTitleFontSize = $demoState?.isMobileDisplay ? '1.6rem' : '1.9rem';

	// $: if ($demoState.dev) {
	// 	const test = '∑ßåœ ≈ ∆c';
	// 	console.log({ utf8: getSimpleUtf8StringDecomposition(test) });
	// 	const test2 = '🦦👨‍🌾🫥🏃🏿‍♀️☝🏾';
	// 	console.log({ utf8: getSimpleUtf8StringDecomposition(test2) });
	// }

	function openHelpDocsModal(helpModalSettings: { helpTopicIndex: number; expanded: boolean }) {
		const { helpTopicIndex, expanded } = helpModalSettings;
		if (!$state.context.autoplay) {
			helpModal.toggleModal(helpTopicIndex, expanded);
		}
	}

	function updateInputText(input: string, stringEncoding: StringEncoding, base64Encoding: Base64Encoding) {
		sendEvent({
			type: 'UPDATE_TEXT',
			inputText: input,
			inputEncoding: stringEncoding,
			outputEncoding: base64Encoding,
		});
	}

	function submitForm(input: string) {
		sendEvent({
			type: 'VALIDATE_TEXT',
			inputText: input,
			inputEncoding: inputTextEncoding,
			outputEncoding: outputBase64Encoding,
		});
	}

	async function handleKeyPress(key: string) {
		if ($demoUIState.modalOpen) return;
		if (key === 'ArrowRight') {
			if ($state.matches('inactive')) {
				sendEvent({
					type: 'VALIDATE_TEXT',
					inputText,
					inputEncoding: inputTextEncoding,
					outputEncoding: outputBase64Encoding,
				});
			} else {
				sendEvent({ type: 'GO_TO_NEXT_STEP' });
			}
		}
		if (key === 'ArrowLeft') {
			sendEvent({ type: 'GO_TO_PREV_STEP' });
		}
		if (key === 'Space') {
			if ($state.context.autoplay) {
				sendEvent({ type: 'STOP_AUTO_PLAY' });
			} else {
				if ($state.matches('inactive')) {
					sendEvent({
						type: 'START_AUTOPLAY',
						inputText,
						inputEncoding: inputTextEncoding,
						outputEncoding: outputBase64Encoding,
					});
				} else {
					sendEvent({ type: 'RESUME_AUTO_PLAY' });
				}
			}
		}

		if ($demoState.prod) return;
		if (key === 'KeyC') {
			console.log({ context: $state.context });
		}
		if (key === 'KeyS') {
			console.log({ state: $state.value });
		}
		// if (key === 'KeyE') {
		// 	console.log({ log: eventLog.entries() });
		// }
		// if (key === 'KeyL') {
		// 	eventLog.clear();
		// 	console.log({ $eventLog });
		// }
		// if (key === 'KeyT') {
		// 	const result = await copyToClipboard(createTestSet());
		// 	if (result.success) {
		// 		console.log('Successfully created test set and copied to clipboard!');
		// 	}
		// }
	}

	function sendEvent(action: EncodingEvent) {
		if ($state.can(action)) {
			// eventLog.add(action);
			send(action);
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} />

<div class="top-row">
	<div class="form-title-wrappper">
		<FormTitle title={'Base64 Algorithm Demo'} fontSize={formTitleFontSize} letterSpacing={'2.7px'} />
	</div>
	<div class="author-name">
		<AuthorName />
	</div>
</div>
<InputForm
	bind:inputText
	bind:inputTextEncoding
	bind:outputBase64Encoding
	on:openHelpModal={(e) => openHelpDocsModal(e.detail)}
	on:submit={() => submitForm(inputText)}
/>
<div id="demo-steps-wrapper">
	<div class="demo-steps" data-testid="demo-steps">
		<!-- <InspectStateMachineButton on:click={() => inspect({ iframe: false })} /> -->
		<div
			id="demo-text"
			data-testid="demo-text"
			data-state={$demoState?.machineState}
			data-sub-state={$demoState?.machineSubState}
		>
			{#if $state?.matches('inactive') || $state?.matches({ validateInputText: 'error' })}
				<DemoIntro on:openHelpModal={(e) => openHelpDocsModal(e.detail)} />
			{:else}
				<DemoText on:openHelpModal={(e) => openHelpDocsModal(e.detail)} />
			{/if}
		</div>
		<DemoResults />
	</div>
</div>
<div class="bottom-row" style="flex: 1 0 {bottomRowHeight}">
	<LookupTables
		{outputBase64Encoding}
		highlightBase64={$demoUIState?.highlightBase64}
		highlightHexByte={$demoUIState?.highlightHexByte}
	/>
	<FinalResults />
</div>
<HelpDocsModal bind:this={helpModal} />

<style lang="postcss">
	.top-row {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto auto;
		grid-template-areas:
			'demo-title'
			'author-name';
		align-items: baseline;
		gap: 1rem;
		margin: 0;

		grid-area: top-row;
	}
	.form-title-wrappper {
		grid-area: demo-title;
	}
	.author-name {
		justify-self: flex-end;
		grid-area: author-name;
	}
	#demo-steps-wrapper {
		display: block;
		background-color: var(--black2);
		border-radius: 6px;
		overflow: auto;
		padding: 0.75rem 1rem;
		transition: transform 0.75s ease-in-out;
		margin: 0;
		font-family: 'Roboto Mono', menlo, monospace;

		grid-area: demo-steps;
	}
	.demo-steps {
		position: relative;
		z-index: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto auto auto auto 1fr;
		column-gap: 0.5rem;
	}
	#demo-text {
		display: flex;
		flex-flow: column nowrap;
		align-self: flex-start;
		position: static;
		z-index: 1;
		margin: 0;

		grid-column: 1 / span 2;
		grid-row: 2 / span 1;
	}
	#demo-text:not(:only-child) {
		margin: 0 0 1rem 0;
	}
	.bottom-row {
		overflow: auto;
		grid-area: bottom-row;
	}
	:global(.highlight-hex-byte),
	:global(.highlight-base64) {
		background-color: var(--dark-gray1);
		font-weight: 700;
		transition: background-color 0.35s ease-in-out;
	}
	@media screen and (min-width: 764px) {
		.top-row {
			grid-template-columns: 1fr auto;
			grid-template-rows: auto;
			grid-template-areas: 'demo-title author-name';
			width: 701px;
		}
		.form-title-wrappper {
			justify-self: flex-start;
		}
		.author-name {
			justify-self: flex-end;
		}
		#demo-steps-wrapper {
			padding: 1.5rem;
			width: 653px;

			grid-area: demo-steps;
		}
		.demo-steps {
			grid-template-columns: 161px 0px 361px 0px 115px;
			grid-template-rows: auto auto auto auto;
			align-items: flex-start;
			column-gap: 0.25rem;
		}
		#demo-text {
			grid-column: 1 / span 5;
			grid-row: 2 / span 1;
		}
		.bottom-row {
			margin: 0;
		}
	}
</style>
