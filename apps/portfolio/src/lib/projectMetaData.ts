import { dev } from '$app/environment';
import { nullRepoWithMetadata } from '$lib/constants';
import { isSiteProject, isUserRepo } from '$lib/typeguards';
import type { CachedProjectData, ProjectName, RepoWithMetaData, ghRepoMinimal } from '$lib/types';
import { addHours, isWithinInterval, parseISO } from 'date-fns';

export const repoDataDepot: Record<ProjectName, Partial<RepoWithMetaData>> = {
	'aaronluna.dev': {
		primaryLanguage: 'hugo',
		primaryCategory: 'frontend',
		languages: [],
		categories: ['blog_portfolio_sites'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
		monorepoName: '',
	},
	'async-file-server': {
		primaryLanguage: 'csharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cli_apps'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
		monorepoName: '',
	},
	'console-progress-bar': {
		primaryLanguage: 'csharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cli_apps'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'dotnetcore-crypto': {
		primaryLanguage: 'csharp',
		primaryCategory: 'backend',
		languages: [],
		categories: ['cryptography'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'fastapi-redis-cache': {
		primaryLanguage: 'python',
		primaryCategory: 'backend',
		languages: ['redis', 'fastapi'],
		categories: ['dev_tools', 'fastapi_plugins'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'flask-api-tutorial': {
		primaryLanguage: 'python',
		primaryCategory: 'backend',
		languages: ['flask', 'hugo', 'sqlalchemy', 'sqlite'],
		categories: ['docs_guides', 'rest_api'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'packer-examples': {
		primaryLanguage: 'shell',
		primaryCategory: 'backend',
		languages: ['aws'],
		categories: ['dev_tools', 'devops'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	portfolio: {
		name: 'portfolio',
		description: 'My personal website/blog/portfolio, built with sveltekit',
		primaryLanguage: 'svelte',
		primaryCategory: 'frontend',
		languages: ['typescript', 'xstate'],
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
		primaryLanguage: 'svelte',
		primaryCategory: 'frontend',
		languages: ['playwright', 'typescript', 'xstate'],
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
		primaryLanguage: 'svelte',
		primaryCategory: 'frontend',
		languages: ['regexp', 'tailwind', 'typescript'],
		categories: ['component_library'],
		deployedUrl: '',
		updatedAt: new Date().toISOString(),
		projectSiteTitle: '',
		inMonorepo: true,
		monorepoName: 'svelte-mono',
		monorepoProjectPath: 'packages/svelte-color-tools',
	},
	'svelte-simple-tables-docs': {
		primaryLanguage: 'svelte',
		primaryCategory: 'frontend',
		languages: ['tailwind', 'typescript'],
		categories: ['docs_guides', 'web_app', 'component_library'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'svelte-simple-tables': {
		primaryLanguage: 'svelte',
		primaryCategory: 'frontend',
		languages: ['typescript'],
		categories: ['component_library'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'unicode-api': {
		primaryLanguage: 'python',
		primaryCategory: 'backend',
		languages: ['fastapi', 'pydantic'],
		categories: ['rest_api'],
		deployedUrl: dev ? 'http://localhost:3507/' : 'https://unicode-api.aaronluna.dev/v1/docs',
		projectSiteTitle: 'Unicode API Docs (Swagger UI)',
		inMonorepo: false,
	},
	'vig-api': {
		primaryLanguage: 'python',
		primaryCategory: 'backend',
		languages: ['fastapi', 'pydantic'],
		categories: ['rest_api'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	'vig-data': {
		primaryLanguage: 'svelte',
		primaryCategory: 'frontend',
		languages: ['typescript'],
		categories: ['web_app'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
	vigorish: {
		primaryLanguage: 'python',
		primaryCategory: 'backend',
		languages: ['aws', 'lxml', 'puppeteer', 'regexp', 'sqlalchemy', 'sqlite', 'xpath'],
		categories: ['cli_apps', 'web_scraping'],
		deployedUrl: '',
		projectSiteTitle: '',
		inMonorepo: false,
	},
};

export const cacheIsStale = (cachedAt: string): boolean =>
	!isWithinInterval(new Date(), { start: parseISO(cachedAt), end: addHours(parseISO(cachedAt), 6) });

export const initializeProjectData = (): CachedProjectData => ({
	repos: createProjectMap(convertGHRepos(cachedUserRepos)),
	cachedAt: new Date(0).toISOString(),
});

export function createProjectMap(repos: RepoWithMetaData[]): Record<ProjectName, RepoWithMetaData> {
	const projectMap: Record<ProjectName, RepoWithMetaData> = {} as Record<ProjectName, RepoWithMetaData>;
	for (const repo of repos) {
		projectMap[repo.name] = repo;
	}
	return projectMap;
}

export const convertGHRepos = (ghRepos: ghRepoMinimal[]): RepoWithMetaData[] =>
	Object.values(ghRepos)
		.filter((r) => isUserRepo(r.name))
		.map(updateProjectMetaData);

export const updateProjectMetaData = (project: ghRepoMinimal): RepoWithMetaData =>
	isSiteProject(project.name)
		? {
				name: project.name,
				description: project.description || '',
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
// 	const cache = Object.values($userRepos.repos).map((project) => ({
// 		name: project.name,
// 		description: project.description,
// 		stargazers_count: project.starCount,
// 		forks_count: project.forkCount,
// 		html_url: project.repoUrl,
// 		stargazers_url: project.starsUrl,
// 		forks_url: project.forksUrl,
// 		pushed_at: project.updatedAt,
// 	}));
// 	console.log({ cache });
// }

export const cachedUserRepos: ghRepoMinimal[] = [
	{
		name: 'aaronluna.dev',
		description: 'My personal website/blog/portfolio, built with Hugo',
		stargazers_count: 3,
		forks_count: 1,
		html_url: 'https://github.com/a-luna/aaronluna.dev',
		stargazers_url: 'https://api.github.com/repos/a-luna/aaronluna.dev/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/aaronluna.dev/forks',
		pushed_at: '2023-12-19T13:09:50Z',
	},
	{
		name: 'async-file-server',
		description:
			'Light-weight, cross-platform (NET Core 2.1) C# Asynchronous file server and text messaging platform. Utilizes custom extension methods which wrap asynchronous TCP socket method pairs, providing the benefits of the Task Parallel Library (TPL) to socket programming.',
		stargazers_count: 11,
		forks_count: 7,
		html_url: 'https://github.com/a-luna/async-file-server',
		stargazers_url: 'https://api.github.com/repos/a-luna/async-file-server/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/async-file-server/forks',
		pushed_at: '2019-03-28T07:32:34Z',
	},
	{
		name: 'console-progress-bar',
		description:
			'Customizable progress bar for C# console applications (.NET Core 2.0). Includes a basic progress bar which can be used for any long-running task and a file transfer progress bar that detects when the transfer has stalled, firing an event that the client can subscribe to.',
		stargazers_count: 20,
		forks_count: 10,
		html_url: 'https://github.com/a-luna/console-progress-bar',
		stargazers_url: 'https://api.github.com/repos/a-luna/console-progress-bar/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/console-progress-bar/forks',
		pushed_at: '2020-01-04T04:49:45Z',
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
		pushed_at: '2019-03-28T00:59:54Z',
	},
	{
		name: 'fastapi-redis-cache',
		description:
			'A simple and robust caching solution for FastAPI that interprets request header values and creates proper response header values (powered by Redis)',
		stargazers_count: 151,
		forks_count: 24,
		html_url: 'https://github.com/a-luna/fastapi-redis-cache',
		stargazers_url: 'https://api.github.com/repos/a-luna/fastapi-redis-cache/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/fastapi-redis-cache/forks',
		pushed_at: '2024-07-10T08:02:29Z',
	},
	{
		name: 'flask-api-tutorial',
		description:
			'Boilerplate for a Flask REST API with JWT-based authentication, built with SQLAlchemy, Flask-RESTx, PyJWT, and pytest. This is a companion repo for a multi-part tutorial series on my personal website.',
		stargazers_count: 75,
		forks_count: 18,
		html_url: 'https://github.com/a-luna/flask-api-tutorial',
		stargazers_url: 'https://api.github.com/repos/a-luna/flask-api-tutorial/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/flask-api-tutorial/forks',
		pushed_at: '2022-03-06T10:43:23Z',
	},
	{
		name: 'packer-examples',
		description:
			'Packer templates which create machine images running various applications, e.g., LEMP stack with Bedrock-Wordpress fully-configured, ready to install immediately upon instancing.',
		stargazers_count: 8,
		forks_count: 9,
		html_url: 'https://github.com/a-luna/packer-examples',
		stargazers_url: 'https://api.github.com/repos/a-luna/packer-examples/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/packer-examples/forks',
		pushed_at: '2019-03-16T10:49:49Z',
	},
	{
		name: 'svelte-simple-tables',
		description: 'Accessible, sortable, paginated table component (created with sveltekit)',
		stargazers_count: 4,
		forks_count: 1,
		html_url: 'https://github.com/a-luna/svelte-simple-tables',
		stargazers_url: 'https://api.github.com/repos/a-luna/svelte-simple-tables/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/svelte-simple-tables/forks',
		pushed_at: '2024-02-10T11:17:57Z',
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
		pushed_at: '2022-09-20T18:32:51Z',
	},
	{
		name: 'unicode-api',
		description: 'REST API providing detailed information about unicode characters',
		stargazers_count: 3,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/unicode-api',
		stargazers_url: 'https://api.github.com/repos/a-luna/unicode-api/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/unicode-api/forks',
		pushed_at: '2024-05-28T04:39:57Z',
	},
	{
		name: 'vig-api',
		description: 'API that provides read-only access to MLB data collected with vigorish',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/vig-api',
		stargazers_url: 'https://api.github.com/repos/a-luna/vig-api/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/vig-api/forks',
		pushed_at: '2024-09-04T22:48:48Z',
	},
	{
		name: 'vig-data',
		description:
			'Web application for interacting with MLB data collected with vigorish. Built with SvelteKit as an opportunity to learn the new framework and ESM tooling.',
		stargazers_count: 1,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/vig-data',
		stargazers_url: 'https://api.github.com/repos/a-luna/vig-data/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/vig-data/forks',
		pushed_at: '2024-09-19T11:31:01Z',
	},
	{
		name: 'vigorish',
		description: 'MLB data web scraper, Python CLI application',
		stargazers_count: 2,
		forks_count: 2,
		html_url: 'https://github.com/a-luna/vigorish',
		stargazers_url: 'https://api.github.com/repos/a-luna/vigorish/stargazers',
		forks_url: 'https://api.github.com/repos/a-luna/vigorish/forks',
		pushed_at: '2024-09-04T23:03:23Z',
	},
	{
		name: 'portfolio',
		description: 'My personal website/blog/portfolio, built with sveltekit',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-mono/tree/main/apps/portfolio',
		stargazers_url: '',
		forks_url: '',
		pushed_at: '2024-05-11T16:02:04Z',
	},
	{
		name: 'svelte-base64',
		description:
			'Web app that explains how base64 encoding works step-by-step for any string or data and shows the process visually',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-mono/tree/main/apps/svelte-base64',
		stargazers_url: '',
		forks_url: '',
		pushed_at: '2024-05-28T23:19:26Z',
	},
	{
		name: 'svelte-color-tools',
		description: 'Svelte component library containing helpful ColorPicker and ColorPalette components.',
		stargazers_count: 0,
		forks_count: 0,
		html_url: 'https://github.com/a-luna/svelte-mono/tree/main/packages/svelte-color-tools',
		stargazers_url: '',
		forks_url: '',
		pushed_at: '2024-05-11T07:54:49Z',
	},
];
