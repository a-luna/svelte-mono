import { API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { parseIssue } from '$lib/ghContent';
import { APPROVED_POSTERS_GH_USERNAME, GH_USER_REPO, PUBLISH_TAGS } from '$lib/siteConfig';
import type { BlogPost, GithubIssue } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ setHeaders }: RequestEvent) => {
	const endpoint = `repos/${GH_USER_REPO}/issues`;
	const q = new URLSearchParams();
	q.set('state', 'all');
	q.set('per_page', '100');
	const result = await api.get(`${endpoint}?${q}`, API_KEY);
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	const issues = await response.json().catch(() => ({}));

	const allBlogposts: BlogPost[] = [];
	issues.forEach((issue: GithubIssue) => {
		if (
			issue.labels.some((label) => PUBLISH_TAGS.includes(label.name)) &&
			APPROVED_POSTERS_GH_USERNAME.includes(issue.user.login)
		) {
			allBlogposts.push(parseIssue(issue));
		}
	});
	allBlogposts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`
	});
	return json(allBlogposts);
};
