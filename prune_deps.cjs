const fs = require('fs');
const path = require('path');

const REMOVE_DEPENDENCIES = [
	'@types',
	'c8',
	'cssnano',
	'commitlint',
	'eslint',
	'husky',
	'jsdom',
	'lint-staged',
	'playwright',
	'pre-commit',
	'prettier',
	'safaridriver',
	'testing-library',
	'tslib',
	'typescript',
	'vitest',
	'webdriverio',
];

const PRESERVE_DEPENDENCIES = ['vite-node@', 'vite@'];

const pnpmStoreFolderPath = path.resolve(__dirname, 'node_modules/.pnpm');
let removeFolders = [];
const dirents = fs.readdirSync(pnpmStoreFolderPath, { withFileTypes: true });
for (const dirent of dirents) {
	if (dirent.isDirectory()) {
		REMOVE_DEPENDENCIES.forEach((removeName) => {
			if (
				dirent.name.includes(removeName) &&
				!PRESERVE_DEPENDENCIES.some((keepDepName) => dirent.name.includes(keepDepName))
			) {
				const folderPath = path.resolve(pnpmStoreFolderPath, dirent.name);
				removeFolders.push(folderPath);
			}
		});
	}
}
removeFolders = [...new Set(removeFolders)];
removeFolders.forEach((dir) => fs.rmSync(dir, { recursive: true }));

console.log(`${removeFolders.length} total folders were removed:\n`);
removeFolders.forEach((dir) => console.log(`\t- ${dir}`));
