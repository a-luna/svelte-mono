<script lang="ts">
	import { importUserThemeFromFile } from '$lib/theme';
	import type { UserThemeImported } from '$lib/types';
	import { Modal } from '@a-luna/shared-ui';
	import { getErrorMessage } from '@a-luna/shared-ui/util';
	import { createEventDispatcher, tick } from 'svelte';
	import Highlight from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import irBlack from 'svelte-highlight/styles/ir-black';

	let modal: Modal;
	let closed: boolean;
	let fileInput: HTMLInputElement;
	let error = '';
	let code = '';
	let userTheme: UserThemeImported;
	const dispatch = createEventDispatcher<{ loadUserTheme: { userTheme: UserThemeImported } }>();

	export function toggleModal() {
		error = '';
		code = '';
		modal.toggleModal();
	}

	function saveChanges() {
		if (userTheme) {
			dispatch('loadUserTheme', { userTheme });
			modal.toggleModal();
		}
	}

	async function openFile(validFileExts: string[]) {
		error = ``;
		code = '';
		const files = fileInput.files ?? [];
		if (files.length > 0) {
			const file = files[0];
			if (file?.name && validFile(file.name, validFileExts)) {
				try {
					var reader = new FileReader();
					reader.onload = async function (e) {
						const userThemeFromFile = JSON.parse(String(e.target?.result));
						const result = importUserThemeFromFile(userThemeFromFile);
						if (result.success) {
							userTheme = result.value;
							code = JSON.stringify(userThemeFromFile, null, 2);
							await tick();
							modal.focusSaveButton();
						} else {
							error = result.error?.message ?? '';
						}
					};
					reader.readAsText(file);
				} catch (ex) {
					error = getErrorMessage(error);
				}
			} else if (file?.name) {
				error = `${file.name} is not a valid JSON file`;
			}
		} else {
			error = 'No file was selected';
		}
	}

	function validFile(filename: string, validFileExts: string[]): boolean {
		var match = filename.match(/\.([^\.]+)$/);
		return match ? validFileExts.some((ext) => ext === match?.[0]) : false;
	}

	const formatDate = (date: string): string => (date ? new Date(date).toLocaleString().replace(',', '') : '');
</script>

<svelte:head>
	{@html irBlack}
</svelte:head>

<Modal
	bind:this={modal}
	bind:closed
	title={'Load User Theme'}
	disableSaveButton={!userTheme}
	outsideClickClosesModal={false}
	saveButtonText={'Load Theme'}
	on:discardChanges={() => modal.toggleModal()}
	on:saveChanges={() => saveChanges()}
>
	<div class="load-theme">
		<div class="top-row">
			{#if userTheme}
				<div class="theme-details">
					<span class="name">Theme Name</span><span class="value">{userTheme?.themeName ?? ''}</span>
					<span class="name">Created At</span><span class="value">{formatDate(userTheme?.createdAt)}</span>
					<span class="name">Modified At</span><span class="value">{formatDate(userTheme?.modifiedAt)}</span>
				</div>
			{:else}
				<label for="file-input">Choose JSON File</label>
				<input
					bind:this={fileInput}
					type="file"
					id="file-input"
					name="file-input"
					accept=".json, application/json"
					on:change={() => openFile(['.json'])}
				/>
			{/if}
		</div>
		{#if error}
			<span class="error">
				<strong>Error!</strong>
				{error}
			</span>
		{:else}
			<div class="code-viewer">
				<Highlight language={json} {code} />
			</div>
		{/if}
	</div>
</Modal>

<style lang="postcss">
	.load-theme {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
	.top-row {
		flex: 0 1 auto;
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.5rem;
	}
	.theme-details {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(3, auto);
		line-height: 1;
		gap: 0.5rem;
	}
	.theme-details .name {
		text-align: right;
		font-weight: 700;
	}
	label {
		cursor: pointer;
		color: var(--white1);
		background-color: var(--dark-gray1);
		font-size: 0.95rem;
		padding: 0.25rem 0.5rem;
		white-space: nowrap;
		letter-spacing: 0.6px;
		border: 1px solid var(--dark-gray1);
		border-radius: 6px;
		place-self: center;
	}
	label:hover,
	label:active,
	label:focus,
	label:active:focus {
		color: var(--white4);
		background-color: var(--dark-gray3);
		border: 1px solid var(--dark-gray3);
	}
	input {
		opacity: 0;
		width: 1px;
	}
	.error,
	.code-viewer {
		flex: 1;
		border-radius: 6px;
		max-height: 300px;
		min-height: 67px;
		background-color: var(--black4);
	}
	.code-viewer :global(pre),
	.code-viewer :global(code) {
		border-radius: 6px;
	}
	.error {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		font-weight: 400;
		font-size: 0.85rem;
		line-height: 1;
		color: var(--red3);
		padding: 1rem;
	}
	.code-viewer :global(code.hljs) {
		font-size: 0.65rem;
		line-height: 1.5;
		max-height: 300px;
		padding: 1rem;
	}
</style>
