<script lang="ts">
	import type { RepoWithMetaData } from '$lib/types';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let project: RepoWithMetaData;
</script>

<div class="github-stats">
	<a href={project.starsUrl} class="gh-url">
		<BasicIconRenderer icon={'star'} height={'16px'} />
		<span class="stat">{project.starCount}</span>
	</a>
	<a href={project.forksUrl} class="gh-url">
		<BasicIconRenderer icon={'fork'} height={'16px'} />
		<span class="stat">{project.forkCount}</span>
	</a>
</div>

<style lang="postcss">
	.github-stats {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
		margin: 0 2rem 0 0;
	}
	.gh-url {
		display: flex;
		gap: 5px;
		color: var(--white-shade5);
		text-decoration: none;
	}
	.gh-url:hover {
		color: var(--white);
	}

	@media screen and (min-width: 640px) {
		.github-stats {
			gap: 0.75rem;
			font-size: 1.1rem;
		}
	}
</style>
