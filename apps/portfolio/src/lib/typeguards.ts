import { PROJECT_TYPES } from '$lib/constants';
import type { ProjectType } from '$lib/types';

export const isProjectType = (filterSetting: string): filterSetting is ProjectType =>
	PROJECT_TYPES.includes(filterSetting as ProjectType);
