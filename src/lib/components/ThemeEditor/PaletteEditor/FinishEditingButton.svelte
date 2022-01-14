<script lang="ts">
	import Check from '$lib/components/Icons/Check.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import type { ComponentColor } from '$lib/types';

	export let color: ComponentColor;
</script>

<ThemeButton {color} tooltip={'Save Changes'} alignSelf={'center'} on:click>
	<svelte:fragment slot="icon">
		<Check />
	</svelte:fragment>
	<svelte:fragment slot="label">Finished Editing</svelte:fragment>
</ThemeButton>
