import { dev } from '$app/environment';
import { nullRepoWithMetadata } from '$lib/constants';
import { isSiteProject, isUserRepo } from '$lib/typeguards';
import type {
	CachedProjectData,
	GHRepo,
	Monorepo,
	MonorepoProjectName,
	ProjectName,
	RepoWithMetaData,
} from '$lib/types';
import { addHours, isWithinInterval, parseISO } from 'date-fns';

export const repoDataDepot: Record<ProjectName, Partial<RepoWithMetaData>> = {
	'aaronluna.dev': {
		primaryLanguage: 'Hugo',
		primaryCategory: 'frontend',
		languages: [],
		categories: ['blog_portfolio_sites'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
		monorepoName: '',
	},
	'async-file-server': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cli_apps'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
		monorepoName: '',
	},
	'console-progress-bar': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cli_apps'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'dotnetcore-crypto': {
		primaryLanguage: 'CSharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cryptography'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'fastapi-redis-cache': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['Redis', 'FastAPI'],
		categories: ['dev_tools', 'fastapi_plugins'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'flask-api-tutorial': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['Flask', 'Hugo', 'SQLAlchemy', 'SQLite'],
		categories: ['docs_guides', 'rest_api'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'packer-examples': {
		primaryLanguage: 'Shell',
		primaryCategory: 'backend',
		languages: ['AWS'],
		categories: ['dev_tools', 'devops'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	portfolio: {
		name: 'portfolio',
		description: 'My personal website/blog/portfolio, built with sveltekit',
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TypeScript', 'XState'],
		categories: ['web_app'],
		updatedAt: new Date().toISOString(),
		deployedUrl: dev ? 'http://localhost:3504/' : 'https://portfolio.aaronluna.dev/',
		projectSiteTitle: 'aaronluna.dev',
		inMonorepo: true,
		monorepoName: 'svelte-mono',
		monorepoProjectPath: 'apps/portfolio',
	},
	'svelte-base64': {
		name: 'svelte-base64',
		description:
			'Web app that explains how base64 encoding works step-by-step for any string or data and shows the process visually',
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['Playwright', 'TypeScript', 'XState'],
		categories: ['web_app'],
		updatedAt: new Date().toISOString(),
		deployedUrl: dev ? 'http://localhost:3500/' : 'https://base64.aaronluna.dev/',
		projectSiteTitle: 'Base64 Algorithm Demonstration',
		inMonorepo: true,
		monorepoName: 'svelte-mono',
		monorepoProjectPath: 'apps/svelte-base64',
	},
	'svelte-color-tools': {
		name: 'svelte-color-tools',
		description: 'Svelte component library containing helpful ColorPicker and ColorPalette components.',
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['RegExp', 'TailwindCSS', 'TypeScript'],
		categories: ['component_library'],
		deployedUrl: '',
		updatedAt: new Date().toISOString(),
		projectSiteTitle: '',
		inMonorepo: true,
		monorepoName: 'svelte-mono',
		monorepoProjectPath: 'packages/svelte-color-tools',
	},
	'svelte-simple-tables-docs': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TailwindCSS', 'TypeScript'],
		categories: ['docs_guides', 'web_app', 'component_library'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'svelte-simple-tables': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TypeScript'],
		categories: ['component_library'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'unicode-api': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['FastAPI', 'Pydantic'],
		categories: ['rest_api'],
		deployedUrl: dev ? 'http://localhost:3507/' : 'https://unicode-api.aaronluna.dev/v1/docs',
		projectSiteTitle: 'Unicode API Docs (Swagger UI)',
		inMonorepo: false,
	},
	'vig-api': {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['FastAPI', 'Pydantic'],
		categories: ['rest_api'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'vig-data': {
		primaryLanguage: 'Svelte',
		primaryCategory: 'frontend',
		languages: ['TypeScript'],
		categories: ['web_app'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	vigorish: {
		primaryLanguage: 'Python',
		primaryCategory: 'backend',
		languages: ['AWS', 'lxml', 'Puppeteer', 'RegExp', 'SQLAlchemy', 'SQLite', 'XPath'],
		categories: ['cli_apps', 'web_scraping'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
};

export const updateProjectMetaData = (project: GHRepo): RepoWithMetaData =>
	isSiteProject(project.name)
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
				inMonorepo: false,
				monorepoName: '',
				monorepoProjectPath: '',
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

export function convertMonorepoProjects(
	monorepoProjectData: Record<Monorepo, Record<MonorepoProjectName, string>>,
): RepoWithMetaData[] {
	const monorepoProjects: RepoWithMetaData[] = [];
	for (const projects of Object.values(monorepoProjectData)) {
		for (const [projectName, lastCommitDate] of Object.entries(projects)) {
			if (!isSiteProject(projectName)) continue;
			const project = repoDataDepot?.[projectName] ?? nullRepoWithMetadata;
			project.repoUrl = `https://github.com/a-luna/${project.monorepoName}/tree/main/${project.monorepoProjectPath}`;
			monorepoProjects.push({
				...nullRepoWithMetadata,
				...project,
				updatedAt: lastCommitDate,
			});
		}
	}
	return monorepoProjects;
}

export const cacheIsStale = (cachedAt: string): boolean =>
	!isWithinInterval(new Date(), { start: parseISO(cachedAt), end: addHours(parseISO(cachedAt), 6) });
