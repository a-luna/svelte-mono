import type { ContentItem } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "../../../.svelte-kit/types/src/routes/blog/$types";

// export const prerender = true; // turned off so it refreshes quickly
export async function load({ fetch, setHeaders }): Promise<PageLoad> {
  const getGhContentResult = await fetch(`/api/listGithubContent.json`);
  if (getGhContentResult.status > 400) {
    throw error(getGhContentResult.status, await getGhContentResult.text());
  }

  const getLocalContentResult = await fetch(`/api/listLocalContent.json`);
  if (getLocalContentResult.status > 400) {
    throw error(
      getLocalContentResult.status,
      await getLocalContentResult.text()
    );
  }

  const ghItems: ContentItem[] = await getGhContentResult.json();
  const localItems: ContentItem[] = await getLocalContentResult.json();
  const items: ContentItem[] = [...ghItems, ...localItems].sort(
    (a, b) => b.date.valueOf() - a.date.valueOf()
  );
  setHeaders({
		'cache-control': 'public, max-age=60' // 1 minute
	})
  return { items };
}
