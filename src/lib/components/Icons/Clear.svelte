<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let fill: string = 'currentColor';
	export let title: string = '';
	export let strokeWidth = '1px';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 32 32" {fill} {strokeWidth} {padding} {title}>
	<path
		fill="currentColor"
		d="M7.219 5.781L5.78 7.22L14.563 16L5.78 24.781l1.44 1.439L16 17.437l8.781 8.782l1.438-1.438L17.437 16l8.782-8.781L24.78 5.78L16 14.563z"
	/>
</IconBase>
