import type {
	Codepen,
	Github,
	GithubSquare,
	LinkedIn,
	LinkedInSquare,
	Twitter,
	TwitterSquare,
	TwitterX,
} from '$lib/components/Icons/Social';
import type { SOCIAL_ICON_NAMES } from '$lib/constants';

export type SocialIcon =
	| typeof Codepen
	| typeof Github
	| typeof GithubSquare
	| typeof LinkedIn
	| typeof LinkedInSquare
	| typeof Twitter
	| typeof TwitterSquare
	| typeof TwitterX;

export type SocialIconName = (typeof SOCIAL_ICON_NAMES)[number];
