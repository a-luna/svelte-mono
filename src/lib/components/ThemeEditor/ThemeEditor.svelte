<script lang="ts">
	import { createEmptyColorPalette } from '$lib/color';
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import AddColorToPaletteModal from '$lib/components/ThemeEditor/Modals/AddColorToPaletteModal.svelte';
	import EditColorDetailsModal from '$lib/components/ThemeEditor/Modals/EditColorDetailsModal.svelte';
	import EditThemeSettingsModal from '$lib/components/ThemeEditor/Modals/EditThemeSettingsModal/EditThemeSettingsModal.svelte';
	import LoadUserThemeModal from '$lib/components/ThemeEditor/Modals/LoadUserThemeModal.svelte';
	import PaletteControls from '$lib/components/ThemeEditor/PaletteControls/PaletteControls.svelte';
	import UserTheme from '$lib/components/ThemeEditor/UserTheme/UserTheme.svelte';
	import { initAppStore, initColorPickerStore, initThemeEditorStore } from '$lib/context';
	import { createColorPickerStore } from '$lib/stores/colorPicker';
	import { createThemeEditorStore } from '$lib/stores/themeEditor';
	import type {
		AppStore,
		ColorPalette,
		ColorPickerState,
		ComponentColor,
		CssColor,
		ThemeEditorStore,
		UserThemeImported,
	} from '$lib/types';
	import { getRandomHexString } from '$lib/util';
	import type { Readable, Writable } from 'svelte/store';

	let editorId: string = `color-editor-${getRandomHexString(4)}`;
	let pickerId: string = `color-picker-${getRandomHexString(4)}`;
	export let state: ThemeEditorStore;
	let userTheme: UserThemeImported;
	let themeName: string;
	let themeColorPalettes: ColorPalette[] = [];
	let selectedPaletteId: string;
	let selectedPalette: ColorPalette;
	let selectedColor: CssColor;
	let colorPickerState: Writable<ColorPickerState>;
	let editMode: boolean;
	let showX11Palettes: boolean;
	let alphaEnabled: boolean;
	let componentStyles = '';
	let initialized = false;
	let app: Readable<AppStore>;
	const componentColor: ComponentColor = 'blue';
	let loadUserThemeModal: LoadUserThemeModal;
	let editDetailsModal: EditColorDetailsModal;
	let addColorModal: AddColorToPaletteModal;
	let editThemeSettingsModal: EditThemeSettingsModal;
	let colorPicker: ColorPicker;

	// TODO: Create component for left-column that generates classic color schemes based on selectedColor value:
	//    - Complementary color (1: hue +180)
	//    - Analogous colors (2: hue +30, hue -30)
	//    - Triadic colors (2: hue +120, hue +240)
	//    - Tetradic colors (3: hue +90, hue +180, hue +270)
	//    - Split complementary (2: hue +150, hue +210)
	//    - Monochrome (6: lightness -15, -10 -5, +5, +10, +15)

	$: if (typeof window !== 'undefined' && !initialized) {
		state = createThemeEditorStore(editorId);
		state = initThemeEditorStore(state);
		colorPickerState = createColorPickerStore(pickerId);
		colorPickerState = initColorPickerStore(colorPickerState);
		app = initAppStore(state, colorPickerState);
		initialized = true;
	}
	$: if (selectedColor && colorPicker) colorPicker.setColor(selectedColor);
	$: editable = !$app?.themeEditorState?.editMode;
	$: if (selectedPaletteId) $app.themeEditorStore.changeSelectedPalette(selectedPaletteId);
	$: if ($colorPickerState)
		alphaEnabled = $colorPickerState.colorSpace === 'rgba' || $colorPickerState.colorSpace === 'hsla';

	function importUserTheme() {
		loadUserThemeModal.toggleModal();
	}

	function newUserTheme() {
		const createdAt = new Date().toISOString();
		$app.themeEditorState.userTheme = {
			themeName: 'custom theme',
			usesPrefix: false,
			themePrefix: null,
			createdAt,
			modifiedAt: createdAt,
			colorFormat: 'hsl',
			palettes: [createEmptyColorPalette()],
		};
	}

	function closeUserTheme() {
		$app.themeEditorState.selectedPaletteId = null;
		$app.themeEditorState.userTheme = null;
	}
</script>

{#if !$app?.themeEditorState?.userTheme}
	<LoadUserThemeModal
		bind:this={loadUserThemeModal}
		on:loadUserTheme={(e) => ($app.themeEditorState.userTheme = e.detail)}
	/>
{:else}
	<AddColorToPaletteModal
		{editorId}
		bind:this={addColorModal}
		on:addNewColor={(e) => $app.themeEditorStore.addColorToPalette(e.detail)}
	/>
	<EditColorDetailsModal {editorId} bind:this={editDetailsModal} />
	<EditThemeSettingsModal {editorId} bind:this={editThemeSettingsModal} />
{/if}

<div class="theme-editor-wrapper">
	<div id="theme-editor" data-testid={$app?.themeEditorState?.editorId}>
		<div class="editor-left-col">
			<ColorPicker
				bind:this={colorPicker}
				bind:pickerId
				bind:state={colorPickerState}
				bind:editable
				on:showX11Palettes={() => ($app.themeEditorState.showX11Palettes = true)}
				on:hideX11Palettes={() => ($app.themeEditorState.showX11Palettes = false)}
			/>
			{#if $app?.themeEditorState?.userTheme}
				<PaletteControls
					{editorId}
					componentColor={'black'}
					on:addColorToPalette={(e) => addColorModal.toggleModal(e.detail)}
				/>
			{/if}
		</div>
		<div class="editor-right-col">
			<UserTheme
				{editorId}
				{componentColor}
				on:newUserTheme={() => newUserTheme()}
				on:importUserTheme={() => importUserTheme()}
				on:editThemeSettings={() => editThemeSettingsModal.toggleModal(userTheme)}
				on:createPalette={() => $app.themeEditorStore.createNewPalette()}
				on:deletePalette={(e) => $app.themeEditorStore.deletePalette(e.detail)}
				on:closeUserTheme={() => closeUserTheme()}
				on:colorSelected={(e) => ($app.themeEditorState.selectedColor = e.detail)}
				on:deleteColor={(e) => $app.themeEditorStore.deleteColorFromPalette(e.detail)}
				on:editColorDetails={(e) => editDetailsModal.toggleModal(e.detail)}
			/>
		</div>
	</div>
	{#if $$slots}
		<div class="test-component" style={$app?.componentStyles}>
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	.theme-editor-wrapper {
		width: min-content;
		background-color: var(--white1);
	}

	#theme-editor {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
		padding: 1rem;
		max-width: 700px;
		margin: 0 auto 0 0;
	}

	.editor-left-col {
		flex: 0 1 auto;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		gap: 0.5rem;
		width: 367px;
	}

	.editor-right-col {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		gap: 1rem;
		width: 335px;
	}

	.test-component {
		padding: 1rem;
	}
</style>
