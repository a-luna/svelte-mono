<script lang="ts">
	import Close from '$lib/components/Icons/Close.svelte';
	import { getRandomHexString } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let modalId = `modal-${getRandomHexString(4)}`;
	export let title: string = '';
	export let closed = true;
	export let disableSaveButton = false;
	export let noHeader = false;
	export let noFooter = false;
	export let outsideClickClosesModal = true;
	export let saveButtonText = 'Save';
	const dispatch = createEventDispatcher();

	$: modelLabel = `${modalId}-label`;

	export const toggleModal = () => (closed = !closed);

	function handleKeyPress(key: string) {
		if (!closed && key === 'Escape') {
			dispatch('discardChanges');
		}
	}

	function handleOutsideClick() {
		if (outsideClickClosesModal) {
			toggleModal();
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.code)} />

<div
	class="modal fade"
	class:hidden={closed}
	class:shown={!closed}
	id={modalId}
	tabindex="-1"
	aria-labelledby={modelLabel}
	aria-hidden="true"
	on:click|self={() => handleOutsideClick()}
>
	<div class="modal-dialog">
		<div class="modal-content">
			{#if !noHeader}
				<div class="modal-header">
					{#if title}
						<h5 id={modelLabel}>{title}</h5>
					{/if}
					<button type="button" class="btn-close" aria-label="Close" on:click={() => dispatch('discardChanges')}
						><Close /></button
					>
				</div>
			{/if}
			<div class="modal-body">
				<slot />
			</div>
			{#if !noFooter}
				<div class="modal-footer">
					<button
						type="button"
						disabled={disableSaveButton}
						class="modal-button"
						on:click={() => dispatch('saveChanges')}>{saveButtonText}</button
					>
					<button type="button" class="modal-button" on:click={() => dispatch('discardChanges')}>Cancel</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.modal {
		--modal-outer-background-color: hsla(0, 0%, 0%, 0.75);
		--modal-dialog-background-color: var(--white2);
		--modal-body-background-color: var(--white2);
		--modal-header-background-color: var(--light-gray4);
		--modal-footer-background-color: var(--white2);
		--modal-header-text-color: var(--black1);

		overflow-y: auto;
		overflow-x: hidden;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		outline: 0;
		z-index: 98;
	}

	.fade {
		transition: background-color 0.15s linear;
	}

	.hidden {
		display: none;
	}

	.shown {
		display: block;
		background-color: var(--modal-outer-background-color);
	}

	.modal-dialog {
		position: relative;
		min-width: 314px;
		max-width: 450px;
		width: calc(100% - 4rem);
		margin: 2rem auto 0 auto;
		background-clip: padding-box;
		background-color: var(--modal-dialog-background-color);
		border: 2px solid var(--black1);
		border-radius: 6px;
		border-style: none;
		outline: 0;
		pointer-events: auto;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		z-index: 99;
	}

	.modal-content {
		display: flex;
		flex-direction: column;
		position: relative;
		color: currentColor;
		width: 100%;
		gap: 0.5rem;
		border-radius: 6px;
	}

	.modal-header {
		display: flex;
		padding: 0;
		flex-shrink: 0;
		justify-content: flex-end;
		align-items: center;
		line-height: 1;
		background-color: var(--modal-header-background-color);
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		padding: 0.5rem 1rem;
	}

	.modal-header h5 {
		color: var(--modal-header-text-color);
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: 0.6px;
		line-height: 1;
		margin: 0;
		flex: 1;
	}

	.btn-close {
		cursor: pointer;
		box-sizing: content-box;
		background-color: inherit;
		width: 1rem;
		border-radius: 0;
		border-style: none;
		opacity: 1;
		padding: 0;
		margin: 0 0 0 auto;
	}

	.btn-close:focus,
	.btn-close:active,
	.btn-close:active:focus {
		outline: 0;
		box-shadow: none;
	}

	.modal-body {
		position: relative;
		font-size: 0.9rem;
		padding: 0.25rem 1rem;
		background-color: var(--modal-body-background-color);
	}

	.modal-footer {
		display: flex;
		flex-wrap: wrap;
		flex-shrink: 0;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
		border-bottom-right-radius: 0.375rem;
		border-bottom-left-radius: 0.375rem;
		background-color: var(--modal-footer-background-color);
		padding: 0.5rem 1rem;
	}

	.modal-footer button {
		color: var(--white1);
		background-color: var(--dark-gray4);
		font-size: 0.95rem;
		padding: 0.25rem 0.5rem;
		white-space: nowrap;
		letter-spacing: 0.6px;
		border: 2px solid var(--dark-gray4);
		border-radius: 6px;
		min-width: 75px;
	}

	.modal-footer button:hover,
	.modal-footer button:active,
	.modal-footer button:focus,
	.modal-footer button:active:focus {
		color: var(--white4);
		background-color: var(--dark-gray1);
		border: 2px solid var(--dark-gray4);
	}

	.modal-footer button[disabled] {
		cursor: not-allowed;
		color: var(--light-gray2);
		background-color: var(--gray2);
		border: 2px solid var(--gray2);
	}

	@media screen and (min-width: 762px) {
		.modal-dialog {
			max-width: 500px;
			margin: 2rem auto 0 auto;
		}
		.modal-content {
			border-radius: 0;
		}
	}
</style>
