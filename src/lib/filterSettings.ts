import AllProjects from '$lib/components/Icons/Category/AllProjects.svelte';
import Backend from '$lib/components/Icons/Category/Backend.svelte';
import Frontend from '$lib/components/Icons/Category/Frontend.svelte';
import Aws from '$lib/components/Icons/Language/AWS.svelte';
import Cypress from '$lib/components/Icons/Language/Cypress.svelte';
import Database from '$lib/components/Icons/Language/Database.svelte';
import FastApi from '$lib/components/Icons/Language/FastAPI.svelte';
import Flask from '$lib/components/Icons/Language/Flask.svelte';
import Hugo from '$lib/components/Icons/Language/Hugo.svelte';
import Lxml from '$lib/components/Icons/Language/lxml.svelte';
import Microsoft from '$lib/components/Icons/Language/Microsoft.svelte';
import Puppeteer from '$lib/components/Icons/Language/Puppeteer.svelte';
import Python from '$lib/components/Icons/Language/Python.svelte';
import Redis from '$lib/components/Icons/Language/Redis.svelte';
import RegExp from '$lib/components/Icons/Language/RegExp.svelte';
import Shell from '$lib/components/Icons/Language/Shell.svelte';
import Sqlite from '$lib/components/Icons/Language/Sqlite.svelte';
import Svelte from '$lib/components/Icons/Language/Svelte.svelte';
import Tailwind from '$lib/components/Icons/Language/Tailwind.svelte';
import TypeScript from '$lib/components/Icons/Language/TypeScript.svelte';
import Xml from '$lib/components/Icons/Language/XML.svelte';
import XState from '$lib/components/Icons/Language/XState.svelte';
import type { FilterSetting, FilterSettingDatabase, FilterSettingDetails } from '$lib/types';

export const filterSettingDatabase: FilterSettingDatabase = {
	allProjects: {
		hasIcon: true,
		icon: AllProjects,
		displayName: 'All Projects',
		color: 'green',
		size: 16
	},
	allCategories: {
		hasIcon: false,
		displayName: 'All Categories',
		color: 'default',
		size: 16
	},
	allLanguages: {
		hasIcon: true,
		icon: AllProjects,
		displayName: 'All Languages',
		color: 'blue',
		size: 16
	},
	frontend: {
		hasIcon: true,
		icon: Frontend,
		displayName: 'Frontend',
		color: 'pink',
		size: 16
	},
	backend: {
		hasIcon: true,
		icon: Backend,
		displayName: 'Backend',
		color: 'blue',
		size: 16
	},
	AWS: {
		hasIcon: true,
		icon: Aws,
		displayName: 'AWS/Boto3',
		color: 'yellow',
		size: 20
	},
	CSharp: {
		hasIcon: true,
		icon: Microsoft,
		displayName: 'C#',
		color: 'blue',
		size: 16
	},
	Cypress: {
		hasIcon: true,
		icon: Cypress,
		displayName: 'Cypress',
		color: 'green',
		size: 16
	},
	FastAPI: {
		hasIcon: true,
		icon: FastApi,
		displayName: 'FastAPI',
		color: 'blue',
		size: 16
	},
	Flask: {
		hasIcon: true,
		icon: Flask,
		displayName: 'Flask',
		color: 'pink',
		size: 20
	},
	Hugo: {
		hasIcon: true,
		icon: Hugo,
		displayName: 'Hugo',
		color: 'pink',
		size: 16
	},
	lxml: {
		hasIcon: true,
		icon: Lxml,
		displayName: 'lxml',
		color: 'yellow',
		size: 16
	},
	Puppeteer: {
		hasIcon: true,
		icon: Puppeteer,
		displayName: 'Puppeteer',
		color: 'blue',
		size: 20
	},
	Pydantic: {
		hasIcon: true,
		icon: Python,
		displayName: 'Pydantic',
		color: 'green',
		size: 16
	},
	Python: {
		hasIcon: true,
		icon: Python,
		displayName: 'Python',
		color: 'green',
		size: 16
	},
	Redis: {
		hasIcon: true,
		icon: Redis,
		displayName: 'Redis',
		color: 'pink',
		size: 16
	},
	RegExp: {
		hasIcon: true,
		icon: RegExp,
		displayName: 'Regular Expressions',
		color: 'blue',
		size: 16
	},
	Shell: {
		hasIcon: true,
		icon: Shell,
		displayName: 'Shell',
		color: 'yellow',
		size: 16
	},
	SQLAlchemy: {
		hasIcon: true,
		icon: Database,
		displayName: 'SQLAlchemy',
		color: 'yellow',
		size: 16
	},
	SQLite: {
		hasIcon: true,
		icon: Sqlite,
		displayName: 'SQLite',
		color: 'pink',
		size: 16
	},
	Svelte: {
		hasIcon: true,
		icon: Svelte,
		displayName: 'Svelte',
		color: 'pink',
		size: 18
	},
	TailwindCSS: {
		hasIcon: true,
		icon: Tailwind,
		displayName: 'TailwindCSS',
		color: 'blue',
		size: 16
	},
	TypeScript: {
		hasIcon: true,
		icon: TypeScript,
		displayName: 'TypeScript',
		color: 'blue',
		size: 15
	},
	XPath: {
		hasIcon: true,
		icon: Xml,
		displayName: 'XPath',
		color: 'green',
		size: 16
	},
	XState: {
		hasIcon: true,
		icon: XState,
		displayName: 'XState',
		color: 'yellow',
		size: 16
	},
	api_development: {
		hasIcon: false,
		displayName: 'REST API',
		color: 'purple'
	},
	blog_portfolio_sites: {
		hasIcon: false,
		displayName: 'Blog/Portfolio Site',
		color: 'green'
	},
	cli_apps: {
		hasIcon: false,
		displayName: 'CLI App',
		color: 'yellow'
	},
	component_library: {
		hasIcon: false,
		displayName: 'Component Library',
		color: 'pink'
	},
	cryptography: {
		hasIcon: false,
		displayName: 'Cryptography',
		color: 'blue'
	},
	dev_tools: {
		hasIcon: false,
		displayName: 'Dev Tools',
		color: 'blue'
	},
	devops: {
		hasIcon: false,
		displayName: 'DevOps',
		color: 'yellow'
	},
	docs_guides: {
		hasIcon: false,
		displayName: 'Documentation',
		color: 'green'
	},
	fastapi_plugins: {
		hasIcon: false,
		displayName: 'FastAPI Plugin',
		color: 'purple'
	},
	web_app: {
		hasIcon: false,
		displayName: 'Web App',
		color: 'pink'
	},
	web_scraping: {
		hasIcon: false,
		displayName: 'Web Scraping',
		color: 'yellow'
	}
};

export const getFilterSettingDetails = (name: FilterSetting): FilterSettingDetails =>
	filterSettingDatabase[name];
