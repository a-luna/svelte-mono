<script lang="ts">
  import { getIconDetails } from "$lib/iconDatabase";
  import type { FilterSetting } from "$lib/types";
  import { getCSSPropValue } from "$lib/util";

  export let value: FilterSetting;
  export let hovered = false;
  export let selected = false;
  let iconColor: string;

  $: icon = getIconDetails(value);
  $: if (typeof window !== "undefined" && value) {
    iconColor = icon?.color
      ? getCSSPropValue(document.body, `--${icon.color}-icon`)
      : "--accent-color";
  }

  $: displayName = icon.displayName;
  $: iconSize = icon?.size ?? 16;
  $: marginRight = Math.max(5, 23 - iconSize);
  $: marginLeft = marginRight - 7;
  $: style = `height: ${iconSize}px; width: ${iconSize}px; color: ${iconColor}; margin: 0 ${marginRight}px 0 ${marginLeft}px;`;
</script>

<div class="filter-setting" class:selected class:hovered>
  <div class="icon-wrapper" {style}>
    <svelte:component this={icon?.icon} {...{ fill: iconColor }} />
  </div>
  <span class="filter-value">{displayName}</span>
</div>

<style lang="postcss">
  .filter-setting {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    color: var(--gray-shade2);
    font-weight: 400;
  }
  .hovered,
  .hovered.selected {
    color: var(--accent-color);
  }
  .selected {
    color: var(--white-shade1);
  }
  .icon-wrapper {
    object-fit: contain;
    vertical-align: middle;
  }
  .filter-value {
    white-space: nowrap;
  }
</style>
