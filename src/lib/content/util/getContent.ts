import {
	API_TUTORIAL_FOLDER,
	API_TUTORIAL_IMAGE_ROOT,
	API_TUTORIAL_URL_ROOT,
	BLOG_IMAGE_ROOT,
	BLOG_POST_FOLDER,
	BLOG_POST_URL_ROOT,
	SITE_URL
} from '$lib/siteConfig';
import type { BlogPost, BlogResource, FrontMatterResources, TutorialSection } from '$lib/types';
import { unslugify } from '$lib/util';
import { promises as fs } from 'fs';
import grayMatter from 'gray-matter';
import { basename, extname, resolve } from 'path';

const checkMarkdownFile = (fileName: string): boolean => extname(fileName) === '.md';

const parseBlogPost = (path: string, content: string, data: { [k: string]: unknown }): BlogPost =>
	parseMarkdownFile(path, BLOG_IMAGE_ROOT, BLOG_POST_URL_ROOT, content, data);

const getResourceUrl = (res: FrontMatterResources, slug: string, imageFolder: string): string =>
	res.name.startsWith('img') ? `${imageFolder}/${slug}/${res.src}` : `${SITE_URL}/${res.src}`;

export async function listLocalContent(): Promise<BlogPost[]> {
	const localContent: BlogPost[] = [];
	for await (const _path of getMarkdownFiles(BLOG_POST_FOLDER)) {
		const src = await fs.readFile(_path, 'utf8');
		const { content, data } = grayMatter(src);
		localContent.push(parseBlogPost(_path, content, data));
	}
	return localContent;
}

export async function listTutorialSections(): Promise<TutorialSection[]> {
	const tutorialSections: TutorialSection[] = [];
	for await (const _path of getMarkdownFiles(API_TUTORIAL_FOLDER)) {
		const src = await fs.readFile(_path, 'utf8');
		const { content, data } = grayMatter(src);
		tutorialSections.push(parseTutorialSection(_path, content, data));
	}
	return tutorialSections;
}

function parseTutorialSection(
	path: string,
	content: string,
	data: { [k: string]: unknown }
): TutorialSection {
	const tutorialSection = parseMarkdownFile(
		path,
		API_TUTORIAL_IMAGE_ROOT,
		API_TUTORIAL_URL_ROOT,
		content,
		data
	) as TutorialSection;
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
	path: string,
	imageFolder: string,
	urlRoot: string,
	content: string,
	data: { [k: string]: unknown }
): BlogPost {
	const slug = (data.slug as string) ?? basename(path, '.md');
	const date = new Date((data.date as string) ?? 0);
	const hasToc = Object.keys(data).includes('toc') ? (data.toc as boolean) : false;
	const tags = [...(data.categories as string[])].map((tag) => tag.toLowerCase());

	return {
		type: 'blog' as const,
		content,
		title: (data.title as string) ?? unslugify(slug),
		subtitle: '',
		description: (data.summary as string) ?? content.trim().split('\n')[0] ?? '',
		frontmatter: data.data as { [k: string]: string },
		hasToc,
		category: tags.at(0) ?? '',
		tags,
		canonical: `${urlRoot}/${slug}`,
		slug,
		date: date.toISOString(),
		coverImage: getCoverImage(slug, imageFolder, data.resources as FrontMatterResources[]),
		resources: getArticleResources(slug, imageFolder, data.resources as FrontMatterResources[])
	};
}

async function* getMarkdownFiles(dir: string): AsyncGenerator<string> {
	const dirents = await fs.readdir(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		const path = resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			yield* getMarkdownFiles(path);
		} else if (checkMarkdownFile(dirent.name)) {
			yield path;
		}
	}
}

function getCoverImage(
	slug: string,
	imageFolder: string,
	frontMatterRes: FrontMatterResources[]
): BlogResource {
	const cover = frontMatterRes.find((res) => res.name === 'cover');
	return {
		src: `${imageFolder}/post_images/${slug}.jpg`,
		name: cover?.name ?? '',
		caption: cover?.params?.credit ?? ''
	};
}

function getArticleResources(
	slug: string,
	imageFolder: string,
	frontMatterRes: FrontMatterResources[]
): { [k: string]: BlogResource } {
	const articleImages = frontMatterRes.filter((res) => res.name !== 'cover');
	const resources: { [k: string]: BlogResource } = {};
	articleImages.forEach(
		(img) =>
			(resources[img.name] = {
				name: img.name,
				src: getResourceUrl(img, slug, imageFolder),
				caption: img.title ?? ''
			})
	);
	return resources;
}
