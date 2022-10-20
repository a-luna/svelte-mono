import { nullGHMetadata } from '$lib/constants';
import { BLOG_IMAGE_ROOT, BLOG_POST_FOLDER, SITE_URL } from '$lib/siteConfig';
import type { BlogImage, BlogPost, FrontMatterResources, GHMetadata } from '$lib/types';
import { unslugify } from '$lib/util';
import { promises as fs } from 'fs';
import grayMatter from 'gray-matter';
import { basename, extname, resolve } from 'path';

const getGHMetaDataNullObject = (date: Date): GHMetadata => ({
	...nullGHMetadata,
	created_at: date.toISOString(),
	updated_at: date.toISOString()
});

const checkMarkdownFile = (fileName: string): boolean => extname(fileName) === '.md';

export async function listLocalContent(): Promise<BlogPost[]> {
	const localContent: BlogPost[] = [];
	for await (const _path of getMarkdownFiles(BLOG_POST_FOLDER)) {
		const src = await fs.readFile(_path, 'utf8');
		const { content, data } = grayMatter(src);
		const slug = data.slug ?? basename(_path, '.md');
		const date = new Date(data.date);
		const hasToc = Object.keys(data).includes('toc') ? data.toc : false;
		const tags = [...data.categories].map((tag) => tag.toLowerCase());

		localContent.push({
			type: 'blog' as const,
			content,
			title: data.title ?? unslugify(slug),
			subtitle: '',
			description: data.summary ?? content.trim().split('\n')[0],
			frontmatter: data.data,
			hasToc,
			category: tags.at(0),
			tags,
			canonical: `${SITE_URL}/blog/${slug}`,
			slug,
			date: date.toISOString(),
			coverImage: getCoverImage(slug, data.resources),
			images: getArticleImages(slug, data.resources),
			ghMetadata: getGHMetaDataNullObject(date)
		});
	}
	return localContent;
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

function getCoverImage(slug: string, resources: FrontMatterResources[]): BlogImage {
	const coverImageRes = resources.find((res) => res.name === 'cover');
	return {
		src: `${BLOG_IMAGE_ROOT}/post_images/${slug}.jpg`,
		name: coverImageRes?.name ?? '',
		caption: coverImageRes?.params?.credit ?? ''
	};
}

function getArticleImages(
	slug: string,
	resources: FrontMatterResources[]
): { [k: string]: BlogImage } {
	const articleImages = resources.filter((res) => res.name !== 'cover');
	const images: { [k: string]: BlogImage } = {};
	articleImages.forEach(
		(img) =>
			(images[img.name] = {
				name: img.name,
				src: `${BLOG_IMAGE_ROOT}/${slug}/${img.src}`,
				caption: img.title ?? ''
			})
	);
	return images;
}
