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
import type {
	FilterSetting,
	FilterSettingDetailsDatabase,
	FilterSettingDetails,
	ProjectCategoryDetails,
	ProjectTypeDetails
} from '$lib/types';

const projectTypeDetailsDatabase: { [k: string]: ProjectTypeDetails } = {
	allprojects: {
		displayName: 'All Projects',
		color: 'green',
		hasIcon: true,
		icon: AllProjects,
		size: 16
	},
	frontend: {
		displayName: 'Frontend',
		color: 'pink',
		hasIcon: true,
		icon: Frontend,
		size: 16
	},
	backend: {
		displayName: 'Backend',
		color: 'blue',
		hasIcon: true,
		icon: Backend,
		size: 16
	}
};

const langorTechDetailsDatabase: { [k: string]: ProjectTypeDetails } = {
	alllanguages: {
		displayName: 'All Languages',
		color: 'blue',
		hasIcon: true,
		icon: AllProjects,
		size: 16
	},
	aws: {
		displayName: 'AWS/Boto3',
		color: 'yellow',
		hasIcon: true,
		icon: Aws,
		size: 20
	},
	csharp: {
		displayName: 'C#',
		color: 'blue',
		hasIcon: true,
		icon: Microsoft,
		size: 16
	},
	cypress: {
		displayName: 'Cypress',
		color: 'green',
		hasIcon: true,
		icon: Cypress,
		size: 16
	},
	fastapi: {
		displayName: 'FastAPI',
		color: 'blue',
		hasIcon: true,
		icon: FastApi,
		size: 16
	},
	flask: {
		displayName: 'Flask',
		color: 'pink',
		hasIcon: true,
		icon: Flask,
		size: 20
	},
	hugo: {
		displayName: 'Hugo',
		color: 'pink',
		hasIcon: true,
		icon: Hugo,
		size: 16
	},
	lxml: {
		displayName: 'lxml',
		color: 'yellow',
		hasIcon: true,
		icon: Lxml,
		size: 16
	},
	puppeteer: {
		displayName: 'Puppeteer',
		color: 'blue',
		hasIcon: true,
		icon: Puppeteer,
		size: 20
	},
	pydantic: {
		displayName: 'Pydantic',
		color: 'green',
		hasIcon: true,
		icon: Python,
		size: 16
	},
	python: {
		displayName: 'Python',
		color: 'green',
		hasIcon: true,
		icon: Python,
		size: 16
	},
	redis: {
		displayName: 'Redis',
		color: 'pink',
		hasIcon: true,
		icon: Redis,
		size: 16
	},
	regexp: {
		displayName: 'Regular Expressions',
		color: 'blue',
		hasIcon: true,
		icon: RegExp,
		size: 16
	},
	shell: {
		displayName: 'Shell',
		color: 'yellow',
		hasIcon: true,
		icon: Shell,
		size: 16
	},
	sqlalchemy: {
		displayName: 'SQLAlchemy',
		color: 'yellow',
		hasIcon: true,
		icon: Database,
		size: 16
	},
	sqlite: {
		displayName: 'SQLite',
		color: 'pink',
		hasIcon: true,
		icon: Sqlite,
		size: 16
	},
	svelte: {
		displayName: 'Svelte',
		color: 'pink',
		hasIcon: true,
		icon: Svelte,
		size: 18
	},
	tailwindcss: {
		displayName: 'TailwindCSS',
		color: 'blue',
		hasIcon: true,
		icon: Tailwind,
		size: 16
	},
	typescript: {
		displayName: 'TypeScript',
		color: 'blue',
		hasIcon: true,
		icon: TypeScript,
		size: 15
	},
	xpath: {
		displayName: 'XPath',
		color: 'green',
		hasIcon: true,
		icon: Xml,
		size: 16
	},
	xstate: {
		displayName: 'XState',
		color: 'yellow',
		hasIcon: true,
		icon: XState,
		size: 16
	}
};

const projectCategoriesDetailsDatabase: { [k: string]: ProjectCategoryDetails } = {
	allcategories: {
		displayName: 'All Categories',
		color: 'default',
		hasIcon: false
	},
	api_development: {
		displayName: 'REST API',
		color: 'purple',
		hasIcon: false
	},
	blog_portfolio_sites: {
		displayName: 'Blog/Portfolio Site',
		color: 'green',
		hasIcon: false
	},
	cli_apps: {
		displayName: 'CLI App',
		color: 'yellow',
		hasIcon: false
	},
	component_library: {
		displayName: 'Component Library',
		color: 'pink',
		hasIcon: false
	},
	cryptography: {
		displayName: 'Cryptography',
		color: 'blue',
		hasIcon: false
	},
	dev_tools: {
		displayName: 'Dev Tools',
		color: 'blue',
		hasIcon: false
	},
	devops: {
		displayName: 'DevOps',
		color: 'yellow',
		hasIcon: false
	},
	docs_guides: {
		displayName: 'Documentation',
		color: 'green',
		hasIcon: false
	},
	fastapi_plugins: {
		displayName: 'FastAPI Plugin',
		color: 'purple',
		hasIcon: false
	},
	web_app: {
		displayName: 'Web App',
		color: 'pink',
		hasIcon: false
	},
	virtualization: {
		displayName: 'Virtualization',
		color: 'pink',
		hasIcon: false
	},
	web_scraping: {
		displayName: 'Web Scraping',
		color: 'yellow',
		hasIcon: false
	}
};

export const filterSettingDetailsDatabase: FilterSettingDetailsDatabase = {
	...projectTypeDetailsDatabase,
	...projectCategoriesDetailsDatabase,
	...langorTechDetailsDatabase
};

const nullFilterSettingDetails: FilterSettingDetails = {
	displayName: '',
	color: 'green',
	hasIcon: false
};

export const getFilterSettingDetails = (name: FilterSetting): FilterSettingDetails =>
	filterSettingDetailsDatabase?.[name.toLowerCase()] ?? nullFilterSettingDetails;
