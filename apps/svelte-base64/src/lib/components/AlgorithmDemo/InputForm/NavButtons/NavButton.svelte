<script lang="ts">
	import { getDemoAppContext } from '$lib/stores/context';
	import type { EncodingStateToEventMap } from '$lib/types';
	import type { EncodingEvent } from '$lib/xstate/b64Encode';
	import { fade } from 'svelte/transition';

	export let defaultNavAction: EncodingEvent;
	export let encodingStateToEventMap: EncodingStateToEventMap | undefined = undefined;
	export let label: string = '';
	export let tooltip: string = '';
	export let buttonNumber: number = 0;
	export let disabled = false;
	export let testId: string;
	let labelShown = false;
	let duration = 1250;
	let timeout: NodeJS.Timeout;
	const { state, demoState, send } = getDemoAppContext();

	$: labelColor = $state?.context.autoplay
		? `var(--nav-button-autoplay-bg-color)`
		: `var(--nav-button-active-bg-color)`;
	$: labelStyle = `grid-column: ${buttonNumber} / span 1; grid-row: 1 / span 1; color: ${labelColor}`;
	$: butttonStyle = `grid-column: ${buttonNumber} / span 1; grid-row: 2 / span 1;`;
	$: validActions = encodingStateToEventMap
		? [defaultNavAction, ...encodingStateToEventMap.map((m) => m.navAction())]
		: [defaultNavAction];
	$: helpDocs = buttonNumber === 0;
	$: noActionIsPossible =
		!defaultNavAction && !encodingStateToEventMap ? false : !validActions.some((action) => $state?.can(action));

	function showLabel() {
		if (!$demoState.isMobileDisplay) {
			clearTimeout(timeout);
			labelShown = true;
			timeout = setTimeout(() => (labelShown = false), duration);
		}
	}

	function hideLabel() {
		if (!$demoState.isMobileDisplay) {
			clearTimeout(timeout);
			labelShown = false;
		}
	}

	function getNavAction(): EncodingEvent {
		if (!encodingStateToEventMap) {
			return defaultNavAction;
		}
		for (const { requiredState, navAction } of encodingStateToEventMap) {
			if ($state.matches(requiredState.value)) {
				return navAction();
			}
		}
		return defaultNavAction;
	}

	function fireNavAction() {
		const action = getNavAction();
		if ($state.can(action)) {
			// eventLog.add(action);
			send(action);
		}
	}
</script>

{#if labelShown}
	<span transition:fade class="form-label" style={labelStyle}>{label}</span>
{/if}
<button
	type="button"
	title={tooltip}
	style={butttonStyle}
	disabled={!helpDocs && (disabled || noActionIsPossible)}
	data-testid={testId}
	on:mouseenter={() => showLabel()}
	on:mouseleave={() => hideLabel()}
	on:click={() => fireNavAction()}
>
	<div class="icon">
		<slot />
	</div>
</button>

<style lang="postcss">
	.form-label {
		margin: 0 0 0.5rem 0;
	}
</style>
