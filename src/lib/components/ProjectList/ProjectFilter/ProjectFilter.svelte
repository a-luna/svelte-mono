<script lang="ts">
	import Chevron from '$lib/components/Icons/Chevron.svelte';
	import FilterSetting from '$lib/components/ProjectList/ProjectFilter/FilterSetting.svelte';
	import FilterSettingWithIcon from '$lib/components/ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting as FilterSettingType } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let id = `radio-${getRandomHexString(4)}`;
	export let title: string = null;
	export let startOptionNumber = 1;
	export let noFilterSetting: FilterSettingType = null;
	export let filterSettings: FilterSettingType[];
	export let hoveredValue: FilterSettingType = null;
	export let selectedValue: FilterSettingType = null;
	export let expanded = false;
	const dispatch = createEventDispatcher();

	$: console.log({ selectedValue });
	$: if (!title) expanded = true;
	$: settingsListStyle = title ? 'margin: 0 0 0 2rem;' : 'margin: 0;';

	export function clearFilter() {
		selectedValue = noFilterSetting;
	}

	function settingHasIcon(setting: FilterSettingType): boolean {
		const details = getFilterSettingDetails(setting);
		return details.hasIcon;
	}

	function getFilterSettingColor(setting: FilterSettingType): string {
		const details = getFilterSettingDetails(setting);
		return details.color;
	}

	function getLabelStyles(
		current: FilterSettingType,
		hoveredValue: FilterSettingType,
		value: FilterSettingType
	) {
		let [bgColor, borderStyle] = ['', ''];
		if (settingHasIcon(value)) {
			bgColor = current !== value ? 'var(--black-tint1)' : 'var(--dark-gray-shade1)';
		} else {
			const color = getFilterSettingColor(value);
			bgColor =
				current === value
					? `var(--${color}-icon)`
					: hoveredValue === value
					? 'var(--dark-gray-shade1)'
					: 'var(--page-bg-color)';
			borderStyle = ` border: 1px solid var(--${color}-icon)`;
		}
		return `background-color: ${bgColor};${borderStyle}`;
	}

	export function changeFilterSetting(value: FilterSettingType, broadcastChange = true) {
		selectedValue = value;
		if (broadcastChange) {
			dispatch('filterSettingChanged', value);
		}
	}
</script>

<div class="project-list-filter">
	{#if title}
		<div class="filter-title" class:expanded on:click={() => (expanded = !expanded)}>
			<div class="title-icon" class:expanded>
				<Chevron />
			</div>
			{title}
		</div>
	{/if}
	{#if expanded}
		<div
			in:fade={{ delay: 200 }}
			out:fade={{ delay: 300 }}
			class="filter-settings"
			style={settingsListStyle}
		>
			{#if noFilterSetting}
				<input
					type="radio"
					bind:group={selectedValue}
					name={id}
					id="{id}-option-0"
					value={noFilterSetting}
				/>
				<label
					for="{id}-option-0"
					class:hovered={hoveredValue === noFilterSetting}
					class:selected={selectedValue === noFilterSetting}
					style={getLabelStyles(selectedValue, hoveredValue, noFilterSetting)}
					class:expanded
					on:click={() => changeFilterSetting(noFilterSetting)}
					on:mouseenter={() => (hoveredValue = noFilterSetting)}
					on:mouseleave={() => (hoveredValue = null)}
				>
					{#if settingHasIcon(noFilterSetting)}
						<FilterSettingWithIcon
							hovered={hoveredValue === noFilterSetting}
							selected={selectedValue === noFilterSetting}
							value={noFilterSetting}
						/>
					{:else}
						<FilterSetting
							hovered={hoveredValue === noFilterSetting}
							selected={selectedValue === noFilterSetting}
							value={noFilterSetting}
						/>
					{/if}
				</label>
			{/if}
			{#each filterSettings as setting, i}
				<input
					type="radio"
					bind:group={selectedValue}
					name={id}
					id="{id}-option-{i + startOptionNumber}"
					value={setting}
				/>
				<label
					for="{id}-option-{i + startOptionNumber}"
					class:hovered={hoveredValue === setting}
					class:selected={selectedValue === setting}
					style={getLabelStyles(selectedValue, hoveredValue, setting)}
					on:click={() => changeFilterSetting(setting)}
					on:mouseenter={() => (hoveredValue = setting)}
					on:mouseleave={() => (hoveredValue = null)}
				>
					{#if settingHasIcon(setting)}
						<FilterSettingWithIcon
							hovered={hoveredValue === setting}
							selected={selectedValue === setting}
							value={setting}
						/>
					{:else}
						<FilterSetting
							hovered={hoveredValue === setting}
							selected={selectedValue === setting}
							value={setting}
						/>
					{/if}
				</label>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.project-list-filter {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		z-index: 3;
	}
	.filter-title {
		flex: 0;
		display: flex;
		gap: 1rem;
		align-items: center;
		color: var(--accent-color);
		font-size: 1.2rem;
		cursor: pointer;
		width: 100%;
		white-space: nowrap;
	}
	.title-icon {
		width: 12px;
		transition: transform 0.3s ease-in;
	}
	.title-icon.expanded {
		transform: rotate(90deg);
	}
	.filter-settings {
		display: flex;
		flex-flow: row wrap;
		gap: 0.5rem;
		flex: 1;
	}
	input[type='radio'] {
		opacity: 0;
		position: absolute;
		z-index: -1;
	}
	.filter-settings label {
		cursor: pointer;
		padding: 0.75rem 1rem;
		color: var(--white-shade2);
	}
	.filter-settings label:hover {
		color: var(--accent-color);
	}
</style>
