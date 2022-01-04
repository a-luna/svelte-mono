const config = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testPathIgnorePatterns: ['/node_modules/', '/src/lib/__tests__/setup/'],
	setupFilesAfterEnv: ['<rootDir>/src/lib/__tests__/setup/jestSetup.ts'],
	bail: false,
	verbose: true,
	transform: {
		'^.+\\.svelte$': [
			'svelte-jester',
			{
				preprocess: true
			}
		],
		'.(ts|tsx)': 'ts-jest'
	},
	testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'svelte'],
	moduleNameMapper: {
		'^\\$lib(.*)$': '<rootDir>/src/lib$1',
		'^\\$app(.*)$': [
			'<rootDir>/.svelte-kit/dev/runtime/app$1',
			'<rootDir>/.svelte-kit/build/runtime/app$1'
		]
	}
};

module.exports = config;
