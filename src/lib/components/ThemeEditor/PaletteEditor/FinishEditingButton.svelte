<script lang="ts">
	import Check from '$lib/components/Icons/Check.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
</script>

<button
	type="button"
	title="Add new palette"
	class="theme-button {color} flex flex-row flex-nowrap gap-1 whitespace-nowrap"
	on:click
>
	<div class="icon">
		<Check />
	</div>
	<span>Finished Editing</span>
</button>

<style lang="postcss">
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
