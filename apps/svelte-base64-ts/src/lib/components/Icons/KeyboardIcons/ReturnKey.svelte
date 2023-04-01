<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
</script>

<kbd title="Return Key"><BasicIconRenderer icon={'returnright'} /><span>Return</span></kbd>

<style lang="postcss">
	kbd {
		display: inline-flex;
		flex-flow: row nowrap;
		gap: 2px;
		height: 11px;
		width: 55px;
		line-height: 11px;
		margin: auto;
		padding: 0 2px;
	}
	@media screen and (min-width: 764px) {
		kbd {
			height: 13px;
			line-height: 13px;
		}
	}
</style>
