<script lang="ts">
	import Circle from '$lib/components/Icons/Circle.svelte';
	import Fork from '$lib/components/Icons/Fork.svelte';
	import Github from '$lib/components/Icons/Social/Github.svelte';
	import Star from '$lib/components/Icons/Star.svelte';
	import type { IconName } from '$lib/types';

	export let icon: IconName;
	export let size: string;
	export let margin: string = '';

	const icons = {
		circle: Circle,
		fork: Fork,
		github: Github,
		star: Star
	};

	$: mStyle = margin ? ` margin: ${margin}` : '';
	$: style = `height: ${size}; width: ${size};${mStyle}`;
</script>

<div class="icon-wrapper" {style}>
	<svelte:component this={icons[icon]} />
</div>
