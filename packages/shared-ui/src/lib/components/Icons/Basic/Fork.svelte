<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 15 15" {strokeWidth} {padding} {title}>
	<path
		d="M2.5 0A2.5 2.5 0 0 0 2 4.95v5.1a2.5 2.5 0 1 0 1 0V9h6.5A3.5 3.5 0 0 0 13 5.5v-.55a2.5 2.5 0 1 0-1 0v.55A2.5 2.5 0 0 1 9.5 8H3V4.95A2.5 2.5 0 0 0 2.5 0"
	/>
</IconBase>
