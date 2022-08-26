import { listLocalContent } from "$lib/localContent";
import type { ContentItem } from "$lib/types";
import { json } from "@sveltejs/kit";

export async function GET() {
  const localList: ContentItem[] = await listLocalContent();
  return json(localList, {
    headers: {
      "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
    },
  });
}
