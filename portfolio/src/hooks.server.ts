import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const first: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/series/flask-api-tutorial') {
		return Response.redirect(`${event.url.origin}/series/flask-api-tutorial/overview`, 302);
	}
	return await resolve(event);
};

export const handle = sequence(first);
