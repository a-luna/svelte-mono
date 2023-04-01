<script lang="ts">
	import { BasicIconRenderer } from '../../../../node_modules/@a-luna/shared-ui';
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
		color: var(--white-shade5);
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

	.icon {
		transform: rotate(45deg);
	}
</style>
