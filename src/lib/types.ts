import type AllProjects from '$lib/components/Icons/Category/AllProjects.svelte';
import type Aws from '$lib/components/Icons/Language/AWS.svelte';
import type Cypress from '$lib/components/Icons/Language/Cypress.svelte';
import type Database from '$lib/components/Icons/Language/Database.svelte';
import type FastApi from '$lib/components/Icons/Language/FastAPI.svelte';
import type Flask from '$lib/components/Icons/Language/Flask.svelte';
import type Hugo from '$lib/components/Icons/Language/Hugo.svelte';
import type Lxml from '$lib/components/Icons/Language/lxml.svelte';
import type Microsoft from '$lib/components/Icons/Language/Microsoft.svelte';
import type NoTechFilter from '$lib/components/Icons/Language/NoTechFilter.svelte';
import type Puppeteer from '$lib/components/Icons/Language/Puppeteer.svelte';
import type Python from '$lib/components/Icons/Language/Python.svelte';
import type Redis from '$lib/components/Icons/Language/Redis.svelte';
import type RegExp from '$lib/components/Icons/Language/RegExp.svelte';
import type Shell from '$lib/components/Icons/Language/Shell.svelte';
import type Sqlite from '$lib/components/Icons/Language/Sqlite.svelte';
import type Svelte from '$lib/components/Icons/Language/Svelte.svelte';
import type Tailwind from '$lib/components/Icons/Language/Tailwind.svelte';
import type TypeScript from '$lib/components/Icons/Language/TypeScript.svelte';
import type Xml from '$lib/components/Icons/Language/XML.svelte';
import type XState from '$lib/components/Icons/Language/XState.svelte';
import type {
	BACKEND_CATEGORIES,
	FRONTEND_CATEGORIES,
	HTTP_AUTH_TYPES,
	HTTP_METHODS,
	ICON_COLORS,
	ICON_NAMES,
	PROJECT_CATEGORIES,
	PROJECT_TYPES,
	REPO_NAMES,
	TECH_LIST
} from '$lib/constants';

export type HttpMethod = typeof HTTP_METHODS[number];
export type HttpAuthType = typeof HTTP_AUTH_TYPES[number];
export type IconName = typeof ICON_NAMES[number];
export type IconColor = typeof ICON_COLORS[number];
export type RepoName = typeof REPO_NAMES[number];
export type ProjectType = typeof PROJECT_TYPES[number];
export type FrontendCategory = typeof FRONTEND_CATEGORIES[number];
export type BackendCategory = typeof BACKEND_CATEGORIES[number];
export type ProjectCategory = typeof PROJECT_CATEGORIES[number];
export type LanguageOrTech = typeof TECH_LIST[number];
export type FilterSetting = ProjectType | ProjectCategory | LanguageOrTech | '';

export type HttpError = { status: number; message: string };
export type HttpResult = { success: true; value: Response } | { success: false; error: HttpError };
export type Result<T = void> = { success: true; value: T } | { success: false; error: string };

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

export interface BlogPost {
	type: 'blog';
	content: string;
	title: string;
	subtitle: string;
	description: string;
	frontmatter: {
		[key: string]: string;
	};
	hasToc: boolean;
	toc?: TocSection[];
	category: string;
	tags: string[];
	canonical: string;
	slug: string;
	date: string;
	coverImage: BlogResource;
	resources: ResourceMap;
	codeBlocks?: CodeBlock[];
}

export type BlogPostDateMap = Pick<BlogPost, 'slug' | 'date' | 'title'>;

export interface TutorialSection extends BlogPost {
	lead?: string;
	series_weight?: number;
	series_title?: string;
	series_part?: string;
	series_part_lead?: string;
	git_release_name?: string;
	url_git_rel_browse?: string;
	url_git_rel_zip?: string;
	url_git_rel_tar?: string;
	url_git_rel_diff?: string;
}

export type TutorialSectionNumberMap = Pick<TutorialSection, 'slug' | 'lead' | 'series_part' | 'series_weight'>;

export interface GHUser {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: 'User';
	site_admin: boolean;
}

export interface GHRepo {
	id?: number;
	node_id?: string;
	name: string;
	full_name?: string;
	private?: boolean;
	owner?: GHUser;
	html_url: string;
	description: string;
	fork?: boolean;
	url?: string;
	forks_url: string;
	keys_url?: string;
	collaborators_url?: string;
	teams_url?: string;
	hooks_url?: string;
	issue_events_url?: string;
	events_url?: string;
	assignees_url?: string;
	branches_url?: string;
	tags_url?: string;
	blobs_url?: string;
	git_tags_url?: string;
	git_refs_url?: string;
	trees_url?: string;
	statuses_url?: string;
	languages_url?: string;
	stargazers_url: string;
	contributors_url?: string;
	subscription_url?: string;
	subscribers_url?: string;
	git_commits_url?: string;
	commits_url?: string;
	issue_comment_url?: string;
	comments_url?: string;
	compare_url?: string;
	contents_url?: string;
	archive_url?: string;
	merges_url?: string;
	issues_url?: string;
	downloads_url?: string;
	milestones_url?: string;
	pulls_url?: string;
	labels_url?: string;
	notifications_url?: string;
	deployments_url?: string;
	releases_url?: string;
	created_at?: string;
	updated_at?: string;
	pushed_at?: string;
	git_url?: string;
	ssh_url?: string;
	clone_url?: string;
	svn_url?: string;
	homepage?: string;
	size?: number;
	stargazers_count: number;
	watchers_count?: number;
	language?: string;
	has_issues?: boolean;
	has_projects?: boolean;
	has_downloads?: boolean;
	has_wiki?: boolean;
	has_pages?: boolean;
	forks_count: number;
	mirror_url?: string;
	archived?: boolean;
	disabled?: boolean;
	open_issues_count?: number;
	license?: string;
	allow_forking?: boolean;
	is_template?: boolean;
	web_commit_signoff_required?: boolean;
	topics?: string[];
	visibility?: 'public' | 'private';
	forks?: number;
	open_issues?: number;
	watchers?: number;
	default_branch?: string;
	temp_clone_token?: string;
	network_count?: number;
	subscribers_count?: number;
}

export interface RepoWithMetaData {
	name: RepoName;
	description: string;
	starCount: number;
	forkCount: number;
	repoUrl: string;
	starsUrl: string;
	forksUrl: string;
	primaryLanguage: FilterSetting;
	primaryCategory: FilterSetting;
	languages?: FilterSetting[];
	categories?: FilterSetting[];
}

export type UserRepos = { [key: string]: RepoWithMetaData };

export type Icon =
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

export interface ProjectCategoryDetails {
	displayName: string;
	color: IconColor;
	hasIcon: boolean;
}

export interface ProjectTypeDetails extends ProjectCategoryDetails {
	icon: Icon;
	size: number;
}

export type FilterSettingDetails = ProjectTypeDetails | ProjectCategoryDetails;

export interface FilterSettingDetailsDatabase {
	[k: string]: FilterSettingDetails;
}
