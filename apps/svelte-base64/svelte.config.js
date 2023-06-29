/// <reference types="vitest" />
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter({
			fallback: '200.html',
			edge: false,
			split: true,
		}),
		prerender: { entries: [] },
	},
};

export default config;
