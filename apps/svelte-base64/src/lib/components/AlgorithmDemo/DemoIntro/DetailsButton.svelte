<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	export let expanded: boolean;
</script>

<div class="list-icon">
	{#if expanded}
		<BasicIconRenderer icon={'circlefull'} />
	{:else}
		<BasicIconRenderer icon={'circleoutline'} />
	{/if}
</div>

<style lang="postcss">
	div {
		width: 14px;
	}
	.list-icon {
		color: var(--pri-color);
	}

	@media screen and (min-width: 764px) {
		div {
			width: 15px;
		}
	}
</style>
