import { PROJECT_TYPES, REPO_NAMES, SITE_SECTIONS } from '$lib/constants';
import type { ProjectType, RepoName, SiteSection } from '$lib/types';

export const isProjectType = (filterSetting: string): filterSetting is ProjectType =>
	PROJECT_TYPES.includes(filterSetting as ProjectType);

export const isSiteSection = (section: string): section is SiteSection =>
	SITE_SECTIONS.includes(section as SiteSection);

export const isUserRepo = (repoName: string): repoName is RepoName => REPO_NAMES.includes(repoName as RepoName);

export function isDate(value: unknown): value is Date {
	return (
	  value instanceof Date ||
	  (typeof value === 'object' &&
		Object.prototype.toString.call(value) === '[object Date]')
	)
}

export function isDateLike(value: unknown): value is Date {
	return typeof value === 'string' || typeof value === 'number';
}