<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 24 24" {strokeWidth} {padding} {title}>
	<path
		fill="currentColor"
		d="M3 13v-2h2v2Zm4 8v-2h2v2Zm4-16V3h2v2Zm8 0V3q.825 0 1.413.587Q21 4.175 21 5ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19h2Zm-2-4v-2h2v2Zm8 4v-2h2v2Zm8-8v-2h2v2Zm0-4V7h2v2Zm-4-4V3h2v2ZM9 3v2H7.825L7 4.175V3Zm12 12v2h-1.175L19 16.175V15ZM9 15h3.175L9 11.825Zm6 6v-2h2v2Zm2-6.825l-2-2V9h-3.175l-2-2H16q.425 0 .712.287Q17 7.575 17 8ZM3 9V7h2v2Zm16.075 12.9l-4.9-4.9H8q-.425 0-.713-.288Q7 16.425 7 16V9.825l-4.9-4.9q-.275-.275-.275-.688q0-.412.275-.712q.3-.3.712-.3q.413 0 .713.3L20.5 20.5q.3.3.288.7q-.013.4-.313.7q-.3.275-.7.288q-.4.012-.7-.288Z"
	/>
</IconBase>
