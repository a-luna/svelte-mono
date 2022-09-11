<script lang="ts">
	import Checked from '$lib/components/Icons/Checked.svelte';
	import Unchecked from '$lib/components/Icons/Unchecked.svelte';
	import type { ComponentColor } from '$lib/types';

	export let id: string;
	export let checked: boolean;
	export let color: ComponentColor;
	export let style = '';
</script>

<label for={id} class={color !== 'black' ? 'color' : 'black'} style="--button-hue: var(--{color}-hue); {style}">
	{#if $$slots.leftLabel}
		<span on:click|stopPropagation><slot name="leftLabel" /></span>
	{/if}
	{#if checked}
		<div class="icon" on:click|stopPropagation>
			<Checked />
		</div>
	{:else}
		<div class="icon" on:click|stopPropagation>
			<Unchecked />
		</div>
	{/if}
	{#if $$slots.rightLabel}
		<span on:click|stopPropagation><slot name="rightLabel" /></span>
	{/if}
</label>
<input type="checkbox" {id} name={id} bind:checked />

<style lang="postcss">
	label.color {
		--button-bg-color: hsl(var(--button-hue, 0), var(--bg-sat, 0%), var(--bg-light, 95%));
		--button-hover-bg-color: hsl(var(--button-hue, 0), var(--bg-sat, 0%), var(--bg-light-hover, 100%));
		--button-fg-color: hsl(var(--button-hue, 0), var(--fg-sat, 0%), var(--fg-light, 10%));
		--button-active-fg-color: hsl(var(--button-hue, 0), var(--fg-sat-active, 0%), var(--fg-light-active, 0%));
		--button-hover-fg-color: var(--button-fg-color);
	}

	label.black {
		--button-bg-color: var(--white2);
		--button-hover-bg-color: var(--white4);
		--button-fg-color: var(--black2);
		--button-active-fg-color: var(--black4);
		--button-hover-fg-color: var(--black4);
	}
	label {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 13px;
		font-weight: 500;
		line-height: 1;
		cursor: pointer;
	}
	input {
		display: none;
	}
	.icon {
		width: 22px;
		cursor: pointer;
	}
</style>
