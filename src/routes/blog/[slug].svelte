<script context="module" lang="ts">
  // export const prerender = true; // you can uncomment to prerender as an optimization
  export const hydrate = true;

  import Comments from "$components/Comments.svelte";
  import Reactions from "$components/Reactions.svelte";
  import { MY_TWITTER_HANDLE, REPO_URL, SITE_URL } from "$lib/siteConfig";
  import type { ContentItem } from "$lib/types";
  import { formatDateString } from "$lib/util";
  import "prism-themes/themes/prism-shades-of-purple.min.css";
  export async function load({ url, params, fetch }) {
    const slug = params.slug;

    const getLocalContentResult = await fetch(`/api/listLocalContent.json`);
    if (getLocalContentResult.status > 400) {
      return {
        status: getLocalContentResult.status,
        error: await getLocalContentResult.text(),
      };
    }

    const localItems: ContentItem[] = await getLocalContentResult.json();
    const localMatch = localItems.find((post) => post.slug === slug);
    if (localMatch) {
      return {
        props: {
          json: localMatch,
          slug,
          REPO_URL,
        },
        cache: {
          maxage: 60, // 1 minute
        },
      };
    }

    const getGhContentResult = await fetch(`/api/listGithubContent.json`);
    if (getGhContentResult.status > 400) {
      return {
        status: getGhContentResult.status,
        error: await getGhContentResult.text(),
      };
    }

    const ghItems: ContentItem[] = await getGhContentResult.json();
    const ghMatch = ghItems.find((post) => post.slug === slug);
    if (ghMatch) {
      return {
        props: {
          json: ghMatch,
          slug,
          REPO_URL,
        },
        cache: {
          maxage: 60, // 1 minute
        },
      };
    }
  }
</script>

<script lang="ts">
  export let json: ContentItem; // warning: if you try to destructure content here, make sure to make it reactive, or your page content will not update when your user navigates
</script>

<svelte:head>
  <title>{json.title}</title>
  <meta name="description" content="swyxkit blog" />

  <link rel="canonical" href={SITE_URL} />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={json.title} />
  <meta name="Description" content={json.description} />
  <meta property="og:description" content={json.description} />
  <meta
    name="twitter:card"
    content={json.image ? "summary_large_image" : "summary"}
  />
  <meta name="twitter:creator" content={"@" + MY_TWITTER_HANDLE} />
  <meta name="twitter:title" content={json.title} />
  <meta name="twitter:description" content={json.description} />
  {#if json.image}
    <meta property="og:image" content={json.image} />
    <meta name="twitter:image" content={json.image} />
  {/if}
</svelte:head>

<article
  class="mx-auto mb-16 mt-8 flex w-full max-w-2xl flex-col items-start justify-center px-4 sm:px-8"
>
  <h1 class="mb-8 text-3xl font-bold tracking-tightmmd:text-5xl ">
    {json.title}
  </h1>
  <div
    class="bg mt-2 flex w-full justify-between sm:flex-col sm:items-start md:flex-row md:items-center"
  >
    <p class="flex items-center text-sm">swyx</p>
    <p
      class="min-w-32 flex items-center text-sm text-gray-600 dark:text-gray-400 md:mt-0"
    >
      {#if json.ghMetadata.issueUrl}
        <a
          href={json.ghMetadata.issueUrl}
          rel="external"
          class="no-underline"
          target="_blank"
        >
          <span
            class="mr-4 font-mono text-xs text-gray-700 text-opacity-70 dark:text-gray-300"
            >{json.ghMetadata.reactions.total_count} reactions</span
          >
        </a>
      {/if}
      {formatDateString(json.date)}
    </p>
  </div>
  <div class="gradient -mx-4 my-2 flex h-1 w-[100vw] sm:mx-0 sm:w-full" />

  <div class="prose my-8 w-full max-w-none dark:prose-invert">
    {@html json.content}
  </div>
</article>
<div class="mx-auto max-w-2xl">
  <div
    class="prose mb-12 border-t border-b border-blue-800 p-4 dark:prose-invert"
  >
    {#if json.ghMetadata.reactions.total_count > 0}
      Reactions: <Reactions
        issueUrl={json.ghMetadata.issueUrl}
        reactions={json.ghMetadata.reactions}
      />
    {:else}
      <a href={json.ghMetadata.issueUrl}>Leave a reaction </a>
      if you liked this post! 🧡
    {/if}
  </div>
  <div class="mb-8">
    <Comments ghMetadata={json.ghMetadata} />
  </div>
</div>
