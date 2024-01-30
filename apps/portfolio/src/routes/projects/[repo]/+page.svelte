<script lang="ts">
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';
	import TableOfContents from '$lib/components/TableOfContents/TableOfContents.svelte';
	import type { ProjectReadme } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let project: ProjectReadme;

	$: project = data.readme;
</script>

<ContentLayout content={project} contentType={'readme'}>
	<svelte:fragment slot="toc">
		{#if project.hasToc && project.toc}
			<TableOfContents toc={project.toc} />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="content">
		{#if project.deployedUrl}
			<span class="heading-text level-2 underline--magical deployed-project">
				<a href="#deployed-project" class="hanchor hanchor-self" title="Link to this section">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						stroke="currentColor"
						fill="currentColor"
						style="stroke-width: 0; padding: 0;"
					>
						<path
							d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"
						/>
					</svg>
				</a>
				<h2 id="deployed-project">Deployed Project</h2>
			</span>
			<p>
				You can view the final, deployed version of this project by expanding the section below, or by visiting the URL
				below:
			</p>
			<p><a href={project.deployedUrl}>{project.deployedUrl}</a></p>
			<ExpandableSection classList={['project-site']} title={project.projectSiteTitle}>
				<iframe id="projectSite" title="Deployed Project" data-repo-name={project.slug} src={project.deployedUrl} />
			</ExpandableSection>
		{/if}
		{@html project?.content}
	</svelte:fragment>
</ContentLayout>

<style lang="postcss">
	iframe {
		aspect-ratio: 16/9;
		width: 100%;
	}

	[data-repo-name='unicode-api'] {
		height: 600px;
	}
</style>
