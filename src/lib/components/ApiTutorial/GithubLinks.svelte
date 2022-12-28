<script lang="ts">
	import Chevron from '$lib/components/Icons/Chevron.svelte';
	import type { TutorialSection } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import { slide } from 'svelte/transition';

	export let id = `gh-${getRandomHexString(4)}`;
	export let detailsElement: HTMLDetailsElement;
	export let section: TutorialSection;
	let open = false;

	import { createEventDispatcher } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
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
			<div class="details-icon"><Chevron /></div>
			Github Links for {section.series_part}
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
		flex: 1;
		width: 100%;
		padding: 0;
		margin: 0 0 1rem 0;
	}

	#github-links ::marker {
		color: var(--accent-color);
	}

	#github-links a,
	#github-links a:hover {
		color: var(--accent-color);
		background-color: var(--toggle-group-bg-color);
		transition: all 350ms ease-out;
	}

	.github-links-wrapper ul {
		list-style: square;
		margin: 1rem 0 1rem 2.5rem;
	}

	.github-links-wrapper ul p {
		color: var(--white-shade4);
	}

	.github-links-wrapper ul p strong {
		color: var(--white);
	}

	.github-links-wrapper ul > li::marker {
		color: var(--accent-color);
	}

	.github-links-wrapper > ul > li {
		margin: 0.5rem 0 0.5rem 0;
	}

	.github-links-wrapper > ul > li:first-child {
		margin: 0;
	}

	#github-links summary::-webkit-details-marker {
		/* Hides marker on Safari */
		display: none;
	}

	#github-links > summary {
		display: list-item;
		list-style: none;
		color: var(--accent-color);
		background-color: var(--toggle-group-bg-color);
		border-top: none;
		border-left: 2px solid var(--accent-color);
		border-right: 2px solid var(--accent-color);
		border-bottom: 2px solid var(--accent-color);
		font-size: 1.25rem;
		line-height: 1;
		padding: 11px 5px;
		cursor: pointer;
		white-space: nowrap;
	}

	#github-links[open] > summary {
		color: var(--widget-bg-color);
		font-weight: 500;
		background-color: var(--accent-color);
	}

	#github-links > summary > .summary-wrapper {
		flex: 0;
		display: flex;
		gap: 1rem;
		align-items: center;
		width: 100%;
		margin: 0 0 0 0.5rem;
	}

	.details-icon {
		width: 12px;
		transition: transform 0.3s ease-in;
	}

	#github-links[open] .details-icon {
		transform: rotate(90deg);
	}

	.github-links-wrapper {
		background-color: var(--toggle-group-bg-color);
		border: 2px solid var(--accent-color);
	}
</style>
