<script lang="ts">
	import { state } from '$lib/state';
	import type { ButtonColor } from '$lib/types';
	import FaExchangeAlt from 'svelte-icons/fa/FaExchangeAlt.svelte';
	import RoundButton from './RoundButton.svelte';

	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
	let color: ButtonColor;

	$: color = $state.mode === 'encode' ? 'teal' : 'green';
</script>

<RoundButton {color} {size} on:click>
	<FaExchangeAlt />
</RoundButton>

<!-- <style lang="postcss">
	.icon {
		width: 14px;
	}
</style> -->
