<script lang="ts">
  import MenuButton from "$lib/components/Nav/MenuButton.svelte";
  import NavBrand from "$lib/components/Nav/NavBrand.svelte";
  import NavItems from "$lib/components/Nav/NavItems.svelte";
  import NavSideBar from "$lib/components/Nav/NavSideBar.svelte";
  import SocialLinks from "$lib/components/Nav/SocialLinks.svelte";

  let open = false;
</script>

<div class="nav-wrapper">
  <div
    class="nav-container justify-between items-center md:justify-start md:items-end"
  >
    <NavBrand />
    <NavItems />
    <SocialLinks mobile={false} {open} />
    <MenuButton {open} on:click={() => (open = !open)} />
    <NavSideBar {open} />
  </div>
</div>

<style lang="postcss">
  .nav-wrapper {
    width: 100%;
    padding: 1.5rem 0;
    background-color: inherit;
  }

  .nav-container {
    background-color: inherit;
    display: flex;
    flex-flow: row nowrap;
    gap: 3rem;
    max-width: 85rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  @media (min-width: 767px) {
    .nav-container {
      padding: 0 2.5rem;
    }
  }
</style>
