<script lang="ts">
	import CopyColorString from '$lib/components/ColorPicker/ColorLabel/CopyColorString.svelte';
	import EditColorString from '$lib/components/ColorPicker/ColorLabel/EditColorString.svelte';
	import { copyToClipboard } from '$lib/helpers';
	import { getContext, onDestroy } from 'svelte';

	export let pickerId: string;
	export let alphaEnabled: boolean;
	let { state } = getContext(pickerId);
	let timeout: NodeJS.Timeout;

	$: labelPadding = $state.labelState === 'edit' ? 'p-2' : 'p-2.5';
	$: inactiveStyle = 'background-color: var(--white4)';
	$: copiedStyle = 'background-color: var(--light-gray2)';
	$: editStyle = 'background-color: var(--white4); color: var(--black4)';
	$: successStyle = 'background-color: var(--white4); color: var(--green2)';
	$: errorStyle = 'background-color: var(--white4); color: var(--red2)';
	$: style =
		$state.labelState === 'copied'
			? copiedStyle
			: $state.labelState === 'edit'
			? editStyle
			: $state.labelState === 'success'
			? successStyle
			: $state.labelState === 'error'
			? errorStyle
			: inactiveStyle;

	async function handleCopyButtonClicked(colorString: string) {
		await copyToClipboard(colorString);
		clearTimeout(timeout);
		$state.labelState = 'copied';
		timeout = setTimeout(() => ($state.labelState = 'inactive'), 500);
	}

	function handleEditButtonClicked() {
		if ($state.editable) {
			$state.labelState = 'edit';
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<div class="color-label flex flex-row flex-nowwrap gap-3 {labelPadding}" {style}>
	{#if $state.labelState === 'edit'}
		<EditColorString on:updateColor on:keepCurrentColor={() => ($state.labelState = 'inactive')} />
	{:else}
		<CopyColorString
			color={$state.color}
			{alphaEnabled}
			editable={$state.editable}
			on:copyColorString={(e) => handleCopyButtonClicked(e.detail)}
			on:editColorString={() => handleEditButtonClicked()}
		/>
	{/if}
</div>

<style lang="postcss">
	.color-label {
		border-radius: 6px;
		transition: background-color, color 350ms ease-out;
		width: 230px;
	}
</style>
