<script lang="ts">
	import ProjectList from '$lib/components/ProjectList/ProjectList.svelte';
</script>

<div class="projects-outer portfolio">
	<div class="projects">
		<h2>// My_Projects</h2>
		<ProjectList />
	</div>
</div>

<style lang="postcss">
	.projects-outer {
		z-index: 3;
	}
	.projects {
		margin: 0 auto;
		padding: 0 1.5rem 1.5rem 1.5rem;
		max-width: 700px;
	}
	h2 {
		font-family: 'Roboto Mono', menlo, consolas, monospace;
		font-size: 1.9em;
		margin: 1.5rem 0;
	}

	@media (min-width: 640px) {
		h2 {
			font-size: 2.5rem;
		}
		.projects {
			padding: 0 2rem 2rem 2rem;
		}
	}

	@media (min-width: 768px) {
		\ h2 {
			font-size: 2.3rem;
		}
		.projects {
			padding: 0 0 3rem 0;
		}
	}

	@media (min-width: 1024px) {
		h2 {
			font-size: 2.5rem;
		}
	}
</style>
