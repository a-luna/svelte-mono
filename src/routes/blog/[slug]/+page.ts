// export const prerender = true; // you can uncomment to prerender as an optimization
export const hydrate = true;

import type { ContentItem } from "$lib/types";
import { error } from "@sveltejs/kit";
import "prism-themes/themes/prism-shades-of-purple.min.css";

export async function load({ params, fetch }) {
  const slug = params.slug;

  const getLocalContentResult = await fetch(`/api/listLocalContent.json`);
  if (getLocalContentResult.status > 400) {
    throw error(
      getLocalContentResult.status,
      await getLocalContentResult.text()
    );
  }

  const localItems: ContentItem[] = await getLocalContentResult.json();
  const localMatch = localItems.find((post) => post.slug === slug);
  if (localMatch) {
    return { json: localMatch, headers: { "Cache-Control": `max-age=60` } };
  }

  const getGhContentResult = await fetch(`/api/listGithubContent.json`);
  if (getGhContentResult.status > 400) {
    throw error(getGhContentResult.status, await getGhContentResult.text());
  }

  const ghItems: ContentItem[] = await getGhContentResult.json();
  const ghMatch = ghItems.find((post) => post.slug === slug);
  if (ghMatch) {
    return { json: ghMatch, headers: { "Cache-Control": `max-age=60` } };
  }
}
