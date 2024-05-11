<script lang="ts">
	import { BasicIconRenderer } from '$lib/components/Icons';
	import { createEventDispatcher } from 'svelte';

	export let id: string;
	export let checked: boolean;
	export let disabled = false;
	export let style = '';
	let checkbox: HTMLInputElement;

	const dispatch = createEventDispatcher<{ toggled: { checked: boolean } }>();

	const toggle = () => {
		if (disabled) return;
		checked = !checked;
		checkbox.checked = checked;
		dispatch('toggled', { checked });
	};
</script>

<label for={id} class:disabled class:checked {style}>
	<button class="label-text" on:click={() => toggle()}>
		{#if $$slots.leftLabel}
			<slot name="leftLabel" />
		{/if}
		<div class="icon">
			{#if checked}
				<BasicIconRenderer icon={'checked'} width={'20px'} height={'20px'} />
			{:else}
				<div class="unchecked" />
			{/if}
		</div>
		{#if $$slots.rightLabel}
			<slot name="rightLabel" />
		{/if}
	</button>
</label>
<input type="checkbox" {id} name={id} bind:this={checkbox} />

<style lang="postcss">
	label {
		--check-box-default-label-color: var(--theme-text-color, var(--theme-default-text-color));
		--check-box-default-checkbox-fg-color: var(
			--theme-background-color-active,
			var(--theme-default-background-color-active)
		);
		--check-box-default-checkbox-bg-color: var(--theme-text-color, var(--theme-default-text-color));
		--check-box-default-checkbox-bg-color-hover: var(--theme-text-color, var(--theme-default-text-color));
		--check-box-default-checkbox-bg-color-active: var(--theme-text-color, var(--theme-default-text-color));
		--check-box-default-checkbox-bg-color-disabled: var(--theme-color-disabled, var(--theme-default-color-disabled));

		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1;
		white-space: nowrap;
		align-self: center;

		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border: none;
		padding: 0;
	}
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		background-color: transparent;
	}
	.icon:not(.disabled) {
		color: var(--check-box-checkbox-fg-color, var(--check-box-default-checkbox-fg-color));
	}
	.checked:not(.disabled) .icon {
		color: var(--check-box-checkbox-bg-color, var(--check-box-default-checkbox-bg-color));
		background-color: var(--check-box-checkbox-fg-color, var(--check-box-default-checkbox-fg-color));
		margin: 0;
	}
	label:not(.disabled) .unchecked {
		height: 16px;
		width: 16px;
		background-color: var(--check-box-checkbox-bg-color, var(--check-box-default-checkbox-bg-color));
		border-radius: 4px;
	}
	label button {
		cursor: pointer;
		background-color: transparent;
		background-image: none;
	}
	label:not(.disabled) button {
		color: var(--check-box-label-color, var(--check-box-default-label-color));
	}
	label:not(.disabled):hover button {
		color: var(--check-box-checkbox-bg-color-hover, var(--check-box-default-checkbox-bg-color-hover));
	}

	label:not(.disabled):active button,
	label:not(.disabled):focus button,
	label:not(.disabled):active:focus button {
		color: var(--check-box-checkbox-bg-color-active, var(--check-box-default-checkbox-bg-color-active));
	}
	.disabled,
	.disabled button,
	.disabled .icon {
		cursor: not-allowed;
	}
	.disabled button,
	.disabled .icon {
		color: var(--check-box-checkbox-bg-color-disabled, var(--check-box-default-checkbox-bg-color-disabled));
	}
	.disabled .icon {
		height: 15px;
		width: 15px;
		background-color: var(--check-box-checkbox-bg-color-disabled, var(--check-box-default-checkbox-bg-color-disabled));
		border: 1px solid var(--theme-default-border-color-disabled, var(--theme-default-border-color-disabled));
	}
	input {
		display: none;
	}
</style>
