<script lang="ts">
	import IconBase from '../IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 24 24" {strokeWidth} {padding} {title}>
	<path
		fill="currentColor"
		d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12c6.626 0 12-5.373 12-12c0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"
	/>
</IconBase>
