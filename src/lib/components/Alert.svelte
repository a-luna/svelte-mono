<script lang="ts">
	import { alert } from '$lib/stores/alert';
	import { onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	export let duration: number = 3000;
	let timeout: NodeJS.Timeout;
	let shown: boolean;

	$: handleMessageChanged($alert);

	function handleMessageChanged(message: string) {
		clearTimeout(timeout);
		if (!message) {
			shown = false;
		} else {
			shown = true;
			if (duration > 0) {
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
	<div
		role="alert"
		in:slide={{ duration: 1000 }}
		out:fade={{ duration: 500 }}
		on:click={() => (shown = false)}
		class="alert"
	>
		<span>{$alert}</span>
	</div>
{/if}

<style lang="postcss">
	.alert {
		background-color: hsla(342, 100%, 60%, 0.75);
		border: 2px solid var(--red4);
		color: var(--black4);
		font-size: 0.9rem;
		font-weight: 500;
		font-style: italic;
		position: absolute;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 20;
		width: 300px;
		white-space: pre-wrap;
		padding: 0.5rem 1rem;
		margin: 1.5rem auto 0 auto;
		border-radius: 6px;
	}
</style>
