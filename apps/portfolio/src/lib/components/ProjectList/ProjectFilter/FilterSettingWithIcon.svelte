<script lang="ts">
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting, ProjectTypeDetails } from '$lib/types';

	export let value: FilterSetting;
	export let hovered = false;
	export let selected = false;
	let details: ProjectTypeDetails;
	let iconColor: string;

	$: details = getFilterSettingDetails(value) as unknown as ProjectTypeDetails;
	$: iconColor = details ? details.color : '--yellow-green';
	$: displayName = details.displayName;
	$: iconSize = details?.size ?? 16;
	$: marginRight = Math.max(5, 23 - iconSize);
	$: marginLeft = marginRight - 7;
	$: iconStyle = `height: ${iconSize}px; width: ${iconSize}px; margin: 0 ${marginRight}px 0 ${marginLeft}px;`;
</script>

<button class="filter-setting" class:selected class:hovered on:click>
	<div class="icon-wrapper {iconColor}" style={iconStyle}>
		<svelte:component this={details?.icon} />
	</div>
	<span class="filter-value">{displayName}</span>
</button>

<style lang="postcss">
	.filter-setting {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		background-color: inherit;
		font-weight: 400;
	}
	.hovered,
	.hovered.selected {
		color: var(--accent-color);
	}
	.selected {
		background-color: var(--dark-gray-shade1);
		color: var(--white-shade1);
	}
	.icon-wrapper {
		object-fit: contain;
		vertical-align: middle;
	}
	.filter-value {
		font-size: 0.9rem;
		letter-spacing: 0.6px;
		white-space: nowrap;
	}
</style>
