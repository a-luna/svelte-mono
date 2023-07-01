import { PROJECT_TYPES, SITE_SECTIONS } from '$lib/constants';
import type { ProjectType, SiteSection } from '$lib/types';

export const isProjectType = (filterSetting: string): filterSetting is ProjectType =>
	PROJECT_TYPES.includes(filterSetting as ProjectType);

export const isSiteSection = (section: string): section is SiteSection =>
	SITE_SECTIONS.includes(section as SiteSection);
