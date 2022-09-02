<script lang="ts">
	import { createEmptyColorPalette } from '$lib/color';
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import ContentViewer from '$lib/components/ThemeEditor/ContentViewer/ContentViewer.svelte';
	import AddColorToPaletteModal from '$lib/components/ThemeEditor/Modals/AddColorToPaletteModal.svelte';
	import EditColorDetailsModal from '$lib/components/ThemeEditor/Modals/EditColorDetailsModal.svelte';
	import EditThemeSettingsModal from '$lib/components/ThemeEditor/Modals/EditThemeSettingsModal/EditThemeSettingsModal.svelte';
	import LoadUserThemeModal from '$lib/components/ThemeEditor/Modals/LoadUserThemeModal.svelte';
	import PaletteControls from '$lib/components/ThemeEditor/PaletteControls/PaletteControls.svelte';
	import UserTheme from '$lib/components/ThemeEditor/UserTheme/UserTheme.svelte';
	import { COMPONENT_COLORS } from '$lib/constants';
	import { initAppStore, initColorPickerStore, initThemeEditorStore } from '$lib/context';
	import { createThemeEditorStore } from '$lib/stores/themeEditor';
	import { exportUserThemeToJSON as downloadUserThemeJSON } from '$lib/themes';
	import type {
		AppStore,
		ColorPickerState,
		ComponentColor,
		ThemeColor,
		ThemeEditorStore,
		UserThemeImported,
	} from '$lib/types';
	import { getRandomArrayItem, getThemeEditorSlotExampleCode } from '$lib/util';
	import { HighlightSvelte } from 'svelte-highlight';
	import type { Readable, Writable } from 'svelte/store';

	let editorId: string = 'color-editor';
	let pickerId: string = 'color-picker';
	let state: ThemeEditorStore;
	let colorPickerState: Writable<ColorPickerState>;
	let editorStateInitialized = false;
	let storesInitialized = false;
	let themeInitialized = false;
	let app: Readable<AppStore>;
	let loadUserThemeModal: LoadUserThemeModal;
	let editDetailsModal: EditColorDetailsModal;
	let addColorModal: AddColorToPaletteModal;
	let editThemeSettingsModal: EditThemeSettingsModal;
	let colorPicker: ColorPicker;

	// # ISSUES
	// TODO: FIX CSS VALUE DISPLAY STRING ON COLOR COMPONENT, ALWAYS SHOWS HSL REGARDLESS OF THE THEME'S COLOR FORMAT SETTING AND ALL COLORS CHANGE FROM HSL/HSLA BASED ON THE CURRENTLY SELECTED COLOR
	// TODO: USER CANNOT DISMISS X11 PALETTES WITHOUT SELECTING A COLOR FROM ONE OF THE PALETTES, LOSING THE CURRENT PICKER VALUE. ADD BACK/CANCEL BUTTON AND ESC KEY HANDLER.

	// # COLOR SCHEMES
	// TODO: Create component that generates classic color schemes based on selectedColor value:
	//    - Complementary color (1: hue +180)
	//    - Analogous colors (2: hue +30, hue -30)
	//    - Triadic colors (2: hue +120, hue +240)
	//    - Tetradic colors (3: hue +90, hue +180, hue +270)
	//    - Split complementary (2: hue +150, hue +210)
	//    - Monochrome (10: lightness -25, -20, -15, -10 -5, +5, +10, +15, +20, +25)

	// # CONTENT VIEWER
	// TODO: Create component to list all CSS Variables and allow user to filter the list based on variable name prefixes and selectors used to apply the variables
	// TODO: Create component to generate a list of theme colors from the list of css variables
	// TODO: Create component to view and manage css variables with non-color values (e.g., margin, width, font-size)
	// TODO: Create component to view the user theme as JSON, allow user to copy the text and/or download the file
	// TODO: Create component to view the CSS variables as valid CSS and allow the user to copy the text

	// # USER THEME EDITOR
	// TODO: Allow user to re-order theme palettes (i.e., move up, down, to top, to bottom buttons for each palette)
	// TODO: Allow user to delete colors from theme palettes
	// TODO: Allow user to delete theme palettes
	// TODO: Allow user to edit the UI Color setting in the EditThemeSettingsModal component
	// TODO: Implement the UI Color setting, replace the random color behavior currently in place

	$: if (typeof window !== 'undefined' && !editorStateInitialized) {
		state = createThemeEditorStore(editorId);
		state = initThemeEditorStore(state);
		editorStateInitialized = true;
	}
	$: if (!storesInitialized && editorStateInitialized && $colorPickerState) {
		colorPickerState = initColorPickerStore(colorPickerState);
		app = initAppStore(state, colorPickerState);
		storesInitialized = true;
	}
	$: componentColor = getRandomArrayItem<ComponentColor>(COMPONENT_COLORS);

	$: console.log({
		picker: $colorPickerState,
		state: $state,
		app: $app,
	});

	function handleColorSelected(color: ThemeColor) {
		state.changeSelectedColor(color);
		colorPicker.setColor(color.color);
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
			uiColor: 'black',
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

{#if editorStateInitialized}
	<div class="theme-editor-wrapper">
		<div id="theme-editor" data-testid={$state.editorId}>
			<div class="editor-left-col">
				<ColorPicker editMode={$state.editMode} bind:this={colorPicker} bind:pickerId bind:state={colorPickerState} />
				{#if themeInitialized}
					<PaletteControls
						{editorId}
						{pickerId}
						selectedPalette={$app.selectedThemePalette}
						componentColor={'black'}
						on:addColorToPalette={(e) => addColorModal.toggleModal(e.detail)}
						on:updateThemeColor={(e) => state.updateThemeColor(e.detail)}
					/>
				{/if}
			</div>
			<div class="editor-right-col">
				{#if storesInitialized}
					<UserTheme
						{editorId}
						{componentColor}
						initialized={themeInitialized}
						themeColorPalettes={$app.themeColorPalettes}
						x11PalettesShown={$app.x11PalettesShown}
						on:newUserTheme={() => newUserTheme()}
						on:importUserTheme={() => loadUserThemeModal.toggleModal()}
						on:editThemeSettings={() => editThemeSettingsModal.toggleModal($state.userTheme)}
						on:saveUserTheme={() => downloadUserThemeJSON($state.userTheme)}
						on:closeUserTheme={() => closeUserTheme()}
						on:createPalette={() => state.createNewPalette()}
						on:deletePalette={(e) => state.deletePalette(e.detail)}
						on:paletteSelected={(e) => state.changeSelectedPalette(e.detail)}
						on:colorSelected={(e) => handleColorSelected(e.detail)}
						on:deleteColor={(e) => state.deleteColorFromPalette(e.detail)}
						on:editColorDetails={(e) => editDetailsModal.toggleModal(e.detail)}
					/>
				{/if}
			</div>
		</div>
		{#if storesInitialized}
			<ContentViewer {editorId} {componentColor}>
				<slot>
					<div class="help-text">
						<p><strong>The slot for the ThemeEditor component is not populated!</strong></p>
						<p>Please update your code to pass an instance of a component you wish to theme to see live changes:</p>
						<div class="code-viewer">
							<HighlightSvelte code={getThemeEditorSlotExampleCode()} />
						</div>
					</div>
				</slot>
			</ContentViewer>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.theme-editor-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		width: min-content;
		background-color: var(--white1);
		padding: 1rem;
	}

	#theme-editor {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
		margin: 0 auto 0 0;
	}

	.editor-left-col {
		flex: 0 1 auto;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		gap: 0.5rem;
	}

	.editor-right-col {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		gap: 1rem;
		min-width: 300px;
	}

	.help-text {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}

	.help-text strong {
		font-style: italic;
		font-weight: 500;
	}

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
	.code-viewer :global(code.hljs) {
		font-size: 0.65rem;
		line-height: 1.5;
		max-height: 300px;
		padding: 1rem;
	}
</style>
