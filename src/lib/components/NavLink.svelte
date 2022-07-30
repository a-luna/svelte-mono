<script>
  import { page } from "$app/stores";
  $: isActive = $page.url.pathname === $$props.href;
  export let href;
</script>

<a
  class="hidden rounded-lg p-1 transition-all sm:px-3 sm:py-2 sm:inline-block tracking-wider leading-none"
  class:active={isActive}
  {href}
  ><span class="leading-4"><slot /> </span>
</a>

<style lang="postcss">
  a {
    color: var(--white-shade2);
  }
  a:hover {
    color: var(--light-blue);
  }
  a.active {
    font-weight: 700;
    color: var(--page-bg-color);
    background-color: var(--light-blue);
  }
  a.active:hover {
    background-color: var(--light-blue-shade2);
  }
</style>
