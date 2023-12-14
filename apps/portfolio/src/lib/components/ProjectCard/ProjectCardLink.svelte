<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
</script>

<div class="project-card-link">
	<div class="icon">
		<BasicIconRenderer icon={'arrow'} width={'24px'} />
	</div>
</div>

<style lang="postcss">
	.project-card-link {
		display: flex;
		width: 3rem;
		height: 3rem;
		justify-content: center;
		align-items: center;
		color: var(--body-text);
		background-color: var(--project-card-border-color);
		border-left-width: 2px;
		border-left-style: solid;
		border-left-color: var(--project-card-border-color);
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: var(--project-card-border-color);

		grid-column: 4 / span 1;
		grid-row: 1 / span 3;
	}

	:global(.project-card:hover) .project-card-link {
		color: var(--black);
		background-color: var(--link-color);
		border-left-color: var(--link-color);
		border-bottom-color: var(--link-color);
	}

	.icon {
		transform: rotate(45deg);
	}
</style>
