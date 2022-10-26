<script lang="ts">
	import type { TutorialSection } from '$lib/types';
	import ArrowDown from '../Icons/ArrowDown.svelte';
	import Code from '../Icons/Code.svelte';

	export let section: TutorialSection;
</script>

<div class="api-tutorial-section">
	<a href="flask-api-tutorial/{section?.slug}" class="section-name"><h4>{section?.lead}</h4></a>
	<div class="section-summary">{section?.description}</div>
	<div class="github-links">
		<a href={section?.url_git_rel_browse}
			><div class="icon"><Code /></div>
			<span class="label">Code</span></a
		>
		<a href={section?.url_git_rel_diff}
			><div class="icon"><Code /></div>
			<span class="label">Diff</span></a
		>
		<a href={section?.url_git_rel_zip}
			><div class="icon"><ArrowDown /></div>
			<span class="label">.zip</span></a
		>
		<a href={section?.url_git_rel_tar}
			><div class="icon"><ArrowDown /></div>
			<span class="label">.tar.gz</span></a
		>
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
		padding: 2rem;
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
		transition: all 350ms ease-out;
	}

	.section-summary {
		font-size: 0.9rem;
		color: var(--white-shade3);
		line-height: 1.5;
	}

	.github-links {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.25rem;
		justify-content: space-between;
		align-items: center;
		line-height: 1;
		margin: 1rem 0 0 0;
	}

	.github-links a {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
		color: var(--purple-icon);
		background-color: var(--black);
		border: 1px solid var(--purple-icon);
		box-shadow: none;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		min-width: 110px;
		padding: 0.5rem 1rem;
		transition: all 0.3s linear;
	}

	.github-links .icon {
		height: 16px;
	}

	.github-links a:hover {
		color: var(--black);
		background-color: var(--purple-icon);
	}
</style>
