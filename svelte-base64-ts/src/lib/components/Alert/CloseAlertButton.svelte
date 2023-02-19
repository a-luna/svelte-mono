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

		grid-column: 4 / span 1;
		grid-row: 1 / span 1;
		place-self: stretch;
	}

	button {
		display: flex;
		cursor: pointer;
		color: var(--black2);
		background-color: var(--red4);
		width: 0.9rem;
		height: 0.9rem;
		border: none;
		border-top-right-radius: 4px;
		padding: 1px;
	}

	button:hover,
	button:active,
	button:focus,
	button:active:focus {
		background-color: var(--black2);
		color: var(--red4);
	}
</style>
