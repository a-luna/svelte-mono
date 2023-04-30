import type { BlogPost, RepoWithMetaData } from '$lib/types';

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT'] as const;

export const HTTP_AUTH_TYPES = ['Basic', 'Token'] as const;

export const ICON_NAMES = ['fork', 'github', 'star'] as const;

export const ICON_COLORS = [
	'red',
	'yellow',
	'yellow-green',
	'green',
	'blue',
	'dark-blue',
	'purple',
	'pink',
	'teal',
	'orange',
	'default',
] as const;

export const NAV_ICON_NAMES = [
	'androidmask',
	'audiocassette',
	'boltspellcast',
	'cybereye',
	'dustcloud',
	'firesilhouette',
	'heptagram',
	'highfive',
	'moebiusstar',
	'orbital',
	'ramprofile',
	'spatter',
	'stairs3d',
	'summits',
	'sverdifjell',
	'teleport',
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
	'null',
	'aaronluna.dev',
	'async-file-server',
	'console-progress-bar',
	'dotnetcore-crypto',
	'fastapi-redis-cache',
	'flask-api-tutorial',
	'packer-examples',
	'svelte-base64-ts',
	'svelte-base64',
	'svelte-color-tools',
	'svelte-simple-tables-docs',
	'svelte-simple-tables',
	'unicode-api',
	'vig-api',
	'vig-data',
	'vigorish',
] as const;

export const FEATURED_PROJECTS = [
	'fastapi-redis-cache',
	'svelte-base64-ts',
	'svelte-color-tools',
	'svelte-simple-tables',
	'unicode-api',
	'vigorish',
];

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
};

export const nullBlogPost: BlogPost = {
	content: '',
	title: '',
	subtitle: '',
	description: '',
	frontmatter: {},
	hasToc: false,
	category: 'allCategories',
	language: 'allLanguages',
	categories: [],
	techList: [],
	canonical: '',
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
