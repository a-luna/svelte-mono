<script lang="ts">
	import type { HslColor } from '$lib';
	import PushableButtonBase from '$lib/components/PushableButton/PushableButtonBase.svelte';
	import { getRandomHexString } from '$lib/util';

	export let fgColor: HslColor | undefined = undefined;
	export let bgColor: HslColor | undefined = undefined;
	export let disabled = false;
	export let testid = `button-${getRandomHexString({ length: 4 })}`;
</script>

<PushableButtonBase {fgColor} {bgColor} {disabled} {testid} on:click>
	{#if $$slots.icon}
		<div class="icon">
			<slot name="icon" />
		</div>
	{/if}
	{#if $$slots.label}
		<div class="label">
			<slot name="label" />
		</div>
	{/if}
</PushableButtonBase>

<style lang="postcss">
	.icon {
		width: var(--pushable-button-icon-size, var(--pushable-button-default-icon-size));
		height: var(--pushable-button-icon-size, var(--pushable-button-default-icon-size));
		flex: 0 0 auto;
	}
	.label {
		flex: 1;
	}
</style>
