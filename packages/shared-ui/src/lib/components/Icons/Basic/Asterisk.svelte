<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 2048 2048" {strokeWidth} {padding} {title}>
	<path
		d="m1280 1024l695 401l-128 222l-695-401v802H896v-802l-695 401l-128-222l695-401L73 623l128-222l695 401V0h256v802l695-401l128 222z"
	/>
</IconBase>
