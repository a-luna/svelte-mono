import { API_KEY } from "$env/static/private";
import type { GHRepo } from "$lib/types";
import { listUserRepos } from "$lib/userRepos";
import { userRepos } from "$lib/util";
import { json } from "@sveltejs/kit";
import { get } from "svelte/store";

export async function GET() {
  let allRepos: GHRepo[];
  const storedValue = get(userRepos);
  if (!storedValue || !storedValue.length) {
    allRepos = await listUserRepos(API_KEY);
    userRepos.set(allRepos);
  } else {
    allRepos = storedValue;
  }

  return json(allRepos, {
    headers: {
      "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
    },
  });
}
