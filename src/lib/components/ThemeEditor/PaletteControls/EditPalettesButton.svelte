<script lang="ts">
	import EditFilled from '$lib/components/Icons/EditFilled.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
	export let disabled = false;
</script>

<button
	type="button"
	title="Edit Theme Palettes"
	class="theme-button {color} flex flex-row flex-nowrap gap-1 whitespace-nowrap"
	on:click
	{disabled}
>
	<div class="icon">
		<EditFilled />
	</div>
	<span>Edit Palettes</span>
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

	span {
		font-size: 14px;
		font-weight: 500;
		line-height: 1;
		margin: auto;
	}
</style>
