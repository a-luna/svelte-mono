<script lang="ts">
	import ArrowKey from '$lib/components/Icons/KeyboardIcons/ArrowKey.svelte';
</script>

<div class="keyboard-help help-module">
	<div class="keyboard-shortcuts">
		<kbd title="Space Bar">Space</kbd><span>Start/Stop auto-play</span>
		<ArrowKey arrow="right" size="md" /><span>Go to previous step</span>
		<ArrowKey arrow="left" size="md" /><span>Go to next step</span>
	</div>
</div>

<style lang="postcss">
	.keyboard-help {
		margin: 0 auto;
	}
	.keyboard-shortcuts {
		display: grid;
		grid-template-columns: 65px auto;
		gap: 0.5rem;
		margin: 0 auto;
	}
	kbd {
		background-color: var(--light-gray2);
		border-radius: 3px;
		border: 1px solid var(--white1);
		color: var(--black1);
		display: flex;
		justify-content: center;
		align-items: baseline;
		font-size: 0.85rem;
		font-weight: 700;
		line-height: 1;
		padding: 3px;
		white-space: nowrap;
		text-align: center;
	}
</style>
