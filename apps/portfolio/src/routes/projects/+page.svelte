<script lang="ts">
	import { userRepos } from '$lib/stores';
	import ProjectList from '$lib/components/ProjectList/ProjectList.svelte';
	import { MY_TWITTER_HANDLE } from '$lib/siteConfig';
	import SectionLayout from '$lib/components/SectionLayout.svelte';

	const description =
		'A curated list of my open-source projects. Use the filters to narrow down the list by project type or technology/programming language.';

	$: allRepos = $userRepos.repos;
</script>

<svelte:head>
	<meta property="og:type" content="article" />
	<meta name="Description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:card" content={'summary'} />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<SectionLayout section={'projects'}>
	<ProjectList {allRepos} />
</SectionLayout>
