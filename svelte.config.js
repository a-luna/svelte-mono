import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkAbbr from "remark-abbr";
import remarkGithub from "remark-github";
import preprocess from "svelte-preprocess";

// mdsvex config
const mdsvexConfig = {
  extensions: [".svelte.md", ".md", ".svx"],
  layout: {
    _: "./src/mdsvexlayout.svelte", // default mdsvex layout
  },
  remarkPlugins: [
    [
      remarkGithub,
      {
        repository: "https://github.com/a-luna/portfolio-site.git",
      },
    ],
    remarkAbbr,
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
      },
    ],
  ],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".html", ".svx", ".md"],
  preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
      crawl: false,
      enabled: true,
      entries: ["*"],
      onError: "continue",
    },
  },
};

export default config;
