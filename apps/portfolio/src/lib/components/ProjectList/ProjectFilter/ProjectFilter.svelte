<script lang="ts">
	import FilterSettingNoIcon from '$lib/components/ProjectList/ProjectFilter/FilterSettingNoIcon.svelte';
	import FilterSettingWithIcon from '$lib/components/ProjectList/ProjectFilter/FilterSettingWithIcon.svelte';
	import { PROJECT_CATEGORIES, PROJECT_TYPES, TECH_LIST } from '$lib/constants';
	import { getFilterSettingDetails } from '$lib/filterSettings';
	import type { FilterSetting as FilterSettingType } from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import { BasicIconRenderer } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let id = `radio-${getRandomHexString(4)}`;
	export let title = '';
	export let filterGroup: 'icon' | 'no-icon';
	export let startOptionNumber = 1;
	export let noFilterSetting: FilterSettingType = '';
	export let filterSettings: FilterSettingType[];
	export let hoveredValue: FilterSettingType = '';
	export let selectedValue: FilterSettingType = '';
	export let expanded = false;
	let bgColors: { [k: string]: string } = {};
	const dispatch = createEventDispatcher();

	$: if (!title) expanded = true;
	$: settingsListStyle = title ? 'margin: 0 0 0 2rem;' : 'margin: 0;';
	$: bgColors = updateBgColors(hoveredValue, selectedValue);

	function getInactiveCategoryColors(): { [k: string]: string } {
		const colors: { [k: string]: string } = {};
		colors[noFilterSetting.toString()] = 'black';
		PROJECT_TYPES.forEach((type) => (colors[type.toString()] = 'var(--black-tint2)'));
		TECH_LIST.forEach((type) => (colors[type.toString()] = 'var(--black-tint2)'));
		PROJECT_CATEGORIES.forEach((setting) => (colors[setting.toString()] = 'black'));
		return colors;
	}

	function getActiveCategoryColors(): { [k: string]: string } {
		const colors: { [k: string]: string } = {};
		colors[noFilterSetting.toString()] = 'default';
		PROJECT_TYPES.forEach((type) => (colors[type.toString()] = 'var(--dark-gray-shade1)'));
		TECH_LIST.forEach((type) => (colors[type.toString()] = 'var(--dark-gray-shade1)'));
		PROJECT_CATEGORIES.forEach(
			(setting) => (colors[setting.toString()] = getFilterSettingDetails(setting).color?.toString() || ''),
		);
		return colors;
	}

	function updateBgColors(hovered: string, selected: string): { [k: string]: string } {
		const colors: { [k: string]: string } = {};
		const inactiveColors: { [k: string]: string } = getInactiveCategoryColors();
		const activeColors: { [k: string]: string } = getActiveCategoryColors();
		const activeFilterSettings = [hovered, selected];
		colors[noFilterSetting.toString()] =
			selected == noFilterSetting
				? activeColors[noFilterSetting.toString()] || ''
				: inactiveColors[noFilterSetting.toString()] || '';
		PROJECT_TYPES.forEach(
			(type) =>
				(colors[type.toString()] =
					selected == type ? activeColors[type.toString()] || '' : inactiveColors[type.toString()] || ''),
		);
		TECH_LIST.forEach(
			(type) =>
				(colors[type.toString()] =
					selected == type ? activeColors[type.toString()] || '' : inactiveColors[type.toString()] || ''),
		);
		PROJECT_CATEGORIES.forEach(
			(setting) =>
				(colors[setting.toString()] = activeFilterSettings.includes(setting)
					? activeColors[setting.toString()] || ''
					: inactiveColors[setting.toString()] || ''),
		);
		return colors;
	}

	export function clearFilter() {
		selectedValue = noFilterSetting;
	}

	function settingHasIcon(setting: FilterSettingType): boolean {
		const details = getFilterSettingDetails(setting);
		return details.hasIcon || false;
	}

	function getFilterLabelStyles(setting: FilterSettingType): string {
		const details = getFilterSettingDetails(setting);
		return settingHasIcon(setting)
			? 'border-width: 0;'
			: `border-color: var(--${details.color}); border-width: 1px; border-style: solid;`;
	}

	export function changeFilterSetting(value: FilterSettingType, broadcastChange = true) {
		selectedValue = value;
		if (broadcastChange) {
			dispatch('filterSettingChanged', value);
		}
	}
</script>

<div class="project-list-filter {filterGroup}">
	{#if title}
		<button class="filter-title" class:expanded on:click={() => (expanded = !expanded)}>
			<div class="title-icon" class:expanded>
				<BasicIconRenderer icon={'chevron'} />
			</div>
			{title}
		</button>
	{/if}
	{#if expanded}
		<div in:fade={{ delay: 500 }} out:fade={{ delay: 300 }} class="filter-settings" style={settingsListStyle}>
			{#if noFilterSetting}
				<input type="radio" bind:group={selectedValue} name={id} id="{id}-option-0" value={noFilterSetting} />
				<label
					for="{id}-option-0"
					style="background-color: var(--{bgColors[noFilterSetting.toString()]}); {getFilterLabelStyles(
						noFilterSetting,
					)}"
					class:hovered={hoveredValue === noFilterSetting}
					class:selected={selectedValue === noFilterSetting}
					class:expanded
					on:mouseenter={() => (hoveredValue = noFilterSetting)}
					on:mouseleave={() => (hoveredValue = '')}
				>
					{#if settingHasIcon(noFilterSetting)}
						<FilterSettingWithIcon
							hovered={hoveredValue === noFilterSetting}
							selected={selectedValue === noFilterSetting}
							value={noFilterSetting}
							on:click={() => changeFilterSetting(noFilterSetting)}
						/>
					{:else}
						<FilterSettingNoIcon
							hovered={hoveredValue === noFilterSetting}
							selected={selectedValue === noFilterSetting}
							value={noFilterSetting}
							on:click={() => changeFilterSetting(noFilterSetting)}
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
					style="background-color: var(--{bgColors[setting.toString()]}); {getFilterLabelStyles(setting)}"
					class:hovered={hoveredValue === setting}
					class:selected={selectedValue === setting}
					on:mouseenter={() => (hoveredValue = setting)}
					on:mouseleave={() => (hoveredValue = '')}
				>
					{#if settingHasIcon(setting)}
						<FilterSettingWithIcon
							hovered={hoveredValue === setting}
							selected={selectedValue === setting}
							value={setting}
							on:click={() => changeFilterSetting(setting)}
						/>
					{:else}
						<FilterSettingNoIcon
							hovered={hoveredValue === setting}
							selected={selectedValue === setting}
							value={setting}
							on:click={() => changeFilterSetting(setting)}
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
		color: var(--white);
		background-color: var(--black);
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
		gap: 0.75rem;
		flex: 1;
	}
	input[type='radio'] {
		opacity: 0;
		position: absolute;
		z-index: -1;
	}
	.filter-settings label {
		--default: var(--white-shade2);

		cursor: pointer;
		padding: 0.75rem 1rem;
		color: var(--default);
	}
	.filter-settings label:hover {
		color: var(--accent-color);
	}
	.filter-setings label.selected,
	.filter-setings label.hovered {
		background-color: var(--default-icon);
	}
</style>
