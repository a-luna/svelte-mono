<script lang="ts">
  import Circle from "$components/Icons/Circle.svelte";
  import Fork from "$components/Icons/Fork.svelte";
  import Github from "$components/Icons/Github.svelte";
  import Star from "$components/Icons/Star.svelte";
  import type { IconName } from "$lib/types";

  export let icon: IconName;
  export let height: string = null;
  export let width: string = null;
  export let margin: string = null;

  $: hStyle = height ? `height: ${height}` : "";
  $: wStyle = width ? `width: ${width}` : "";
  $: mStyle = margin ? `margin: ${margin}` : "";
  $: style = [hStyle, wStyle, mStyle].filter((s) => s !== "").join("; ");
</script>

<div class="icon-wrapper" {style}>
  {#if icon === "github"}
    <Github />
  {:else if icon === "star"}
    <Star />
  {:else if icon === "circle"}
    <Circle />
  {:else if icon === "fork"}
    <Fork />
  {/if}
</div>
