import type { FilterSetting, GHRepo, LanguageOrTech, RepoWithMetaData } from '$lib/types';
import { isUserRepo } from '$lib/util';
import { nullRepoWithMetadata } from './constants';

export const repoDataDepot: {
	[key: string]: {
		primaryLanguage: LanguageOrTech;
		primaryCategory: 'frontend' | 'backend';
		languages: LanguageOrTech[];
		categories: FilterSetting[];
	};
} = {
	'aaronluna.dev': {
		primaryLanguage: 'Hugo',
		primaryCategory: 'frontend',
		languages: [],
		categories: ['blog_portfolio_sites', 'frontend']
	},
	'async-file-server': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['backend', 'cli_apps']
	},
	'console-progress-bar': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['backend', 'cli_apps']
	},
	'dotnetcore-crypto': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['backend', 'cryptography']
	},
	'fastapi-redis-cache': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['Redis', 'FastAPI'],
		categories: ['backend', 'dev_tools', 'fastapi_plugins']
	},
	'flask-api-tutorial': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['Flask', 'Hugo', 'SQLAlchemy', 'SQLite'],
		categories: ['backend', 'docs_guides', 'api_development']
	},
	'packer-examples': {
		primaryLanguage: 'Shell',
		primaryCategory: 'backend',
		languages: ['AWS'],
		categories: ['backend', 'dev_tools', 'devops']
	},
	'svelte-base64-ts': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['Puppeteer', 'TypeScript', 'XState'],
		categories: ['frontend', 'web_app']
	},
	'svelte-base64': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['Cypress'],
		categories: ['frontend', 'web_app']
	},
	'svelte-color-tools': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['RegExp', 'TailwindCSS', 'TypeScript'],
		categories: ['frontend', 'component_library']
	},
	'svelte-simple-tables-docs': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TailwindCSS', 'TypeScript'],
		categories: ['docs_guides', 'frontend', 'web_app', 'component_library']
	},
	'svelte-simple-tables': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TypeScript'],
		categories: ['frontend', 'component_library']
	},
	'unicode-api': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['FastAPI', 'Pydantic'],
		categories: ['api_development', 'backend']
	},
	'vig-api': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['FastAPI', 'Pydantic'],
		categories: ['api_development', 'backend']
	},
	'vig-data': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TypeScript'],
		categories: ['frontend', 'web_app']
	},
	vigorish: {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['AWS', 'lxml', 'Puppeteer', 'RegExp', 'SQLAlchemy', 'SQLite', 'XPath'],
		categories: ['backend', 'cli_apps', 'web_scraping']
	}
};

export const updateProjectMetaData = (project: GHRepo): RepoWithMetaData =>
	isUserRepo(project.name)
		? {
				name: project.name,
				description: project.description,
				starCount: project.stargazers_count,
				forkCount: project.forks_count,
				repoUrl: project.html_url,
				starsUrl: project.stargazers_url,
				forksUrl: project.forks_url,
				primaryLanguage: repoDataDepot?.[project.name]?.primaryLanguage ?? 'allLanguages',
				primaryCategory: repoDataDepot?.[project.name]?.primaryCategory ?? 'allCategories',
				languages: repoDataDepot?.[project.name]?.languages ?? ['allLanguages'],
				categories: repoDataDepot?.[project.name]?.categories ?? ['allCategories']
		  }
		: nullRepoWithMetadata;
