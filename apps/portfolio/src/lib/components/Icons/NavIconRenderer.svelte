<script lang="ts">
	import {
		AndroidMask,
		AudioCassette,
		BoltSpellCast,
		CyberEye,
		DustCloud,
		FireSilhouette,
		Heptagram,
		HighFive,
		MoebiusStar,
		Orbital,
		RamProfile,
		Spatter,
		Stairs3D,
		Summits,
		SverdIFjell,
		Teleport,
	} from '$lib/components/Icons';
	import type { NavIcon, NavIconName } from '$lib/types';
	import { getRandomArrayItem } from '$lib/util';
	import { onMount } from 'svelte';

	export let title = 'Go to Homepage';
	export let width = 'auto';
	export let height = 'auto';
	export let margin = '';
	let NAV_ICON_MAP: Map<NavIconName, NavIcon>;
	let icon: NavIconName;

	function createNavIconMap(): Map<NavIconName, NavIcon> {
		const iconMap = new Map<NavIconName, NavIcon>();
		iconMap.set('androidmask', AndroidMask);
		iconMap.set('audiocassette', AudioCassette);
		iconMap.set('cybereye', CyberEye);
		iconMap.set('dustcloud', DustCloud);
		iconMap.set('boltspellcast', BoltSpellCast);
		iconMap.set('firesilhouette', FireSilhouette);
		iconMap.set('heptagram', Heptagram);
		iconMap.set('highfive', HighFive);
		iconMap.set('moebiusstar', MoebiusStar);
		iconMap.set('orbital', Orbital);
		iconMap.set('ramprofile', RamProfile);
		iconMap.set('spatter', Spatter);
		iconMap.set('stairs3d', Stairs3D);
		iconMap.set('summits', Summits);
		iconMap.set('sverdifjell', SverdIFjell);
		iconMap.set('teleport', Teleport);
		return iconMap;
	}

	$: style = `height: ${height}; width: ${width};${margin ? ` margin: ${margin}` : ''}`;
	$: allIcons = NAV_ICON_MAP ? [...NAV_ICON_MAP.keys()] : [];
	$: icon = getRandomArrayItem<NavIconName>(allIcons, 'dustcloud');

	onMount(() => (NAV_ICON_MAP = createNavIconMap()));
</script>

{#if NAV_ICON_MAP}
	<div class="icon-wrapper" {style}>
		<svelte:component this={NAV_ICON_MAP.get(icon)} {title} />
	</div>
{/if}
