/// <reference types="vitest" />
import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
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
