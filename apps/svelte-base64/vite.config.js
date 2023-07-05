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
		moduleNameMapper: {
			'^\\$lib(.*)$': '<rootDir>/src/lib$1',
			'^\\$app(.*)$': ['<rootDir>/.svelte-kit/dev/runtime/app$1', '<rootDir>/.svelte-kit/build/runtime/app$1'],
		},
		resolve: {
			alias: {
				'@a-luna/shared-ui': resolve(__dirname, 'node_modules/@a-luna/shared-ui'),
			},
		},
		deps: {
			inline: ['xstate'],
		},
		coverage: {
			skipFull: true,
			exclude: [...configDefaults.exclude, '**/b64Encode.test/**', '**/tests/**', '**/.svelte-kit/**'],
		},
		testTimeout: 30_000,
		hookTimeout: 30_000,
	},
});
