/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: false,
		environment: 'jsdom',
		dir: './tests',
		coverage: {
			skipFull: true,
		},
	},
});
