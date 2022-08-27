import type {
	FilterSetting,
	FilterSettingDetails,
	GHRepo,
	LanguageOrTech,
	ProjectCategory,
	RepoWithMetaData
} from '$lib/types';
import { isUserRepo } from '$lib/util';

export const repoDataDepot: {
	[key: string]: {
		primaryLanguage: LanguageOrTech;
		primaryCategory: 'frontend' | 'backend';
		languages: LanguageOrTech[];
		categories: ProjectCategory[];
	};
} = {
	'aaronluna.dev': {
		primaryLanguage: 'Hugo',
		primaryCategory: 'frontend',
		languages: [],
		categories: ['blog_portfolio_sites', 'docs_guides', 'frontend']
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
		categories: ['backend', 'cli_apps', 'dev_tools']
	},
	'dotnetcore-crypto': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['backend', 'cryptography', 'dev_tools']
	},
	'fastapi-redis-cache': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['Redis', 'FastAPI'],
		categories: ['backend', 'cli_apps', 'dev_tools', 'fastapi_plugins']
	},
	'flask-api-tutorial': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['Flask', 'Hugo', 'SQLAlchemy', 'SQLite'],
		categories: ['backend', 'cryptography', 'docs_guides', 'api_development']
	},
	'packer-examples': {
		primaryLanguage: 'Shell',
		primaryCategory: 'backend',
		languages: ['AWS'],
		categories: ['backend', 'dev_tools', 'devops', 'docs_guides']
	},
	'svelte-base64-ts': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['Puppeteer', 'TypeScript', 'XState'],
		categories: ['docs_guides', 'frontend', 'svelte_apps_sites']
	},
	'svelte-base64': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['Cypress'],
		categories: ['frontend', 'svelte_apps_sites']
	},
	'svelte-color-tools': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['RegExp', 'TailwindCSS', 'TypeScript'],
		categories: ['frontend', 'svelte_components']
	},
	'svelte-simple-tables-docs': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TailwindCSS', 'TypeScript'],
		categories: ['docs_guides', 'frontend', 'svelte_apps_sites', 'svelte_components']
	},
	'svelte-simple-tables': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TypeScript'],
		categories: ['frontend', 'svelte_components']
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
		categories: ['frontend', 'svelte_apps_sites']
	},
	vigorish: {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['AWS', 'lxml', 'Puppeteer', 'RegExp', 'SQLAlchemy', 'SQLite', 'XPath'],
		categories: ['backend', 'cli_apps', 'web_scraping']
	}
};

export function updateProjectMetaData(project: GHRepo): RepoWithMetaData {
	if (isUserRepo(project.name)) {
		return {
			name: project.name,
			description: project.description,
			starCount: project.stargazers_count,
			forkCount: project.forks_count,
			repoUrl: project.html_url,
			starsUrl: project.stargazers_url,
			forksUrl: project.forks_url,
			primaryLanguage: repoDataDepot[project.name].primaryLanguage,
			primaryCategory: repoDataDepot[project.name].primaryCategory,
			languages: repoDataDepot[project.name].languages,
			categories: repoDataDepot[project.name].categories
		};
	}
}

export const categoryMetaData = {};

export const getCategoryDetails = (name: FilterSetting): FilterSettingDetails =>
	categoryMetaData[name];
