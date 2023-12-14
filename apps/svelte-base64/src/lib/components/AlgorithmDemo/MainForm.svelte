<script lang="ts">
	import AlgorithmDemo from '$lib/components/AlgorithmDemo/AlgorithmDemo.svelte';
	import { initAppContext } from '$lib/stores/context';
	import type { DemoStore } from '$lib/types';
	import { encodingMachine } from '$lib/xstate/b64Encode';
	import { useMachine } from '@xstate/svelte';
	import type { Readable } from 'svelte/store';

	const { state, send } = useMachine(encodingMachine, { devTools: false });
	let demoState: Readable<DemoStore>;
	({ demoState } = initAppContext(state, send));

	$: gridStyles =
		$demoState.isMobileDisplay ||
		['finished', 'inactive', { validateInputText: 'error' }].some($state.matches) ||
		$demoState.showAsciiTable ||
		$demoState.showBase64Table
			? 'auto auto auto 1fr'
			: 'auto auto minmax(250px, 1fr) 0px';
</script>

<div class="base64-algo-demo" data-testid="demo-form" style="grid-template-rows: {gridStyles};">
	<AlgorithmDemo />
</div>

<style lang="postcss">
	.base64-algo-demo {
		display: grid;
		grid-template-columns: auto;
		grid-template-areas:
			'top-row'
			'input-form'
			'demo-steps'
			'bottom-row';
		row-gap: 2rem;
		position: relative;
		background-color: var(--page-bg-color);
		padding: 1rem;
		margin: 0 auto;
		width: 343px;
		min-height: 100vh;
	}
	@media screen and (min-width: 764px) {
		.base64-algo-demo {
			box-sizing: border-box;
			grid-template-columns: auto;
			width: 764px;
			padding: 1rem 2rem;
			column-gap: 1rem;
		}
	}
</style>
