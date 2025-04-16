import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '$lib/siteConfig';
import { blogPosts } from '$lib/stores';
import { get } from 'svelte/store';

export async function GET({ fetch }) {
	let posts = get(blogPosts);
	if (!posts || !posts.length) {
		posts = await fetch('/blog.json').then((r) => r.json());
		blogPosts.set(posts);
	}

	const headers = { 'Content-Type': 'application/xml' };

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${SITE_TITLE}</title>
				<description>${SITE_DESCRIPTION}</description>
				<link>${SITE_URL}</link>
				<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>${SITE_URL}/blog/${post.slug}</link>
							<guid isPermaLink="true">${post.url}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`,
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
}
