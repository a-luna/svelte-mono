<script lang="ts">
	import IconBase from '$lib/components/Icons/IconBase.svelte';

	export let title = '';
	export let strokeWidth = '0';
	export let padding = '0';
</script>

<IconBase viewBox="0 0 512 512" {strokeWidth} {padding} {title}>
	<g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g>
	<g>
		<g>
			<polygon
				points="466.29,347.428 466.295,237.714 274.286,237.714 274.286,164.571 320,164.571 320,18.286 192,18.286 192,164.571 237.715,164.571 237.715,237.714 45.733,237.714 45.724,347.428 0,347.428 0,493.714 128,493.714 128,347.428 82.286,347.428 82.286,274.286 237.715,274.286 237.715,347.428 192,347.428 192,493.714 320,493.714 320,347.428 274.286,347.428 274.286,274.286 429.714,274.286 429.714,347.428 384,347.428 384,493.714 512,493.714 512,347.428 "
			></polygon>
		</g>
	</g>
</IconBase>
