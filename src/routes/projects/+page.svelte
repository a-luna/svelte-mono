<script lang="ts">
	import { userRepos } from '$lib/stores';
	import ProjectList from '$lib/components/ProjectList/ProjectList.svelte';

	$: allRepos = $userRepos.repos;
</script>

<div class="projects-outer portfolio">
	<div class="projects">
		<h1 class="section-header">Projects</h1>
		<ProjectList {allRepos} />
	</div>
</div>

<style lang="postcss">
	.projects-outer {
		--section-color: var(--pink-icon);
		z-index: 3;
	}
	.projects {
		margin: 0 auto;
		padding: 0 1.5rem 1.5rem 1.5rem;
		max-width: var(--max-width);
	}

	@media (min-width: 640px) {
		.projects {
			padding: 0 2rem 2rem 2rem;
		}
	}

	@media (min-width: 768px) {
		.projects {
			padding: 0 0 3rem 0;
		}
	}
</style>
