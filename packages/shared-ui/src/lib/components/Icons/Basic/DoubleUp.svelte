<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 2048 2048" {strokeWidth} {padding} {title}>
	<path
		d="m1024 1099l762 762l-181 181l-581-581l-581 581l-181-181zm-581-81L262 837l762-762l762 762l-181 181l-581-581z"
	/>
</IconBase>
