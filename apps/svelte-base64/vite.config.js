/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: [],
	},
	optimizeDeps: {},
	test: {
		globals: false,
		environment: 'jsdom',
		deps: {
			optimizer: { web: { include: ['xstate'] } },
		},
		coverage: {
			reporter: ['text', 'json-summary', 'json'],
			reportOnFailure: true,
			skipFull: true,
			exclude: [...configDefaults.exclude, '**/tests/**', './.svelte-kit/**', './build/**'],
		},
		testTimeout: 30_000,
		hookTimeout: 30_000,
	},
	resolve: {
		alias: {
			'@a-luna/shared-ui': resolve(__dirname, 'node_modules/@a-luna/shared-ui'),
		},
	},
});
