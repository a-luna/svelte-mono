import {
	AngleDoubleLeft,
	AngleDoubleRight,
	Arrow,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	Asterisk,
	BezierCurve,
	Cancel,
	CaretDown,
	CaretUp,
	Check,
	Checked,
	Chevron,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	CircleFull,
	CircleOutline,
	Close,
	Code,
	ColorSwatches,
	Copy,
	Database,
	Deselect,
	DoubleUp,
	Edit,
	EditFilled,
	Email,
	Exclamation,
	ExclamationTriangle,
	Export,
	FastBackward,
	FastForward,
	Filter,
	FolderOpen,
	Fork,
	Gear,
	Globe,
	HalfStar,
	HandLizard,
	HandPointUp,
	Handshake,
	Hashtag,
	Help,
	Keyboard,
	Link,
	Menu,
	Minus,
	MinusSquare,
	Ok,
	Open,
	Palette,
	PaletteWithBrush,
	Pause,
	Pencil,
	Play,
	Plus,
	PlusSquare,
	ProjectDiagram,
	RemoveFilters,
	Reset,
	ReturnRight,
	Save,
	SelectAll,
	SelectNone,
	ShellPrompt,
	Sort,
	Star,
	StarOutline,
	StepBackward,
	StepForward,
	Trash,
	Unchecked,
} from '$lib/components/Icons/Basic';

import {
	Codepen,
	Github,
	GithubSquare,
	LinkedIn,
	LinkedInSquare,
	Twitter,
	TwitterSquare,
} from '$lib/components/Icons/Social';

import {
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

import type { BasicIcon, BasicIconName } from '$lib/types/Icons';
import type { LanguageTechIcon, LanguageTechIconName } from '$lib/types/Icons/LangTechIcons';
import type { SocialIcon, SocialIconName } from '$lib/types/Icons/SocialIcons';

function createBasicIconMap(): Map<BasicIconName, BasicIcon> {
	const iconMap = new Map<BasicIconName, BasicIcon>();
	iconMap.set('angledoubleleft', AngleDoubleLeft);
	iconMap.set('angledoubleright', AngleDoubleRight);
	iconMap.set('arrow', Arrow);
	iconMap.set('arrowdown', ArrowDown);
	iconMap.set('arrowleft', ArrowLeft);
	iconMap.set('arrowright', ArrowRight);
	iconMap.set('arrowup', ArrowUp);
	iconMap.set('asterisk', Asterisk);
	iconMap.set('beziercurve', BezierCurve);
	iconMap.set('cancel', Cancel);
	iconMap.set('caretdown', CaretDown);
	iconMap.set('caretup', CaretUp);
	iconMap.set('check', Check);
	iconMap.set('checked', Checked);
	iconMap.set('chevron', Chevron);
	iconMap.set('chevronleft', ChevronLeft);
	iconMap.set('chevronright', ChevronRight);
	iconMap.set('chevronup', ChevronUp);
	iconMap.set('circlefull', CircleFull);
	iconMap.set('circleoutline', CircleOutline);
	iconMap.set('close', Close);
	iconMap.set('code', Code);
	iconMap.set('colorswatches', ColorSwatches);
	iconMap.set('copy', Copy);
	iconMap.set('database', Database);
	iconMap.set('deselect', Deselect);
	iconMap.set('doubleup', DoubleUp);
	iconMap.set('edit', Edit);
	iconMap.set('editfilled', EditFilled);
	iconMap.set('email', Email);
	iconMap.set('exclamation', Exclamation);
	iconMap.set('exclamationtriangle', ExclamationTriangle);
	iconMap.set('export', Export);
	iconMap.set('fastbackward', FastBackward);
	iconMap.set('fastforward', FastForward);
	iconMap.set('filter', Filter);
	iconMap.set('folderopen', FolderOpen);
	iconMap.set('fork', Fork);
	iconMap.set('gear', Gear);
	iconMap.set('globe', Globe);
	iconMap.set('halfstar', HalfStar);
	iconMap.set('handlizard', HandLizard);
	iconMap.set('handpointup', HandPointUp);
	iconMap.set('handshake', Handshake);
	iconMap.set('hashtag', Hashtag);
	iconMap.set('help', Help);
	iconMap.set('keyboard', Keyboard);
	iconMap.set('link', Link);
	iconMap.set('menu', Menu);
	iconMap.set('minus', Minus);
	iconMap.set('minussquare', MinusSquare);
	iconMap.set('ok', Ok);
	iconMap.set('open', Open);
	iconMap.set('palette', Palette);
	iconMap.set('palettewithbrush', PaletteWithBrush);
	iconMap.set('pause', Pause);
	iconMap.set('pencil', Pencil);
	iconMap.set('play', Play);
	iconMap.set('plus', Plus);
	iconMap.set('plussquare', PlusSquare);
	iconMap.set('projectdiagram', ProjectDiagram);
	iconMap.set('removefilters', RemoveFilters);
	iconMap.set('reset', Reset);
	iconMap.set('returnright', ReturnRight);
	iconMap.set('save', Save);
	iconMap.set('selectall', SelectAll);
	iconMap.set('selectnone', SelectNone);
	iconMap.set('shellprompt', ShellPrompt);
	iconMap.set('sort', Sort);
	iconMap.set('star', Star);
	iconMap.set('staroutline', StarOutline);
	iconMap.set('stepbackward', StepBackward);
	iconMap.set('stepforward', StepForward);
	iconMap.set('trash', Trash);
	iconMap.set('unchecked', Unchecked);
	return iconMap;
}

function createSocialIconMap(): Map<SocialIconName, SocialIcon> {
	const iconMap = new Map<SocialIconName, SocialIcon>();
	iconMap.set('codepen', Codepen);
	iconMap.set('github', Github);
	iconMap.set('githubsquare', GithubSquare);
	iconMap.set('linkedin', LinkedIn);
	iconMap.set('linkedinsquare', LinkedInSquare);
	iconMap.set('twitter', Twitter);
	iconMap.set('twittersquare', TwitterSquare);
	return iconMap;
}

function createLangTechIconMap(): Map<LanguageTechIconName, LanguageTechIcon> {
	const iconMap = new Map<LanguageTechIconName, LanguageTechIcon>();
	iconMap.set('aws', Aws);
	iconMap.set('cypress', Cypress);
	iconMap.set('fastapi', FastApi);
	iconMap.set('flask', Flask);
	iconMap.set('hugo', Hugo);
	iconMap.set('microsoft', Microsoft);
	iconMap.set('playwright', Playwright);
	iconMap.set('puppeteer', Puppeteer);
	iconMap.set('python', Python);
	iconMap.set('redis', Redis);
	iconMap.set('regexp', RegExp);
	iconMap.set('sqlite', Sqlite);
	iconMap.set('svelte', Svelte);
	iconMap.set('tailwind', Tailwind);
	iconMap.set('typescript', TypeScript);
	iconMap.set('xml', Xml);
	iconMap.set('xstate', XState);
	return iconMap;
}

export const BASIC_ICON_MAP = createBasicIconMap();
export const SOCIAL_ICON_MAP = createSocialIconMap();
export const LANGTECH_ICON_MAP = createLangTechIconMap();
