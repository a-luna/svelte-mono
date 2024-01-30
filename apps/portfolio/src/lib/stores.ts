import { initializeProjectData } from '$lib/projectMetaData';
import type {
	AppStore,
	BlogPost,
	CachedProjectData,
	OrderedNavItem,
	PageType,
	ScreenSize,
	SectionTransition,
	TutorialSection,
} from '$lib/types';
import { sortByDate } from '$lib/util';
import { getPageHeight, getPageWidth, getViewportHeight } from '@a-luna/shared-ui/stores';
import { getContext, setContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';

export const url = writable('');
export const navMounted = writable(false);
export const mobileNavOpen = writable(false);
export const isInitialPageLoad = writable(true);
export const initialFadePerformed = writable(false);
export const menuButtonWasClicked = writable(false);
export const sectionTransition = writable<SectionTransition>({
	inProgress: false,
	from: '',
	fromComplete: false,
	to: '',
	toComplete: false,
});
export const userRepos = writable<CachedProjectData>(initializeProjectData());
export const blogPosts = writable<BlogPost[]>([]);
export const tutorialSections = writable<TutorialSection[]>([]);

export const blogPostDateMap: Readable<OrderedNavItem[]> = derived(blogPosts, ($blogPosts) =>
	sortByDate($blogPosts, { key: 'date' }).map(({ slug, title }, i) => ({
		slug,
		title,
		titleCompact: title,
		weight: i,
	})),
);

export const tutorialSectionNumberMap: Readable<OrderedNavItem[]> = derived(tutorialSections, ($tutorialSections) =>
	$tutorialSections
		.sort((a, b) => (a?.series_weight ?? 0) - (b?.series_weight ?? 0))
		.map(({ slug, series_weight, series_part, lead }) => ({
			slug,
			title: lead || series_part || '',
			titleCompact: series_part || '',
			weight: series_weight || 0,
		})),
);

export function getAppState(
	url: Writable<string>,
	pageHeight: Writable<number>,
	pageWidth: Writable<number>,
	viewportHeight: Writable<number>,
	scrollY: Writable<number>,
): Readable<AppStore> {
	return derived(
		[url, pageHeight, pageWidth, viewportHeight, scrollY, navMounted],
		([$url, $pageHeight, $pageWidth, $viewportHeight, $scrollY, $navMounted]) => {
			const sectionRoutes = ['/', '/projects', '/blog', '/about'];
			const scrollBarWidth = 8;

			const getPageType = (): PageType => (sectionRoutes.includes($url) ? 'section' : 'content');
			const getScreenSize = (): ScreenSize =>
				$pageWidth + scrollBarWidth < 640 ? 'sm' : $pageWidth + scrollBarWidth < 768 ? 'md' : 'lg';
			const getFadeInDelay = (): number => ($pageWidth < 640 ? 200 : $pageWidth < 768 ? 300 : 250);
			const showScrollToTopButton = (): boolean => $pageHeight > $viewportHeight && $scrollY > 0;

			return {
				initialized: true,
				url: $url,
				pageType: getPageType(),
				pageHeight: $pageHeight,
				pageWidth: $pageWidth,
				viewportHeight: $viewportHeight,
				scrollY: $scrollY,
				screenSize: getScreenSize(),
				fadeInDelay: getFadeInDelay(),
				showScrollToTopButton: showScrollToTopButton(),
				navMounted: $navMounted,
			};
		},
	);
}

function setService<T>(service: T): T {
	setContext('app', service);
	return service;
}

function getService<T>(): () => T {
	return () => getContext('app');
}

export function initAppContext(scrollY: Writable<number>): Readable<AppStore> {
	let [pageWidth, pageHeight, viewportHeight] = [writable(0), writable(0), writable(0)];

	const getPageWidthResult = getPageWidth();
	if (getPageWidthResult.success) {
		pageWidth = getPageWidthResult.value;
	}
	const getPageHeightResult = getPageHeight();
	if (getPageHeightResult.success) {
		pageHeight = getPageHeightResult.value;
	}
	const getViewportHeightResult = getViewportHeight();
	if (getViewportHeightResult.success) {
		viewportHeight = getViewportHeightResult.value;
	}
	return setService<Readable<AppStore>>(getAppState(url, pageHeight, pageWidth, viewportHeight, scrollY));
}

export function getAppContext(): Readable<AppStore> {
	return getService<Readable<AppStore>>()();
}
