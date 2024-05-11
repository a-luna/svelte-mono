<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import { getDemoAppContext } from '$lib/stores/context';
	import type { EncodingStateToEventMap } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let buttonNumber: number = 0;
	const { state } = getDemoAppContext();
	let defaultNavAction: EncodingEvent = { type: 'RESUME_AUTO_PLAY' };
	let encodingStateToEventMap: EncodingStateToEventMap = [
		{
			requiredState: { value: 'inactive', context: $state?.context },
			navAction: () => ({
				type: 'START_AUTOPLAY',
				inputText: $state?.context.input.inputText,
				inputEncoding: $state?.context.input.inputEncoding,
				outputEncoding: $state?.context.input.outputEncoding,
			}),
		},
	];
</script>

<NavButton
	{defaultNavAction}
	{encodingStateToEventMap}
	{buttonNumber}
	label={'Start Autoplay'}
	tooltip={'Start Autoplay'}
	testId={'start-autoplay-button'}
>
	<BasicIconRenderer icon={'play'} />
</NavButton>
