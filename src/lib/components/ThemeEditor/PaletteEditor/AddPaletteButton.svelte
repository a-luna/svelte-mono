<script lang="ts">
	import Plus from '$lib/components/Icons/Plus.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
</script>

<button type="button" title="Add new palette" class="theme-button {color}" on:click>
	<div class="icon">
		<Plus />
	</div>
	<span>New Palette</span>
</button>

<style lang="postcss">
	button {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.25rem;
		white-space: nowrap;
	}
	.icon {
		width: 12px;
		height: 12px;
		margin: auto 0;
	}

	span {
		font-size: 14px;
		font-weight: 500;
		line-height: 1;
		margin: auto;
	}
</style>
