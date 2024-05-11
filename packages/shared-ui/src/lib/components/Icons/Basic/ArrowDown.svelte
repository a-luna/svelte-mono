<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 20 20" {strokeWidth} {padding} {title}>
	<path d="m9 16.172l-6.071-6.071l-1.414 1.414L10 20l.707-.707l7.778-7.778l-1.414-1.414L11 16.172V0H9z" />
</IconBase>
