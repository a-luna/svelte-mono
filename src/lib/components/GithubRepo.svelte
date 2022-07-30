<script lang="ts">
  import Github from "$components/Icons/Github.svelte";
  import SvgIcon from "$components/Icons/SvgIcon.svelte";
  import { getCSSPropValue, getRandomHexString } from "$lib/util";

  export let name: string;
  export let description: string;
  export let language: string;
  export let stargazers_count: number = 0;
  export let forks: number = 0;
  let langColor: string = "hsl(0 0% 68%)";
  let pageWidth: number;
  const id: string = getRandomHexString(4);

  $: repoUrl = `https://github.com/a-luna/${name}`;
  $: stargazersUrl = `https://github.com/a-luna/${name}/stargazers`;
  $: forksUrl = `https://github.com/a-luna/${name}/network/members`;
  $: if (typeof window !== "undefined" && language) {
    const lang = language === "C#" ? "csharp" : language.toLowerCase().trim();
    const hue = getCSSPropValue(document.body, `--${lang}-color-h`);
    langColor = `hsl(${hue.trim()} 89% 47%)`;
  }
  $: defaultSettings = {
    ghLogoWidth: "16px",
    starWidth: "12px",
    forkWidth: "8px",
  };
  $: desktopSettings = {
    ghLogoWidth: "18px",
    starWidth: "13px",
    forkWidth: "9px",
  };
  $: settings = pageWidth >= 768 ? desktopSettings : defaultSettings;
  $: ({ ghLogoWidth, starWidth, forkWidth } = settings);
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="wrapper gradient flex flex-col rounded-md">
  <div
    class="github-repo px-4 pb-4 pt-2.5 flex flex-col flex-grow rounded-t-none rounded-b-md shadow"
  >
    <div
      class="repo-top flex justify-between items-center leading-snug tracking-wide"
    >
      <a class="repo-gh" href={repoUrl} target="_blank">
        {name}
      </a>
      <a class="repo-gh icon" href={repoUrl} target="_blank">
        <Github />
      </a>
    </div>
    <div
      class="repo-middle mt-3 flex flex-col justify-between flex-grow text-sm md:text-base leading-6"
    >
      <div class="repo-description leading-5">{description}</div>
    </div>
    <div
      class="repo-bottom mt-3 flex justify-between items-center text-xs md:text-sm leading-none"
    >
      <div class="repo-language flex justify-between items-center">
        <div class="circle" style="background-color: {langColor};" />
        <div class="language-name inline-block ml-2">
          {language}
        </div>
      </div>
      <div class="repo-stats-wrapper flex">
        <a class="repo-gh" href={stargazersUrl} target="_blank">
          <div class="repo-stats mx-1 flex gap-1.5">
            <SvgIcon
              icon="star"
              width={starWidth}
              margin={"auto 0"}
            />{stargazers_count}
          </div>
        </a>
        <a class="repo-gh" href={forksUrl} target="_blank">
          <div class="repo-stats mx-1 flex gap-1.5">
            <SvgIcon icon="fork" width={forkWidth} margin={"auto 0"} />{forks}
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    flex: 1;
  }
  .github-repo {
    color: var(--white-shade3);
  }
  .repo-top a.repo-gh {
    color: var(--g-color-1);
  }
  .icon {
    width: 18px;
  }
  .repo-bottom a.repo-gh {
    color: var(--white-shade3);
  }
  .repo-top {
    font-size: 1.1rem;
  }
  .repo-description {
    font-size: 0.8rem;
  }
  .circle {
    border-radius: 50%;
    width: 11px;
    height: 11px;
  }
  @media (min-width: 768px) {
    .circle {
      border-radius: 50%;
      width: 11.5px;
      height: 11.5px;
    }
  }
</style>
