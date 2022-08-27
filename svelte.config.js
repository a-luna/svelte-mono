import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex({ extensions: ['.svx', '.md'] })
	],

	kit: {
		adapter: adapter(),
		prerender: {
      default: true,
			crawl: false,
			enabled: true,
			entries: ['*'],
			onError: 'continue'
		},
	}
};

export default config;
