import { REPO_NAMES, TECH_LIST } from "$lib/constants";
import type { GHRepo, JsonValue, LanguageOrTech, RepoName } from "$lib/types";
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

export const getAuthToken = (): { Authorization: string } => {
  if (process) {
    return { Authorization: `token ${process?.env?.GH_TOKEN ?? ""}` };
  }
};

export const getRandomHexString = (length: number): string =>
  Array.from({ length }, () => Math.floor(Math.random() * 16))
    .map((n) => Number(n).toString(16))
    .join("");

export function getRandomArrayItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export const getCSSPropValue = (
  element: HTMLElement,
  propName: string
): string => getComputedStyle(element).getPropertyValue(propName);

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

export const isValidLanguage = (language: string): language is LanguageOrTech =>
  TECH_LIST.includes(language as LanguageOrTech);

export const userRepos = createSessionStorageValue<GHRepo[]>("user-repos", []);
