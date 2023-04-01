<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 20 20" {strokeWidth} {padding} {title}>
	<path
		fill="currentColor"
		fill-rule="evenodd"
		d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm3.293 1.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L7.586 10L5.293 7.707a1 1 0 0 1 0-1.414ZM11 12a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Z"
		clip-rule="evenodd"
	/>
</IconBase>
