<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import { app } from '$lib/stores/app';
	import '../global.css';
</script>

<Alert />
<main class:encode={$app.encoderMode} class:decode={$app.decoderMode}>
	<slot />
</main>
