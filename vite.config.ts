import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	define: {
		'process.env': {}
	},
	resolve: {
		alias: {
			path: 'path-browserify'
		}
	},
	optimizeDeps: {
		exclude: ['node-fetch', 'mdsvex', 'highlight.js', 'highlight.js/lib/core']
	}
};

export default config;
