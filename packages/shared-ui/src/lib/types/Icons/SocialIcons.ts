import type {
	Codepen,
	Github,
	Github2,
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
	| typeof Github2
	| typeof GithubSquare
	| typeof LinkedIn
	| typeof LinkedInSquare
	| typeof Twitter
	| typeof TwitterSquare
	| typeof TwitterX;

export type SocialIconName = (typeof SOCIAL_ICON_NAMES)[number];
