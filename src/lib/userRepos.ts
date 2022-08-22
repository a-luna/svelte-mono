import { REPO_NAMES } from "$lib/constants";
import type { GHRepo, RepoName } from "$lib/types";
import { getAuthToken } from "$lib/util";

export async function listUserRepos() {
  const result = await fetch(
    "https://api.github.com/users/a-luna/repos?per_page=100",
    {
      headers: getAuthToken(),
    }
  );
  if (result.status > 400) {
    return {
      status: result.status,
      error: await result.text(),
    };
  }

  const userRepos: GHRepo[] = await result.json();
  const repoMap = {};
  userRepos.forEach((repo) => {
    if (REPO_NAMES.includes(repo.name as RepoName)) {
      repoMap[repo.name] = repo;
    }
  });
  return repoMap;
}
