import { API_KEY } from "$env/static/private";
import { getGithubContent } from "$lib/ghContent";
import { getLocalContent } from "$lib/localContent";
import type { ContentItem } from "$lib/types";

export async function GET({ params }) {
  const { slug } = params;
  let data: ContentItem;
  try {
    const getLocalContentResult = await fetch(`/api/listLocalContent.json`);
    if (getLocalContentResult.status > 400) {
      return new Response(await getLocalContentResult.text(), {
        status: getLocalContentResult.status,
      });
    }

    const localItems: ContentItem[] = await getLocalContentResult.json();
    const match = localItems.find((post) => post.slug === slug);
    if (match) {
      data = await getLocalContent(slug);
      return new Response(JSON.stringify(data), {
        headers: {
          "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
        },
      });
    }

    const getGhContentResult = await fetch(`/api/listGithubContent.json`);
    if (getGhContentResult.status > 400) {
      return new Response(await getGhContentResult.text(), {
        status: getGhContentResult.status,
      });
    }

    const ghItems: ContentItem[] = await getGhContentResult.json();
    if (ghItems.find((post) => post.slug === slug)) {
      data = await getGithubContent(slug, API_KEY);
      return new Response(JSON.stringify(data), {
        headers: {
          "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
        },
      });
    }
  } catch (err) {
    return new Response(err.message, { status: 404 });
  }
}
