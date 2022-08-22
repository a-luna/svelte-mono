<script lang="ts">
  import Chevron from "$lib/components/Icons/Chevron.svelte";
  import FilterSettingWithIcon from "$lib/components/ProjectList/FilterControls/FilterSettingWithIcon.svelte";
  import { getIconDetails } from "$lib/iconDatabase";
  import { getCategoryDetails } from "$lib/projectMetaData";
  import type { FilterSetting as FilterSettingType } from "$lib/types";
  import { getRandomHexString } from "$lib/util";
  import { fade } from "svelte/transition";
  import FilterSetting from "./FilterSetting.svelte";

  export let id = `radio-${getRandomHexString(4)}`;
  export let title: string = null;
  export let startOptionNumber = 1;
  export let showIcons: boolean;
  export let noFilterSetting: FilterSettingType = null;
  export let filterSettings: FilterSettingType[];
  export let hoveredValue: FilterSettingType = null;
  export let selectedValue: FilterSettingType = null;
  export let expanded = false;

  $: currentSetting = !selectedValue
    ? ""
    : showIcons
    ? getIconDetails(selectedValue)?.displayName
    : getCategoryDetails(selectedValue)?.displayName;

  export function clearFilter() {
    selectedValue = noFilterSetting;
  }

  function getValueBgColor(
    current: FilterSettingType,
    value: FilterSettingType
  ) {
    if (current !== value) {
      return "var(--black-tint2)";
    }
    if (showIcons) {
      return "var(--dark-gray-shade1)";
    }
    const details = getCategoryDetails(value);
    return `var(--${details.color}-icon)`;
  }

  function changeFilterSetting(value: FilterSettingType) {
    selectedValue = value;
    expanded = false;
  }
</script>

<div class="project-list-filter">
  <div class="no-filter-setting">
    {#if noFilterSetting}
      <input
        type="radio"
        bind:group={selectedValue}
        name={id}
        id="{id}-option-0"
        value={noFilterSetting}
      />
      <label
        for="{id}-option-0"
        class:selected={selectedValue === noFilterSetting}
        class:expanded
        on:click={() => (selectedValue = noFilterSetting)}
        on:mouseenter={() => (hoveredValue = noFilterSetting)}
        on:mouseleave={() => (hoveredValue = null)}
      >
        {#if title}
          <div
            class="filter-title-wrapper"
            on:click={() => (expanded = !expanded)}
          >
            <div class="title-icon" class:expanded>
              <Chevron />
            </div>
            {title}
          </div>
        {/if}
      </label>
    {:else}
      <div class="placeholder" />
    {/if}
  </div>
  {#if expanded}
    <div
      in:fade={{ delay: 200 }}
      out:fade={{ delay: 300 }}
      class="filter-settings"
    >
      {#each filterSettings as setting, i}
        <input
          type="radio"
          bind:group={selectedValue}
          name={id}
          id="{id}-option-{i + startOptionNumber}"
          value={setting}
        />
        <label
          for="{id}-option-{i + startOptionNumber}"
          class:selected={selectedValue === setting}
          style="background-color: {getValueBgColor(selectedValue, setting)};"
          on:click={() => changeFilterSetting(setting)}
          on:mouseenter={() => (hoveredValue = setting)}
          on:mouseleave={() => (hoveredValue = null)}
        >
          {#if showIcons}
            <FilterSettingWithIcon
              hovered={hoveredValue === setting}
              selected={selectedValue === setting}
              value={setting}
            />
          {:else}
            <FilterSetting
              hovered={hoveredValue === setting}
              selected={selectedValue === setting}
              value={setting}
            />
          {/if}
        </label>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  .project-list-filter {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    z-index: 3;
  }
  .no-filter-setting {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    line-height: 1;
    gap: 1rem;
  }
  .no-filter-setting label {
    flex: 0;
    font-size: 1.6rem;
    cursor: pointer;
    width: 100%;
    white-space: nowrap;
  }
  .no-filter-setting label.selected {
    background-color: inherit;
  }
  .no-filter-setting label.expanded,
  .no-filter-setting label:hover {
    color: var(--accent-color);
  }
  .current-setting {
    display: flex;
    gap: 0.5rem;
    font-style: italic;
  }
  .current-setting {
    color: var(--accent-color);
  }
  .clear-filter {
    background-color: inherit;
    color: var(--pink-icon);
  }
  .filter-title-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .title-icon {
    width: 14px;
    transition: transform 0.3s ease-in;
  }
  .title-icon.expanded {
    transform: rotate(90deg);
  }
  .filter-settings {
    display: flex;
    flex-flow: row wrap;
    gap: 0.5rem;
    flex: 1;
  }
  input[type="radio"] {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
  .filter-settings label {
    cursor: pointer;
    padding: 0.75rem 1rem;
    color: var(--white-shade2);
  }
  .filter-settings label:hover {
    color: var(--accent-color);
  }
</style>
