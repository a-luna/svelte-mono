import type {
	Aws,
	Cypress,
	FastApi,
	Flask,
	Hugo,
	JavaScript,
	Microsoft,
	Playwright,
	Puppeteer,
	Pydantic,
	Python,
	Redis,
	RegExp,
	Sqlite,
	Svelte,
	Tailwind,
	TypeScript,
	Xml,
	XPath,
	XState,
} from '$lib/components/Icons/LanguageTech';
import type { LANGTECH_ICON_NAMES } from '$lib/constants';

export type LanguageTechIcon =
	| typeof Aws
	| typeof Cypress
	| typeof FastApi
	| typeof Flask
	| typeof Hugo
	| typeof JavaScript
	| typeof Microsoft
	| typeof Playwright
	| typeof Puppeteer
	| typeof Pydantic
	| typeof Python
	| typeof Redis
	| typeof RegExp
	| typeof Sqlite
	| typeof Svelte
	| typeof Tailwind
	| typeof TypeScript
	| typeof Xml
	| typeof XPath
	| typeof XState;

export type LanguageTechIconName = (typeof LANGTECH_ICON_NAMES)[number];
