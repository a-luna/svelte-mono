<script lang="ts">
	export let rotateDegrees = 0;

	$: transform = rotateDegrees !== 0 ? `transform: rotate(${rotateDegrees}deg)` : '';
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" style={transform}>
	<path d="m1024 441l1017 1017l-242 241l-775-775l-775 775L7 1458z" />
</svg>

<style>
	svg {
		stroke: currentcolor;
		fill: currentcolor;
		stroke-width: 0;
		width: 100%;
		height: auto;
		max-height: 100%;
	}
</style>
