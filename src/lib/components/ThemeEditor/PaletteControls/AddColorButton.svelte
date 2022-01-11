<script lang="ts">
	import Plus from '$lib/components/Icons/Plus.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;

	$: tooltip = disabled ? 'You must select a palette first' : 'Add color to the selected palette';
</script>

<button
	type="button"
	title={tooltip}
	class="theme-button {color} flex flex-row flex-nowrap gap-1 whitespace-nowrap"
	on:click
	{disabled}
>
	<div class="icon">
		<Plus />
	</div>
	<span>Add to Palette</span>
</button>

<style lang="postcss">
	button {
		width: 100%;
	}

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

	span {
		font-size: 14px;
		font-weight: 500;
		line-height: 1;
		margin: auto;
	}
</style>
