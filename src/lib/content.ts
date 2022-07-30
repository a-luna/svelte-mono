import { listGithubContent } from "$lib/ghContent";
import { listLocalContent } from "$lib/localContent";
import type { ContentItem } from "$lib/types";

export async function getContent(slug: string): Promise<ContentItem> {
  const localItems = await listLocalContent();
  const localMatch = localItems.find((post) => post.slug === slug);
  if (localMatch) {
    return localMatch;
  }
  const ghItems = await listGithubContent();
  const ghMatch = ghItems.find((post) => post.slug === slug);
  if (ghMatch) {
    return ghMatch;
  }
}
