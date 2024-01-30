import { dev } from '$app/environment';
import { nullRepoWithMetadata } from '$lib/constants';
import { isUserRepo } from '$lib/typeguards';
import type { CachedProjectData, GHRepo, LanguageOrTech, ProjectCategory, RepoWithMetaData } from '$lib/types';
import { addHours, isWithinInterval, parseISO } from 'date-fns';

export const repoDataDepot: {
	[key: string]: {
		primaryLanguage: LanguageOrTech;
		primaryCategory: 'frontend' | 'backend';
		languages: LanguageOrTech[];
		categories: ProjectCategory[];
		deployedUrl: string;
		projectSiteTitle: string;
	};
} = {
	'aaronluna.dev': {
		primaryLanguage: 'Hugo',
		primaryCategory: 'frontend',
		languages: [],
		categories: ['blog_portfolio_sites'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'async-file-server': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cli_apps'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'console-progress-bar': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cli_apps'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'dotnetcore-crypto': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cryptography'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'fastapi-redis-cache': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['Redis', 'FastAPI'],
		categories: ['dev_tools', 'fastapi_plugins'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'flask-api-tutorial': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['Flask', 'Hugo', 'SQLAlchemy', 'SQLite'],
		categories: ['docs_guides', 'rest_api'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'packer-examples': {
		primaryLanguage: 'Shell',
		primaryCategory: 'backend',
		languages: ['AWS'],
		categories: ['dev_tools', 'devops'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'svelte-base64-ts': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['Playwright', 'TypeScript', 'XState'],
		categories: ['web_app'],
		deployedUrl: dev ? 'http://localhost:3500/' : 'https://base64.aaronluna.dev/',
		projectSiteTitle: 'Base64 Algorithm Demonstration',
	},
	'svelte-base64': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['Cypress'],
		categories: ['web_app'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'svelte-color-tools': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['RegExp', 'TailwindCSS', 'TypeScript'],
		categories: ['component_library'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'svelte-simple-tables-docs': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TailwindCSS', 'TypeScript'],
		categories: ['docs_guides', 'web_app', 'component_library'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'svelte-simple-tables': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TypeScript'],
		categories: ['component_library'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'unicode-api': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['FastAPI', 'Pydantic'],
		categories: ['rest_api'],
		deployedUrl: dev ? 'http://localhost:3507/' : 'https://unicode-api.aaronluna.dev/v1/docs',
		projectSiteTitle: 'Unicode API Docs (Swagger UI)',
	},
	'vig-api': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['FastAPI', 'Pydantic'],
		categories: ['rest_api'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	'vig-data': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TypeScript'],
		categories: ['web_app'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
	vigorish: {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['AWS', 'lxml', 'Puppeteer', 'RegExp', 'SQLAlchemy', 'SQLite', 'XPath'],
		categories: ['cli_apps', 'web_scraping'],
		deployedUrl: '',
		projectSiteTitle: '',
	},
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
				primaryCategory: repoDataDepot?.[project.name]?.primaryCategory ?? 'allProjects',
				languages: repoDataDepot?.[project.name]?.languages ?? ['allLanguages'],
				categories: repoDataDepot?.[project.name]?.categories ?? ['allCategories'],
				updatedAt: project.pushed_at || new Date().toISOString(),
				deployedUrl: repoDataDepot?.[project.name]?.deployedUrl || '',
				projectSiteTitle: repoDataDepot?.[project.name]?.projectSiteTitle ?? '',
			}
		: nullRepoWithMetadata;

// UPDATE CACHE WITH THIS CODE, ADD TO +page.svelte for /projects route
//
// import { userRepos } from '$lib/stores';

// $: if ($userRepos) {
// 	const cache = $userRepos.map((project) => ({
// 		name: project.name,
// 		description: project.description,
// 		stargazers_count: project.stargazers_count,
// 		forks_count: project.forks_count,
// 		html_url: project.html_url,
// 		stargazers_url: project.stargazers_url,
// 		forks_url: project.forks_url
// 	}));
// 	console.log({ cache });
// }

export const cachedUserRepos: GHRepo[] = [
	{
		name: 'aaronluna.dev',
		description: 'My personal website/blog/portfolio, built with Hugo',
		stargazers_count: 3,
		forks_count: 2,
		html_url: 'https://github.com/a-luna/aaronluna.dev',
		stargazers_url: 'https://api.github.com/repos/a-luna/aaronluna.dev/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/aaronluna.dev/forks',
	},
	{
		name: 'aaronluna.dev-v2',
		description: 'Rewriting my blog/portfolio site in sveltekit',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/aaronluna.dev-v2',
		stargazers_url: 'https://api.github.com/repos/a-luna/aaronluna.dev-v2/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/aaronluna.dev-v2/forks',
	},
	{
		name: 'async-file-server',
		description:
			'Light-weight, cross-platform (NET Core 2.1) C# Asynchronous file server and text messaging platform. Utilizes custom extension methods which wrap asynchronous TCP socket method pairs, providing the benefits of the Task Parallel Library (TPL) to socket programming.',
		stargazers_count: 8,
		forks_count: 7,
		html_url: 'https://github.com/a-luna/async-file-server',
		stargazers_url: 'https://api.github.com/repos/a-luna/async-file-server/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/async-file-server/forks',
	},
	{
		name: 'bookit',
		description: 'A UI component explorere desiged specifically for Svelte Kit, not spooky',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/bookit',
		stargazers_url: 'https://api.github.com/repos/a-luna/bookit/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/bookit/forks',
	},
	{
		name: 'bullet',
		description: '🚅 Interactive prompts made simple. Build a prompt like stacking blocks.',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/bullet',
		stargazers_url: 'https://api.github.com/repos/a-luna/bullet/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/bullet/forks',
	},
	{
		name: 'console-progress-bar',
		description:
			'Customizable progress bar for C# console applications (.NET Core 2.0). Includes a basic progress bar which can be used for any long-running task and a file transfer progress bar that detects when the transfer has stalled, firing an event that the client can subscribe to.',
		stargazers_count: 16,
		forks_count: 10,
		html_url: 'https://github.com/a-luna/console-progress-bar',
		stargazers_url: 'https://api.github.com/repos/a-luna/console-progress-bar/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/console-progress-bar/forks',
	},
	{
		name: 'dotnetcore-crypto',
		description:
			'.NET Core 2.0 class library containing an implementation of SHA-3 hashing functions and file encryption methods which employ both AES and RSA algorithms to maximize data security and computational efficiency.',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/dotnetcore-crypto',
		stargazers_url: 'https://api.github.com/repos/a-luna/dotnetcore-crypto/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/dotnetcore-crypto/forks',
	},
	{
		name: 'fastapi-redis-cache',
		description:
			'A simple and robust caching solution for FastAPI that interprets request header values and creates proper response header values (powered by Redis)',
		stargazers_count: 86,
		forks_count: 18,
		html_url: 'https://github.com/a-luna/fastapi-redis-cache',
		stargazers_url: 'https://api.github.com/repos/a-luna/fastapi-redis-cache/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/fastapi-redis-cache/forks',
	},
	{
		name: 'flask-api-tutorial',
		description:
			'Boilerplate for a Flask REST API with JWT-based authentication, built with SQLAlchemy, Flask-RESTx, PyJWT, and pytest. This is a companion repo for a multi-part tutorial series on my personal website.',
		stargazers_count: 51,
		forks_count: 13,
		html_url: 'https://github.com/a-luna/flask-api-tutorial',
		stargazers_url: 'https://api.github.com/repos/a-luna/flask-api-tutorial/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/flask-api-tutorial/forks',
	},
	{
		name: 'flask-api-tutorial-old',
		description:
			'Boilerplate for a Flask REST API with JWT-based authentication, focused on test-coverage and CI via pytest, tox, and github actions.',
		stargazers_count: 1,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/flask-api-tutorial-old',
		stargazers_url: 'https://api.github.com/repos/a-luna/flask-api-tutorial-old/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/flask-api-tutorial-old/forks',
	},
	{
		name: 'flask-restapi-jwt',
		description: 'Boilerplate flask project for a REST API with JWT-based authentication',
		stargazers_count: 2,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/flask-restapi-jwt',
		stargazers_url: 'https://api.github.com/repos/a-luna/flask-restapi-jwt/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/flask-restapi-jwt/forks',
	},
	{
		name: 'flask-restplus',
		description: 'Fully featured framework for fast, easy and documented API development with Flask',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/flask-restplus',
		stargazers_url: 'https://api.github.com/repos/a-luna/flask-restplus/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/flask-restplus/forks',
	},
	{
		name: 'glyphhanger',
		description:
			'Your web font utility belt. It can subset web fonts. It can find unicode-ranges for you automatically. It makes julienne fries.',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/glyphhanger',
		stargazers_url: 'https://api.github.com/repos/a-luna/glyphhanger/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/glyphhanger/forks',
	},
	{
		name: 'hugo-lunr',
		description: 'Node module for creating lunr.js search indexes for static Hugo sites',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/hugo-lunr',
		stargazers_url: 'https://api.github.com/repos/a-luna/hugo-lunr/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/hugo-lunr/forks',
	},
	{
		name: 'packer-examples',
		description:
			'Packer templates which create machine images running various applications, e.g., LEMP stack with Bedrock-Wordpress fully-configured, ready to install immediately upon instancing.',
		stargazers_count: 7,
		forks_count: 9,
		html_url: 'https://github.com/a-luna/packer-examples',
		stargazers_url: 'https://api.github.com/repos/a-luna/packer-examples/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/packer-examples/forks',
	},
	{
		name: 'portfolio-site',
		description: '',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/portfolio-site',
		stargazers_url: 'https://api.github.com/repos/a-luna/portfolio-site/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/portfolio-site/forks',
	},
	{
		name: 'python-playground',
		description: 'My implementations of projects and exercises from the book Python Playground by Mahesh Venkitachalam',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/python-playground',
		stargazers_url: 'https://api.github.com/repos/a-luna/python-playground/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/python-playground/forks',
	},
	{
		name: 'smui-example-sveltekit',
		description: 'SMUI SvelteKit Example',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/smui-example-sveltekit',
		stargazers_url: 'https://api.github.com/repos/a-luna/smui-example-sveltekit/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/smui-example-sveltekit/forks',
	},
	{
		name: 'svelte-base64',
		description:
			'A simple application using svelte 3.0, that encodes/decodes ASCII text or hex strings to/from base64 and provides reactive ui components to help illustrate the encoding process.',
		stargazers_count: 0,
		forks_count: 2,
		html_url: 'https://github.com/a-luna/svelte-base64',
		stargazers_url: 'https://api.github.com/repos/a-luna/svelte-base64/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/svelte-base64/forks',
	},
	{
		name: 'svelte-base64-ts',
		description: 'Re-implementation of my svelte-base64 application, updated to use sveltekit and typescript',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-base64-ts',
		stargazers_url: 'https://api.github.com/repos/a-luna/svelte-base64-ts/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/svelte-base64-ts/forks',
	},
	{
		name: 'svelte-color-tools',
		description: 'Svelte component library containing helpful ColorPicker and ColorPalette components.',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-color-tools',
		stargazers_url: 'https://api.github.com/repos/a-luna/svelte-color-tools/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/svelte-color-tools/forks',
	},
	{
		name: 'svelte-simple-datatables',
		description: 'A Datatable component for Svelte',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-simple-datatables',
		stargazers_url: 'https://api.github.com/repos/a-luna/svelte-simple-datatables/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/svelte-simple-datatables/forks',
	},
	{
		name: 'svelte-simple-tables',
		description: 'Accessible, sortable, paginated table component (created with sveltekit)',
		stargazers_count: 1,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-simple-tables',
		stargazers_url: 'https://api.github.com/repos/a-luna/svelte-simple-tables/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/svelte-simple-tables/forks',
	},
	{
		name: 'svelte-simple-tables-docs',
		description:
			'Interactive docs site for @a-luna/svelte-simple-tables (svelte component library for paginated, sortable tables)',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-simple-tables-docs',
		stargazers_url: 'https://api.github.com/repos/a-luna/svelte-simple-tables-docs/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/svelte-simple-tables-docs/forks',
	},
	{
		name: 'svelte-toy',
		description: 'A toy for svelte data stores',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-toy',
		stargazers_url: 'https://api.github.com/repos/a-luna/svelte-toy/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/svelte-toy/forks',
	},
	{
		name: 'unicode-api',
		description: 'REST API providing detailed information about unicode characters',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/unicode-api',
		stargazers_url: 'https://api.github.com/repos/a-luna/unicode-api/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/unicode-api/forks',
	},
	{
		name: 'utterances',
		description: ':crystal_ball: A lightweight comments widget built on GitHub issues',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/utterances',
		stargazers_url: 'https://api.github.com/repos/a-luna/utterances/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/utterances/forks',
	},
	{
		name: 'vig-api',
		description: 'API that provides read-only access to MLB data collected with vigorish',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/vig-api',
		stargazers_url: 'https://api.github.com/repos/a-luna/vig-api/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/vig-api/forks',
	},
	{
		name: 'vig-data',
		description:
			'Web application for interacting with MLB data collected with vigorish. Built with SvelteKit as an opportunity to learn the new framework and ESM tooling.',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/vig-data',
		stargazers_url: 'https://api.github.com/repos/a-luna/vig-data/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/vig-data/forks',
	},
	{
		name: 'vigorish',
		description: 'MLB data web scraper, Python CLI application',
		stargazers_count: 2,
		forks_count: 2,
		html_url: 'https://github.com/a-luna/vigorish',
		stargazers_url: 'https://api.github.com/repos/a-luna/vigorish/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/vigorish/forks',
	},
];

export const initializeProjectData = (): CachedProjectData => ({
	repos: convertGHRepos(cachedUserRepos),
	cachedAt: new Date(0).toISOString(),
});

export const convertGHRepos = (ghRepos: GHRepo[]): RepoWithMetaData[] =>
	Object.values(ghRepos)
		.filter((r) => isUserRepo(r.name))
		.map(updateProjectMetaData);

export const cacheIsStale = (cachedAt: string): boolean =>
	!isWithinInterval(new Date(), { start: parseISO(cachedAt), end: addHours(parseISO(cachedAt), 6) });
