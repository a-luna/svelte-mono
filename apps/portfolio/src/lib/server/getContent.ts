import { dev } from '$app/environment';
import { GH_LANG_TO_MY_LANG_MAP } from '$lib/constants';
import { isProjectCategory, unslugify } from '$lib/server/util';
import {
	API_TUTORIAL_IMAGE_ROOT,
	API_TUTORIAL_URL_ROOT,
	BLOG_IMAGE_ROOT,
	BLOG_POST_URL_ROOT,
	SITE_URL,
} from '$lib/siteConfig';
import { isProjectType, isSpecificLanguageOrTech } from '$lib/typeguards';
import type {
	BlogPost,
	BlogResource,
	FrontMatterResources,
	LanguageOrTech,
	ProjectCategory,
	ProjectType,
	ResourceMap,
	TutorialSection,
} from '$lib/types';
import { promises as fs } from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

export const listBlogPosts = async (): Promise<BlogPost[]> => await getAllContent<BlogPost>('blog_posts');
export const listTutorialSections = async (): Promise<TutorialSection[]> =>
	await getAllContent<TutorialSection>('flask-api-tutorial');

const checkMarkdownFile = (fileName: string): boolean => path.extname(fileName) === '.md';

const getResourceUrl = (res: FrontMatterResources, slug: string, imageFolder: string): string =>
	res.name.startsWith('img') ? `${imageFolder}/${slug}/${res.src}` : `${SITE_URL}/${res.src}`;

async function getAllContent<T>(contentType: 'blog_posts' | 'flask-api-tutorial'): Promise<T[]> {
	const contentList: T[] = [];
	const markdownFolder = getMarkdownFolder(contentType);
	for await (const _path of getMarkdownFiles(markdownFolder)) {
		const src = await fs.readFile(_path, 'utf8');
		const { content, data } = grayMatter(src);
		if (contentType === 'blog_posts') {
			contentList.push(parseBlogPost(_path, content, data) as T);
		} else {
			contentList.push(parseTutorialSection(_path, content, data) as T);
		}
	}
	return contentList;
}

function getMarkdownFolder(contentType: 'blog_posts' | 'flask-api-tutorial'): string {
	const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));
	return dev
		? path.resolve(path.join(__dirname, '../../../', `static/${contentType}`))
		: path.resolve(path.join(__dirname, '../../', `client/${contentType}`));
}

async function* getMarkdownFiles(dir: string): AsyncGenerator<string> {
	const dirents = await fs.readdir(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		const filePath = path.resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			yield* getMarkdownFiles(filePath);
		} else if (checkMarkdownFile(dirent.name)) {
			yield filePath;
		}
	}
}

function parseBlogPost(path: string, content: string, data: { [k: string]: unknown }): BlogPost {
	const blogPost = parseMarkdownFile(path, BLOG_IMAGE_ROOT, BLOG_POST_URL_ROOT, content, data);
	blogPost.href = `blog/${blogPost.slug}`;
	blogPost.url = `${SITE_URL}/${blogPost.href}`;
	return blogPost;
}

function parseTutorialSection(path: string, content: string, data: { [k: string]: unknown }): TutorialSection {
	const tutorialSection = parseMarkdownFile(
		path,
		API_TUTORIAL_IMAGE_ROOT,
		API_TUTORIAL_URL_ROOT,
		content,
		data,
	) as unknown as TutorialSection;
	tutorialSection.href = tutorialSection.slug;
	tutorialSection.url = `${SITE_URL}/${tutorialSection.href}`;
	tutorialSection.lead = data.lead as string;
	tutorialSection.series_weight = data.series_weight as number;
	tutorialSection.series_title = data.series_title as string;
	tutorialSection.series_part = data.series_part as string;
	tutorialSection.series_part_lead = data.series_part_lead as string;
	tutorialSection.git_release_name = data.git_release_name as string;
	tutorialSection.url_git_rel_browse = data.url_git_rel_browse as string;
	tutorialSection.url_git_rel_zip = data.url_git_rel_zip as string;
	tutorialSection.url_git_rel_tar = data.url_git_rel_tar as string;
	tutorialSection.url_git_rel_diff = data.url_git_rel_diff as string;
	return tutorialSection;
}

function parseMarkdownFile(
	filePath: string,
	imageFolder: string,
	urlRoot: string,
	content: string,
	data: { [k: string]: unknown },
): BlogPost {
	const slug = (data.slug as string) ?? path.basename(filePath, '.md');
	const date = new Date((data.date as string) ?? 0);
	const hasToc = Object.keys(data).includes('toc') ? (data.toc as boolean) : false;
	const tags = [...(data.categories as string[])];
	const categories: ProjectCategory[] = [];
	const techList: LanguageOrTech[] = [];

	tags.forEach((tag) => {
		if (isProjectCategory(tag)) {
			categories.push(tag);
		} else {
			const tech = GH_LANG_TO_MY_LANG_MAP[tag] ?? tag.toLowerCase();
			if (isSpecificLanguageOrTech(tech)) {
				techList.push(tech);
			}
		}
	});

	return {
		content,
		title: (data.title as string) ?? unslugify(slug),
		subtitle: '',
		description: (data.summary as string) ?? content.trim().split('\n')[0] ?? '',
		frontmatter: data.data as { [k: string]: string },
		hasToc,
		toc: [],
		category: parseProjectType(categories[0]),
		categories,
		language: techList.at(0) ?? 'allLanguages',
		techList,
		slug,
		href: '',
		url: `${urlRoot}/${slug}`,
		date: date.toISOString(),
		coverImage: getCoverImage(slug, imageFolder, data.resources as FrontMatterResources[]),
		resources: getArticleResources(slug, imageFolder, data.resources as FrontMatterResources[]),
		codeBlocks: [],
		deployedUrl: '',
		projectSiteTitle: '',
	};
}

function parseProjectType(category: ProjectCategory | undefined): ProjectType {
	if (!category) return 'allProjects';
	return isProjectType(category) ? category : 'allProjects';
}

function getCoverImage(slug: string, imageFolder: string, frontMatterRes: FrontMatterResources[]): BlogResource {
	const cover = frontMatterRes.find((res) => res.name === 'cover');
	return {
		src: `${imageFolder}/${slug}.jpg`,
		name: cover?.name ?? '',
		caption: cover?.params?.credit ?? '',
	};
}

function getArticleResources(slug: string, imageFolder: string, frontMatterRes: FrontMatterResources[]): ResourceMap {
	const articleResources = frontMatterRes.filter((res) => res.name !== 'cover');
	const resources: ResourceMap = {};
	articleResources.forEach(
		(img) =>
			(resources[img.name] = {
				name: img.name,
				src: getResourceUrl(img, slug, imageFolder),
				caption: img.title ?? '',
			}),
	);
	return resources;
}
