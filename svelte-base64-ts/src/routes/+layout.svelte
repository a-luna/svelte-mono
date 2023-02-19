<script lang="ts">
	import { dev } from '$app/environment';
	import '../global.css';
</script>

<svelte:head>
	{#if !dev}
		<script
			async
			defer
			data-website-id="cb918dba-fc25-40be-ac0e-b54818fce446"
			src="https://aluna-umami.netlify.app/umami.js"
		></script>
	{/if}
</svelte:head>

<slot />
