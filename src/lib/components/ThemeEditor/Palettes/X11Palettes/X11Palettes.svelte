<script lang="ts">
	import ChevronLeft from '$lib/components/Icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/Icons/ChevronRight.svelte';
	import Palette from '$lib/components/ThemeEditor/Palettes/Palette.svelte';
	import X11Swatches from '$lib/components/ThemeEditor/Palettes/X11Palettes/X11Swatches.svelte';
	import type { ColorPalette, ComponentColor } from '$lib/types';
	import Carousel from '@beyonk/svelte-carousel';

	export let x11ColorPalettes: ColorPalette[];
	let carousel: Carousel;
	let x11PaletteMap: Record<string, number> = {} as Record<string, number>;
	let buttonColor: ComponentColor = 'red';
	let activePaletteId: string;

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
</script>

<div id="x11-palettes">
	<X11Swatches {x11ColorPalettes} {activePaletteId} on:changeX11Palette={(e) => changeSelectedPalette(e.detail)} />
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
					displayPaletteName={false}
					slideContent={true}
					contentHeight={'115px'}
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
		--button-size: 35px;

		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		width: 100%;
	}

	#x11-palettes :global(button.left),
	#x11-palettes :global(button.right) {
		width: 12px;
		height: 113px;
		top: 16%;
	}

	#x11-palettes :global(button.left) {
		left: 1vw;
	}

	#x11-palettes :global(button.right) {
		right: 1vw;
	}
</style>
