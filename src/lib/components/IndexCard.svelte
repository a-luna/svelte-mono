<script lang="ts">
  import type { GHMetadata } from "$lib/types";
  import { formatDateString } from "$lib/util";

  export let href = "#";
  export let ghMetadata: GHMetadata = null;
  export let title = "Untitled post";
  export let stringData = "no date";
</script>

<div class="mb-8 w-full">
  <div class="flex flex-col justify-between md:flex-row">
    <h4
      class="index-card-title mb-2 w-full flex-auto text-lg font-medium md:text-xl"
    >
      <a sveltekit:prefetch class="index-card w-full" {href}>{title}</a>
    </h4>
    <div class="inline-flex flex-1 items-center">
      {#if ghMetadata && ghMetadata.reactions.total_count}
        <span
          class="index-card-reactions mr-2 min-w-[2rem] font-mono text-xs text-opacity-70"
          >{ghMetadata.reactions.total_count} ♥</span
        >
      {/if}
      <p class="index-card-date mb-4 w-32 text-left md:mb-0 md:text-right">
        {formatDateString(stringData)}
      </p>
    </div>
  </div>
  <p class="index-card-description">
    <slot />
  </p>
</div>
