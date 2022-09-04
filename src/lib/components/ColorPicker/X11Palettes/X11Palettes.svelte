<script lang="ts">
	import X11Swatches from '$lib/components/ColorPicker/X11Palettes/X11Swatches.svelte';
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Close from '$lib/components/Icons/Close.svelte';
	import Palette from '$lib/components/Shared/Palettes/Palette.svelte';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import Carousel from '@beyonk/svelte-carousel';
	import { createEventDispatcher } from 'svelte';

	export let x11ColorPalettes: ColorPalette[];
	let carousel: typeof Carousel;
	let x11PaletteMap: Record<string, number> = {} as Record<string, number>;
	let buttonColor: ComponentColor = 'red';
	let activePaletteId: string;
	const dispatch = createEventDispatcher();

	$: if (x11ColorPalettes) x11ColorPalettes.forEach((p, i) => (x11PaletteMap[p.id] = i));
	$: if (carousel) changeSelectedPalette(x11ColorPalettes[0].id);

	function changeSelectedPalette(paletteId: string) {
		const slideIndex = x11PaletteMap[paletteId];
		carousel.go(slideIndex);
		buttonColor = x11ColorPalettes[slideIndex].componentColor;
		updateSliderControls();
	}

	function handleSlideChanged(detail: { currentSlide: number; slideCount: number }) {
		activePaletteId = x11ColorPalettes[detail.currentSlide].id;
		buttonColor = x11ColorPalettes[detail.currentSlide].componentColor;
		updateSliderControls();
	}

	function updateSliderControls() {
		const prevButton = document.querySelector<HTMLElement>('button.left');
		const nextButton = document.querySelector<HTMLElement>('button.right');
		prevButton.style.color = `var(--${buttonColor}-fg-color)`;
		nextButton.style.color = `var(--${buttonColor}-fg-color)`;
	}
	async function handleKeyPress(key: string) {
		if (key === 'Escape') {
			dispatch('hideX11Palettes');
		}
		if (key === 'ArrowLeft') {
			carousel.left();
		}
		if (key === 'ArrowRight') {
			carousel.right();
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} />

<div id="x11-palettes">
	<div class="x11-palettes-top">
		<X11Swatches {x11ColorPalettes} {activePaletteId} on:changeX11Palette={(e) => changeSelectedPalette(e.detail)} />
		<button
			type="button"
			class="btn-close"
			aria-label="Close"
			title="Close X11 Color Palettes"
			on:click={() => dispatch('hideX11Palettes')}
		>
			<Close />
		</button>
	</div>
	<Carousel bind:this={carousel} perPage={1} dots={false} on:change={(e) => handleSlideChanged(e.detail)}>
		<span class="control" slot="left-control">
			<ChevronLeft />
		</span>
		{#each x11ColorPalettes as palette}
			<div id="x11-palette-{palette.id}" class="slide-content">
				<Palette
					{palette}
					expanded={true}
					alwaysExpanded={true}
					displayPaletteName={true}
					slideContent={true}
					contentHeight={'99px'}
					columns={7}
					on:colorSelected
				/>
			</div>
		{/each}
		<span class="control" slot="right-control">
			<ChevronRight />
		</span>
	</Carousel>
</div>

<style lang="postcss">
	#x11-palettes {
		--button-size: 30px;

		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		width: 367px;
		margin: 0 auto;
	}

	#x11-palettes :global(button.left),
	#x11-palettes :global(button.right) {
		width: 12px;
		height: 113px;
		top: 17%;
	}

	#x11-palettes :global(button.left) {
		left: 1vw;
	}

	#x11-palettes :global(button.right) {
		right: 1vw;
	}

	.x11-palettes-top {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	button {
		width: 18px;
		margin: 0 0.5rem 0 0;
		color: var(--black1);
	}

	button:hover {
		color: var(--dark-gray1);
	}
</style>
