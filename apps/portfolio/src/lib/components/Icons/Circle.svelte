<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let fill: string = 'currentColor';
	export let title: string = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 16 16" {fill} {strokeWidth} {padding} {title}>
	<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" />
</IconBase>
