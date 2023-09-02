<script lang="ts">
	export let disabled = false;
	export let tooltip = '';
	export let alignSelf = '';
	export let wrapperWidth = '';
	export let classList: string[] = [];
	export let iconWidth = '11px';
	export let gridStyle = '';
	let style: string;
	let buttonElement: HTMLButtonElement;

	$: flexStyle = alignSelf ? `align-self: ${alignSelf};` : '';
	$: widthStyle = wrapperWidth ? `width: ${wrapperWidth};` : '';
	$: style = [flexStyle, widthStyle, gridStyle].filter((s) => s !== '').join(' ');

	export function focus() {
		buttonElement.focus();
	}
</script>

<div class="theme-button" {style}>
	<button bind:this={buttonElement} type="button" title={tooltip} class={classList.join(' ')} {disabled} on:click>
		{#if $$slots.icon}
			<div class="icon" style="width: {iconWidth}">
				<slot name="icon" />
			</div>
		{/if}
		{#if $$slots.label}
			<span><slot name="label" /></span>
		{/if}
	</button>
</div>

<style lang="postcss">
	.theme-button {
		--button-default-color: var(--theme-text-color, var(--theme-default-text-color));
		--button-default-color-hover: var(--theme-text-color-hover, var(--theme-default-text-color-hover));
		--button-default-color-active: var(--theme-text-color-active, var(--theme-default-text-color-active));
		--button-default-color-disabled: var(--theme-color-disabled, var(--theme-default-color-disabled));
		--button-default-background-color: var(--theme-background-color, var(--theme-default-background-color));
		--button-default-background-color-hover: var(
			--theme-background-color-hover,
			var(--theme-default-background-color-hover)
		);
		--button-default-background-color-active: var(
			--theme-background-color-active,
			var(--theme-default-background-color-active)
		);
		--button-default-background-color-disabled: var(
			--theme-background-color-disabled,
			var(--theme-default-background-color-disabled)
		);
		--button-default-focus-ring-color: var(--theme-focus-ring-color, var(--theme-default-focus-ring-color));
		--button-default-border: 1px solid var(--theme-text-color, var(--theme-default-text-color));
		--button-default-min-width: 32px;
		--button-default-width: 100%;
		--button-default-height: 32px;
	}
	button {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
		white-space: nowrap;
		background-color: var(--button-background-color, var(--button-default-background-color));
		border: 2px solid var(--button-color, var(--button-default-color));
		color: var(--button-color, var(--button-default-color));
		border-radius: var(--theme-border-radius, var(--theme-default-border-radius));
		min-width: var(--button-min-width, var(--button-default-min-width));
		width: var(--button-width, var(--button-default-width));
		height: var(--button-height, var(--button-default-height));

		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	button:hover {
		background-color: var(--button-background-color-hover, var(--button-default-background-color-hover));
		border: 2px solid var(--button-color-hover, var(--button-default-color-hover));
		color: var(--button-color-hover, var(--button-default-color-hover));
	}

	button:active,
	button:focus,
	button:active:focus {
		background-color: var(--button-background-color-active, var(--button-default-background-color-active));
		border: 2px solid var(--button-color-active, var(--button-default-color-active));
		color: var(--button-color-active, var(--button-default-color-active));
		outline: 1px solid var(--button-focus-ring-color, var(--button-default-focus-ring-color));
		outline-offset: 1px;
	}

	button[disabled],
	button:hover[disabled] {
		background-color: var(--button-background-color-disabled, var(--button-default-background-color-disabled));
		border: 2px solid var(--button-color-disabled, var(--button-default-color-disabled));
		color: var(--button-color-disabled, var(--button-default-color-disabled));
		cursor: not-allowed;
	}

	.icon {
		margin: auto 0;
	}

	span {
		font-size: 13px;
		font-weight: 500;
		line-height: 1;
	}
</style>
