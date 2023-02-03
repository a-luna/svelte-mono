<script lang="ts">
	import Close from '$lib/components/Icons/Close.svelte';
</script>

<div class="button-wrapper">
	<button type="button" class="btn-close" aria-label="Close" title="Close Help Docs" on:click>
		<Close />
	</button>
</div>

<style lang="postcss">
	.button-wrapper {
		padding: 0;
		border-radius: 4px;
		background-color: transparent;

		grid-column: 4 / span 2;
		grid-row: 1 / span 2;
		place-self: start end;
	}

	button {
		cursor: pointer;
		color: var(--black2);
		width: 0.9rem;
		height: 0.95rem;
		border: none;
		padding: 1px;
		align-self: flex-start;
	}

	button,
	button:hover,
	button:active,
	button:focus,
	button:active:focus {
		background-color: transparent;
	}
</style>
