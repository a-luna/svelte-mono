<script lang="ts">
	import { state } from '$lib/state';
	import '../global.css';
</script>

<main class:encode={$state.mode === 'encode'} class:decode={$state.mode === 'decode'}>
	<slot />
</main>
