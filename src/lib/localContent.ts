import { SITE_URL } from '$lib/siteConfig';
import type { BlogPost, GHMetadata } from '$lib/types';
import { formatDateString } from '$lib/util';
import { promises as fs } from 'fs';
import grayMatter from 'gray-matter';
import { basename, resolve } from 'path';

const slugToTitle = (slug: string): string =>
	slug
		.split('-')
		.map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
		.join(' ');

const getGHMetaDataNullObject = (date: Date): GHMetadata => ({
	issueUrl: '',
	commentsUrl: '',
	title: '',
	created_at: formatDateString(new Date(date)),
	updated_at: formatDateString(new Date(date)),
	reactions: {
		total_count: 0,
		'+1': 0,
		'-1': 0,
		laugh: 0,
		hooray: 0,
		confused: 0,
		heart: 0,
		rocket: 0,
		eyes: 0
	}
});

// use this if you want your content in a local '/content' folder rather than github issues
export async function listLocalContent(): Promise<BlogPost[]> {
	const localContent: BlogPost[] = [];
	for await (const _path of getFiles('src/lib/content')) {
		const src = await fs.readFile(_path, 'utf8');
		const { content, data } = grayMatter(src);
		const slug = data.slug ?? basename(_path, '.md');
		const date = new Date(data.date);
		const tags = [...data.categories].map((tag) => tag.toLowerCase());

		let image = '';
		if (data?.resources) {
			image = data.resources.find((res: { name: string }) => res.name === 'cover')?.src;
		} else {
			image = data.image ?? data.cover_image;
		}

		localContent.push({
			type: 'blog' as const,
			content,
			frontmatter: data.data,
			subtitle: '',
			tags,
			image,
			canonical: `${SITE_URL}/${slug}`,
			category: tags.at(0),
			slug,
			date: formatDateString(date),
			title: data.title ?? slugToTitle(slug),
			description: data.summary ?? content.trim().split('\n')[0],
			ghMetadata: getGHMetaDataNullObject(date)
		});
	}
	return localContent;
}

async function* getFiles(dir: string): AsyncGenerator<string> {
	const dirents = await fs.readdir(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		const res = resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			yield* getFiles(res);
		} else {
			yield res;
		}
	}
}
