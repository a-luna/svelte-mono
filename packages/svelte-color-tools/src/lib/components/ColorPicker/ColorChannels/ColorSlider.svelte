<svelte:options accessors />

<script lang="ts">
	export let name: string;
	export let min: number = 0;
	export let max: number = 255;
	export let step: number = 1;
	export let value: number;
	export let disabled: boolean = false;

	$: formattedValue = disabled ? '' : ['S', 'L'].includes(name) ? `${value}%` : value?.toString();
</script>

<div class="flex flex-row flex-nowrap items-center gap-2" class:disabled>
	<label for="slider" class="text-right flex-initial font-medium">{name}</label>
	<input
		id="{name}-slider"
		data-testid="{name}-slider"
		type="range"
		{min}
		{max}
		{step}
		{disabled}
		class="m-0 flex-grow"
		bind:value
		on:change
	/>
	<span class="value flex-initial font-medium" data-testid="{name}-slider-value">{formattedValue}</span>
</div>

<style>
	label {
		width: 15px;
	}
	.value {
		width: 43px;
	}
	.disabled {
		color: var(--dark-gray1);
	}
	input[type='range']:focus {
		outline: 1px solid transparent;
	}
</style>
