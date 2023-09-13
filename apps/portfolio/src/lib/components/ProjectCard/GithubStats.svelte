<script lang="ts">
	import type { RepoWithMetaData } from '$lib/types';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let project: RepoWithMetaData;
	export let iconSize = '16px';

	$: margin = iconSize === '16px' ? 'margin: 0 2rem 0 0;' : 'margin: 0;';
</script>

<div class="github-stats" style={margin}>
	<a href={project.starsUrl} class="gh-url">
		<BasicIconRenderer icon={'star'} height={iconSize} width={iconSize} margin={'auto 0'} />
		<span class="stat">{project.starCount}</span>
	</a>
	<a href={project.forksUrl} class="gh-url">
		<BasicIconRenderer icon={'fork'} height={iconSize} width={iconSize} margin={'auto 0'} />
		<span class="stat">{project.forkCount}</span>
	</a>
</div>

<style lang="postcss">
	:global(.featured-projects) .github-stats {
		font-size: 0.85rem;
	}
	.github-stats {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
	}
	.gh-url {
		display: flex;
		gap: 5px;
		color: var(--gray);
		background-color: var(--black);
		text-decoration: none;
	}
	.gh-url:hover {
		color: var(--white);
		background-color: var(--black);
	}

	@media screen and (min-width: 640px) {
		.github-stats {
			gap: 0.75rem;
			font-size: 1.1rem;
		}
	}
</style>
