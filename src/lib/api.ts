import type { HttpAuthToken, HttpMethod, HttpResult } from '$lib/types';

async function send(args: {
	method: HttpMethod;
	path: string;
	data: { [k: string]: string };
	token: HttpAuthToken;
	acceptMediaType: string;
}): Promise<Response> {
	const { method, path, data, token, acceptMediaType } = { ...args };
	const opts: RequestInit = { method };
	opts.headers = {};

	if (Object.keys(data).length) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `${token.type} ${token.token}`;
	}

	if (acceptMediaType) {
		opts.headers['Accept'] = acceptMediaType;
	}
	return fetch(path, opts);
}

async function get(path: string, token: HttpAuthToken, acceptMediaType = ''): Promise<HttpResult> {
	const data = {};
	const response = await send({ method: 'GET', path, data, token, acceptMediaType });
	if (!response.ok) {
		return { success: false, error: { status: response.status, message: response.statusText } };
	}
	return { success: true, value: response };
}

async function post(
	path: string,
	data: { [k: string]: string },
	token: HttpAuthToken,
	acceptMediaType = ''
): Promise<HttpResult> {
	const response = await send({ method: 'POST', path, data, token, acceptMediaType });
	if (!response.ok) {
		return { success: false, error: { status: response.status, message: response.statusText } };
	}
	return { success: true, value: response };
}

export const api = {
	get,
	post
};
