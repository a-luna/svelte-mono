<script lang="ts">
	import { dev } from '$app/environment';
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import ContentViewer from '$lib/components/ComponentEditor/ContentViewer/ContentViewer.svelte';
	import AddColorToPaletteModal from '$lib/components/ComponentEditor/Modals/AddColorToPaletteModal.svelte';
	import EditColorDetailsModal from '$lib/components/ComponentEditor/Modals/EditColorDetailsModal.svelte';
	import EditThemeSettingsModal from '$lib/components/ComponentEditor/Modals/EditThemeSettingsModal/EditThemeSettingsModal.svelte';
	import LoadUserThemeModal from '$lib/components/ComponentEditor/Modals/LoadUserThemeModal.svelte';
	import PaletteControls from '$lib/components/ComponentEditor/PaletteControls/PaletteControls.svelte';
	import UserTheme from '$lib/components/ComponentEditor/UserTheme/UserTheme.svelte';
	import { defaultUserThemeImported } from '$lib/constants';
	import { createThemeEditorStore, initAppContext } from '$lib/stores';
	import { downloadUserThemeJson } from '$lib/theme';
	import type { AppStore, ColorPickerStore, ThemeEditorStore, UserThemeImported } from '$lib/types';
	import { getThemeEditorSlotExampleCode } from '$lib/util';
	import { createEmptyColorPalette, type ComponentColor, type CssColor, type ThemeColor } from '@a-luna/shared-ui';
	import { createEventDispatcher } from 'svelte';
	import { HighlightSvelte } from 'svelte-highlight';
	import type { Readable } from 'svelte/store';

	let editorStateInitialized = false;
	let storesInitialized = false;
	let themeInitialized = false;
	let themeEditor: ThemeEditorStore;
	let picker: ColorPickerStore;
	let app: Readable<AppStore>;
	let loadUserThemeModal: LoadUserThemeModal;
	let editDetailsModal: EditColorDetailsModal;
	let addColorModal: AddColorToPaletteModal;
	let editThemeSettingsModal: EditThemeSettingsModal;
	let componentColor: ComponentColor = 'black';
	let contentViewer: ContentViewer;
	const dispatch = createEventDispatcher<{ uiColorChanged: { uiColor: ComponentColor } }>();

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

	$: if (dev) {
		console.log({
			picker: $picker,
			state: $themeEditor,
			app: $app,
		});
	}
	// $: {
	// 	const result = ColorParser.parse('oklch(87.78% 0.205 147.55 / 75%)');
	// 	if (result.success) {
	// 		const schemeSet = getColorSchemesForAllColorFormats(result.value);
	// 		console.log({ schemeSet });
	// 	}
	// }

	$: if (typeof window !== 'undefined' && !editorStateInitialized) {
		themeEditor = createThemeEditorStore();
		editorStateInitialized = true;
	}
	$: if (!storesInitialized && editorStateInitialized && $picker) {
		({ picker, themeEditor, app } = initAppContext(picker, themeEditor));
		storesInitialized = true;
	}
	$: componentColor = $themeEditor?.userTheme?.uiColor ?? 'black';
	$: themeStyles = `--fg-color: var(--${componentColor}-fg-color); --active-fg-color: var(--${componentColor}-active-fg-color); --bg-color: var(--${componentColor}-bg-color); --hover-bg-color: var(--${componentColor}-hover-bg-color); --active-bg-color: var(--${componentColor}-active-bg-color); --border-color: var(--${componentColor}-fg-color); --panel-bg-color:var(--${componentColor}-active-bg-color);`;

	function handleUserThemeImported(e: CustomEvent<{ userTheme: UserThemeImported }>) {
		const { userTheme } = e.detail;
		$themeEditor.userTheme = userTheme;
		themeInitialized = true;
		contentViewer.changeComponentPrefix(userTheme.usesPrefix, userTheme.themePrefix);
		dispatch('uiColorChanged', { uiColor: userTheme.uiColor });
	}

	function handleUiColorChanged(_: CustomEvent<null>) {
		dispatch('uiColorChanged', { uiColor: $themeEditor.userTheme.uiColor });
	}

	function newUserTheme() {
		const createdAt = new Date().toISOString();
		$themeEditor.userTheme = {
			themeName: 'custom theme',
			uiColor: 'black',
			usesPrefix: false,
			themePrefix: '',
			createdAt,
			modifiedAt: createdAt,
			colorFormatSrgb: 'oklch',
			colorFormatP3: 'oklch',
			palettes: [createEmptyColorPalette()],
		};
		themeInitialized = true;
	}

	function closeUserTheme() {
		$themeEditor.selectedPaletteId = '';
		$themeEditor.userTheme = defaultUserThemeImported;
		themeInitialized = false;
		dispatch('uiColorChanged', { uiColor: $themeEditor.userTheme.uiColor });
	}

	function handleSetColorPicker(e: CustomEvent<{ color: CssColor }>) {
		const { color } = e.detail;
		const colorFormat =
			color.space === 'srgb' ? $themeEditor.userTheme.colorFormatSrgb : $themeEditor.userTheme.colorFormatP3;
		picker.setColor(color, colorFormat);
	}

	function handleAddNewColorToPalette(e: CustomEvent<{ color: ThemeColor }>) {
		const { color } = e.detail;
		themeEditor.addColorToPalette(color);
	}

	function handlePaletteSelected(e: CustomEvent<{ paletteId: string | null }>) {
		const { paletteId } = e.detail;
		if (paletteId) themeEditor.changeSelectedPalette(paletteId);
	}
</script>

{#if !themeInitialized}
	<LoadUserThemeModal bind:this={loadUserThemeModal} on:loadUserTheme={handleUserThemeImported} />
{:else}
	<AddColorToPaletteModal bind:this={addColorModal} on:addNewColor={handleAddNewColorToPalette} />
	<EditColorDetailsModal bind:this={editDetailsModal} />
	<EditThemeSettingsModal bind:this={editThemeSettingsModal} on:uiColorChanged={handleUiColorChanged} />
{/if}

{#if editorStateInitialized}
	<div class="theme-editor-wrapper" style={themeStyles}>
		<div id="theme-editor" data-testid={$themeEditor.editorId}>
			<div class="editor-left-col">
				<ColorPicker editMode={$themeEditor.editMode} bind:picker />
				{#if themeInitialized}
					<PaletteControls
						on:addColorToPalette={addColorModal.addColorToPalette}
						on:setColorPickerValue={handleSetColorPicker}
						on:updateThemeColor={themeEditor.updateThemeColor}
						on:deselectThemeColor={themeEditor.deselectColor}
					/>
				{/if}
			</div>
			<div class="editor-right-col">
				{#if storesInitialized}
					<UserTheme
						initialized={themeInitialized}
						themeColorPalettes={$app.themeColorPalettes}
						x11PalettesShown={$app.x11PalettesShown}
						on:newUserTheme={() => newUserTheme()}
						on:importUserTheme={() => loadUserThemeModal.toggleModal()}
						on:editThemeSettings={() => editThemeSettingsModal.toggleModal()}
						on:saveUserTheme={() => downloadUserThemeJson($themeEditor.userTheme)}
						on:closeUserTheme={() => closeUserTheme()}
						on:createPalette={themeEditor.createNewPalette}
						on:deletePalette={themeEditor.deletePalette}
						on:paletteSelected={handlePaletteSelected}
						on:colorSelected={(e) => themeEditor.changeSelectedColor(e.detail)}
						on:deleteColor={(e) => themeEditor.deleteColorFromPalette(e.detail)}
						on:editColorDetails={(e) => editDetailsModal.openModal(e.detail)}
					/>
				{/if}
			</div>
		</div>
		{#if storesInitialized}
			<ContentViewer bind:this={contentViewer} {componentColor} {themeInitialized}>
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
		--disabled-bg-color: var(--theme-background-color-disabled, var(--theme-default-background-color-disabled));
		--button-color: var(--fg-color);
		--button-color-hover: var(--fg-color);
		--button-color-active: var(--active-fg-color);
		--button-color-disabled: var(--gray4);
		--button-background-color: var(--bg-color);
		--button-background-color-hover: var(--hover-bg-color);
		--button-background-color-active: var(--active-bg-color);
		--button-background-color-disabled: var(--disabled-bg-color);
		--button-border: 2px solid var(--border-color);

		display: flex;
		flex-flow: column nowrap;
		gap: 2rem;
		width: 790px;
		background-color: var(--theme-app-background-color, var(--theme-default-app-background-color));
		padding: 1rem;
		margin: 0 auto;
	}

	#theme-editor {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
		margin: 0;
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
