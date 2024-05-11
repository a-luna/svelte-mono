<script lang="ts">
	import { getSimpleAppContext } from '$lib/stores/context';
	import type { AppStore } from '$lib/types';
	import type { RadioButtonDetails } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';

	let app: Readable<AppStore>;
	({ app } = getSimpleAppContext());

	export let title = '';
	export let form = '';
	export let groupId = '';
	export let groupName = '';
	export let style: string;
	export let buttons: RadioButtonDetails[] = [];
	let instances: { [k: string]: HTMLInputElement } = {};
	const radioButtonSelectionChangedEventDispatcher = createEventDispatcher<{
		radioButtonSelectionChanged: { groupId: string; groupName: string; selectionId: string; value: string };
	}>();

	$: legendMarginStyles = $app.isDefaultDisplay
		? $app.encoderMode
			? 'margin: 0 auto;'
			: 'margin: 0 auto 0 0.5rem;'
		: 'margin: 0 auto 0 0.5rem;';

	export const reset = () =>
		buttons.forEach((button: RadioButtonDetails) => {
			const thisInstance = instances[button.id];
			if (thisInstance) {
				thisInstance.checked = button.checked;
			}
		});

	function raiseSelectionChanged(id: string, value: string) {
		radioButtonSelectionChangedEventDispatcher('radioButtonSelectionChanged', {
			groupId,
			groupName,
			selectionId: id,
			value,
		});
	}
</script>

<div id={groupId} class="radio-group">
	<fieldset name={groupName} {form}>
		<legend style={legendMarginStyles}>{title}</legend>
		<div class="radio-buttons" {style}>
			{#each buttons as button}
				<div class="button-wrapper">
					<input
						type="radio"
						id={button.id}
						name={groupName}
						value={button.value}
						checked={button.checked}
						bind:this={instances[button.id]}
						on:change={(_) => raiseSelectionChanged(button.id, button.value)}
					/>
					<label for={button.id}>{button.label}</label>
				</div>
			{/each}
		</div>
	</fieldset>
</div>

<style>
	.button-wrapper {
		flex: 0 1 75px;
	}
	fieldset {
		border: 1px solid var(--fieldset-border-color);
		border-radius: 4px;
		padding: 2px 0;
		font-size: 0.875rem;
	}
	legend {
		color: var(--fieldset-title-color);
		font-weight: 400;
		padding: 0 3px;
	}
	input[type='radio'] {
		position: absolute;
		top: auto;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
		width: 1px;
		height: 1px;
		white-space: nowrap;
	}
	input[type='radio'] + label {
		display: block;
		color: #d8d8d8;
		padding: 3px;
		padding-left: 25px;
		max-width: calc(100% - 2em);
	}
	input[type='radio']:focus + label {
		color: var(--sec-color);
	}
	input[type='radio'] + label::before {
		content: '';
		background: rgb(37, 37, 37);
		border: 0.1em solid var(--default-border-color);
		border-radius: 100%;
		background-color: rgb(37, 37, 37, 80%);
		display: block;
		box-sizing: border-box;
		float: left;
		width: 1em;
		height: 1em;
		margin-left: -1.5em;
		margin-top: 0.15em;
		cursor: pointer;
		text-align: center;
		transition: all 0.1s ease-out;
	}
	input[type='radio']:disabled + label::before {
		border: 0.1em solid rgba(255, 255, 255, 0.1);
		background-color: rgba(255, 255, 255, 0.1);
	}
	input[type='radio']:disabled + label {
		color: #555;
	}
	input[type='radio']:checked + label {
		color: var(--sec-color);
	}
	input[type='radio']:checked + label::before {
		background-color: var(--sec-color);
		box-shadow: inset 0 0 0 0.15em rgba(0, 0, 0, 0.95);
	}
	@media screen and (min-width: 365px) {
		.radio-buttons {
			display: grid;
			grid-template-columns: repeat(3, 75px) 1fr;
			grid-template-rows: auto;
		}
	}
	@media screen and (min-width: 540px) {
		.radio-buttons {
			display: flex;
			flex-flow: row nowrap;
			gap: 0.5rem;
		}
	}
</style>
