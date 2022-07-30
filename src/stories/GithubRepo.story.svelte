<script context="module" lang="ts">
  import { Canvas, Frame } from "$components/bookit";
  import GithubRepo from "$components/GithubRepo.svelte";
  import { repo } from "./_data";

  export const title = "GithubRepo";
  export const parent = "Components";
</script>

<Canvas>
  <Frame
    title="GithubRepo Component"
    let:props
    controls={{
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks: repo.forks,
    }}
  >
    <GithubRepo {...props} />
  </Frame>
</Canvas>
