<script lang="ts" context="module">
  import { Book, layoutLoad as load } from "$components/bookit";
  import { bookit_state } from "$components/bookit/state";
  import Toy from "@leveluptuts/svelte-toy/Toy.svelte";
  export { load };
</script>

<Book>
  <slot />
</Book>

<Toy theme="dark" register={{ bookit_state }} />
