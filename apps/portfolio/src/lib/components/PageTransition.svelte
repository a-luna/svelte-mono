<script lang="ts">
	import { url } from '$lib/stores';
	import { fade } from 'svelte/transition';
</script>

{#key url}
	<div class="transition" in:fade={{ duration: 400 }} out:fade={{ duration: 250 }}>
		<slot />
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
