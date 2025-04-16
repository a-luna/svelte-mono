import type {
	AndroidMask,
	Arrowed,
	AudioCassette,
	BoltSpellCast,
	ChemicalDrop,
	CyberEye,
	DustCloud,
	FireFlake,
	FireSilhouette,
	Heptagram,
	MoebiusStar,
	Orbital,
	RamProfile,
	Spatter,
	Stairs3D,
	Stigmata,
	Summits,
	SverdIFjell,
	Teleport,
	TronArrow,
	Uluru,
	Vulture,
} from '$lib/components/Icons';
import {
	SPECIFIC_TECH_LIST,
	TECH_LIST,
	type BACKEND_CATEGORIES,
	type CONTENT_TYPES,
	type FEATURED_PROJECTS,
	type FRONTEND_CATEGORIES,
	type HTTP_AUTH_TYPES,
	type HTTP_METHODS,
	type ICON_COLORS,
	type ICON_NAMES,
	type MONOREPO_NAMES,
	type MONOREPO_PROJECTS,
	type NAV_ICON_NAMES,
	type PAGE_TYPES,
	type PROJECT_CATEGORIES,
	type PROJECT_NAMES,
	type PROJECT_TYPES,
	type REPO_NAMES,
	type SCREEN_SIZES,
	type SITE_SECTIONS,
	type TRANSITION_SECTIONS,
} from '$lib/constants';
import type {
	Asterisk as AllProjects,
	Aws,
	Cypress,
	Database,
	FastApi,
	Flask,
	Hugo,
	Code as Lxml,
	Microsoft,
	Asterisk as NoTechFilter,
	Playwright,
	Puppeteer,
	Python,
	Redis,
	RegExp,
	ShellPrompt as Shell,
	Sqlite,
	Svelte,
	Tailwind,
	TypeScript,
	XState,
	Xml,
} from '@a-luna/shared-ui';

export type ScreenSize = (typeof SCREEN_SIZES)[number];
export type TransitionSection = (typeof TRANSITION_SECTIONS)[number];
export type SiteSection = (typeof SITE_SECTIONS)[number];
export type ContentType = (typeof CONTENT_TYPES)[number];
export type PageType = (typeof PAGE_TYPES)[number];
export type HttpMethod = (typeof HTTP_METHODS)[number];
export type HttpAuthType = (typeof HTTP_AUTH_TYPES)[number];
export type IconName = (typeof ICON_NAMES)[number];
export type NavIconName = (typeof NAV_ICON_NAMES)[number];
export type IconColor = (typeof ICON_COLORS)[number];
export type RepoName = (typeof REPO_NAMES)[number];
export type Monorepo = (typeof MONOREPO_NAMES)[number];
export type MonorepoProjectName = (typeof MONOREPO_PROJECTS)[number];
export type ProjectName = (typeof PROJECT_NAMES)[number];
export type FeaturedProject = (typeof FEATURED_PROJECTS)[number];
export type ProjectType = (typeof PROJECT_TYPES)[number];
export type FrontendCategory = (typeof FRONTEND_CATEGORIES)[number];
export type BackendCategory = (typeof BACKEND_CATEGORIES)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type LanguageOrTech = (typeof TECH_LIST)[number];
export type SpecificLangOrTech = (typeof SPECIFIC_TECH_LIST)[number];
export type FilterSetting = ProjectType | ProjectCategory | LanguageOrTech | '';

export interface AppStore {
	initialized: boolean;
	url: string;
	pageType: PageType;
	pageHeight: number;
	pageWidth: number;
	viewportHeight: number;
	scrollY: number;
	screenSize: ScreenSize;
	fadeInDelay: number;
	showScrollToTopButton: boolean;
}

export interface SectionTransition {
	inProgress: boolean;
	showContent: boolean;
	from: string;
	fromComplete: boolean;
	to: string;
	toComplete: boolean;
}

export interface HttpAuthToken {
	type: HttpAuthType;
	token: string;
}

export interface FrontMatterResources {
	name: string;
	src: string;
	params?: {
		credit: string;
	};
	title?: string;
}

export interface PartialFrontMatter {
	slug: string;
	resources: FrontMatterResources[];
}

export interface HtmlHeading {
	level: number;
	slug: string;
	text: string;
	index: number;
}

export interface TocSection {
	heading: HtmlHeading;
	children: TocSection[];
}

export interface BlogResource {
	name: string;
	src: string;
	caption?: string;
}

export interface ResourceMap {
	[k: string]: BlogResource;
}

export interface CodeBlock {
	shiki: boolean;
	id: string;
	index: number;
	lang: string;
	lineNumbers: boolean;
	lineNumberStart: number;
}

export interface ProjectReadme {
	content: string;
	title: string;
	description: string;
	hasToc: boolean;
	toc: TocSection[];
	category: ProjectType | '';
	language: LanguageOrTech | '';
	categories: ProjectCategory[];
	techList: LanguageOrTech[];
	slug: string;
	href: string;
	url: string;
	date: string;
	coverImage: BlogResource;
	resources: ResourceMap;
	codeBlocks: CodeBlock[];
	deployedUrl: string;
	projectSiteTitle: string;
}

export interface BlogPost extends ProjectReadme {
	subtitle: string;
	frontmatter: {
		[key: string]: string;
	};
}

export type BlogPostDateMap = Pick<BlogPost, 'slug' | 'date' | 'title'>;

export interface TutorialSection extends BlogPost {
	lead: string;
	series_weight: number;
	series_title: string;
	series_part: string;
	series_part_lead: string;
	git_release_name: string;
	url_git_rel_browse: string;
	url_git_rel_zip: string;
	url_git_rel_tar: string;
	url_git_rel_diff: string;
}

export type TutorialSectionNumberMap = Pick<TutorialSection, 'slug' | 'lead' | 'series_part' | 'series_weight'>;

export interface OrderedNavItem {
	slug: string;
	title: string;
	titleCompact: string;
	weight: number;
}

export interface RepoWithMetaData {
	name: ProjectName;
	description: string;
	starCount: number;
	forkCount: number;
	repoUrl: string;
	starsUrl: string;
	forksUrl: string;
	primaryLanguage: LanguageOrTech;
	primaryCategory: ProjectType;
	languages?: LanguageOrTech[];
	categories?: ProjectCategory[];
	updatedAt: string;
	deployedUrl: string;
	projectSiteTitle: string;
	inMonorepo: boolean;
	monorepoName: Monorepo;
	monorepoProjectPath: string;
}

export type UserRepos = Record<ProjectName, RepoWithMetaData>;

export interface CachedProjectData {
	repos: UserRepos;
	cachedAt: string;
}

export type FilterSettingIcon =
	| typeof AllProjects
	| typeof Aws
	| typeof Cypress
	| typeof Database
	| typeof FastApi
	| typeof Flask
	| typeof Hugo
	| typeof Lxml
	| typeof Microsoft
	| typeof NoTechFilter
	| typeof Playwright
	| typeof Puppeteer
	| typeof Python
	| typeof Redis
	| typeof RegExp
	| typeof Shell
	| typeof Sqlite
	| typeof Svelte
	| typeof Tailwind
	| typeof TypeScript
	| typeof Xml
	| typeof XState;

export type NavIcon =
	| typeof Arrowed
	| typeof AndroidMask
	| typeof AudioCassette
	| typeof ChemicalDrop
	| typeof CyberEye
	| typeof DustCloud
	| typeof BoltSpellCast
	| typeof FireFlake
	| typeof FireSilhouette
	| typeof Heptagram
	| typeof Stigmata
	| typeof MoebiusStar
	| typeof Orbital
	| typeof RamProfile
	| typeof Spatter
	| typeof Stairs3D
	| typeof Summits
	| typeof SverdIFjell
	| typeof Teleport
	| typeof TronArrow
	| typeof Uluru
	| typeof Vulture;

export interface ProjectCategoryDetails {
	displayName: string;
	color: IconColor;
	hasIcon: boolean;
}

export interface ProjectTypeDetails extends ProjectCategoryDetails {
	icon: FilterSettingIcon;
	size: number;
}

export type FilterSettingDetails = Partial<ProjectTypeDetails>;

export interface FilterSettingDetailsDatabase {
	[k: string]: FilterSettingDetails;
}

export interface CodeBlockUpdateDetails {
	codeBlock: string;
	length: number;
	originalLength: number;
	offset: number;
	shiki: boolean;
}

export interface hasDate {
	date: Date | string;
}

export interface SortFunction<T> {
	(a: T, b: T): number;
}

export * from './github';
export * from './util';
