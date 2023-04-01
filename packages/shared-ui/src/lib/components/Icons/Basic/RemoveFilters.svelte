<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 24 24" {strokeWidth} {padding} {title}>
	<path
		d="M8.414.414L7 1.828L8.172 3H4c-.553 0-1 .442-1 .99v2.556c0 .525.211 1.029.586 1.4L9.707 14a.984.984 0 0 1 .293.7v6.31c0 .735.782 1.213 1.447.884l2-.989A.988.988 0 0 0 14 20.02V14.7c0-.262.105-.514.293-.7l2.453-2.426l2.982 2.982l1.414-1.414L8.414.414Zm12 7.532l-.824.815L13.828 3H20c.553 0 1 .442 1 .99v2.556a1.97 1.97 0 0 1-.586 1.4Z"
	/>
</IconBase>
