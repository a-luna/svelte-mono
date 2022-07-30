import { SITE_URL } from "$lib/siteConfig";
import type { ContentItem, GHMetadata } from "$lib/types";
import { promises as fs } from "fs";
import grayMatter from "gray-matter";
import { basename, resolve } from "path";
import rehypeFormat from "rehype-format";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { read } from "to-vfile";
import { unified } from "unified";
import { reporter } from "vfile-reporter";

const slugToTitle = (slug: string): string =>
  slug
    .split("-")
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(" ");

const getGHMetaDataNullObject = (date: Date): GHMetadata => ({
  issueUrl: "",
  commentsUrl: "",
  title: "",
  created_at: date,
  updated_at: date,
  reactions: {
    total_count: 0,
    "+1": 0,
    "-1": 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
});

// use this if you want your content in a local '/content' folder rather than github issues
export async function listLocalContent(): Promise<ContentItem[]> {
  let localContent: ContentItem[] = [];
  for await (const _path of getFiles("content/post")) {
    const src = await fs.readFile(_path, "utf8");
    const { data, content } = grayMatter(src);
    const slug = data.slug ?? basename(_path, ".md");
    const date = data.date ? new Date(data.date) : null;
    const image = data.resources.find(
      (res: { name: string; src: string }) => res.name === "cover"
    )?.src;
    localContent.push({
      content,
      type: "blog",
      frontmatter: data.data,
      subtitle: "",
      tags: data.categories,
      image,
      canonical: `${SITE_URL}/${slug}`,
      category: data.categories.at(0),
      slug,
      date,
      title: data.title ?? slugToTitle(slug),
      description: data.summary ?? "",
      ghMetadata: getGHMetaDataNullObject(date),
    });
  }
  return localContent;
}

async function* getFiles(dir: string) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

export async function getLocalContent(slug: string): Promise<ContentItem> {
  const _path = resolve("content/post", slug + ".md");
  const src = await fs.readFile(_path, "utf8");
  const { data } = grayMatter(src);
  const content = await parseMarkdown(_path);
  const date = data.date ? new Date(data.date) : null;
  const image = data.resources.find(
    (res: { name: string; src: string }) => res.name === "cover"
  )?.src;
  return {
    content,
    type: "blog",
    frontmatter: data,
    subtitle: "",
    tags: data.categories,
    image,
    canonical: `${SITE_URL}/${slug}`,
    category: data.categories.at(0),
    slug,
    date,
    title: data.title ?? slugToTitle(slug),
    description: data.summary ?? "",
    ghMetadata: getGHMetaDataNullObject(date),
  };
}

export async function parseMarkdown(filePath) {
  // const result = await remark().use(remarkHtml).process(markdown);
  var post_vfile = await read(filePath);
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(post_vfile)
    .catch((err) => {
      console.error(reporter(post_vfile));
      throw err;
    });
  file.extname = ".html";
  return String(file);
}
