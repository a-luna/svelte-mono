<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	function smoothScrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
</script>

<button title="Scroll To Top" on:click={smoothScrollToTop}>
	<BasicIconRenderer icon={'doubleup'} width={'100%'} height={'30px'} />
</button>

<style lang="postcss">
	button {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		color: var(--black);
		background: var(--link-color);
		opacity: 0.5;
		z-index: 10;
		padding: 0.5rem 0.25rem;
	}
	button:hover,
	button:focus,
	button:active {
		color: var(--black);
		background: var(--link-color);
	}
	button:hover {
		opacity: 0.8;
	}
	button:focus {
		opacity: 0.9;
	}
	button:active {
		opacity: 1;
	}
</style>
