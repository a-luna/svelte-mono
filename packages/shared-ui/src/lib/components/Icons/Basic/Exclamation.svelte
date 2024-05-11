<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 16 16" {strokeWidth} {padding} {title}>
	<path fill="currentColor" d="M6 0h4v4l-1 7H7L6 4zm4 14a2 2 0 1 1-3.999.001A2 2 0 0 1 10 14" />
</IconBase>
