import type { BlogPost, GithubIssue } from '$lib/types';
import { formatDateString, slugify } from '$lib/util';
import grayMatter from 'gray-matter';
import { compile } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const remarkPlugins = undefined;
const rehypePlugins = [rehypeStringify, rehypeSlug];

export async function parseBlogPost(blogPost: BlogPost): Promise<BlogPost> {
	const blogbody = blogPost.content
		.replace(/\n{% youtube (.*?) %}/g, (_, x) => {
			// https://stackoverflow.com/a/27728417/1106414
			function youtube_parser(url: string) {
				const rx =
					/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
				return url.match(rx)?.at(1);
			}
			const videoId: string = x.startsWith('https://') ? youtube_parser(x) : x;
			return `<iframe
			class="w-full object-contain"
			srcdoc="
				<style>
				    body, .youtubeembed {
					width: 100%;
					height: 100%;
					margin: 0;
					position: absolute;
					display: flex;
					justify-content: center;
					object-fit: cover;
				    }
				</style>
				<a
				    href='https://www.youtube.com/embed/${videoId}?autoplay=1'
				    class='youtubeembed'
				>
				    <img
					src='https://img.youtube.com/vi/${videoId}/sddefault.jpg'
					class='youtubeembed'
				    />
				    <svg
					version='1.1'
					viewBox='0 0 68 48'
					width='68px'
					style='position: relative;'
				    >
					<path d='M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z' fill='#f00'></path>
					<path d='M 45,24 27,14 27,34' fill='#fff'></path>
				    </svg>
				</a>
			"
			title="video123"
			name="video123"
			allow="accelerometer; autoplay; encrypted-media; gyroscope;
			picture-in-picture"
			frameBorder="0"
			webkitallowfullscreen="true"
			mozallowfullscreen="true"
			width="600"
			height="400"
			allowFullScreen
			aria-hidden="true"></iframe>`;
		})
		.replace(/\n{% (tweet|twitter) (.*?) %}/g, (_, _2, x) => {
			const url = x.startsWith('https://twitter.com/') ? x : `https://twitter.com/x/status/${x}`;
			return `
					<blockquote class="twitter-tweet" data-lang="en" data-dnt="true" data-theme="dark">
					<a href="${url}"></a></blockquote> 
					<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
					`;
		});

	// compile it with mdsvex
	const content = (
		await compile(blogbody, {
			remarkPlugins,
			rehypePlugins
		})
	).code
		// https://github.com/pngwn/MDsveX/issues/392
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>');

	return { ...blogPost, content };
}

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
		canonical: data.canonical, // for canonical URLs of something published elsewhere
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
