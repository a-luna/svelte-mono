<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';

	export let showFilters: boolean;
	export let filterApplied: boolean;
	const dispatch = createEventDispatcher();
</script>

<div class="filter-controls" class:filters-shown={showFilters}>
	<button
		class="show-filters"
		class:open={showFilters}
		title="Show/Hide Project Filters"
		on:click={() => (showFilters = !showFilters)}
	>
		<div class="icon">
			<BasicIconRenderer icon={'filter'} />
		</div>
	</button>
	<button
		class="reset-filters"
		disabled={!filterApplied}
		title="Reset Filters"
		on:click={() => dispatch('resetFilter')}
	>
		<div class="icon">
			<BasicIconRenderer icon={'close'} height={'100%'} width={'100%'} />
		</div>
	</button>
</div>

<style lang="postcss">
	.filter-controls {
		display: grid;
		grid-template-columns: 48px 48px;
		align-items: flex-start;
		gap: 1rem;
	}

	.show-filters,
	.reset-filters {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--black);
		border: 2px solid var(--white);
		color: var(--white);
		width: 48px;
		height: 48px;
	}

	.show-filters.open {
		border-color: var(--accent-color);
		background-color: var(--accent-color);
		color: var(--black);
	}

	.show-filters.open:hover {
		color: var(--page-bg-color);
	}

	.reset-filters[disabled] {
		border-color: var(--dark-gray-shade2);
		color: var(--dark-gray-shade2);
	}

	.show-filters:hover,
	.reset-filters:not([disabled]):hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}

	.show-filters .icon {
		margin: 3px 0 0 0;
	}

	.icon {
		width: 28px;
		height: 28px;
	}

	@media (min-width: 640px) {
		.filter-controls {
			grid-template-columns: 60px 60px;
		}
		.show-filters,
		.reset-filters {
			border-width: 3px;
			width: 60px;
			height: 60px;
		}
		.icon {
			width: 35px;
			height: 35px;
		}
	}
</style>
