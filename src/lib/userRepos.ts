import type { GHRepo } from "$lib/types";
import { getAuthToken } from "$lib/util";

export async function listUserRepos(ghToken: string): Promise<GHRepo[]> {
  const result = await fetch(
    "https://api.github.com/users/a-luna/repos?per_page=100",
    {
      headers: getAuthToken(ghToken),
    }
  );
  if (result.status > 400) {
    throw new Error(result.status + " " + result.statusText);
  }

  const userRepos: GHRepo[] = await result.json();
  return userRepos;
}
