<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 2048 2048" {strokeWidth} {padding} {title}>
	<path
		d="m1461 1024l581 581l-181 181l-762-762l762-762l181 181zm-443-581l-581 581l581 581l-181 181l-762-762l762-762z"
	/>
</IconBase>
