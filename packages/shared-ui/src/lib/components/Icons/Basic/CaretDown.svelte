<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 2048 2048" {strokeWidth} {padding} {title}>
	<path d="M0 512h2048L1024 1536z" />
</IconBase>
