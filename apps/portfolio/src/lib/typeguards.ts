import {
	FEATURED_PROJECTS,
	MONOREPO_PROJECTS,
	PROJECT_NAMES,
	PROJECT_TYPES,
	REPO_NAMES,
	SITE_SECTIONS,
	TRANSITION_SECTIONS,
} from '$lib/constants';
import type {
	FeaturedProject,
	MonorepoProjectName,
	ProjectName,
	ProjectType,
	RepoName,
	SiteSection,
	TransitionSection,
} from '$lib/types';

export const isProjectType = (filterSetting: string): filterSetting is ProjectType =>
	PROJECT_TYPES.includes(filterSetting as ProjectType);

export const isTransitionSection = (section: string): section is TransitionSection =>
	TRANSITION_SECTIONS.includes(section as TransitionSection);

export const isSiteSection = (section: string): section is SiteSection =>
	SITE_SECTIONS.includes(section as SiteSection);

export const isUserRepo = (repo: string): repo is RepoName => REPO_NAMES.includes(repo as RepoName);

export const isMonorepoProject = (projectName: string): projectName is MonorepoProjectName =>
	MONOREPO_PROJECTS.includes(projectName as MonorepoProjectName);

export const isSiteProject = (projectName: string): projectName is ProjectName =>
	PROJECT_NAMES.includes(projectName as ProjectName);

export const isFeaturedProject = (projectName: string): projectName is FeaturedProject =>
	FEATURED_PROJECTS.includes(projectName as FeaturedProject);

export const isDate = (value: unknown): value is Date =>
	value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]');

export const isDateLike = (value: unknown): value is Date => typeof value === 'string' || typeof value === 'number';
