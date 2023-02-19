<script lang="ts">
	import type { TocSection } from '$lib/types';

	export let section: TocSection;
	const { heading, children } = section;
	const { slug, text } = heading;
</script>

<li>
	<a href="#{slug}">{@html text}</a>
	{#if children.length}
		<ul>
			{#each children as subSection}
				<svelte:self section={subSection} />
			{/each}
		</ul>
	{/if}
</li>

<style lang="postcss">
	ul {
		list-style: square;
		margin: 0.25rem 0 0.75rem 1rem;
	}
</style>
