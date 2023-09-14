<svelte:options accessors />

<script lang="ts">
	export let name: string;
	export let min: number = 0;
	export let max: number = 255;
	export let step: number = 1;
	export let value: number;
	export let isPercent: boolean = false;
	export let display: number;
	export let disabled: boolean = false;

	$: formattedValue = disabled ? '' : isPercent ? `${display}%` : display.toString();
</script>

<div class="color-slider" class:disabled>
	<label for="slider">{name}</label>
	<input
		id="{name}-slider"
		data-testid="{name}-slider"
		type="range"
		{min}
		{max}
		{step}
		{disabled}
		bind:value
		on:change
	/>
	<span class="value" data-testid="{name}-slider-value">{formattedValue}</span>
</div>

<style>
	.color-slider {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 0.5rem;
		align-items: center;
	}
	label {
		flex: 0 1 auto;
		font-weight: 500;
		text-align: right;
		width: 15px;
	}
	input[type='range'] {
		margin: 0;
		flex-grow: 1;
	}
	input[type='range']:focus {
		outline: 1px solid transparent;
	}
	.value {
		flex: 0 1 auto;
		font-weight: 500;
		width: 43px;
	}
	.disabled {
		color: var(--dark-gray1);
	}
</style>
