<script lang="ts">
  import GithubRepo from "$components/GithubRepo.svelte";
  import type { ProjectGroup, RepoName } from "$lib/types";
  import { userRepos } from "$lib/util";

  export let group: ProjectGroup;
  export let repos: RepoName[] = [];
</script>

{#if repos.length}
  <div class="project-group flex flex-col flex-nowrap flex-grow">
    <h3 class="mb-8 text-xl font-bold">{group}</h3>
    <div
      class="project-list mb-8 flex flex-col flex-nowrap justify-start gap-4 md:gap-8"
    >
      {#each repos as repoName}
        {#if repoName in $userRepos}
          <GithubRepo {...$userRepos[repoName]} />
        {/if}
      {/each}
    </div>
  </div>
{/if}

<style lang="postcss">
  .project-group {
    z-index: 3;
    min-width: 315px;
    width: 85%;
    margin: 0 auto;
  }
  @media (min-width: 640px) {
    .project-group {
      max-width: 560px;
    }
  }
  @media (min-width: 768px) {
    .project-group {
      max-width: 575px;
    }
  }
</style>
