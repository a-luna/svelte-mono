<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article
	class="mx-auto mb-16 mt-8 flex w-full max-w-2xl flex-col items-start justify-center px-4 sm:px-8"
>
	<div class="project-readme prose prose-invert">
		{@html data.readme}
	</div>
</article>

<style lang="postcss">
</style>
