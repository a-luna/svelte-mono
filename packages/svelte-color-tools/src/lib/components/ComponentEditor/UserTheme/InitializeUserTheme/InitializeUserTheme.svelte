<script lang="ts">
	import LoadUserThemeButton from '$lib/components/ComponentEditor/UserTheme/InitializeUserTheme/LoadUserThemeButton.svelte';
	import NewUserThemeButton from '$lib/components/ComponentEditor/UserTheme/InitializeUserTheme/NewUserThemeButton.svelte';
	import { createEventDispatcher } from 'svelte';

	interface InitializeUserThemeEvent {
		newUserTheme: null;
		importUserTheme: null;
	}
	const dispatch = createEventDispatcher<InitializeUserThemeEvent>();
</script>

<div class="init-theme">
	<div class="intro-text">
		<p class="headline">Welcome to the Component Theme Editor!</p>
		<p>Would you like to create a new theme or load an existing theme?</p>
	</div>
	<div class="button-wrapper">
		<NewUserThemeButton compact={false} width={'113px'} on:click={() => dispatch('newUserTheme')} />
		<LoadUserThemeButton compact={false} width={'113px'} on:click={() => dispatch('importUserTheme')} />
	</div>
</div>

<style lang="postcss">
	.init-theme {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		height: 169px;
		padding: 1rem;
		border-radius: 6px;

		color: var(--theme-text-color, var(--theme-default-text-color));
		border: 1px solid var(--theme-text-color, var(--theme-default-text-color));
		background-color: var(--theme-panel-background-color, var(--theme-default-panel-background-color));
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
