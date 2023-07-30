<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let toggled = false;
	export let anyCharsAreExpanded: boolean;

	$: tooltip = toggled
		? 'Click to hide the individual characters that create this emoji'
		: 'Click to show all characters that comprise this emoji';
	$: flex = anyCharsAreExpanded && !toggled ? 'flex: 0 0 25px;' : 'flex: 0 0 20px;';
</script>

<div class="button-wrapper" style={flex}>
	<button class="show-combined-emoji-button" class:toggled on:click title={tooltip}>
		{#if toggled}
			<BasicIconRenderer icon={'minus'} />
		{:else}
			<BasicIconRenderer icon={'plus'} />
		{/if}
	</button>
</div>

<style lang="postcss">
	.button-wrapper {
		border-top-left-radius: 6px;
		background-color: inherit;
		text-align: center;
	}
	.show-combined-emoji-button {
		width: 10px;
		height: 10px;
		color: var(--pri-color);
		background-color: transparent;
		border: none;
		margin: 2px 0;
		padding: 0;
		align-self: flex-start;
	}
	.show-combined-emoji-button:hover,
	.show-combined-emoji-button:focus,
	.show-combined-emoji-button:active,
	.show-combined-emoji-button:active:focus {
		color: var(--pri-color);
		background-color: transparent;
	}
</style>
