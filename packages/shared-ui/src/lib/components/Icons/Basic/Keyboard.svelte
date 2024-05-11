<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0.5px';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 24 24" {strokeWidth} {padding} {title}>
	<path
		fill="currentColor"
		d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 15H3V6h18zM9 8h2v2H9zM5 8h2v2H5zm3 8h8v1H8zm5-8h2v2h-2zm-4 4h2v2H9zm-4 0h2v2H5zm8 0h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"
	/>
</IconBase>
