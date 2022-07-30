import { PROJECT_GROUPS, REPO_NAMES } from "$lib/constants";
import type { JsonValue, ProjectGroup, RepoName, UserRepos } from "$lib/types";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export function formatDateString(date) {
  return new Date(date).toDateString().slice(3);
}

export function createSessionStorageValue<T extends JsonValue>(
  key: string,
  defaultValue: T
): Writable<T> {
  let clientValue: T;
  if (typeof window !== "undefined") {
    clientValue = JSON.parse(window.sessionStorage.getItem(key));
    if (!clientValue)
      window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
  }
  const store = writable(clientValue || defaultValue);
  store.subscribe((value) => {
    if (typeof window !== "undefined" && value) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  });
  return store;
}

export const getAuthToken = (): { Authorization: string } => ({
  Authorization: `token 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`,
});

// export const getAuthToken = (): { Authorization: string } => {
//   if (process) {
//     return { Authorization: `token ${process?.env?.GH_TOKEN ?? ""}` };
//   } else {
//     return { Authorization: `token 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` };
//   }
// };

export const getRandomHexString = (length: number): string =>
  Array.from({ length }, () => Math.floor(Math.random() * 16))
    .map((n) => Number(n).toString(16))
    .join("");

export const getCSSPropValue = (
  element: HTMLElement,
  propName: string
): string => getComputedStyle(element).getPropertyValue(propName);

const getRepoProjectGroupMap = (): Map<RepoName, ProjectGroup> => {
  const map = new Map<RepoName, ProjectGroup>();
  map.set("vigorish", "python");
  map.set("vig-data", "python");
  map.set("vig-api", "python");
  map.set("fastapi-redis-cache", "python");
  map.set("flask-api-tutorial", "docs_guides");
  map.set("svelte-simple-tables-docs", "docs_guides");
  map.set("svelte-base64", "svelte");
  map.set("svelte-base64-ts", "svelte");
  map.set("svelte-simple-tables", "svelte");
  map.set("svelte-color-tools", "svelte");
  map.set("console-progress-bar", "dotnet");
  map.set("async-file-server", "dotnet");
  map.set("dotnetcore-crypto", "dotnet");
  map.set("packer-examples", "devops");
  return map;
};

export const repoToProjectGroup = getRepoProjectGroupMap();

// const getProjectGroupRepoMap = (): Map<ProjectGroup, RepoName[]> => {
//   const map = new Map<ProjectGroup, RepoName[]>();
//   map.set("python", ["fastapi-redis-cache", "vigorish", "vig-api", "vig-data"]);
//   map.set("docs_guides", ["flask-api-tutorial", "svelte-simple-tables-docs"]);
//   map.set("svelte", ["svelte-simple-tables", "svelte-base64", "svelte-base64-ts", "svelte-color-tools"]);
//   map.set("dotnet", [ "async-file-server", "console-progress-bar", "dotnetcore-crypto"]);
//   map.set("devops", ["packer-examples"]);
//   return map;
// };

export const projectGroupToRepoList: { [key: string]: RepoName[] } = {
  python: ["fastapi-redis-cache", "vigorish", "vig-api", "vig-data"],
  docs_guides: ["flask-api-tutorial", "svelte-simple-tables-docs"],
  svelte: [
    "svelte-simple-tables",
    "svelte-base64",
    "svelte-base64-ts",
    "svelte-color-tools",
  ],
  dotnet: ["async-file-server", "console-progress-bar", "dotnetcore-crypto"],
  devops: ["packer-examples"],
};

export const isUserRepo = (repoName: string): repoName is RepoName =>
  REPO_NAMES.includes(repoName as RepoName);

export const isProjectGroup = (group: string): group is ProjectGroup =>
  PROJECT_GROUPS.includes(group as ProjectGroup);

export const userRepos = createSessionStorageValue<UserRepos>("user-repos", {});
