<script lang="ts">
	import PreviewImage from '$lib/components/ApiTutorial/PreviewImage.svelte';
	import type { TutorialSection } from '$lib/types';
	import { BasicIconRenderer } from '@a-luna/shared-ui';

	export let section: TutorialSection;
	let slug = '';
	let href: string | undefined = '';
	let lead: string | undefined = '';
	let description: string | undefined = '';
	let url_git_rel_browse: string | undefined = '';
	let url_git_rel_zip: string | undefined = '';
	let url_git_rel_tar: string | undefined = '';
	let url_git_rel_diff: string | undefined = '';

	$: ({ slug, href, lead, description, url_git_rel_browse, url_git_rel_zip, url_git_rel_tar, url_git_rel_diff } =
		section);
</script>

<div class="api-tutorial-section">
	<div class="summary-top">
		<div class="top-left">
			<div class="image">
				<a {href}><PreviewImage {slug} /></a>
			</div>
		</div>
		<div class="top-right">
			<a {href} class="section-name"><h4>{lead}</h4></a>
		</div>
	</div>
	<div class="section-summary">{description}</div>
	<div class="github-links">
		<div class="links-left green">
			<a href={url_git_rel_browse} title="View source for this tutorial section">
				<div class="button-label">
					<div class="icon"><BasicIconRenderer icon={'code'} /></div>
					<span class="label">code</span>
				</div>
			</a>
			<a href={url_git_rel_diff} title="View source diff between this section and the previous">
				<div class="button-label">
					<div class="icon"><BasicIconRenderer icon={'code'} /></div>
					<span class="label">diff</span>
				</div>
			</a>
		</div>
		<div class="links-right">
			<a href={url_git_rel_zip} title="Download source code for this tutorial section (.zip file)">
				<div class="button-label">
					<div class="icon"><BasicIconRenderer icon={'arrowdown'} /></div>
					<span class="label">.zip</span>
				</div>
			</a>
			<a href={url_git_rel_tar} title="Download source code for this tutorial section (.tar.gz file)">
				<div class="button-label">
					<div class="icon"><BasicIconRenderer icon={'arrowdown'} /></div>
					<span class="label">.tar.gz</span>
				</div>
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
		border-color: hsl(76 100% 50%);
		border-color: oklch(92.22% 0.244 126.84);
	}

	h4 {
		color: inherit;
		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		margin: 0;
		line-height: 1.3;
	}

	.section-name,
	.section-name:hover {
		font-size: 1.4rem;
		font-weight: 400;
		background-color: var(--page-bg-color);
		text-decoration: none;
		line-height: 1.3;
		transition: background-color 350ms ease-out, color 350ms ease-out;
	}

	.section-summary {
		font-size: 0.85rem;
		color: var(--white-shade3);
		line-height: 1.6;
	}

	.summary-top {
		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
	}

	.image {
		height: 150px;
		width: 100%;
		background-color: var(--black-tint2);
	}

	.top-left .image :global(img) {
		height: 100%;
		margin: 0;
	}

	.top-right {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		gap: 1rem;
	}

	.github-links {
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		gap: 0.75rem;
		align-items: center;
		line-height: 1;
		margin: 0;
	}

	.github-links a {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.links-left,
	.links-right {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-evenly;
		gap: 0.75rem;
	}

	.links-left a,
	.links-right a {
		font-size: 0.85rem;
		box-shadow: none;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		min-width: 80px;
		padding: 0.6rem 0.5rem;
	}

	.button-label {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.75rem;
		width: 65px;
	}

	.links-left a {
		color: hsl(76 100% 50%);
		color: oklch(92.22% 0.244 126.84);
		background-color: var(--black);
		border: 1px solid currentColor;
	}

	.links-left a:hover {
		background-color: hsl(76 100% 50%);
		background-color: oklch(92.22% 0.244 126.84);
		color: var(--black);
	}

	.links-right a {
		color: hsl(173.22 100% 65%);
		color: oklch(90.73% 0.159 184.005);
		background-color: var(--black);
		border: 1px solid currentColor;
	}

	.links-right a:hover {
		background-color: hsl(173.22 100% 65%);
		background-color: oklch(90.73% 0.159 184.005);
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

	.links-left .icon {
		width: 15px;
	}

	.links-right .icon {
		width: 11px;
	}

	@media (min-width: 600px) {
		.github-links {
			flex-flow: row nowrap;
			justify-content: space-evenly;
		}
		.links-left,
		.links-right {
			flex: 1;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-evenly;
			gap: 0.5rem;
		}

		.button-label {
			width: 100%;
			justify-content: center;
		}
	}

	@media (min-width: 640px) {
		.api-tutorial-section {
			padding: 1.5rem;
		}

		.github-links {
			gap: 1rem;
		}

		.links-left,
		.links-right {
			gap: 1rem;
		}

		.github-links .icon {
			height: 14px;
		}

		.links-left .icon {
			width: 16px;
		}

		.links-right .icon {
			width: 12px;
		}
	}
	@media (min-width: 768px) {
		.github-links a {
			flex: 1;
			font-size: 0.9rem;
			padding: 0.6rem 1rem;
		}
	}
</style>
