<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 20 20" {strokeWidth} {padding} {title}>
	<path d="M9 3.828L2.929 9.899L1.515 8.485L10 0l.707.707l7.778 7.778l-1.414 1.414L11 3.828V20H9z" />
</IconBase>
