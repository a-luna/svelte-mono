<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 32 32" {strokeWidth} {padding} {title}>
	<path
		d="M3 6v8h5.635L12 19.908V27h8v-8h-6.217l-2.845-5H11v-3h10v3h8V6h-8v3H11V6zm2 2h4v4H5zm18 0h4v4h-4zm-8.582 13H18v4h-4v-3.762z"
	/>
</IconBase>
