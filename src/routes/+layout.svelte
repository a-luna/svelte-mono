<script>
	import Nav from "$components/Nav/Nav.svelte";
	import { SITE_TITLE } from "$lib/siteConfig";
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
  
  <div class="header-wrapper">
	<Nav />
  </div>
  <main>
	<slot />
  </main>
  
  <style lang="postcss">
	.header-wrapper {
	  display: flex;
	  flex-flow: column nowrap;
	  justify-content: center;
	  background-color: var(----page-bg-color);
	}
	main {
	  display: flex;
	  flex-flow: column nowrap;
	  justify-content: center;
	  padding: 0 1rem;
	}
	@media (min-width: 640px) {
	  main {
		padding: 0 2rem;
	  }
	}
  </style>
  