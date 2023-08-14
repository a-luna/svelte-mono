<script lang="ts">
	import { fade } from 'svelte/transition';

	export let url: string;
	export let fadeInDelay: number;
</script>

{#key url}
	<div class="transition" in:fade={{ delay: 200, duration: 500 }} out:fade={{ duration: 200 }}>
		<slot />
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
