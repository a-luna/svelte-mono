module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		ecmaVersion: '2020',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.eslint.json'],
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	rules: {
		// Note: you must disable the base rule as it can report incorrect errors
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
			},
		],
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
		{
			files: ['*.ts'],
			rules: {
				'no-mixed-spaces-and-tabs': 'off',
			},
		},
	],
	settings: {
		svelte: {
			ignoreWarnings: ['svelte/no-at-html-tags'],
			compileOptions: {
				postcss: {
					configFilePath: './postcss.config.cjs',
				},
			},
			kit: {
				files: {
					routes: 'src/routes',
				},
			},
		},
	},
	globals: {
		NodeJS: true,
	},
	ignorePatterns: ['*.cjs'],
};
