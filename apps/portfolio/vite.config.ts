import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

const config: UserConfig = {
	plugins: [imagetools(), sveltekit()],
	optimizeDeps: {
		exclude: ['node-html-parser', 'node-fetch', 'mdsvex', 'highlight.js', 'highlight.js/lib/core'],
	},
	resolve: {
		alias: {
			'@a-luna/shared-ui': resolve(__dirname, 'node_modules/@a-luna/shared-ui'),
		},
	},
};

export default config;
