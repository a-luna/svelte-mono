<script lang="ts">
	import Arrow from '$lib/components/Icons/Arrow.svelte';
</script>

<div class="project-card-link">
	<div class="icon">
		<Arrow width={'24px'} height={'24px'} />
	</div>
</div>

<style lang="postcss">
	.project-card-link {
		display: flex;
		width: 3rem;
		height: 3rem;
		justify-content: center;
		align-items: center;
		color: var(--white-shade5);
		background-color: var(--project-card-border-color);
		border-left-width: 2px;
		border-left-style: solid;
		border-left-color: var(--project-card-border-color);
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: var(--project-card-border-color);

		grid-column: 4 / span 1;
		grid-row: 1 / span 2;
	}

	.icon {
		width: 24px;
		height: 24px;
		transform: rotate(45deg);
	}
</style>
