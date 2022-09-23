<script lang="ts">
	import SvgIcon from '$lib/components/Icons/SvgIcon.svelte';
	import type { RepoWithMetaData } from '$lib/types';

	export let project: RepoWithMetaData;
</script>

<div class="github-stats">
	<a href={project.starsUrl} class="gh-url">
		<SvgIcon icon={'star'} size={'16px'} />
		<span class="stat">{project.starCount}</span>
	</a>
	<a href={project.forksUrl} class="gh-url">
		<SvgIcon icon={'fork'} size={'16px'} />
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
