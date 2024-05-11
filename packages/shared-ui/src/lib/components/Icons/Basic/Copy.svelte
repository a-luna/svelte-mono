<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 512 512" {strokeWidth} {padding} {title}>
	<path d="M408 432h-32v32H112V136h32v-32H80v392h328z" />
	<path d="M176 16v384h320V153.373L358.627 16Zm288 352H208V48h104v152h152Zm0-200H344V48h1.372L464 166.627Z" />
</IconBase>
