<script lang="ts">
	import { isInitialPageLoad, sectionTransition } from '$lib/stores';
	import { typewriter } from '$lib/typewriter';

	export let title: string;
	let cursor = '';
	let cursorProcessing = false;
	let cursorBlink = false;
	const frames = ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'];
	const duration = 1500;
	const interval = 65;
	const cursorFrames = getCursorFrames(frames, { duration, interval });

	$: if (isInitialPageLoad && !$sectionTransition.toComplete) {
		cursorBlink = true;
	}
	$: if ($sectionTransition.toComplete && !$sectionTransition.showContent) {
		cursorBlink = false;
		cursorProcessing = true;
		cursorFrames.forEach(([frame, timeout]) => {
			setTimeout(() => {
				cursor = frame;
			}, timeout);
		});
	}
	$: if ($sectionTransition.toComplete) {
		setTimeout(() => {
			cursor = '';
			cursorProcessing = false;
			cursorBlink = true;
		}, duration);
		setTimeout(() => {
			$sectionTransition.showContent = true;
		}, duration + 50);
	}

	function getCursorFrames(
		frames: string[],
		{ duration, interval }: { duration: number; interval: number },
	): [string, number][] {
		const cursorFrames: [string, number][] = [];
		let frameIndex = 0;
		let elapsedTime = 0;
		while (elapsedTime + interval < duration) {
			const cursor = frames[frameIndex % frames.length] || '';
			const timeout = elapsedTime + interval;
			cursorFrames.push([cursor, timeout]);
			frameIndex++;
			elapsedTime += interval;
		}
		return cursorFrames;
	}
</script>

<div class="section-name">
	<h1 in:typewriter={{ speed: 85 }}>{title}</h1>
	<span class="cursor" class:cursor-blink={cursorBlink} class:cursor-processing={cursorProcessing}>{cursor}</span>
</div>

<style>
	.section-name {
		display: flex;
		gap: 0.25rem;
		font-family: Hack, menlo, consolas, monospace;
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
		width: 10px;
		height: 30px;
		display: inline-block;
		background: hsl(0 0% 0% / 0.9);
	}
	.cursor-blink {
		background: hsl(0 0% 0% / 0.9);
		animation: cursor-blink 1.5s steps(2) infinite;
	}
	.cursor-processing {
		font-size: 1.1rem;
		font-weight: 700;
		padding: 1px 0;
		color: hsl(0 0% 0% / 0.9);
		background: hsl(0 0% 0% / 0);
		opacity: 0.5;
	}
	@keyframes cursor-blink {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@media (min-width: 640px) {
		.section-name {
			font-size: 2rem;
		}
	}

	@media (min-width: 768px) {
		.section-name {
			margin: 1rem 0 2.5rem 0;
		}
		:global(.home) .section-name {
			max-width: var(--max-width);
			margin: 1rem auto 2.5rem auto;
		}
	}
</style>
