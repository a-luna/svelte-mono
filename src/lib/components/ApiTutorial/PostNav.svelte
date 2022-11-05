<script lang="ts">
	import ArrowLeft from '$lib/components/Icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/components/Icons/ArrowRight.svelte';
	import { tutorialSectionNumberMap } from '$lib/stores';
	import type { TutorialSectionNumberMap } from '$lib/types';

	export let slug: string;
	export let compact = false;
	let pageWidth: number;

	const part0: TutorialSectionNumberMap = {
		lead: 'Project Overview',
		slug: 'overview',
		series_weight: 0,
		series_part: 'Overview'
	};

	$: flexStyle = compact ? 'flex-flow: row nowrap;' : 'flex-flow: column nowrap;';
	$: fontSize = compact
		? pageWidth > 640
			? 'font-size: 1.2rem;'
			: 'font-size: 1;'
		: 'font-size: inherit;';
	$: lineHeight = compact ? 'line-height: 1;' : 'line-height: 1.3;';
	$: borderStyle = compact
		? 'border: none;'
		: 'border-top: 1px solid var(--white); border-bottom: 1px solid var(--white);';
	$: padding = compact ? 'padding: 0;' : 'padding: 1rem 0;';
	$: navStyles = `${flexStyle} ${fontSize} ${lineHeight} ${borderStyle} ${padding}`;
	$: linkFlexStyles = compact ? 'align-items: center;' : 'align-items: flex-start;';
	$: prevLinkPadding = compact ? 'padding: 0;' : 'padding: 0.5rem 0.5rem 0.5rem 0;';
	$: nextLinkPadding = compact ? 'padding: 0;' : 'padding: 0.5rem 0 0.5rem 0.5rem;';
	$: prevLinkStyles = `${linkFlexStyles} ${prevLinkPadding}`;
	$: nextLinkStyles = `${linkFlexStyles} ${nextLinkPadding}`;
	$: iconStyles = compact ? 'margin: 0;' : 'margin: 2px 0 0 0;';
	$: postIndex = $tutorialSectionNumberMap.findIndex((post) => post.slug === slug);
	$: previous = postIndex > 0 ? $tutorialSectionNumberMap.at(postIndex - 1) : part0;
	$: next =
		postIndex < $tutorialSectionNumberMap.length - 1
			? $tutorialSectionNumberMap.at(postIndex + 1)
			: null;
	$: previousLabel = compact ? previous?.series_part : previous?.lead;
	$: nextLabel = compact ? next?.series_part : next?.lead;
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="post-nav" style={navStyles}>
	<div class="post-nav-prev">
		{#if previous}
			<a href={previous.slug} style={prevLinkStyles}>
				<div class="icon icon-prev" style={iconStyles}><ArrowLeft /></div>
				<span class="prev-post-title post-title">{previousLabel}</span>
			</a>
		{/if}
	</div>
	<div class="post-nav-next">
		{#if next}
			<a href={next.slug} style={nextLinkStyles}>
				<span class="prev-post-title post-title">{nextLabel}</span>
				<div class="icon icon-next" style={iconStyles}><ArrowRight /></div>
			</a>
		{/if}
	</div>
</div>

<style lang="postcss">
	.post-nav {
		display: flex;
		width: 100%;
	}
	.post-nav-prev,
	.post-nav-next {
		flex: 1;
	}
	.post-nav-prev a,
	.post-nav-next a,
	.post-nav-prev a:hover,
	.post-nav-next a:hover {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.5rem;
		font-weight: 400;
		color: var(--accent-color);
		text-decoration: none;
		transition: background-color 350ms ease-out, color 350ms ease-out;
	}
	.post-nav-prev a {
		justify-content: flex-start;
		margin: 0 2rem 0 0;
	}
	.post-nav-next a {
		justify-content: flex-end;
		margin: 0 0 0 2rem;
		text-align: right;
	}
	.icon {
		height: 16px;
		flex: 0 0 14px;
	}
</style>
