<script lang="ts">
	import { isInitialPageLoad, sectionTransition } from '$lib/stores';
	import { typewriter } from '$lib/typewriter';

	export let title: string;
</script>

<div class="section-name">
	<h1
		in:typewriter={{ speed: 75 }}
		on:introstart={() => console.log('SectionName introstart')}
		on:introend={() => console.log('SectionName introend')}
		on:outrostart={() => console.log('SectionName outrostart')}
		on:outroend={() => console.log('SectionName outroend')}
	>
		{title}
	</h1>
	<span class="cursor" class:cursor-blink={!$sectionTransition.inProgress || $isInitialPageLoad} />
</div>

<style>
	.section-name {
		display: flex;
		gap: 0.25rem;
		font-family: 'Roboto Mono', menlo, consolas, monospace;
		background-color: var(--accent-color);
		width: 100%;
		padding: 0.75rem 0.5rem;
		margin: 0 0 2rem 0;
		align-items: flex-end;
	}
	h1 {
		font-size: 1.7rem;
		line-height: 1;
		color: var(--page-bg-color);
		margin: 0;
		font-weight: 500;
	}
	.cursor {
		content: '';
		width: 10px;
		height: 30px;
		display: inline-block;
		background: hsl(0 0% 0% / 0.7);
		opacity: 0.8;
	}
	.cursor-blink {
		background: hsl(0 0% 0%);
		opacity: 1;
		animation: cursor-blink 1.5s steps(2) infinite;
	}
	@keyframes cursor-blink {
		0% {
			opacity: 0;
		}
	}
	@media (min-width: 640px) {
		.section-name {
			font-size: 2rem;
		}
	}

	@media (min-width: 768px) {
		.section-name,
		:global(.home) .section-name {
			margin: 1rem 0 2.5rem 0;
		}
	}
</style>
