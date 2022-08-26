import { API_KEY } from "$env/static/private";
import { listGithubContent } from "$lib/ghContent";
import type { ContentItem } from "$lib/types";
import { json } from "@sveltejs/kit";

export async function GET() {
  const ghList: ContentItem[] = await listGithubContent(API_KEY);
  return json(ghList, {
    headers: {
      "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
    },
  });
}
