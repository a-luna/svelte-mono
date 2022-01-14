<script lang="ts">
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor = 'black';
	export let disabled = false;
	export let tooltip: string;
	export let alignSelf = '';
</script>

<button
	type="button"
	title={tooltip}
	class="theme-button {color} transition-color"
	{disabled}
	on:click
	style={alignSelf ? `align-self: ${alignSelf}` : ''}
>
	<div class="icon">
		<slot name="icon" />
	</div>
	{#if $$slots.label}
		<span><slot name="label" /></span>
	{/if}
</button>

<style lang="postcss">
	button {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.25rem;
		white-space: nowrap;
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
