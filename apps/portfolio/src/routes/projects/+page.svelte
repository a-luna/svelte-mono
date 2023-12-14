<script lang="ts">
	import ProjectList from '$lib/components/ProjectList/ProjectList.svelte';
	import SectionLayout from '$lib/components/SectionLayout.svelte';
	import { MY_TWITTER_HANDLE } from '$lib/siteConfig';

	const description =
		'A curated list of my open-source projects. Use the filters to narrow down the list by project type or technology/programming language.';
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
	<ProjectList />
</SectionLayout>
