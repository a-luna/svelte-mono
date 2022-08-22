<script context="module" lang="ts">
  import {
    DEFAULT_OG_IMAGE,
    MY_TWITTER_HANDLE,
    SITE_DESCRIPTION,
    SITE_TITLE,
    SITE_URL,
  } from "$lib/siteConfig";
  import type { GHRepo } from "$lib/types";
  import { getAuthToken, userRepos } from "$lib/util";
  import { get } from "svelte/store";

  // export const prerender = true; // turned off so it refreshes quickly
  export async function load({ fetch }) {
    let allRepos: GHRepo[];
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
  export let allRepos: GHRepo[] = [];
  import { browser } from "$app/env";
  import Mandala from "$components/Mandala.svelte";
  import ProjectList from "$lib/components/ProjectList/ProjectList.svelte";

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

<div class="main-header">
  <div class="main-header-content mr-auto px-4 sm:px-8" />
  <Mandala />
</div>

<h2>// My_Projects</h2>
<ProjectList />

<style lang="postcss">
  .main-header {
    background: var(--page-bg-color);
    display: grid;
    grid-template-columns: auto 1fr auto 1fr auto repeat(5, 1fr);
    grid-template-rows: 1fr auto 1fr auto 1fr auto 1fr auto 1fr auto;
    width: 100%;
    max-height: 365px;
    margin: 0 auto;
  }
  .main-header-content {
    padding-top: 0;
    z-index: 2;
    position: relative;
    grid-column: 1 / span 10;
    grid-row: 1 / span 10;
  }
  h2 {
    color: var(--gray-shade4);
    font-family: "Roboto Mono", menlo, consolas, monospace;
    font-size: 2em;
    margin: 0 0 2.5rem 0;
  }

  @media (min-width: 640px) {
    h2 {
      font-size: 3em;
    }
  }

  @media (min-width: 1024px) {
    .main-header {
      max-height: 450px;
    }
  }
</style>
