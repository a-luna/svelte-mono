<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="project-readme">
	{@html data.readme}
</div>

<style lang="postcss">
</style>
