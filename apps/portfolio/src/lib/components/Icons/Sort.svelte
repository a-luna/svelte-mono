<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let fill: string = 'currentColor';
	export let title: string = '';
	export let strokeWidth = '0.5px';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 24 24" {fill} {strokeWidth} {padding} {title}>
	<path fill="currentColor" d="M7 20h2V8h3L8 4L4 8h3zm13-4h-3V4h-2v12h-3l4 4z" />
</IconBase>
