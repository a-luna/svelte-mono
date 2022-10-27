import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

const config: UserConfig = {
	plugins: [imagetools({ force: true }), sveltekit()],
	optimizeDeps: {
		exclude: ['node-html-parser', 'node-fetch', 'mdsvex', 'highlight.js', 'highlight.js/lib/core']
	}
};

export default config;
