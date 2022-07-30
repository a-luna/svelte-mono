<script context="module" lang="ts">
  import {
    DEFAULT_OG_IMAGE,
    MY_TWITTER_HANDLE,
    SITE_DESCRIPTION,
    SITE_TITLE,
    SITE_URL,
  } from "$lib/siteConfig";
  import type { UserRepos } from "$lib/types";
  import { getAuthToken, projectGroupToRepoList, userRepos } from "$lib/util";
  import { get } from "svelte/store";

  // export const prerender = true; // turned off so it refreshes quickly
  export async function load({ fetch }) {
    let allRepos: UserRepos;
    const storedValue = get(userRepos);
    if (!storedValue || !Object.keys(storedValue).length) {
      const result = await fetch(`/api/listUserRepos.json`, {
        headers: getAuthToken(),
      });
      if (result.status > 400) {
        return {
          status: result.status,
          error: await result.text(),
        };
      }

      allRepos = await result.json();
    } else {
      allRepos = storedValue;
    }
    return {
      props: { allRepos },
      cache: {
        maxage: 3600, // 1 hour
      },
    };
  }
</script>

<script lang="ts">
  export let allRepos: UserRepos = {};
  import { browser } from "$app/env";
  import Mandala from "$components/Mandala.svelte";
  import ProjectGroup from "$components/ProjectGroup.svelte";
  import { isProjectGroup } from "$lib/util";

  $: if (browser && Object.keys(allRepos).length) $userRepos = allRepos;
</script>

<svelte:head>
  <title>{SITE_TITLE}</title>
  <link rel="canonical" href={SITE_URL} />
  <link
    rel="alternate"
    type="application/rss+xml"
    href={SITE_URL + "/api/rss.xml"}
  />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={SITE_TITLE} />
  <meta name="Description" content={SITE_DESCRIPTION} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:image" content={DEFAULT_OG_IMAGE} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content={"@" + MY_TWITTER_HANDLE} />
  <meta name="twitter:title" content={SITE_TITLE} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
</svelte:head>

<div class="main-header max-w-3xl">
  <div class="main-header-content mr-auto px-4 sm:px-8">
    <div class="my-8 flex flex-col pr-8">
      <span class="title-card">
        <span class="relative p-2">
          <h1 class="mb-3 text-4xl font-bold tracking-normal md:text-5xl">
            Aaron Luna
          </h1>
          <span class="text-base sm:text-lg md:text-xl"
            >Front-end developer in Reno, NV.</span
          >
        </span>
      </span>
    </div>
  </div>
  <Mandala />
</div>

{#each Object.entries(projectGroupToRepoList) as [group, repos]}
  {#if isProjectGroup(group)}
    <ProjectGroup {group} {repos} />
  {/if}
{/each}

<style lang="postcss">
  .main-header {
    background: var(--page-bg-color);
    display: grid;
    grid-template-columns: 100%;
    width: 100%;
    max-height: 350px;
    margin: 0 auto;
  }
  .main-header-content {
    grid-column: 1;
    grid-row: 1;
    padding-top: 0;
    z-index: 2;
    position: relative;
  }
  .title-card {
    display: inline-block;
    background-color: var(--light-blue);
    color: var(--black-tint2);
    position: relative;
    transform: skewY(-3deg);
  }
  .title-card > * {
    display: block;
    transform: skewY(3deg);
  }
  @media (min-width: 768px) {
    .main-header {
      max-height: 450px;
    }
  }
  @media (min-width: 1024px) {
    .main-header {
      max-height: 450px;
    }
  }
</style>
