<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import ContentViewer from '$lib/components/ComponentEditor/ContentViewer/ContentViewer.svelte';
	import AddColorToPaletteModal from '$lib/components/ComponentEditor/Modals/AddColorToPaletteModal.svelte';
	import EditColorDetailsModal from '$lib/components/ComponentEditor/Modals/EditColorDetailsModal.svelte';
	import EditThemeSettingsModal from '$lib/components/ComponentEditor/Modals/EditThemeSettingsModal/EditThemeSettingsModal.svelte';
	import LoadUserThemeModal from '$lib/components/ComponentEditor/Modals/LoadUserThemeModal.svelte';
	import PaletteControls from '$lib/components/ComponentEditor/PaletteControls/PaletteControls.svelte';
	import UserTheme from '$lib/components/ComponentEditor/UserTheme/UserTheme.svelte';
	import { defaultUserThemeImported } from '$lib/constants';
	import { initAppStore, initColorPickerStore, initThemeEditorStore } from '$lib/context';
	import { createThemeEditorStore } from '$lib/stores/themeEditor';
	import { downloadUserThemeJson } from '$lib/theme';
	import type { AppStore, ColorPickerState, ThemeEditorStore, UserThemeImported } from '$lib/types';
	import { getThemeEditorSlotExampleCode } from '$lib/util';
	import { createEmptyColorPalette, type ComponentColor } from '@a-luna/shared-ui';
	import { HighlightSvelte } from 'svelte-highlight';
	import type { Readable, Writable } from 'svelte/store';

	export let editorId = 'component-css-editor';
	let pickerId = 'color-picker';
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
	// TODO: On the ContentViewer -> CSS tab, user can view the CSS Custom Properties from the PropertySets as valid CSS
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
	$: style = `--button-hue: var(--${componentColor}-hue); --bg-color: var(--${componentColor}-bg-color); --fg-color: var(--${componentColor}-fg-color); --active-fg-color: var(--${componentColor}-active-fg-color); --disabled-bg-color: var(--${componentColor}-hover-bg-color);  --hover-bg-color: var(--${componentColor}-hover-bg-color); --border-color: var(--fg-color);`;

	function handleUserThemeImported(e: CustomEvent<{ userTheme: UserThemeImported }>) {
		const { userTheme } = e.detail;
		$state.userTheme = userTheme;
		themeInitialized = true;
		contentViewer.changeComponentPrefix(userTheme.usesPrefix, userTheme.themePrefix);
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
			themePrefix: '',
			createdAt,
			modifiedAt: createdAt,
			colorFormat: 'hsl',
			palettes: [createEmptyColorPalette()],
		};
		themeInitialized = true;
	}

	function closeUserTheme() {
		$state.selectedPaletteId = '';
		$state.userTheme = defaultUserThemeImported;
		themeInitialized = false;
	}
</script>

{#if !themeInitialized}
	<LoadUserThemeModal bind:this={loadUserThemeModal} on:loadUserTheme={handleUserThemeImported} />
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
	<div
		class="theme-editor-wrapper"
		class:black={componentColor === 'black'}
		class:color={componentColor !== 'black'}
		{style}
	>
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
						on:editColorDetails={(e) => editDetailsModal.openModal(e.detail)}
					/>
				{/if}
			</div>
		</div>
		{#if storesInitialized}
			<ContentViewer bind:this={contentViewer} {editorId} {componentColor} {themeInitialized}>
				<slot>
					<div class="help-text">
						<p><strong><code>ComponentEditor</code> has not been be initialized!</strong></p>
						<p>
							In order to customize CSS properties for your component and see live updates, import your svelte component
							in the <code>+page.svelte</code> file containing this <code>ComponentEditor</code> instance and add your
							component as a child of the <code>ComponentEditor</code> as shown below:
						</p>
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
		--select-list-open-button-height: 30px;
		--select-list-open-button-icon-height: 14px;
		--select-list-open-button-icon-width: 14px;
		--select-list-open-button-padding: 0 4px;
		--select-list-open-button-text-color: var(--fg-color);
		--select-list-open-button-background-color: var(--bg-color);
		--select-list-open-button-hover-background-color: var(--hover-bg-color);
		--select-list-open-button-border-color: var(--fg-color);
		--select-list-no-selection-text-color: var(--fg-color);

		--select-list-dropdown-text-color: var(--fg-color);
		--select-list-dropdown-background-color: var(--bg-color);
		--select-list-dropdown-border-color: var(--fg-color);
		--select-list-dropdown-border-radius: 6px;

		--select-list-selected-item-background-color: var(--hover-bg-color);

		--select-list-width: 100%;
		--select-list-background-color: var(--white3);
		--select-list-hover-background-color: var(--hover-bg-color);
		--select-list-text-color: var(--fg-color);
		--select-list-border-color: var(--fg-color);
		--select-list-padding: 0 4px;
		--select-list-height: 30px;
		--select-list-dropdown-height: 300px;
		--select-list-no-selection-text-color: var(--fg-color);

		--color-picker-background-color: var(--hover-bg-color);

		--input-text-font-size: 0.875rem;
		--input-text-border-color: var(--fg-color);
		--input-text-color: var(--fg-color);
		--input-text-background-color: var(--bg-color);
		--input-text-disabled-text-color: var(--gray4);
		--input-text-disabled-background-color: var(--white1);
		--input-text-disabled-border-color: var(--gray4);

		--sst-button-bg-color: var(--button-bg-color);
		--sst-button-text-color: var(--button-fg-color);
		--sst-button-border-color: var(--button-fg-color);
		--sst-button-hover-bg-color: var(--hover-bg-color);
		--sst-button-hover-text-color: var(--button-fg-color);
		--sst-button-hover-border-color: var(--button-fg-color);
		--sst-button-disabled-bg-color: var(--white1);
		--sst-button-disabled-text-color: var(--gray4);
		--sst-button-disabled-border-color: var(--gray4);

		display: flex;
		flex-flow: column nowrap;
		gap: 2rem;
		width: 790px;
		background-color: var(--white1);
		padding: 1rem;
		margin: 0 auto;
	}

	.theme-editor-wrapper.color {
		--button-bg-color: hsl(var(--button-hue, 0), var(--background-sat, 0%), 90%);
		--button-hover-bg-color: hsl(var(--button-hue, 0), var(--background-sat, 0%), 99%);
		--button-active-bg-color: hsl(var(--button-hue, 0), var(--background-sat, 0%), 90%);
		--button-fg-color: hsl(var(--button-hue, 0), var(--fg-sat, 0%), var(--fg-light, 10%));
		--section-bg-color: hsl(var(--button-hue, 0), var(--background-sat, 0%), 95%);
		--button-border-color: hsl(var(--button-hue, 0), 63%, 26%);
	}

	.theme-editor-wrapper.black {
		--button-bg-color: var(--white2);
		--button-hover-bg-color: var(--white4);
		--button-active-bg-color: var(--white4);
		--button-fg-color: var(--black2);
		--section-bg-color: var(--white4);
		--button-border-color: var(--black2);
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
		border-radius: 6px;
		padding: 1rem;
	}

	.help-text p {
		line-height: 1.6;
	}

	.help-text code {
		font-size: 12px;
		background-color: var(--white4);
		border: 1px solid var(--light-gray2);
		padding: 2px 5px;
		border-radius: 4px;
	}

	.help-text strong {
		font-weight: 700;
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
