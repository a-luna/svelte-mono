<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 24 24" {strokeWidth} {padding} {title}>
	<path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7zm4 12H8v-9h2zm6 0h-2v-9h2zm.618-15L15 2H9L7.382 4H3v2h18V4z" />
</IconBase>
