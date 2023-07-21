<script lang="ts">
	import CloseAlertButton from '$lib/components/Alert/CloseAlertButton.svelte';
	import { alert } from '$lib/stores/alert';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	export let duration = 3000;
	let timeout: NodeJS.Timeout;
	let shown: boolean;

	$: handleMessageChanged($alert);

	function handleMessageChanged(message: string) {
		clearTimeout(timeout);
		if (!message) {
			shown = false;
		} else {
			shown = true;
			if (duration) {
				timeout = setTimeout(() => {
					shown = false;
					$alert = '';
				}, duration);
			}
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

{#if $alert && shown}
	<div role="alert" in:slide={{ duration: 1000 }} out:fade={{ duration: 500 }} class="alert">
		<CloseAlertButton on:click={() => (shown = false)} />
		<div class="icon">
			<BasicIconRenderer icon={'exclamationtriangle'} />
		</div>
		<span>{$alert}</span>
	</div>
{/if}

<style lang="postcss">
	.alert {
		display: grid;
		grid-template-columns: 0.9rem 30px 1fr 0.9rem;
		grid-template-rows: 0.9rem 1fr 0.9rem;
		justify-content: flex-start;
		align-items: center;
		color: var(--black4);
		background-color: hsla(342, 100%, 60%, 0.8);
		border: 2px solid var(--red4);
		position: absolute;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 20;
		width: 300px;
		white-space: pre-wrap;
		margin: 1.5rem auto 0 auto;
		border-radius: 6px;
	}
	.icon {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
		place-self: end center;
	}
	span {
		font-size: 0.875rem;
		font-weight: 500;
		font-style: italic;
		text-align: left;
		white-space: pre-wrap;
		padding: 0 0 0 1rem;

		grid-column: 3 / span 1;
		grid-row: 2 / span 1;
	}
</style>
