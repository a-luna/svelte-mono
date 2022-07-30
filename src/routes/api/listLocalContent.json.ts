import { listLocalContent } from "$lib/localContent";
import type { ContentItem } from "$lib/types";

export async function GET() {
  const localList: ContentItem[] = await listLocalContent();
  return {
    body: localList,
    // .map(item => {
    // 	delete item.content // so that you dont send so much over the wire
    // 	// this is an ok strategy until you get to thousands of content,
    // 	// in that case you should probably redo the list/item data fetch strategy
    // 	return item
    // })
    headers: {
      "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
    },
  };
}
