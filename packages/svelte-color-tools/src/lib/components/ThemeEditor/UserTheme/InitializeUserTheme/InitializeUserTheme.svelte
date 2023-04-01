<script lang="ts">
	import LoadUserThemeButton from '$lib/components/ThemeEditor/UserTheme/InitializeUserTheme/LoadUserThemeButton.svelte';
	import NewUserThemeButton from '$lib/components/ThemeEditor/UserTheme/InitializeUserTheme/NewUserThemeButton.svelte';
	import { COMPONENT_COLORS } from '$lib/constants';
	import type { ComponentColor } from '$lib/types';
	import { getRandomArrayItem } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	$: componentColor = getRandomArrayItem<ComponentColor>(COMPONENT_COLORS);
	$: style = `color: var(--${componentColor}-fg-color); border: 1px solid var(--${componentColor}-fg-color); background-color: var(--${componentColor}-hover-bg-color);`;
</script>

<div class="init-theme" {style}>
	<div class="intro-text">
		<p class="headline">Welcome to the Component Theme Editor!</p>
		<p>Would you like to create a new theme or load an existing theme?</p>
	</div>
	<div class="button-wrapper">
		<NewUserThemeButton
			color={componentColor}
			compact={false}
			width={'113px'}
			on:click={() => dispatch('newUserTheme')}
		/>
		<LoadUserThemeButton
			color={componentColor}
			compact={false}
			width={'113px'}
			on:click={() => dispatch('importUserTheme')}
		/>
	</div>
</div>

<style lang="postcss">
	.init-theme {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		width: 371px;
		height: 169px;
		padding: 1rem;
		border-radius: 6px;
	}
	.intro-text {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.intro-text p {
		margin: 0;
		font-size: 0.875rem;
	}
	.headline {
		font-weight: 700;
		text-align: center;
		font-style: italic;
	}
	.button-wrapper {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
		flex: 1;
		justify-content: center;
	}
</style>
