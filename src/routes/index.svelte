<script lang="ts">
	import ColorPalette from '$lib/components/ColorPalette/ColorPalette.svelte';
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import type { ColorPickerState } from '$lib/types';
	import type { Writable } from 'svelte/store';

	let colorPickerState: Writable<ColorPickerState>;
</script>

<ColorPicker bind:state={colorPickerState} />
<ColorPalette />
