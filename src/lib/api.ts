import type { HttpMethod, HttpResult } from './types';

const getApiBaseUrl = (): string =>
	import.meta.env.MODE === 'production' ? 'https://unicode-api.aaronluna.dev/v1' : 'http://localhost:3507/v1';

async function send(args: { method: HttpMethod; path: string; data: { [k: string]: string } }): Promise<HttpResult> {
	const { method, path, data } = { ...args };
	const opts = { method };
	const headers = { Accept: 'application/json' };

	if (Object.keys(data).length) {
		headers['Content-Type'] = 'application/json';
		opts['body'] = JSON.stringify(data);
	}

	opts['headers'] = headers;
	try {
		const response = await fetch(`${getApiBaseUrl()}/${path}`, opts);
		if (!response.ok) {
			return { success: false, error: { status: response.status, message: response.statusText }, value: null };
		}
		return { success: true, value: response, error: null };
	} catch(error) {
		return { success: false, error: { status: 400, message: error }, value: null };
	}
	
}

async function get(path: string): Promise<HttpResult> {
	const data = {};
	return await send({ method: 'GET', path, data });
}

export const api = { get };
