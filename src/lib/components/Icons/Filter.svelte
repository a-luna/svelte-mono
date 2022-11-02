<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let fill: string = 'currentColor';
	export let width: string = '';
	export let height: string = '';
	export let title: string = '';
	export let strokeWidth = '0.5px';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 16 16" {width} {height} {fill} {strokeWidth} {padding} {title}>
	<path fill="currentColor" d="M6 12v-1h4v1H6zM4 7h8v1H4V7zm10-4v1H2V3h12z" />
</IconBase>
