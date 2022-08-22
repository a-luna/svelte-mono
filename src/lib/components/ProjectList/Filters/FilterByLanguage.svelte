<script lang="ts">
  import ProjectFilter from "$lib/components/ProjectList/FilterControls/ProjectFilter.svelte";
  import { BACKEND_CATEGORIES } from "$lib/constants";
  import type { FilterSetting } from "$lib/types";

  export let filterCategory: FilterSetting = null;
  let expanded: boolean;
</script>

<div class="filty-by-category">
  <ProjectFilter
    id={"radio-category"}
    title={"Filter by Category"}
    bind:selectedValue={filterCategory}
    bind:expanded
    showIcons={true}
    noFilterSetting={"allCategories"}
    filterSettings={["backend", "frontend"]}
  />
  <ProjectFilter
    id={"radio-category"}
    bind:selectedValue={filterCategory}
    bind:expanded
    showIcons={false}
    filterSettings={[...BACKEND_CATEGORIES]}
    startOptionNumber={3}
  />
</div>

<style lang="postcss">
  .filty-by-category {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.25rem;
  }
</style>
