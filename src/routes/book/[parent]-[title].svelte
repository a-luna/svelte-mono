<script context="module" lang="ts">
  import { Bookit, load } from "$components/bookit";
  export { load };
</script>

<script lang="ts">
  export let params;
</script>

<Bookit {params} />
