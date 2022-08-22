<script>
  import { page } from "$app/stores";

  $: isActive = $page.url.pathname === $$props.href;

  export let href;
</script>

<a
  class="inline-block rounded-lg p-0 m-0 transition-all md:px-3 md:py-2 md:mx-2 tracking-wider leading-none"
  class:active={isActive}
  {href}
  ><span class="leading-4"><slot /> </span>
</a>

<style lang="postcss">
  a {
    font-size: 1.3rem;
    color: var(--white-shade2);
    border-radius: 0;
  }
  a:hover {
    color: var(--gray-shade2);
  }
  a.active {
    color: var(--accent-color);
  }
  a.active:hover {
    color: var(--accent-color-dim);
  }

  @media (min-width: 767px) {
    a {
      font-size: 1.1rem;
    }
    a.active {
      border-bottom: 1px solid var(--accent-color);
    }
  }
</style>
