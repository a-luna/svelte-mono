import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: path.resolve("src/lib"),
      $components: path.resolve("src/lib/components"),
      $util: path.resolve("src/lib/util"),
    },
  },
  optimizeDeps: {
    exclude: ["node-fetch", "mdsvex", "highlight.js", "highlight.js/lib/core"],
  },
};

export default config;
