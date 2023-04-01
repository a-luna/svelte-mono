import type {
	Aws,
	Cypress,
	FastApi,
	Flask,
	Hugo,
	Microsoft,
	Playwright,
	Puppeteer,
	Python,
	Redis,
	RegExp,
	Sqlite,
	Svelte,
	Tailwind,
	TypeScript,
	Xml,
	XState,
} from '$lib/components/Icons/LanguageTech';
import type { LANGTECH_ICON_NAMES } from '$lib/constants';

export type LanguageTechIcon =
	| typeof Aws
	| typeof Cypress
	| typeof FastApi
	| typeof Flask
	| typeof Hugo
	| typeof Microsoft
	| typeof Playwright
	| typeof Puppeteer
	| typeof Python
	| typeof Redis
	| typeof RegExp
	| typeof Sqlite
	| typeof Svelte
	| typeof Tailwind
	| typeof TypeScript
	| typeof Xml
	| typeof XState;

export type LanguageTechIconName = (typeof LANGTECH_ICON_NAMES)[number];
