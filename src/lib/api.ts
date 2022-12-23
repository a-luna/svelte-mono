import type { HttpMethod, HttpResult } from './types';

const getApiBaseUrl = (): string =>
	import.meta.env.MODE === 'production' ? 'https://unicode-api.aaronluna.dev/v1' : 'http://localhost:3507/v1';

function send(args: { method: HttpMethod; path: string; data: { [k: string]: string } }): Promise<Response> {
	const { method, path, data } = { ...args };
	const opts = { method };
	const headers = { Accept: 'application/json' };

	if (Object.keys(data).length) {
		headers['Content-Type'] = 'application/json';
		opts['body'] = JSON.stringify(data);
	}

	opts['headers'] = headers;
	return fetch(`${getApiBaseUrl()}/${path}`, opts);
}

async function get(path: string): Promise<HttpResult> {
	const data = {};
	const response = await send({ method: 'GET', path, data });
	if (!response.ok) {
		return { success: false, error: { status: response.status, message: response.statusText }, value: null };
	}
	return { success: true, value: response, error: null };
}

export const api = { get };
