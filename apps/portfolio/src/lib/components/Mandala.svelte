<script lang="ts">
	import { fade } from 'svelte/transition';

	let svgSize: { width: number; height: number } = { width: 400, height: 400 };
	let pageWidth: number;

	$: if (typeof window !== 'undefined') {
		svgSize =
			pageWidth >= 1024
				? { width: 675, height: 675 }
				: pageWidth >= 640
				? { width: 600, height: 600 }
				: { width: 525, height: 525 };
	}
	$: ({ width, height } = svgSize);
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div in:fade={{ duration: 2500 }} class="mandala-wrapper">
	<div class="mandala-container animate-colors">
		<div class="mandala-translate">
			<svg {width} {height} viewBox="0 0 675 675" fill="none" xmlns="http://www.w3.org/2000/svg" class="mandala">
				<defs>
					<path d="M337.5,337.5 m-320,0 a320,320 0 1,1 640,0 a320,320 0 1,1 -640,0" id="circle1" />
					<path d="M337.5,337.5 m-280,0 a280,280 0 1,1 560,0 a280,280 0 1,1 -560,0" id="circle2" />
					<path d="M337.5,337.5 m-240,0 a240,240 0 1,1 480,0 a240,240 0 1,1 -480,0" id="circle3" />
					<path d="M337.5,337.5 m-200,0 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0" id="circle4" />
					<path d="M337.5,337.5 m-160,0 a160,160 0 1,1 320,0 a160,160 0 1,1 -320,0" id="circle5" />
				</defs>
				<text class="mandala-accent-1" dy="70" textLength="2010">
					<animateTransform
						attributeName="transform"
						begin="0s"
						dur="500s"
						type="rotate"
						from="0 337.5 337.5"
						to="360 337.5 337.5"
						repeatCount="indefinite"
					/>
					<textPath textLength="2010" href="#circle1">
						&nbsp;&nbsp;&nbsp;/<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan
							>&#47;</tspan
						>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&nbsp;&nbsp;&nbsp;/<tspan>&#47;</tspan>&#47;<tspan
							>&#47;</tspan
						>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan
						>&nbsp;&nbsp;&nbsp;/<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan
							>&#47;</tspan
						>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&nbsp;&nbsp;&nbsp;/<tspan>&#47;</tspan>&#47;<tspan
							>&#47;</tspan
						>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan
						>&nbsp;&nbsp;&nbsp;/<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan
							>&#47;</tspan
						>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&nbsp;&nbsp;&nbsp;/<tspan>&#47;</tspan>&#47;<tspan
							>&#47;</tspan
						>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan
						>&nbsp;&nbsp;&nbsp;/<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>&#47;<tspan
							>&#47;</tspan
						>&#47;<tspan>&#47;</tspan>&#47;<tspan>&#47;</tspan>
					</textPath>
				</text>
				<text class="mandala-accent-2" dy="70" textLength="1760">
					<animateTransform
						attributeName="transform"
						begin="0s"
						dur="500s"
						type="rotate"
						from="360 337.5 337.5"
						to="0 337.5 337.5"
						repeatCount="indefinite"
					/>
					<textPath textLength="1760" href="#circle2">
						&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan
						>&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan
						>&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan
						>&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan
						>&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan
						>&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan
						>&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>
					</textPath>
				</text>
				<text class="mandala-accent-3" dy="70" textLength="1507">
					<animateTransform
						attributeName="transform"
						begin="0s"
						dur="500s"
						type="rotate"
						from="0 337.5 337.5"
						to="360 337.5 337.5"
						repeatCount="indefinite"
					/>
					<textPath textLength="1507" href="#circle3">
						<tspan>&#123;</tspan>&#123;<tspan>&#123;</tspan>&#123;&nbsp;<tspan>&#125;</tspan>&#125;<tspan>&#125;</tspan
						>&#125;&nbsp;&nbsp;<tspan>&#123;</tspan>&#123;<tspan>&#123;</tspan>&#123;&nbsp;<tspan>&#125;</tspan
						>&#125;<tspan>&#125;</tspan>&#125;&nbsp;&nbsp;<tspan>&#123;</tspan>&#123;<tspan>&#123;</tspan
						>&#123;&nbsp;<tspan>&#125;</tspan>&#125;<tspan>&#125;</tspan>&#125;&nbsp;&nbsp;<tspan>&#123;</tspan
						>&#123;<tspan>&#123;</tspan>&#123;&nbsp;<tspan>&#125;</tspan>&#125;<tspan>&#125;</tspan
						>&#125;&nbsp;&nbsp;<tspan>&#123;</tspan>&#123;<tspan>&#123;</tspan>&#123;&nbsp;<tspan>&#125;</tspan
						>&#125;<tspan>&#125;</tspan>&#125;&nbsp;&nbsp;<tspan>&#123;</tspan>&#123;<tspan>&#123;</tspan
						>&#123;&nbsp;<tspan>&#125;</tspan>&#125;<tspan>&#125;</tspan>&#125;&nbsp;&nbsp;
					</textPath>
				</text>
				<text class="mandala-accent-4" dy="70" textLength="1257">
					<animateTransform
						attributeName="transform"
						begin="0s"
						dur="500s"
						type="rotate"
						from="360 337.5 337.5"
						to="0 337.5 337.5"
						repeatCount="indefinite"
					/>
					<textPath textLength="1257" href="#circle4">
						{#each Array.from({ length: 7 }) as _}
							&nbsp;&nbsp;&nbsp;&#46;&#46;<tspan>&#47;</tspan>&#46;&#46;<tspan>&#47;</tspan>
						{/each}
					</textPath>
				</text>
				<text class="mandala-accent-5" dy="70" textLength="1005">
					<animateTransform
						attributeName="transform"
						begin="0s"
						dur="500s"
						type="rotate"
						from="0 337.5 337.5"
						to="360 337.5 337.5"
						repeatCount="indefinite"
					/>
					<textPath textLength="1005" href="#circle5">
						{#each Array.from({ length: 16 }) as _}
							<tspan>&#60;&#62;</tspan>&#60;&#47;&#62;
						{/each}
					</textPath>
				</text>
			</svg>
		</div>
	</div>
</div>

<style lang="postcss">
	.mandala-wrapper {
		height: 550px;
		overflow: hidden;
		transition: all 1s ease-in-out;
		width: 100%;
		z-index: 1;
		grid-column: 1;
		grid-row: 1;
	}
	.mandala-container {
		--mandala-primary: var(--gray-shade6);
		--mandala-accent-1: hsl(173.22 100% 65%);
		--mandala-accent-2: hsl(322.21 100% 64%);
		--mandala-accent-3: hsl(93.52 100% 50%);
		--mandala-accent-4: hsl(261, 100%, 55%);
		display: flex;
		justify-content: center;
		transform: translate(6rem, -5rem);
		background-color: var(--page-bg-color);
	}
	.mandala-container .mandala-accent-1 {
		font-size: 1.5rem;
	}
	.mandala-container .mandala-accent-2 {
		font-size: 1.3rem;
	}
	.mandala-container .mandala-accent-3 {
		font-size: 1.2rem;
	}
	.mandala-container .mandala-accent-4 {
		font-size: 1.1rem;
	}
	.mandala-container .mandala-accent-5 {
		font-size: 1rem;
	}
	svg {
		font-size: 1.5rem;
		font-weight: 300;
		user-select: none;
		animation: rotation 500s linear infinite;
	}
	svg > text {
		fill: var(--mandala-primary);
	}
	svg > text > textPath > tspan {
		fill: var(--mandala-primary);
		animation: mandala-color-change 50s infinite;
		animation-timing-function: ease;
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
	}
	.mandala-accent-1 > textPath > tspan {
		fill: var(--mandala-accent-1);
		animation-delay: -5s;
	}
	.mandala-accent-2 > textPath > tspan {
		fill: var(--mandala-accent-2);
		animation-delay: -25s;
	}
	.mandala-accent-3 > textPath > tspan {
		fill: var(--mandala-accent-3);
		animation-delay: -30s;
	}
	.mandala-accent-5 > textPath > tspan {
		fill: var(--mandala-accent-4);
		animation-delay: -55s;
	}
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(1turn);
		}
	}
	@keyframes mandala-color-change {
		0% {
			fill: var(--mandala-primary);
		}
		5% {
			fill: var(--mandala-primary);
		}
		10% {
			fill: var(--mandala-accent-1);
		}
		15% {
			fill: var(--mandala-primary);
		}
		20% {
			fill: var(--mandala-primary);
		}
		25% {
			fill: var(--mandala-accent-2);
		}
		30% {
			fill: var(--mandala-primary);
		}
		35% {
			fill: var(--mandala-primary);
		}
		40% {
			fill: var(--mandala-primary);
		}
		45% {
			fill: var(--mandala-primary);
		}
		50% {
			fill: var(--mandala-accent-4);
		}
		55% {
			fill: var(--mandala-primary);
		}
		60% {
			fill: var(--mandala-accent-3);
		}
		65% {
			fill: var(--mandala-primary);
		}
		70% {
			fill: var(--mandala-primary);
		}
		75% {
			fill: var(--mandala-primary);
		}
		80% {
			fill: var(--mandala-primary);
		}
		85% {
			fill: var(--mandala-primary);
		}
		90% {
			fill: var(--mandala-accent-1);
		}
		95% {
			fill: var(--mandala-primary);
		}
		to {
			fill: var(--mandala-primary);
		}
	}
	/* @keyframes mandala-color-change {
		0% {
			fill: var(--mandala-primary);
		}
		8% {
			fill: var(--mandala-accent-1);
		}
		16% {
			fill: var(--mandala-primary);
		}
		25% {
			fill: var(--mandala-primary);
		}
		33% {
			fill: var(--mandala-accent-2);
		}
		41% {
			fill: var(--mandala-primary);
		}
		50% {
			fill: var(--mandala-primary);
		}
		58% {
			fill: var(--mandala-accent-3);
		}
		66% {
			fill: var(--mandala-primary);
		}
		75% {
			fill: var(--mandala-primary);
		}
		83% {
			fill: var(--mandala-accent-4);
		}
		91% {
			fill: var(--mandala-primary);
		}
		to {
			fill: var(--mandala-primary);
		}
	} */
	@media (min-width: 495px) {
		.mandala-container {
			transform: translate(9rem, -4rem);
		}
	}
	@media (min-width: 768px) {
		.mandala-container {
			transform: translate(10rem, -6rem);
		}
	}
	@media (min-width: 1024px) {
		.mandala-container {
			transform: translate(13rem, -6rem);
		}
	}
</style>
