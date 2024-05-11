<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 2048 2048" {strokeWidth} {padding} {title}>
	<path d="m187 262l762 762l-762 762L6 1605l581-581L6 443zm1786 762l-762 762l-181-181l581-581l-581-581l181-181z" />
</IconBase>
