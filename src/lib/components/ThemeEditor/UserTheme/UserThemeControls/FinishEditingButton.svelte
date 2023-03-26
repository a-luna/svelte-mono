<script lang="ts">
	import Check from '$lib/components/Icons/Check.svelte';
	import ThemeButton from '$lib/components/Shared/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
</script>

<ThemeButton {color} tooltip={'Save Changes'} alignSelf={'center'} iconWidth={'14px'} on:click>
	<svelte:fragment slot="icon">
		<Check />
	</svelte:fragment>
</ThemeButton>
