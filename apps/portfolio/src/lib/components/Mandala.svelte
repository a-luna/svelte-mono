<script lang="ts">
	let svgSize: { width: number; height: number } = { width: 400, height: 400 };
	let pageWidth: number;

	$: if (typeof window !== 'undefined') {
		svgSize =
			// pageWidth >= 1024
			// 	? { width: 675, height: 675 }
			pageWidth >= 768
				? { width: 575, height: 575 }
				: pageWidth >= 640
				? { width: 550, height: 550 }
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
				<linearGradient id="text-bg-1" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse">
					<stop stop-color="#bbff00" offset="0%" />
					<stop stop-color="#00ff80" offset="100%" />
				</linearGradient>
				<linearGradient id="text-bg-2" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse">
					<stop stop-color="#00ffb3" offset="0%" />
					<stop stop-color="#471aff" offset="100%" />
				</linearGradient>
				<linearGradient id="text-bg-3" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse">
					<stop stop-color="#471aff" offset="0%" />
					<stop stop-color="#ff00a6" offset="100%" />
				</linearGradient>
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
					&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&nbsp;&nbsp;&#43;<tspan
						>&#43;</tspan
					>&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan
						>&#43;</tspan
					>&#43;<tspan>&#43;</tspan>&nbsp;&nbsp;&#43;<tspan>&#43;</tspan>&#43;<tspan>&#43;</tspan>&#43;<tspan
						>&#43;</tspan
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

<style lang="postcss">
	.mandala-container {
		--mandala-primary: var(--black-tint3);
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
		fill: var(--mandala-primary);
	}
	svg > text > textPath > tspan {
		fill: var(--mandala-primary);
		animation: mandala-color-change 50s infinite, opacity-change 50s infinite;
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
	}
	.mandala-accent-1 > textPath > tspan {
		fill: url(#text-bg-1);
		animation-delay: -5s;
	}
	.mandala-accent-2 > textPath > tspan {
		fill: url(#text-bg-2);
		animation-delay: -25s;
	}
	.mandala-accent-3 > textPath > tspan {
		fill: url(#text-bg-3);
		animation-delay: -30s;
	}
	.mandala-accent-4 > textPath > tspan {
		fill: url(#text-bg-2);
		animation-delay: -35s;
	}
	.mandala-accent-5 > textPath > tspan {
		fill: url(#text-bg-1);
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
	@keyframes opacity-change {
		0% {
			fill-opacity: 0;
		}
		5% {
			fill-opacity: 0;
		}
		10% {
			fill-opacity: 1;
		}
		15% {
			fill-opacity: 0;
		}
		20% {
			fill-opacity: 0;
		}
		25% {
			fill-opacity: 0;
		}
		30% {
			fill-opacity: 0;
		}
		35% {
			fill-opacity: 0;
		}
		40% {
			fill-opacity: 0;
		}
		45% {
			fill-opacity: 0;
		}
		50% {
			fill-opacity: 1;
		}
		55% {
			fill-opacity: 0;
		}
		60% {
			fill-opacity: 0;
		}
		65% {
			fill-opacity: 0;
		}
		70% {
			fill-opacity: 0;
		}
		75% {
			fill-opacity: 1;
		}
		80% {
			fill-opacity: 0;
		}
		85% {
			fill-opacity: 0;
		}
		to {
			fill-opacity: 0;
		}
	}
	@keyframes mandala-color-change {
		0% {
			fill: var(--mandala-primary);
		}
		5% {
			fill: url(#text-bg-1);
		}
		10% {
			fill: url(#text-bg-1);
		}
		15% {
			fill: url(#text-bg-1);
		}
		20% {
			fill: var(--mandala-primary);
		}
		25% {
			fill: var(--mandala-primary);
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
			fill: url(#text-bg-2);
		}
		50% {
			fill: url(#text-bg-2);
		}
		55% {
			fill: url(#text-bg-2);
		}
		60% {
			fill: var(--mandala-primary);
		}
		65% {
			fill: var(--mandala-primary);
		}
		70% {
			fill: url(#text-bg-3);
		}
		75% {
			fill: url(#text-bg-3);
		}
		80% {
			fill: url(#text-bg-3);
		}
		85% {
			fill: var(--mandala-primary);
		}
		to {
			fill: var(--mandala-primary);
		}
	}
	@media (min-width: 440px) {
		.mandala-container {
			transform: translate(4rem, 1rem);
		}
	}
	@media (min-width: 495px) {
		.mandala-container {
			transform: translate(6rem, 0rem);
		}
	}
	@media (min-width: 640px) {
		.mandala-container {
			transform: translate(8rem, 0rem);
		}
	}
	@media (min-width: 768px) {
		.mandala-container {
			transform: translate(9rem, -1rem);
		}
	}
</style>
