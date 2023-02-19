<script lang="ts">
	import Globe from '$lib/components/Icons/Globe.svelte';
	import HandLizard from '$lib/components/Icons/HandLizard.svelte';
</script>

<section>
	<div class="warning">
		<p class="warning__headline">The internet</p>
		<p class="warning__code">
			<HandLizard /><Globe />
		</p>
		<p class="warning__headline">You are not connected to it</p>
	</div>
	<p>The page you requested is not available offline.</p>
</section>

<style lang="postcss">
	section {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		margin: 1rem auto 0 auto;
		justify-content: center;
		align-items: center;
		max-width: 350px;
	}
	.warning {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		gap: 0.6rem;
		color: var(--white-shade2);
		background-color: #141414;
		margin: 0 auto;
		padding: 0.5rem;
		border: none;
	}

	.warning__code {
		color: var(--accent-color);
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		gap: 0.25rem;
		height: 60px;
		line-height: 1;
		letter-spacing: 5px;
		margin: 0;
	}

	.warning__code :global(svg) {
		flex: 0 0 80px;
		height: 100%;
	}

	.warning__headline {
		color: var(--accent-color);
		font-size: 1.2rem;
		font-weight: 500;
		margin: 0;
		text-transform: uppercase;
	}
	p {
		font-size: 0.9rem;
		font-weight: 400;
		margin: 0;
	}

	@media (min-width: 430px) {
		section {
			gap: 1rem;
			max-width: 500px;
		}
		.warning {
			gap: 1rem;
			padding: 1rem;
		}

		.warning__code {
			gap: 0.5rem;
			height: 80px;
		}

		.warning__code :global(svg) {
			flex: 0 0 100px;
		}

		.warning__headline {
			font-size: 1.5rem;
		}
		p {
			font-size: 1rem;
		}
	}

	@media (min-width: 600px) {
		section {
			gap: 1.5rem;
			max-width: 600px;
		}
		.warning {
			gap: 1.5rem;
			padding: 1.5rem;
		}

		.warning__code {
			gap: 0.75rem;
			height: 110px;
		}

		.warning__code :global(svg) {
			flex: 0 0 130px;
		}

		.warning__headline {
			font-size: 2rem;
		}
		p {
			font-size: 1.25rem;
		}
	}

	@media (min-width: 768px) {
		section {
			gap: 2rem;
			max-width: var(--max-width);
		}
		.warning {
			gap: 2rem;
			padding: 2rem;
		}

		.warning__code {
			gap: 1rem;
			height: 140px;
		}

		.warning__code :global(svg) {
			flex: 0 0 160px;
		}

		.warning__headline {
			font-size: 2.3rem;
		}
		p {
			font-size: 1.5rem;
		}
	}
</style>
