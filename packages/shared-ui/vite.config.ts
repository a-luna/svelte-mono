import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: false,
		environment: 'jsdom',
		dir: './src',
		coverage: {
			skipFull: true,
		},
	},
});
