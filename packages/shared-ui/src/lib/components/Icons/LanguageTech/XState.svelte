<script lang="ts">
	import IconBase from '../IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 24 24" {strokeWidth} {padding} {title}>
	<path
		fill="currentColor"
		d="M15.891 0h6.023l-6.085 10.563A10.653 10.653 0 0 1 15.891 0zm6.055 23.999L8.078.001H2.055l6.919 12.015L2.055 24h6.023L12 17.236L15.892 24z"
	/>
</IconBase>
