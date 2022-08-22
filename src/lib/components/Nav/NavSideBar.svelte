<script lang="ts">
  import NavLink from "$lib/components/Nav/NavLink.svelte";
  import { fly } from "svelte/transition";
  import SocialLinks from "./SocialLinks.svelte";

  export let open: boolean;
</script>

{#if open}
  <aside
    transition:fly|local={{ duration: 1000, delay: 200, x: -300 }}
    class="nav-sidebar absolute md:hidden"
    id="nav-sidebar"
    class:open
  >
    <nav class="text-xl">
      <div>
        <NavLink href="/">Home</NavLink>
      </div>
      <div>
        <NavLink href="/blog">Blog</NavLink>
      </div>
      <div>
        <NavLink href="/about">About</NavLink>
      </div>
    </nav>
    <SocialLinks mobile={true} {open} />
  </aside>
{/if}

<style lang="postcss">
  .nav-sidebar {
    z-index: 4;
    background-color: var(--black-tint2);
    width: 100%;
    height: 100%;
    left: -100%;
    transition: left 0.3s ease-in-out;
  }
  .open {
    left: 0;
    top: 0;
  }
  nav {
    display: flex;
    flex-flow: column nowrap;
    background-color: inherit;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 5rem 0 0 3rem;
    gap: 2rem;
  }
</style>
