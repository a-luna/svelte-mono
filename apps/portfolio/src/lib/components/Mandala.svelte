<script lang="ts">
	let svgSize: { width: number; height: number } = { width: 400, height: 400 };
	let pageWidth: number;

	$: if (typeof window !== 'undefined') {
		svgSize =
			pageWidth >= 1024
				? { width: 775, height: 775 }
				: pageWidth >= 768
					? { width: 725, height: 725 }
					: pageWidth >= 640
						? { width: 675, height: 675 }
						: pageWidth >= 495
							? { width: 500, height: 500 }
							: pageWidth >= 440
								? { width: 450, height: 450 }
								: { width: 425, height: 425 };
	}
	$: ({ width, height } = svgSize);
</script>

<svelte:window bind:innerWidth={pageWidth} />

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
					{#each Array.from({ length: 12 }) as _}
						&#11825;&#11825;&#11825;&#11825;<tspan>&#124;</tspan>
					{/each}
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
					{#each Array.from({ length: 4 }) as _}
						&#11825;&#11825;&nbsp;<tspan>&#11821;</tspan>&nbsp;&#11825;&#11825;&#11825;&#11825;&nbsp;<tspan>&#11821;</tspan>&nbsp;&#11825;&#11825;
					{/each}
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
					{#each Array.from({ length: 8 }) as _}
						&#11825;&nbsp;<tspan>&#74864;</tspan>&nbsp;&#11825;&#11825;&nbsp;<tspan>&#74864;</tspan>&nbsp;&#11825;
					{/each}
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
					{#each Array.from({ length: 9 }) as _}
						&#11825;<tspan>&#10192;</tspan>
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
					{#each Array.from({ length: 5 }) as _}
						<tspan>&#10196;</tspan>&nbsp;&#10649;&nbsp;<tspan>&#10195;&#10196;</tspan>&nbsp;&#10649;&nbsp;<tspan>&#10195;</tspan>
					{/each}
				</textPath>
			</text>
		</svg>
	</div>
</div>

<style lang="postcss">
	.mandala-container {
		--mandala-primary-color: var(--dark-gray);
		--mandala-change-color-1: hsl(180, 100%, 50%);
		--mandala-change-color-2: hsl(216, 100%, 55%);
		--mandala-change-color-3: hsl(255 100% 50%);
		--mandala-change-color-4: hsl(298 100% 50%);
		display: flex;
		justify-content: center;
		transform: translate(2rem, 1rem);
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
		fill: var(--mandala-primary-color);
		font-family: Hack, monospace;
	}
	svg > text > textPath > tspan {
		fill: var(--mandala-primary-color);
		animation: mandala-color-change 50s infinite;
		animation-delay: 0s;
		animation-timing-function: ease;
	}
	.mandala-accent-1 > textPath > tspan {
		fill: var(--mandala-change-color-1);
		animation-delay: -5s;
	}
	.mandala-accent-2 > textPath > tspan {
		fill: var(--mandala-change-color-2);
		animation-delay: -25s;
	}
	.mandala-accent-3 > textPath > tspan {
		fill: var(--mandala-change-color-3);
		animation-delay: -30s;
	}
	.mandala-accent-4 > textPath > tspan {
		fill: var(--mandala-change-color-4);
		animation-delay: -35s;
	}
	.mandala-accent-5 > textPath > tspan {
		fill: var(--mandala-change-color-1);
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
			fill: var(--mandala-primary-color);
		}
		5% {
			fill: var(--mandala-primary-color);
		}
		10% {
			fill: var(--mandala-change-color-1);
		}
		15% {
			fill: var(--mandala-primary-color);
		}
		20% {
			fill: var(--mandala-primary-color);
		}
		25% {
			fill: var(--mandala-change-color-2);
		}
		30% {
			fill: var(--mandala-primary-color);
		}
		35% {
			fill: var(--mandala-primary-color);
		}
		40% {
			fill: var(--mandala-primary-color);
		}
		45% {
			fill: var(--mandala-primary-color);
		}
		50% {
			fill: var(--mandala-change-color-4);
		}
		55% {
			fill: var(--mandala-primary-color);
		}
		60% {
			fill: var(--mandala-change-color-3);
		}
		65% {
			fill: var(--mandala-primary-color);
		}
		70% {
			fill: var(--mandala-primary-color);
		}
		75% {
			fill: var(--mandala-primary-color);
		}
		80% {
			fill: var(--mandala-primary-color);
		}
		85% {
			fill: var(--mandala-primary-color);
		}
		90% {
			fill: var(--mandala-change-color-1);
		}
		95% {
			fill: var(--mandala-primary-color);
		}
		to {
			fill: var(--mandala-primary-color);
		}
	}
	@media (min-width: 440px) {
		.mandala-container {
			transform: translate(4rem, 1rem);
		}
	}
	@media (min-width: 495px) {
		.mandala-container {
			transform: translate(4rem, -3.5rem);
		}
	}
	@media (min-width: 640px) {
		.mandala-container {
			transform: translate(5rem, -3.5rem);
		}
	}
	@media (min-width: 768px) {
		.mandala-container {
			transform: translate(7.5rem, -4rem);
		}
	}
</style>
