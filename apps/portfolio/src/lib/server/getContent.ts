import { dev } from '$app/environment';
import {
	API_TUTORIAL_IMAGE_ROOT,
	API_TUTORIAL_URL_ROOT,
	BLOG_IMAGE_ROOT,
	BLOG_POST_URL_ROOT,
	SITE_URL
} from '$lib/siteConfig';
import type {
	BlogPost,
	BlogResource,
	FrontMatterResources,
	LanguageOrTech,
	ProjectCategory,
	TutorialSection
} from '$lib/types';
import { isLanguageOrTech, isProjectCategory, unslugify } from '$lib/server/util';
import { promises as fs } from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

export const listBlogPosts = async (): Promise<BlogPost[]> => getAllContent('blog_posts');
export const listTutorialSections = async (): Promise<TutorialSection[]> => getAllContent('flask-api-tutorial');

const checkMarkdownFile = (fileName: string): boolean => path.extname(fileName) === '.md';

const getResourceUrl = (res: FrontMatterResources, slug: string, imageFolder: string): string =>
	res.name.startsWith('img') ? `${imageFolder}/${slug}/${res.src}` : `${SITE_URL}/${res.src}`;

async function getAllContent(
	contentType: 'blog_posts' | 'flask-api-tutorial'
): Promise<BlogPost[] | TutorialSection[]> {
	const contentList: BlogPost[] | TutorialSection[] = [];
	const markdownFolder = getMarkdownFolder(contentType);
	for await (const _path of getMarkdownFiles(markdownFolder)) {
		const src = await fs.readFile(_path, 'utf8');
		const { content, data } = grayMatter(src);
		if (contentType === 'blog_posts') {
			contentList.push(parseBlogPost(_path, content, data));
		} else {
			contentList.push(parseTutorialSection(_path, content, data));
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
		data
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
	data: { [k: string]: unknown }
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
		} else if (isLanguageOrTech(tag)) {
			techList.push(tag);
		}
	});

	return {
		content,
		title: (data.title as string) ?? unslugify(slug),
		subtitle: '',
		description: (data.summary as string) ?? content.trim().split('\n')[0] ?? '',
		frontmatter: data.data as { [k: string]: string },
		hasToc,
		category: categories.at(0) ?? 'allCategories',
		categories,
		language: techList.at(0) ?? 'allLanguages',
		techList,
		canonical: `${urlRoot}/${slug}`,
		slug,
		date: date.toISOString(),
		coverImage: getCoverImage(slug, imageFolder, data.resources as FrontMatterResources[]),
		resources: getArticleResources(slug, imageFolder, data.resources as FrontMatterResources[])
	};
}

function getCoverImage(slug: string, imageFolder: string, frontMatterRes: FrontMatterResources[]): BlogResource {
	const cover = frontMatterRes.find((res) => res.name === 'cover');
	return {
		src: `${imageFolder}/${slug}.jpg`,
		name: cover?.name ?? '',
		caption: cover?.params?.credit ?? ''
	};
}

function getArticleResources(
	slug: string,
	imageFolder: string,
	frontMatterRes: FrontMatterResources[]
): { [k: string]: BlogResource } {
	const articleResources = frontMatterRes.filter((res) => res.name !== 'cover');
	const resources: { [k: string]: BlogResource } = {};
	articleResources.forEach(
		(img) =>
			(resources[img.name] = {
				name: img.name,
				src: getResourceUrl(img, slug, imageFolder),
				caption: img.title ?? ''
			})
	);
	return resources;
}
