<script lang="ts">
	import { getRandomArrayItem } from '$lib/util';
	import {
		AndroidMask,
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
		Static,
		Summits,
		SverdIFjell,
		Teleport
	} from '$lib/components/Icons';
	import type { NavIcon } from '$lib/types';

	let navIcon: NavIcon;

	const icons: NavIcon[] = [
		AndroidMask,
		CyberEye,
		DustCloud,
		BoltSpellCast,
		FireSilhouette,
		Heptagram,
		HighFive,
		MoebiusStar,
		Orbital,
		RamProfile,
		Spatter,
		Stairs3D,
		Static,
		Summits,
		SverdIFjell,
		Teleport
	];

	$: navIcon = getRandomArrayItem<NavIcon>(icons, DustCloud);
</script>

<svelte:component this={navIcon} />
