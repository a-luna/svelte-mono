<script lang="ts">
	import { BasicIconRenderer } from '$lib/components/Icons';

	export let id: string;
	export let checked: boolean;
	export let disabled = false;
	export let style = '';
</script>

<label for={id} class:disabled {style}>
	{#if $$slots.leftLabel}
		<span class="label-text" on:click|stopPropagation><slot name="leftLabel" /></span>
	{/if}
	{#if checked}
		<div class="icon" on:click|stopPropagation>
			<BasicIconRenderer icon={'checked'} width={'20px'} height={'20px'} />
		</div>
	{:else}
		<div class="icon" on:click|stopPropagation>
			<BasicIconRenderer icon={'filledsquare'} width={'16px'} height={'16px'} margin={'auto'} />
		</div>
	{/if}
	{#if $$slots.rightLabel}
		<span class="label-text" on:click|stopPropagation><slot name="rightLabel" /></span>
	{/if}
</label>
<input type="checkbox" {id} name={id} bind:checked on:change />

<style lang="postcss">
	label {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1;
		white-space: nowrap;

		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
	.label-text {
		color: var(--check-box-label-color, var(--check-box-default-label-color));
	}
	.icon {
		cursor: pointer;
		color: var(--check-box-color, var(--check-box-default-color));
		display: flex;
		width: 20px;
		height: 20px;
	}
	label:hover .icon {
		color: var(--check-box-color-hover, var(--check-box-default-color-hover));
	}

	label:active .icon,
	label:focus .icon,
	label:active:focus .icon {
		color: var(--check-box-color-active, var(--check-box-default-color-active));
	}
	.disabled {
		cursor: not-allowed;
	}
	.disabled .icon {
		cursor: not-allowed;
		color: var(--check-box-color-disabled, var(--check-box-default-color-disabled));
	}
	input {
		display: none;
	}
</style>
