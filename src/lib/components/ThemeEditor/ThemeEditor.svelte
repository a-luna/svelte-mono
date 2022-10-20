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
	import { initAppStore, initColorPickerStore, initThemeEditorStore } from '$lib/context';
	import { createThemeEditorStore } from '$lib/stores/themeEditor';
	import { downloadUserThemeJson } from '$lib/theme';
	import type { AppStore, ColorPickerState, ComponentColor, ThemeEditorStore, UserThemeImported } from '$lib/types';
	import { getThemeEditorSlotExampleCode } from '$lib/util';
	import { HighlightSvelte } from 'svelte-highlight';
	import type { Readable, Writable } from 'svelte/store';

	export let editorId: string = 'color-editor';
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
	let componentColor: ComponentColor = 'black';
	let colorPicker: ColorPicker;
	let contentViewer: ContentViewer;

	// # NEW IDEAS
	// New high-level data structure: ThemeSet
	// UserTheme -> ComponentTheme, and ColorPalette -> PropertySet
	//
	// ThemeSet is a list of ComponentThemes and metadata, each ComponentTheme is a list of PropertySets
	// For example, other than storing only color values, the Button PropertySet should also contain font-size, padding, etc. values for buttons
	// The Palette component is doing too much, separating the X11Palettes/ColorPalettes use cases into two, new components (ColorPalette/PropertySet) should have been done yesterday
	// Requires changes to the UI to allow user to switch between component themes, change values and save the ThemeSet to file
	//
	// Now, when exporting to JSON, the object will be a list of ComponentThemes with a few metadata fields:
	//  - createdAt/modifiedAt/usesPrefix/uiColor: these will be moved from UserTheme/ComponentTheme to ThemeSet
	//  - component? - need to think about how to store this info, or if it is even really needed
	//  - themePrefix will also be moved and will be renamed to componentPrefix
	// The ComponentTheme interface will contain the following metadata fields:
	//  - selector: CSS selector which applies the component theme (e.g., '.light', '.dark')
	//  - displayName used to identify the component theme in the UI

	// # CONTENT VIEWER
	// TODO: PropertySet can contain CSS Custom Properties with non-color values (e.g., margin, width, font-size) and color values
	// TODO: On the ContentViewer -> JSON tab, user can view the ThemeSet as JSON (any changes to the ThemeSet/PropertySets are immediately reflected in this view), and choose to download the ThemeSet as a JSON file
	// TODO: On the ContentViewer -> CSS tab, user can assign CSS Custom Properties/Values from the list to a PropertySet, individually or in bulk
	// TODO: Alternatively, user can create a new PropertySet from a selection of CSS Custom Properties/Values
	// TODO: On the ContentViewer -> CSS tab, userer can view the CSS Custom Properties from the PropertySets as valid CSS
	// TODO: On the ContentViewer -> CSS tab, each ComponentTheme is rendered as a CSS Style Rule: all CSS Custom Properties and their values in the ComponentTheme are listed on separate lines, and the list is surounded by curly braces preceded by the ComponentTheme.selector value
	//
	//  Assuming the following ThemeSet object has been created:
	//
	//    {
	//    	themeSetName: "componentThemes",
	//    	createdAt: "2022-08-04T20:53:59.357Z",
	//    	modifiedAt: "2022-09-03T06:40:11.523Z",
	//    	usesPrefix: false,
	//    	componentPrefix: '',
	//    	uiColor: 'black',
	//    	themes: [
	//    	  {
	//    	  	displayName: "Light Theme",
	//    	  	jsonPropName: 'lightTheme',
	//    	  	cssSelector: '.light',
	//    	  	properties: [
	//    	  	  {
	//    	  	  	propName: "textColor",
	//    	  	  	cssVarName: "--text-color",
	//    	  	  	displayName: "Text Color",
	//    	  	  	value: "hsl(0 0% 0%)",
	//    	  	  },
	//    	  	  {
	//    	  	  	propName: "fontSize",
	//    	  	  	cssVarName: "--font-size",
	//    	  	  	displayName: "Font Size",
	//    	  	  	value: "1.5rem",
	//    	  	  },
	//    	  	]
	//    	  }
	//		],
	//		[
	//    	  {
	//    	  	displayName: "Dark Theme",
	//    	  	jsonPropName: 'darkTheme',
	//    	  	cssSelector: '.dark',
	//    	  	properties: [
	//    	  	  {
	//    	  	  	propName: "textColor",
	//    	  	  	cssVarName: "--text-color",
	//    	  	  	displayName: "Text Color",
	//    	  	  	value: "hsl(0 0% 94.1%)",
	//    	  	  },
	//    	  	  {
	//    	  	  	propName: "fontSize",
	//    	  	  	cssVarName: "--font-size",
	//    	  	  	displayName: "Font Size",
	//    	  	  	value: "1.2rem",
	//    	  	  },
	//    	  	]
	//    	  },
	//    	]
	//    }
	//
	//  The CSS tab would display the following:
	//
	//    .light {
	//	    --text-color: hsl(0 0% 0%);
	//      --font-size: 1.5rem;
	//    }
	//
	//    .dark {
	//	    --text-color: hsl(0 0% 94.1%);
	//      --font-size: 1.2rem;
	//    }

	// # USER THEME EDITOR
	// TODO: Extract propName, displayName, cssVarName, colorValue label/textbox form from AddColorToPaletteModal and reuse it in EditColorDetailsModal
	// TODO: Allow user to re-order theme palettes (i.e., move up, down, to top, to bottom buttons for each palette)
	// TODO: Allow user to delete colors from theme palettes
	// TODO: Allow user to delete theme palettes

	// # COLOR SCHEMES
	// TODO: Create component that generates classic color schemes based on selectedColor value:
	//    - Complementary color (1: hue +180)
	//    - Analogous colors (2: hue +30, hue -30)
	//    - Triadic colors (2: hue +120, hue +240)
	//    - Tetradic colors (3: hue +90, hue +180, hue +270)
	//    - Split complementary (2: hue +150, hue +210)
	//    - Monochrome (10: lightness -25, -20, -15, -10 -5, +5, +10, +15, +20, +25)

	$: console.log({
		picker: $colorPickerState,
		state: $state,
		app: $app,
	});

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
	$: colorFormat = $state?.userTheme?.colorFormat ?? 'hsl';
	$: componentColor = $state?.userTheme?.uiColor ?? 'black';

	function handleUserThemeImported(theme: UserThemeImported) {
		$state.userTheme = theme;
		themeInitialized = true;
		contentViewer.changeComponentPrefix(theme.usesPrefix, theme.themePrefix);
	}

	function handleUserThemeSettingsChanged(updatedUserTheme: UserThemeImported) {
		contentViewer.changeComponentPrefix(updatedUserTheme.usesPrefix, updatedUserTheme.themePrefix);
	}

	function newUserTheme() {
		const createdAt = new Date().toISOString();
		$state.userTheme = {
			themeName: 'custom theme',
			uiColor: 'black',
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
	<EditThemeSettingsModal
		{editorId}
		bind:this={editThemeSettingsModal}
		on:updateUiColor={(e) => (componentColor = e.detail)}
		on:updateColorFormat={(e) => (colorFormat = e.detail)}
		on:updateComponentPrefix={(e) => handleUserThemeSettingsChanged(e.detail)}
	/>
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
						{componentColor}
						on:addColorToPalette={(e) => addColorModal.toggleModal(e.detail)}
						on:setColorPickerValue={(e) => colorPicker.setColor(e.detail)}
						on:updateThemeColor={(e) => state.updateThemeColor(e.detail)}
						on:deselectThemeColor={() => state.deselectColor()}
					/>
				{/if}
			</div>
			<div class="editor-right-col">
				{#if storesInitialized}
					<UserTheme
						{editorId}
						{componentColor}
						{colorFormat}
						initialized={themeInitialized}
						themeColorPalettes={$app.themeColorPalettes}
						x11PalettesShown={$app.x11PalettesShown}
						on:newUserTheme={() => newUserTheme()}
						on:importUserTheme={() => loadUserThemeModal.toggleModal()}
						on:editThemeSettings={() => editThemeSettingsModal.toggleModal($state.userTheme)}
						on:saveUserTheme={() => downloadUserThemeJson($state.userTheme)}
						on:closeUserTheme={() => closeUserTheme()}
						on:createPalette={() => state.createNewPalette()}
						on:deletePalette={(e) => state.deletePalette(e.detail)}
						on:paletteSelected={(e) => state.changeSelectedPalette(e.detail)}
						on:colorSelected={(e) => state.changeSelectedColor(e.detail)}
						on:deleteColor={(e) => state.deleteColorFromPalette(e.detail)}
						on:editColorDetails={(e) => editDetailsModal.toggleModal(e.detail)}
					/>
				{/if}
			</div>
		</div>
		{#if storesInitialized}
			<ContentViewer bind:this={contentViewer} {editorId} {componentColor} {themeInitialized}>
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
		gap: 2rem;
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
		gap: 1rem;
	}

	.editor-right-col {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		gap: 1rem;
		min-width: 335px;
	}

	.help-text {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
		background-color: var(--white2);
		border: 1px solid var(--black4);
		border-radius: 4px;
		padding: 1rem;
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

	.code-viewer :global(.hljs-tag) {
		color: #ea33c6;
	}

	.code-viewer :global(.hljs-title),
	.code-viewer :global(.language-javascript .hljs-name) {
		color: #dfc244;
	}

	.code-viewer :global(.hljs-name) {
		color: #74f9b1;
	}

	.code-viewer :global(.hljs-attr) {
		color: #56adc4;
	}

	.code-viewer :global(.hljs-string) {
		color: #ececec;
	}

	.code-viewer :global(.hljs-keyword) {
		color: #ea3375;
	}
</style>
