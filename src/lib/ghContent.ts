import { SITE_URL } from '$lib/siteConfig';
import type { BlogPost, GithubIssue } from '$lib/types';
import { formatDateString, slugify } from '$lib/util';
import grayMatter from 'gray-matter';

export function parseIssue(issue: GithubIssue): BlogPost {
	const src = issue.body;
	const { content, data } = grayMatter(src);
	const title = data.title ?? issue.title;
	let slug;
	if (data.slug) {
		slug = data.slug;
	} else {
		slug = slugify(title);
	}
	const description = data.summary ?? content.trim().split('\n')[0];
	// you may wish to use a truncation approach like this instead...
	// let description = (data.content.length > 300) ? data.content.slice(0, 300) + '...' : data.content

	let tags: string[] = [];
	if (data.tags) {
		tags = Array.isArray(data.tags) ? data.tags : [data.tags];
	}
	tags = [...tags, ...data.categories].map((tag) => tag.toLowerCase());

	let image = '';
	if (data?.resources) {
		image = data.resources.find((res: { name: string }) => res.name === 'cover')?.src;
	} else {
		image = data.image ?? data.cover_image;
	}

	return {
		type: 'blog' as const, // futureproof in case you want to add other types of content
		content,
		frontmatter: data,
		title,
		subtitle: data.subtitle,
		description,
		category: data.category,
		tags,
		image,
		canonical: `${SITE_URL}/${slug}`, // for canonical URLs of something published elsewhere
		slug,
		date: formatDateString(new Date(data.date ?? issue.created_at)),
		ghMetadata: {
			issueUrl: issue.html_url,
			commentsUrl: issue.comments_url,
			title: issue.title,
			created_at: formatDateString(new Date(issue.created_at)),
			updated_at: formatDateString(new Date(issue.updated_at)),
			reactions: issue.reactions
		}
	};
}
