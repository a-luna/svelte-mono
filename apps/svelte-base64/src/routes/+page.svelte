<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import MainForm from '$lib/components/AlgorithmDemo/MainForm.svelte';
	import { initDemoAppContext } from '$lib/stores/context';

	const { demoUIState } = initDemoAppContext();

	// $: if (typeof window !== 'undefined') inspect({ iframe: false });
</script>

<svelte:head>
	<title>Base64 Algorithm Demo by Aaron Luna</title>
</svelte:head>

<Alert />
<main class:encode={$demoUIState.mode === 'encode'} class:decode={$demoUIState.mode === 'decode'}>
	<MainForm />
</main>

<style lang="postcss">
	main {
		margin: 0 auto;
	}
</style>
