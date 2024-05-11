<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 64 64" {strokeWidth} {padding} {title}>
	<path d="M2 26h60v12H2z" />
</IconBase>
