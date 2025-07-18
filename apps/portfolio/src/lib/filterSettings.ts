import { Backend, Frontend } from '$lib/components/Icons';
import type {
	FilterSetting,
	FilterSettingDetails,
	FilterSettingDetailsDatabase,
	ProjectCategoryDetails,
	ProjectTypeDetails,
} from '$lib/types';
import {
	Asterisk as AllProjects,
	Aws,
	Cypress,
	Database,
	FastApi,
	Flask,
	Hugo,
	JavaScript,
	Code as Lxml,
	Microsoft,
	Playwright,
	Puppeteer,
	Pydantic,
	Python,
	Redis,
	RegExp,
	ShellPrompt as Shell,
	Sqlite,
	Svelte,
	Tailwind,
	TypeScript,
	XPath,
	XState,
} from '@a-luna/shared-ui';

const projectTypeDetailsDatabase: { [k: string]: ProjectTypeDetails } = {
	allprojects: {
		displayName: 'All Projects',
		color: 'orange',
		hasIcon: true,
		icon: AllProjects,
		size: 16,
	},
	frontend: {
		displayName: 'Frontend',
		color: 'teal',
		hasIcon: true,
		icon: Frontend,
		size: 16,
	},
	backend: {
		displayName: 'Backend',
		color: 'pink',
		hasIcon: true,
		icon: Backend,
		size: 16,
	},
};

const langorTechDetailsDatabase: { [k: string]: ProjectTypeDetails } = {
	alllanguages: {
		displayName: 'All Languages',
		color: 'yellow-green',
		hasIcon: true,
		icon: AllProjects,
		size: 16,
	},
	aws: {
		displayName: 'AWS/Boto3',
		color: 'green',
		hasIcon: true,
		icon: Aws,
		size: 20,
	},
	csharp: {
		displayName: 'C#',
		color: 'orange',
		hasIcon: true,
		icon: Microsoft,
		size: 16,
	},
	cypress: {
		displayName: 'Cypress',
		color: 'yellow-green',
		hasIcon: true,
		icon: Cypress,
		size: 16,
	},
	fastapi: {
		displayName: 'FastAPI',
		color: 'pink',
		hasIcon: true,
		icon: FastApi,
		size: 16,
	},
	flask: {
		displayName: 'Flask',
		color: 'teal',
		hasIcon: true,
		icon: Flask,
		size: 20,
	},
	hugo: {
		displayName: 'Hugo',
		color: 'blue',
		hasIcon: true,
		icon: Hugo,
		size: 16,
	},
	javascript: {
		displayName: 'JavaScript',
		color: 'yellow',
		hasIcon: true,
		icon: JavaScript,
		size: 15,
	},
	lxml: {
		displayName: 'lxml',
		color: 'teal',
		hasIcon: true,
		icon: Lxml,
		size: 16,
	},
	playwright: {
		displayName: 'Playwright',
		color: 'yellow',
		hasIcon: true,
		icon: Playwright,
		size: 20,
	},
	puppeteer: {
		displayName: 'Puppeteer',
		color: 'red',
		hasIcon: true,
		icon: Puppeteer,
		size: 20,
	},
	pydantic: {
		displayName: 'Pydantic',
		color: 'pink',
		hasIcon: true,
		icon: Pydantic,
		size: 16,
	},
	python: {
		displayName: 'Python',
		color: 'green',
		hasIcon: true,
		icon: Python,
		size: 16,
	},
	redis: {
		displayName: 'Redis',
		color: 'red',
		hasIcon: true,
		icon: Redis,
		size: 16,
	},
	regexp: {
		displayName: 'Regular Expressions',
		color: 'blue',
		hasIcon: true,
		icon: RegExp,
		size: 16,
	},
	shell: {
		displayName: 'Shell',
		color: 'yellow',
		hasIcon: true,
		icon: Shell,
		size: 16,
	},
	sqlalchemy: {
		displayName: 'SQLAlchemy',
		color: 'purple',
		hasIcon: true,
		icon: Database,
		size: 16,
	},
	sqlite: {
		displayName: 'SQLite',
		color: 'pink',
		hasIcon: true,
		icon: Sqlite,
		size: 16,
	},
	svelte: {
		displayName: 'Svelte',
		color: 'teal',
		hasIcon: true,
		icon: Svelte,
		size: 18,
	},
	tailwind: {
		displayName: 'TailwindCSS',
		color: 'orange',
		hasIcon: true,
		icon: Tailwind,
		size: 16,
	},
	typescript: {
		displayName: 'TypeScript',
		color: 'blue',
		hasIcon: true,
		icon: TypeScript,
		size: 15,
	},
	xpath: {
		displayName: 'XPath',
		color: 'purple',
		hasIcon: true,
		icon: XPath,
		size: 16,
	},
	xstate: {
		displayName: 'XState',
		color: 'yellow',
		hasIcon: true,
		icon: XState,
		size: 16,
	},
};

const projectCategoriesDetailsDatabase: { [k: string]: ProjectCategoryDetails } = {
	allcategories: {
		displayName: 'All Categories',
		color: 'default',
		hasIcon: false,
	},
	rest_api: {
		displayName: 'REST API',
		color: 'orange',
		hasIcon: false,
	},
	blog_portfolio_sites: {
		displayName: 'Blog/Portfolio Site',
		color: 'teal',
		hasIcon: false,
	},
	cli_apps: {
		displayName: 'CLI App',
		color: 'yellow',
		hasIcon: false,
	},
	component_library: {
		displayName: 'Component Library',
		color: 'orange',
		hasIcon: false,
	},
	cryptography: {
		displayName: 'Cryptography',
		color: 'red',
		hasIcon: false,
	},
	design_patterns: {
		displayName: 'Design Patterns',
		color: 'teal',
		hasIcon: false,
	},
	dev_tools: {
		displayName: 'Dev Tool',
		color: 'pink',
		hasIcon: false,
	},
	devops: {
		displayName: 'DevOps',
		color: 'purple',
		hasIcon: false,
	},
	docs_guides: {
		displayName: 'Documentation',
		color: 'teal',
		hasIcon: false,
	},
	fastapi_plugins: {
		displayName: 'FastAPI Plugin',
		color: 'yellow',
		hasIcon: false,
	},
	web_app: {
		displayName: 'Web App',
		color: 'red',
		hasIcon: false,
	},
	virtualization: {
		displayName: 'Virtualization',
		color: 'teal',
		hasIcon: false,
	},
	web_scraping: {
		displayName: 'Web Scraping',
		color: 'pink',
		hasIcon: false,
	},
};

export const filterSettingDetailsDatabase: FilterSettingDetailsDatabase = {
	...projectTypeDetailsDatabase,
	...projectCategoriesDetailsDatabase,
	...langorTechDetailsDatabase,
};

const nullFilterSettingDetails: FilterSettingDetails = {
	displayName: '',
	color: 'green',
	hasIcon: false,
};

export const getFilterSettingDetails = (name: FilterSetting): FilterSettingDetails =>
	filterSettingDetailsDatabase?.[name.toLowerCase()] ?? nullFilterSettingDetails;
