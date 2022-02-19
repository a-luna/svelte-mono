<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import { state } from '$lib/stores/state';
	import '../global.css';
</script>

<Alert />
<main class:encode={$state.mode === 'encode'} class:decode={$state.mode === 'decode'}>
	<slot />
</main>
