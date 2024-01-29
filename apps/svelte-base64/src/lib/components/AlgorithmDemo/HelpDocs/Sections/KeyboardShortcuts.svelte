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
		gap: 0.75rem;
		margin: 0 auto;
		line-height: 1;
		align-items: self-end;
	}
	kbd {
		background-color: var(--light-gray2);
		border-radius: 3px;
		border: 1px solid var(--white1);
		color: var(--black1);
		display: flex;
		justify-content: center;
		align-items: baseline;
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1;
		padding: 2px;
		white-space: nowrap;
		text-align: center;
	}
</style>
