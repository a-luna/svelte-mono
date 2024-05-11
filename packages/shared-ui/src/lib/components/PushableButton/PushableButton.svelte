<script lang="ts">
	import type { ButtonSize, HslColor } from '$lib';
	import PushableButtonBase from '$lib/components/PushableButton/PushableButtonBase.svelte';
	import { getRandomHexString } from '$lib/util';

	export let fgColor: HslColor | undefined = undefined;
	export let bgColor: HslColor | undefined = undefined;
	export let size: ButtonSize = 'sm';
	export let disabled = false;
	export let width = 'auto';
	export let testid = `button-${getRandomHexString({ length: 4 })}`;
</script>

<PushableButtonBase {fgColor} {bgColor} {size} {disabled} {width} {testid} on:click>
	<slot></slot>
</PushableButtonBase>
