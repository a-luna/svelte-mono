<script lang="ts">
	import Minus from '$lib/components/Icons/Minus.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
	export let tooltip: string;
</script>

<button type="button" title={tooltip} class="theme-button {color}" on:click {disabled}>
	<div class="icon">
		<Minus />
	</div>
</button>

<style lang="postcss">
	button[disabled],
	button:hover[disabled] {
		background-color: var(--white4);
		border: 2px solid var(--gray4);
		color: var(--gray4);
		cursor: not-allowed;
	}

	.icon {
		width: 12px;
		height: 12px;
		margin: auto 0;
	}
</style>
