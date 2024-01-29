<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import MainForm from '$lib/components/MainForm.svelte';
	import { initSimpleAppContext } from '$lib/stores/context';
	import type { AppStore } from '$lib/types';
	import type { Readable } from 'svelte/store';

	let app: Readable<AppStore>;
	({ app } = initSimpleAppContext());
</script>

<svelte:head>
	<title>Base64 Visualizer</title>
</svelte:head>

<Alert />
<main class:encode={$app.encoderMode} class:decode={$app.decoderMode}>
	<MainForm />
</main>

<style lang="postcss">
	main {
		margin: 0 auto;
	}
</style>
