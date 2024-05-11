<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 2048 2048" {strokeWidth} {padding} {title}>
	<path d="m1699 249l-775 775l775 775l-241 242L441 1024L1458 7z" />
</IconBase>
