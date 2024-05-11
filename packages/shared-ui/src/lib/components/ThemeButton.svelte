<script lang="ts">
	export let disabled = false;
	export let tooltip = '';
	export let alignSelf = '';
	export let wrapperWidth = '';
	export let classList: string[] = [];
	export let iconWidth = '14px';
	export let gridStyle = '';
	let buttonStyle: string;
	let buttonElement: HTMLButtonElement;

	$: alignSelfStyle = alignSelf ? `align-self: ${alignSelf};` : '';
	$: flexStyle = $$slots.label ? '--button-default-flex: 0 0 auto;' : '--button-default-flex: 0 1 auto;';
	$: widthStyle = wrapperWidth ? `width: ${wrapperWidth};` : '';
	$: iconStyle = iconWidth ? `--button-default-icon-size: ${iconWidth};` : '';
	$: paddingStyle = $$slots.label ? '--button-default-padding: 0 0.5rem;' : '--button-default-padding: 0;';
	$: buttonStyle = [alignSelfStyle, flexStyle, widthStyle, iconStyle, paddingStyle, gridStyle]
		.filter((s) => s !== '')
		.join(' ');

	export function focus() {
		buttonElement.focus();
	}
</script>

<button
	bind:this={buttonElement}
	type="button"
	title={tooltip}
	class={classList.join(' ')}
	{disabled}
	style={buttonStyle}
	on:click
>
	{#if $$slots.icon}
		<div
			class="icon"
			style="width: var(--button-icon-size, var(--button-default-icon-size)); height: var(--button-icon-size, var(--button-default-icon-size))"
		>
			<slot name="icon" />
		</div>
	{/if}
	{#if $$slots.label}
		<span class="label">
			<slot name="label" />
		</span>
	{/if}
</button>

<style lang="postcss">
	button {
		/* All State Styles */
		--button-default-display: flex;
		--button-default-flex-flow: row nowrap;
		--button-default-justify-content: center;
		--button-default-align-items: center;
		--button-default-gap: 0.25rem;
		--button-default-min-width: 32px;
		--button-default-width: auto;
		--button-default-height: 32px;
		--button-default-font-size: 13px;
		--button-default-font-weight: 500;
		--button-default-line-height: 1;
		--button-default-white-space: nowrap;

		--button-default-border-radius: var(--theme-border-radius, var(--theme-default-border-radius));
		--button-default-border-width: 2px;
		--button-default-border-style: solid;

		--button-default-border-radius: var(--theme-border-radius, var(--theme-default-border-radius));
		--button-default-border-width: 2px;
		--button-default-border-style: solid;
		--button-default-border-color: var(--button-text-color, var(--button-default-text-color));

		--button-default-transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
		--button-default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--button-default-transition-duration: 150ms;

		/* Default Styles */
		--button-default-text-color: var(--theme-text-color, var(--theme-default-text-color));
		--button-default-background-color: var(--theme-background-color, var(--theme-default-background-color));
		--button-default-border-color: var(--button-text-color, var(--button-default-text-color));
		--button-default-focus-ring-color: var(--theme-focus-ring-color, var(--theme-default-focus-ring-color));

		/* Hover Styles */
		--button-default-text-color-hover: var(--theme-text-color, var(--theme-default-text-color));
		--button-default-background-color-hover: var(
			--theme-background-color-hover,
			var(--theme-default-background-color-hover)
		);
		--button-default-border-color-hover: var(--button-text-color, var(--button-default-text-color));

		/* Active Styles */
		--button-default-text-color-active: var(--theme-text-color-active, var(--theme-default-text-color-active));
		--button-default-background-color-active: var(
			--theme-background-color-active,
			var(--theme-default-background-color-active)
		);
		--button-default-border-color-active: var(--button-text-color-active, var(--button-default-text-color-active));

		/* Disabled Styles */
		--button-default-text-color-disabled: var(--theme-color-disabled, var(--theme-default-color-disabled));
		--button-default-background-color-disabled: var(
			--theme-background-color-disabled,
			var(--theme-default-background-color-disabled)
		);
		--button-default-border-color-disabled: var(
			--button-text-color-disabled,
			var(--button-default-text-color-disabled)
		);

		display: var(--button-display, var(--button-default-display));
		flex: var(--button-flex, var(--button-default-flex));
		flex-flow: var(--button-flex-flow, var(--button-default-flex-flow));
		justify-content: var(--button-justify-content, var(--button-default-justify-content));
		align-items: var(--button-align-items, var(--button-default-align-items));
		gap: 0.5rem;
		min-width: var(--button-min-width, var(--button-default-min-width));
		width: var(--button-width, var(--button-default-width));
		height: var(--button-height, var(--button-default-height));
		white-space: var(--button-white-space, var(--button-default-white-space));

		color: var(--button-text-color, var(--button-default-text-color));
		background-color: var(--button-background-color, var(--button-default-background-color));
		border-width: var(--button-border-width, var(--button-default-border-width));
		border-style: var(--button-border-style, var(--button-default-border-style));
		border-color: var(--button-border-color, var(--button-default-border-color));
		border-radius: var(--button-border-radius, var(--button-default-border-radius));
		font-size: var(--button-font-size, var(--button-default-font-size));
		font-weight: var(--button-font-weight, var(--button-default-font-weight));
		line-height: var(--button-line-height, var(--button-default-line-height));

		transition-property: var(--button-transition-property, var(--button-default-transition-property));
		transition-timing-function: var(
			--button-transition-timing-function,
			var(--button-default-transition-timing-function)
		);
		transition-duration: var(--button-transition-duration, var(--button-default-transition-duration));
		padding: var(--button-padding, var(--button-default-padding));
	}

	button:hover {
		color: var(--button-text-color-hover, var(--button-default-text-color-hover));
		background-color: var(--button-background-color-hover, var(--button-default-background-color-hover));
		border-color: var(--button-border-color-hover, var(--button-default-border-color-hover));
	}

	button:active,
	button:focus,
	button:active:focus {
		color: var(--button-text-color-active, var(--button-default-text-color-active));
		background-color: var(--button-background-color-active, var(--button-default-background-color-active));
		border-color: var(--button-border-color-active, var(--button-default-border-color-active));
		outline: 1px solid var(--button-focus-ring-color, var(--button-default-focus-ring-color));
		outline-offset: 1px;
	}

	button[disabled],
	button:hover[disabled],
	button:active[disabled],
	button:focus[disabled],
	button:active:focus[disabled] {
		cursor: not-allowed;
		color: var(--button-text-color-disabled, var(--button-default-text-color-disabled));
		background-color: var(--button-background-color-disabled, var(--button-default-background-color-disabled));
		border-color: var(--button-border-color-disabled, var(--button-default-border-color-disabled));
		outline: none;
	}

	.icon {
		margin: auto;
		flex: 0 0 auto;
	}
	.label {
		grid-area: label;
		flex: 1 0 auto;
	}
</style>
