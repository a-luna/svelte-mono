import type { BlogPost, BlogPostDateMap, GHRepo, TutorialSection, TutorialSectionNumberMap } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';

export const userRepos = writable<GHRepo[]>([]);
export const blogPosts = writable<BlogPost[]>([]);
export const tutorialSections = writable<TutorialSection[]>([]);

export const blogPostDateMap: Readable<BlogPostDateMap[]> = derived(blogPosts, ($blogPosts) =>
	$blogPosts
		.map(({ slug, date, title }) => ({ slug, date, title }))
		.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
);

export const tutorialSectionNumberMap: Readable<TutorialSectionNumberMap[]> = derived(
	tutorialSections,
	($tutorialSections) =>
		$tutorialSections
			.map(({ slug, series_weight, series_part, lead }) => ({
				slug,
				series_weight,
				series_part,
				lead
			}))
			.sort((a, b) => a.series_weight - b.series_weight)
);

/* c8 ignore start */
function syncHeight(el: HTMLElement): Writable<number> {
	return writable<number>(0, (set) => {
		if (!el) {
			return;
		}
		const ro = new ResizeObserver(() => el && set(el.offsetHeight));
		ro.observe(el);
		return () => ro.disconnect();
	});
}

export const getPageHeight = (): Writable<number> | undefined | null => {
	if (typeof window !== 'undefined') {
		const svelteDiv = document.getElementById('svelte');
		return svelteDiv ? syncHeight(svelteDiv) : null;
	}
	return undefined;
};
/* c8 ignore stop */
