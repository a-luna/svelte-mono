<script context="module">
  import { SITE_TITLE } from "$lib/siteConfig";
</script>

<script>
  import Nav from "$components/Nav.svelte";
  import "../tailwind.css";
</script>

<svelte:head>
  <link
    rel="alternate"
    type="application/rss+xml"
    title={"RSS Feed for " + SITE_TITLE}
    href="/rss.xml"
  />
</svelte:head>

<div class="header-wrapper flex flex-col justify-center px-4 sm:px-8">
  <Nav />
</div>
<main class="flex flex-col justify-center">
  <slot />
</main>

<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient
      id="icon-gradient"
      x1="0"
      y1="0"
      x2="24"
      y2="24"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="25%" stop-color="#aae30d" />
      <stop offset="55%" stop-color="#0de354" />
      <stop offset="85%" stop-color="#0de3b8" />
    </linearGradient>
  </defs>
</svg>

<style lang="postcss">
  .header-wrapper {
    background-color: var(--header-bg-color);
  }
</style>
