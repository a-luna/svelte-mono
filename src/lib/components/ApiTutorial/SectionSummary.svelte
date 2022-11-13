<script lang="ts">
	import type { TutorialSection } from '$lib/types';
	import ArrowDown from '../Icons/ArrowDown.svelte';
	import Code from '../Icons/Code.svelte';

	export let section: TutorialSection;
	let href: string | undefined = '';
	let lead: string | undefined = '';
	let description: string | undefined = '';
	let url_git_rel_browse: string | undefined = '';
	let url_git_rel_zip: string | undefined = '';
	let url_git_rel_tar: string | undefined = '';
	let url_git_rel_diff: string | undefined = '';

	$: ({ href, lead, description, url_git_rel_browse, url_git_rel_zip, url_git_rel_tar, url_git_rel_diff } = section);
</script>

<div class="api-tutorial-section">
	<a {href} class="section-name"><h4>{lead}</h4></a>
	<div class="section-summary">{description}</div>
	<div class="github-links">
		<div class="links-left">
			<a href={url_git_rel_browse} title="View source for this tutorial section">
				<div class="icon"><Code /></div>
				<span class="label">Code</span>
			</a>
			<a href={url_git_rel_diff} title="View source diff between this section and the previous">
				<div class="icon"><Code /></div>
				<span class="label">Diff</span>
			</a>
		</div>
		<div class="links-right">
			<a href={url_git_rel_zip} title="Download source code for this tutorial section (.zip file)">
				<div class="icon"><ArrowDown /></div>
				<span class="label">.zip</span>
			</a>
			<a href={url_git_rel_tar} title="Download source code for this tutorial section (.tar.gz file)">
				<div class="icon"><ArrowDown /></div>
				<span class="label">.tar.gz</span>
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.api-tutorial-section {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		border-width: 2px;
		border-style: solid;
		border-color: var(--dark-gray);
		color: var(--white);
		background-color: var(--black);
		padding: 1rem;
	}

	.api-tutorial-section:hover {
		border-color: var(--accent-color);
	}

	.section-name,
	.section-name:hover {
		font-size: 1.4rem;
		font-weight: 400;
		color: var(--accent-color);
		text-decoration: none;
		line-height: 1.3;
		transition: background-color 350ms ease-out, color 350ms ease-out;
	}

	.section-summary {
		font-size: 0.9rem;
		color: var(--white-shade3);
		line-height: 1.5;
	}

	.github-links {
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
		align-items: center;
		line-height: 1;
		margin: 1rem 0 0 0;
	}

	.links-left,
	.links-right {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-evenly;
		gap: 0.5rem;
	}

	.links-left a,
	.links-right a {
		display: grid;
		grid-template-rows: auto;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.825rem;
		box-shadow: none;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		min-width: 80px;
		padding: 0.5rem 0.5rem;
	}

	.links-left a {
		grid-template-columns: 1fr 20px 33px 1fr;
		color: var(--green-icon);
		background-color: var(--black);
		border: 1px solid var(--green-icon);
	}

	.links-left a:hover {
		background-color: var(--green-icon);
		color: var(--black);
	}

	.links-right a {
		grid-template-columns: 1fr 13px 38px 1fr;
		color: var(--blue-icon);
		background-color: var(--black);
		border: 1px solid var(--blue-icon);
	}

	.links-right a:hover {
		background-color: var(--blue-icon);
		color: var(--black);
	}

	.github-links .icon {
		height: 13px;
		justify-self: flex-end;
		grid-column: 2 / span 1;
	}

	.github-links .label {
		justify-self: flex-start;
		grid-column: 3 / span 1;
	}

	@media (min-width: 520px) {
		.github-links {
			flex-flow: row nowrap;
			justify-content: space-evenly;
		}
		.github-links a {
			flex: 1;
			font-size: 0.9rem;
			padding: 0.5rem 1rem;
		}
		.links-left,
		.links-right {
			flex: 1;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-evenly;
			gap: 0.5rem;
		}
	}

	@media (min-width: 640px) {
		.api-tutorial-section {
			padding: 2rem;
		}

		.github-links {
			gap: 1rem;
		}

		.github-links a {
			font-size: 1rem;
			min-width: 110px;
			padding: 0.5rem 1rem;
		}

		.links-left,
		.links-right {
			gap: 1rem;
		}

		.github-links .icon {
			height: 14px;
		}
	}
</style>
