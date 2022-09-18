<script lang="ts">
	import Circle from '$components/Icons/Circle.svelte';
	import Fork from '$components/Icons/Fork.svelte';
	import Star from '$components/Icons/Star.svelte';
	import type { IconName } from '$lib/types';

	export let icon: IconName;
	export let size: string;
	export let margin: string = null;

	const icons = {
		circle: Circle,
		fork: Fork,
		star: Star
	};

	$: mStyle = margin ? ` margin: ${margin}` : '';
	$: style = `height: ${size}; width: ${size};${mStyle}`;
</script>

<div class="icon-wrapper" {style}>
	<svelte:component this={icons[icon]} />
</div>
