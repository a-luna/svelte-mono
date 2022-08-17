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
	import { createThemeEditorStore } from '$lib/stores/themeEditor';
	import type {
		AppStore,
		ColorPickerState,
		ComponentColor,
		ThemeColor,
		ThemeEditorStore,
		UserThemeImported,
	} from '$lib/types';
	import type { Readable, Writable } from 'svelte/store';

	let editorId: string = 'color-editor';
	let pickerId: string = 'color-picker';
	let state: ThemeEditorStore;
	let colorPickerState: Writable<ColorPickerState>;
	let editorStateInitialized = false;
	let pickerStateInitialized = false;
	let themeInitialized = false;
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

	$: if (typeof window !== 'undefined' && !editorStateInitialized) {
		state = createThemeEditorStore(editorId);
		state = initThemeEditorStore(state);
		editorStateInitialized = true;
	}
	$: if (!pickerStateInitialized && editorStateInitialized && $colorPickerState) {
		colorPickerState = initColorPickerStore(colorPickerState);
		app = initAppStore(state, colorPickerState);
		pickerStateInitialized = true;
	}
	$: editable = !$state?.editMode;
	$: if ($app) {
		console.log({ picker: $colorPickerState, state: $state, app: $app });
	}

	function handleColorSelected(color: ThemeColor) {
		$state.selectedColor = color;
		colorPicker.setColor(color.color);
	}

	function importUserTheme() {
		loadUserThemeModal.toggleModal();
	}

	function handleUserThemeImported(theme: UserThemeImported) {
		$state.userTheme = theme;
		themeInitialized = true;
	}

	function newUserTheme() {
		const createdAt = new Date().toISOString();
		$state.userTheme = {
			themeName: 'custom theme',
			usesPrefix: false,
			themePrefix: null,
			createdAt,
			modifiedAt: createdAt,
			colorFormat: 'hsl',
			palettes: [createEmptyColorPalette()],
		};
		themeInitialized = true;
	}

	function closeUserTheme() {
		$state.selectedPaletteId = null;
		$state.userTheme = null;
		themeInitialized = false;
	}
</script>

{#if !themeInitialized}
	<LoadUserThemeModal bind:this={loadUserThemeModal} on:loadUserTheme={(e) => handleUserThemeImported(e.detail)} />
{:else}
	<AddColorToPaletteModal
		{editorId}
		bind:this={addColorModal}
		on:addNewColor={(e) => state.addColorToPalette(e.detail)}
	/>
	<EditColorDetailsModal {editorId} bind:this={editDetailsModal} />
	<EditThemeSettingsModal {editorId} bind:this={editThemeSettingsModal} />
{/if}

<div class="theme-editor-wrapper">
	<div id="theme-editor" data-testid={$state?.editorId}>
		<div class="editor-left-col">
			<ColorPicker bind:this={colorPicker} bind:pickerId bind:state={colorPickerState} bind:editable />
			{#if $state?.userTheme}
				<PaletteControls
					{editorId}
					{pickerId}
					selectedPalette={$app?.selectedThemePalette}
					componentColor={'black'}
					on:addColorToPalette={(e) => addColorModal.toggleModal(e.detail)}
				/>
			{/if}
		</div>
		<div class="editor-right-col">
			<UserTheme
				{editorId}
				{componentColor}
				initialized={themeInitialized}
				themeColorPalettes={$app?.themeColorPalettes}
				x11PalettesShown={$app?.x11PalettesShown}
				on:newUserTheme={() => newUserTheme()}
				on:importUserTheme={() => importUserTheme()}
				on:editThemeSettings={() => editThemeSettingsModal.toggleModal($state.userTheme)}
				on:createPalette={() => state.createNewPalette()}
				on:deletePalette={(e) => state.deletePalette(e.detail)}
				on:closeUserTheme={() => closeUserTheme()}
				on:colorSelected={(e) => handleColorSelected(e.detail)}
				on:deleteColor={(e) => state.deleteColorFromPalette(e.detail)}
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
