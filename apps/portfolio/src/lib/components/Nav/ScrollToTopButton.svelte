<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
</script>

<a href="#top" title="Scroll To Top"><BasicIconRenderer icon={'doubleup'} width={'100%'} height={'30px'} /></a>

<style lang="postcss">
	a {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		color: var(--black);
		background: var(--accent-color);
		opacity: 0.5;
		z-index: 3;
		padding: 0.5rem 0.25rem;
	}
	a:hover,
	a:focus,
	a:active {
		color: var(--black);
		background: var(--accent-color);
	}
	a:hover {
		opacity: 0.8;
	}
	a:focus {
		opacity: 0.9;
	}
	a:active {
		opacity: 1;
	}
</style>
