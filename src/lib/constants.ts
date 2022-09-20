import type { ContentItem } from '$lib/types';

export const ICON_NAMES = ['circle', 'fork', 'github', 'star'] as const;

export const ICON_COLORS = ['yellow', 'green', 'blue', 'purple', 'pink', 'default'] as const;

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
	'XState'
] as const;

export const REPO_NAMES = [
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
	'vig-api',
	'vig-data',
	'vigorish'
] as const;

export const PROJECT_TYPES = ['allProjects', 'backend', 'frontend'] as const;

export const FRONTEND_CATEGORIES = [
	'blog_portfolio_sites',
	'docs_guides',
	'web_app',
	'component_library'
] as const;

export const BACKEND_CATEGORIES = [
	'api_development',
	'cli_apps',
	'cryptography',
	'dev_tools',
	'devops',
	'fastapi_plugins',
	'web_scraping'
] as const;

export const PROJECT_CATEGORIES = [
	'allCategories',
	...BACKEND_CATEGORIES,
	...FRONTEND_CATEGORIES
] as const;

export const nullContentItem: ContentItem = {
	type: 'blog',
	content: '',
	title: '',
	subtitle: '',
	description: '',
	frontmatter: {},
	category: '',
	tags: [],
	image: '',
	canonical: '',
	slug: '',
	date: new Date(null),
	ghMetadata: {
		issueUrl: '',
		commentsUrl: '',
		title: '',
		created_at: new Date(null),
		updated_at: new Date(null),
		reactions: {
			total_count: 0,
			'+1': 0,
			'-1': 0,
			laugh: 0,
			hooray: 0,
			confused: 0,
			heart: 0,
			rocket: 0,
			eyes: 0
		}
	}
};
