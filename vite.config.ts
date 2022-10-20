import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['node-html-parser', 'node-fetch', 'mdsvex', 'highlight.js', 'highlight.js/lib/core']
	}
};

export default config;
