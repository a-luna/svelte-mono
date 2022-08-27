import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkAbbr from 'remark-abbr';
import remarkGithub from 'remark-github';
import preprocess from 'svelte-preprocess';

// mdsvex config
const mdsvexConfig = {
	extensions: ['.svelte.md', '.md', '.svx'],
	layout: {
		_: './src/mdsvexlayout.svelte' // default mdsvex layout
	},
	remarkPlugins: [
		[
			remarkGithub,
			{
				// Use your own repository
				repository: 'https://github.com/mvasigh/sveltekit-mdsvex-blog.git'
			}
		],
		remarkAbbr
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.html', '.svx', ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
			crawl: false,
			enabled: true,
			entries: ['*'],
			onError: 'continue'
		}
	}
};

export default config;
