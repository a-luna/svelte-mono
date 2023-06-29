<script lang="ts">
	import NavButton from '$lib/components/AlgorithmDemo/InputForm/NavButtons/NavButton.svelte';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let buttonNumber: number = 0;
	let defaultNavAction: EncodingEvent = { type: 'STOP_AUTO_PLAY' };
</script>

<NavButton
	{defaultNavAction}
	{buttonNumber}
	label={'Stop Autoplay'}
	tooltip={'Stop Autoplay'}
	testId={'stop-autoplay-button'}
>
	<BasicIconRenderer icon={'pause'} />
</NavButton>
