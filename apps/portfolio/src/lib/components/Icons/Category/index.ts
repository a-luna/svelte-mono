// import AllProjects from './AllProjects.svelte';
import Backend from '$lib/components/Icons/Category/Backend.svelte';
import { Asterisk as AllProjects } from '../../../../../node_modules/@a-luna/shared-ui';
import Frontend from './Frontend.svelte';
import NoCategoryFilter from './NoCategoryFilter.svelte';

export { AllProjects, Backend, Frontend, NoCategoryFilter };

export const PROJECT_CATEGORY_ICONS = {
	allprojects: AllProjects,
	backend: Backend,
	frontend: Frontend,
};
