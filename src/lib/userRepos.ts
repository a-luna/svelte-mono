import type { GHRepo } from "$lib/types";
import { getAuthToken, isUserRepo } from "$lib/util";

export async function listUserRepos() {
  const result = await fetch("https://api.github.com/users/a-luna/repos", {
    headers: getAuthToken(),
  });
  if (result.status > 400) {
    return {
      status: result.status,
      error: await result.text(),
    };
  }

  const userRepos: GHRepo[] = await result.json();
  const repoMap = {};
  userRepos.forEach((repo) => {
    if (isUserRepo(repo.name)) {
      repoMap[repo.name] = repo;
    }
  });
  return repoMap;
}
