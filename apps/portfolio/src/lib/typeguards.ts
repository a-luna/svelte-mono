import { PROJECT_TYPES, REPO_NAMES, SITE_SECTIONS, TRANSITION_SECTIONS } from '$lib/constants';
import type { ProjectType, RepoName, SiteSection, TransitionSection } from '$lib/types';

export const isProjectType = (filterSetting: string): filterSetting is ProjectType =>
	PROJECT_TYPES.includes(filterSetting as ProjectType);

export const isTransitionSection = (section: string): section is TransitionSection =>
	TRANSITION_SECTIONS.includes(section as TransitionSection);

export const isSiteSection = (section: string): section is SiteSection =>
	SITE_SECTIONS.includes(section as SiteSection);

export const isUserRepo = (repoName: string): repoName is RepoName => REPO_NAMES.includes(repoName as RepoName);

export function isDate(value: unknown): value is Date {
	return (
		value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]')
	);
}

export function isDateLike(value: unknown): value is Date {
	return typeof value === 'string' || typeof value === 'number';
}
