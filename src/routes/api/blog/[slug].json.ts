import { getGithubContent } from "$lib/ghContent";
import { getLocalContent } from "$lib/localContent";
import type { ContentItem } from "$lib/types";

export async function GET({ params }) {
  const { slug } = params;
  let data: ContentItem;
  try {
    const getLocalContentResult = await fetch(`/api/listLocalContent.json`);
    if (getLocalContentResult.status > 400) {
      return {
        status: getLocalContentResult.status,
        body: await getLocalContentResult.text(),
      };
    }

    const localItems: ContentItem[] = await getLocalContentResult.json();
    const match = localItems.find((post) => post.slug === slug);
    if (match) {
      data = await getLocalContent(slug);
      return {
        body: JSON.stringify(data),
        headers: {
          "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
        },
      };
    }

    const getGhContentResult = await fetch(`/api/listGithubContent.json`);
    if (getGhContentResult.status > 400) {
      return {
        status: getGhContentResult.status,
        body: await getGhContentResult.text(),
      };
    }

    const ghItems: ContentItem[] = await getGhContentResult.json();
    if (ghItems.find((post) => post.slug === slug)) {
      data = await getGithubContent(slug);
      return {
        body: JSON.stringify(data),
        headers: {
          "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
        },
      };
    }
  } catch (err) {
    return {
      status: 404,
      body: err.message,
    };
  }
}
