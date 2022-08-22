<script lang="ts">
  import { getCategoryDetails } from "$lib/projectMetaData";
  import type { FilterSetting } from "$lib/types";

  export let value: FilterSetting;
  export let hovered = false;
  export let selected = false;

  $: category = getCategoryDetails(value);
  $: displayName = category.displayName;
  $: bgColor = category.color;
  $: style = selected
    ? `color: var(--page-bg-color);`
    : hovered
    ? `color: var(--accent-color);`
    : `color: var(--gray-shade2);`;
</script>

<div class="filter-setting" {style}>
  <span class="filter-value">{displayName}</span>
</div>

<style lang="postcss">
  .filter-setting {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    line-height: 1;
  }
  .filter-value {
    white-space: nowrap;
  }
</style>
