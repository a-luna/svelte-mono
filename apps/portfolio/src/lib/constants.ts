import type { AppStore, BlogPost, RepoWithMetaData } from '$lib/types';

export const SCREEN_SIZES = ['sm', 'md', 'lg'] as const;

export const SITE_SECTIONS = ['home', 'projects', 'blog', 'about', 'tutorial'] as const;

export const TRANSITION_SECTIONS = ['/', '/projects', '/blog', '/about'] as const;

export const CONTENT_TYPES = ['blog', 'tutorial', 'readme'] as const;

export const PAGE_TYPES = ['section', 'content'] as const;

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT'] as const;

export const HTTP_AUTH_TYPES = ['Basic', 'Token'] as const;

export const ICON_NAMES = ['fork', 'github', 'star'] as const;

export const ICON_COLORS = [
	'red',
	'orange',
	'yellow',
	'yellow-green',
	'green',
	'teal',
	'blue',
	'purple',
	'pink',
	'default',
] as const;

export const NAV_ICON_NAMES = [
	'arrowed',
	'androidmask',
	'audiocassette',
	'boltspellcast',
	'chemicaldrop',
	'cybereye',
	'dustcloud',
	'fireflake',
	'firesilhouette',
	'heptagram',
	'stigmata',
	'moebiusstar',
	'orbital',
	'ramprofile',
	'spatter',
	'stairs3d',
	'summits',
	'sverdifjell',
	'teleport',
	'tronarrow',
	'uluru',
	'vulture',
] as const;

export const TECH_LIST = [
	'allLanguages',
	'AWS',
	'CSharp',
	'Cypress',
	'FastAPI',
	'Flask',
	'Hugo',
	'lxml',
	'Puppeteer',
	'Playwright',
	'Pydantic',
	'Python',
	'Redis',
	'RegExp',
	'Shell',
	'SQLAlchemy',
	'SQLite',
	'Svelte',
	'TailwindCSS',
	'TypeScript',
	'XPath',
	'XState',
] as const;

export const REPO_NAMES = [
	'aaronluna.dev',
	'async-file-server',
	'console-progress-bar',
	'dotnetcore-crypto',
	'fastapi-redis-cache',
	'flask-api-tutorial',
	'packer-examples',
	'svelte-simple-tables-docs',
	'svelte-simple-tables',
	'unicode-api',
	'vig-api',
	'vig-data',
	'vigorish',
] as const;

export const MONOREPO_NAMES = ['svelte-mono', ''] as const;

export const MONOREPO_PROJECTS = ['portfolio', 'svelte-base64', 'svelte-color-tools'] as const;

export const PROJECT_NAMES = [...REPO_NAMES, ...MONOREPO_PROJECTS] as const;

export const FEATURED_PROJECTS = ['fastapi-redis-cache', 'svelte-simple-tables', 'unicode-api', 'vigorish'] as const;

export const PROJECT_TYPES = ['allProjects', 'backend', 'frontend'] as const;

export const FRONTEND_CATEGORIES = ['blog_portfolio_sites', 'docs_guides', 'web_app', 'component_library'] as const;

export const BACKEND_CATEGORIES = [
	'rest_api',
	'cli_apps',
	'cryptography',
	'dev_tools',
	'devops',
	'fastapi_plugins',
	'virtualization',
	'web_scraping',
] as const;

export const PROJECT_CATEGORIES = ['allCategories', ...BACKEND_CATEGORIES, ...FRONTEND_CATEGORIES] as const;

export const defaultAppState: AppStore = {
	initialized: false,
	url: '',
	pageType: 'section',
	pageHeight: 0,
	pageWidth: 0,
	viewportHeight: 0,
	screenSize: 'lg',
	fadeInDelay: 0,
	showScrollToTopButton: false,
	scrollY: 0,
};

export const nullRepoWithMetadata: RepoWithMetaData = {
	name: 'null',
	description: '',
	starCount: 0,
	forkCount: 0,
	repoUrl: '',
	starsUrl: '',
	forksUrl: '',
	primaryLanguage: 'allLanguages',
	primaryCategory: 'allProjects',
	languages: ['allLanguages'],
	categories: ['allCategories'],
	updatedAt: '',
	deployedUrl: '',
	projectSiteTitle: '',
	inMonorepo: false,
	monorepoName: '',
	monorepoProjectPath: '',
};

export const nullBlogPost: BlogPost = {
	content: '',
	title: '',
	subtitle: '',
	description: '',
	frontmatter: {},
	hasToc: false,
	category: 'allProjects',
	language: 'allLanguages',
	categories: [],
	techList: [],
	slug: '',
	url: '',
	date: '',
	coverImage: {
		name: '',
		src: '',
		caption: '',
	},
	resources: {},
};
