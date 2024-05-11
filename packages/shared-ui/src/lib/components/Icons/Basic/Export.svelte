<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 24 24" {strokeWidth} {padding} {title}>
	<g
		><path d="m16.95 5.968l-1.414 1.414L13 4.846v12.196h-2V4.847L8.465 7.382L7.05 5.968L12 1.018z" /><path
			d="M5 20.982v-10h4v-2H3v14h18v-14h-6v2h4v10z"
		/></g
	>
</IconBase>
