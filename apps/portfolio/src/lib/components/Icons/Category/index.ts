// import AllProjects from './AllProjects.svelte';
import Backend from '$lib/components/Icons/Category/Backend.svelte';
import Frontend from '$lib/components/Icons/Category/Frontend.svelte';
import NoCategoryFilter from '$lib/components/Icons/Category/NoCategoryFilter.svelte';
import { Asterisk as AllProjects } from '@a-luna/shared-ui';

export { AllProjects, Backend, Frontend, NoCategoryFilter };

export const PROJECT_CATEGORY_ICONS = {
	allprojects: AllProjects,
	backend: Backend,
	frontend: Frontend,
};
