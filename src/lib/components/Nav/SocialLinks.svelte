<script lang="ts">
  import Codepen from "../Icons/Social/Codepen.svelte";
  import Email from "../Icons/Social/Email.svelte";
  import Github from "../Icons/Social/Github.svelte";
  import LinkedIn from "../Icons/Social/LinkedIn.svelte";
  import Twitter from "../Icons/Social/Twitter.svelte";

  export let mobile = false;
  export let open = false;

  $: console.log({ mobile, open });
</script>

<div class:mobile={mobile && open} class:desktop={!mobile} class="social">
  <a href="http://github.com/a-luna"><Github /></a>
  <a href="https://www.linkedin.com/in/aaron-luna-reno-nv/"><LinkedIn /></a>
  <a href="https://twitter.com/aaronlunadev/"><Twitter /></a>
  <a href="https://codepen.io/a-luna/"><Codepen /></a>
  <a href="mailto:contact@aaronluna.dev"><Email /></a>
</div>

<style lang="postcss">
  .social {
    flex-flow: row nowrap;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    background-color: hsl(299deg 100% 35%);
  }
  .desktop {
    display: none;
  }
  .mobile {
    display: flex;
    margin: 2rem 0 0 3rem;
    justify-content: flex-start;
    width: min-content;
  }
  a {
    color: var(--page-bg-color);
    text-decoration: none;
    width: 1.3rem;
  }
  a:hover,
  a:focus,
  a:active,
  a:active:focus {
    color: var(--page-bg-color);
    text-decoration: none;
  }

  @media (min-width: 767px) {
    .desktop {
      display: flex;
      justify-content: center;
    }
    .mobile {
      display: none;
    }
    a {
      width: 18px;
    }
  }
</style>
