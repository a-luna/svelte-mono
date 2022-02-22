<script lang="ts">
	import InputResults from '$lib/components/Results/InputResults.svelte';
	import OutputResults from '$lib/components/Results/OutputResults.svelte';
</script>

<div class="settings-form">
	<InputResults />
	<OutputResults />
</div>

<style lang="postcss">
	.settings-form {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
</style>
