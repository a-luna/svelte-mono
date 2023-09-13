<script lang="ts">
	import type { TutorialSection } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { slide } from 'svelte/transition';

	export let id = `gh-${getRandomHexString(4)}`;
	export let detailsElement: HTMLDetailsElement;
	export let section: TutorialSection;
	let open = false;

	import { beforeNavigate } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	const toggleDetailsElement = createEventDispatcher<{
		toggleSection: { sectionId: string };
	}>();

	function handleSectionToggled() {
		open = detailsElement.open;
		toggleDetailsElement('toggleSection', { sectionId: id });
	}

	beforeNavigate(() => {
		if (detailsElement) {
			detailsElement.open = false;
		}
	});
</script>

<details id="github-links" bind:this={detailsElement} on:toggle={() => handleSectionToggled()}>
	<summary>
		<div class="summary-wrapper">
			<div class="details-icon"><BasicIconRenderer icon={'chevron'} /></div>
			<span class="summary-text">Github Links for {section.series_part}</span>
		</div>
	</summary>
	{#if open}
		<div
			class="github-links-wrapper"
			in:slide={{ duration: 300, delay: 100 }}
			out:slide={{ duration: 300, delay: 100 }}
		>
			<ul>
				<p>
					The github repository for this project contains <a
						href="https://github.com/a-luna/flask-api-tutorial/releases"
						>a tagged release for each section of the tutorial</a
					>, please use the links below to view or download the code for
					<strong>{section.series_part}</strong>.
				</p>
				<li>
					<a href={section.url_git_rel_browse}>View Code</a>
				</li>
				<li>
					<a href={section.url_git_rel_zip}>Download .zip file</a>
				</li>
				<li>
					<a href={section.url_git_rel_tar}>Download .tar.gz file</a>
				</li>
			</ul>
		</div>
	{/if}
</details>

<style lang="postcss">
	#github-links {
		background-color: var(--toggle-section-bg-color);
	}

	.github-links-wrapper ul p {
		color: var(--white-shade4);
	}

	.github-links-wrapper ul p strong {
		color: var(--white);
	}

	#github-links > summary {
		border-top: 1.5px solid transparent;
		border-left: 1.5px solid var(--dark-gray);
		border-right: 1.5px solid var(--dark-gray);
		border-bottom: 1.5px solid var(--dark-gray);
	}

	#github-links[open] .github-links-wrapper,
	#github-links > summary:hover {
		color: var(--link-color);
		border-color: var(--link-color);
	}

	#github-links[open] > summary {
		color: var(--toggle-section-bg-color);
		border-color: var(--link-color);
	}

	#github-links[open] > summary,
	#github-links > summary:hover {
		border-top: 1.5px solid var(--link-color);
	}

	.github-links-wrapper {
		border: 1px solid var(--dark-gray);
	}

	@media (min-width: 640px) {
		#github-links > summary {
			border-top: 2px solid transparent;
			border-left: 2px solid var(--dark-gray);
			border-right: 2px solid var(--dark-gray);
			border-bottom: 2px solid var(--dark-gray);
		}

		#github-links[open] > summary,
		#github-links > summary:hover {
			border-top: 2px solid var(--link-color);
		}

		.github-links-wrapper {
			border: 2px solid var(--dark-gray);
		}
	}
</style>
