import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component, d as createEventDispatcher, f as each, h as get_store_value, s as setContext, g as getContext, a as subscribe, m as missing_component, o as onDestroy, i as compute_slots, n as noop, j as set_store_value, k as null_to_empty, l as spread, p as escape_object, q as escape_attribute_value, t as tick, r as compute_rest_props } from "../../chunks/index2.js";
import { d as derived, w as writable } from "../../chunks/index.js";
import hljs from "highlight.js/lib/core";
import register from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import css$R from "highlight.js/lib/languages/css";
const SvgIcon_svelte_svelte_type_style_lang$1 = "";
const css$Q = {
  code: "svg.svelte-gp4bxt{stroke:currentcolor;fill:currentcolor;stroke-width:0;width:100%;height:auto;max-height:100%}",
  map: null
};
const SvgIcon$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = null } = $$props;
  let { viewBox } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
    $$bindings.viewBox(viewBox);
  $$result.css.add(css$Q);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("viewBox", viewBox, 0)} class="svelte-gp4bxt">${title ? `<title>${escape(title)}</title>` : ``}${slots.default ? slots.default({}) : ``}</svg>`;
});
const CaretDown$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 320 512" }, $$props), {}, {
    default: () => {
      return `<path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>`;
    }
  })}`;
});
const Option_svelte_svelte_type_style_lang = "";
const css$P = {
  code: "div.svelte-6zdda6{display:block;cursor:pointer;line-height:1.25rem;font-size:var(--select-menu-font-size, var(--select-menu-default-font-size));color:var(--select-menu-text-color, var(--select-menu-default-text-color));padding:var(--select-menu-item-padding, var(--select-menu-default-item-padding))}div.svelte-6zdda6:first-child{border-top-left-radius:var(--select-menu-border-radius, var(--select-menu-default-border-radius));border-top-right-radius:var(--select-menu-border-radius, var(--select-menu-default-border-radius))}div.svelte-6zdda6:last-child{border-bottom-left-radius:var(--select-menu-border-radius, var(--select-menu-default-border-radius));border-bottom-right-radius:var(--select-menu-border-radius, var(--select-menu-default-border-radius))}.active.svelte-6zdda6{background-color:var(\n			--select-menu-selected-item-background-color,\n			var(--select-menu-default-selected-item-background-color)\n		)}",
  map: null
};
const Option = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  let { label } = $$props;
  let { optionNumber } = $$props;
  let { active = false } = $$props;
  let { menuId: menuId2 } = $$props;
  createEventDispatcher();
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.optionNumber === void 0 && $$bindings.optionNumber && optionNumber !== void 0)
    $$bindings.optionNumber(optionNumber);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.menuId === void 0 && $$bindings.menuId && menuId2 !== void 0)
    $$bindings.menuId(menuId2);
  $$result.css.add(css$P);
  return `<div${add_attribute("data-value", value ? value : optionNumber, 0)} role="menuitem" tabindex="-1"${add_attribute(
    "id",
    menuId2 ? `${menuId2}-option-${optionNumber}` : `option-${optionNumber}`,
    0
  )}${add_attribute(
    "data-testid",
    menuId2 ? `${menuId2}-option-${optionNumber}` : `option-${optionNumber}`,
    0
  )} class="${["svelte-6zdda6", active ? "active" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : `
		${escape(label)}
	`}
</div>`;
});
const COMPONENT_COLORS = ["black", "red", "orange", "yellow", "green", "teal", "blue", "indigo"];
const SCOPED_CSS_REGEX = /.s-[A-Za-z0-9-_]+/g;
const alphaBgPattern = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");`;
const defaultCssColor = {
  hex: "",
  rgb: {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  },
  rgbString: "",
  hsl: {
    h: 0,
    s: 0,
    l: 0,
    a: 0
  },
  hslString: "",
  hasAlpha: false,
  hexAlpha: "",
  rgbaString: "",
  hslaString: ""
};
const defaultUserThemeImported = {
  themeName: "",
  usesPrefix: false,
  themePrefix: "",
  createdAt: "",
  modifiedAt: "",
  colorFormat: "hsl",
  uiColor: "black",
  palettes: []
};
const defaultThemeEditorState = {
  editorId: "",
  userTheme: defaultUserThemeImported,
  selectedPaletteId: "",
  colorSelected: false,
  selectedColor: {
    color: defaultCssColor
  },
  editMode: false,
  modalOpen: false,
  currentlyViewing: "component"
};
const normalize = (s) => s.replaceAll(/[\s-_]/g, "").toLowerCase();
const removeScopedCssClassNames = (s) => s.replaceAll(SCOPED_CSS_REGEX, "");
const getRandomHexString$1 = (length) => Array.from({ length }, () => Math.floor(Math.random() * 16)).map((n) => Number(n).toString(16)).join("");
function groupByProperty(array, property) {
  return array.reduce((grouped, item) => {
    const groupVal = item[property].toString();
    grouped[groupVal] = grouped[groupVal] || [];
    grouped[groupVal].push(item);
    return grouped;
  }, {});
}
function getRandomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
const styleSheetIsInThisDomain = (styleSheet) => !styleSheet.href || styleSheet.href.indexOf(window.location.origin) === 0;
const isCssStyleRule = (rule) => rule instanceof CSSStyleRule;
function getAllCssVariables(args) {
  if (typeof window === "undefined")
    return [];
  const defaultArgs = {
    ignoreTailwinds: true,
    removeScopedCssClasses: true,
    prefixBlackList: [],
    prefixWhiteList: [],
    selectorBlackList: [],
    selectorWhiteList: []
  };
  const {
    ignoreTailwinds,
    removeScopedCssClasses,
    prefixBlackList,
    prefixWhiteList,
    selectorBlackList: selectorBlackList2,
    selectorWhiteList
  } = {
    ...defaultArgs,
    ...args
  };
  const invalidPrefixes = [...prefixBlackList, ...prefixWhiteList].filter((prefix) => prefix.indexOf("--") !== 0);
  if (invalidPrefixes.length) {
    const invalidPrefixList = invalidPrefixes.map((p) => `"${p}"`).join(", ");
    const maybePlural = invalidPrefixes.length > 1 ? "are invalid prefixes" : "is an invalid prefix";
    throw new Error(`${invalidPrefixList} ${maybePlural} for CSS variable names`);
  }
  let cssRules = Array.from(document.styleSheets).filter(styleSheetIsInThisDomain).map((sheet) => sheet.cssRules).map((ruleList) => Array.from(ruleList).filter(isCssStyleRule)).flat();
  if (selectorBlackList2.length) {
    cssRules = cssRules.filter((rule) => !selectorBlackList2.some((selector) => rule.selectorText.includes(selector)));
  }
  if (selectorWhiteList.length) {
    cssRules = cssRules.filter((rule) => selectorWhiteList.some((selector) => rule.selectorText.includes(selector)));
  }
  let cssVariables = cssRules.map((rule) => {
    const ruleSelector = removeScopedCssClasses ? removeScopedCssClassNames(rule.selectorText) : rule.selectorText;
    return Array.from(rule.style).filter((propName) => propName.indexOf("--") === 0).map((propName, i) => ({
      id: (i + 1).toString(),
      name: propName.trim(),
      selector: ruleSelector,
      value: rule.style.getPropertyValue(propName).trim(),
      addToTheme: false
    }));
  }).flat();
  if (ignoreTailwinds) {
    cssVariables = cssVariables.filter((cssVar) => cssVar.name.indexOf("--tw") === -1);
  }
  if (prefixWhiteList.length) {
    cssVariables = prefixWhiteList.map((prefix) => cssVariables.filter((cssVar) => cssVar.name.indexOf(`${prefix}-`) === 0)).flat();
  } else {
    for (const prefix of prefixBlackList) {
      cssVariables = cssVariables.filter((cssVar) => cssVar.name.indexOf(`${prefix}-`) === -1);
    }
  }
  return cssVariables.sort(
    (a, b) => String(a.name).localeCompare(String(b.name)) || String(a.selector).localeCompare(String(b.selector))
  );
}
const getThemeEditorSlotExampleCode = () => `<script lang="ts">
	import { ComponentCssEditor } from '@a-luna/svelte-color-tools';
	import YourComponent from 'YourComponent.svelte';
<\/script>

<ComponentCssEditor>
	<YourComponent />
</ComponentCssEditor>`;
const Select_svelte_svelte_type_style_lang = "";
const css$O = {
  code: ".select-menu-wrapper.svelte-rjvx9g{--select-menu-default-width:100%;--select-menu-default-margin:0;--select-menu-default-flex:0 1 auto;--select-menu-default-text-color:hsl(0, 0%, 10%);--select-menu-default-no-selection-text-color:var(--dark-gray4);--select-menu-default-background-color:hsl(0, 0%, 100%);--select-menu-default-hover-background-color:hsl(0, 0%, 95%);--select-menu-default-disabled-text-color:hsl(0, 0%, 30%);--select-menu-default-disabled-background-color:hsl(0, 0%, 80%);--select-menu-default-font-size:0.875rem;--select-menu-default-height:36px;--select-menu-default-display:inline-flex;--select-menu-default-justify-content:space-between;--select-menu-default-align-items:center;--select-menu-default-gap:10px;--select-menu-default-padding:7px 6px;--select-menu-default-border-width:0;--select-menu-default-border-style:solid;--select-menu-default-border-color:hsl(0, 0%, 75%);--select-menu-default-border-radius:6px;--select-menu-default-box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.05);--select-menu-default-focus-outline-width:0;--select-menu-default-focus-outline-style:solid;--select-menu-default-focus-outline-color:hsla(217.2 91.2% 59.8% / 0.5);--select-menu-default-focus-ring-color:rgb(31 41 55);--select-menu-default-focus-ring-offset-color:hsl(220 14.3% 95.9%);--select-menu-default-focus-ring-offset-width:2px;--focus-ring-shadow:0 0 0\n			calc(2px + var(--select-menu-focus-ring-offset-width, var(--select-menu-default-focus-ring-offset-width)))\n			var(--select-menu-focus-ring-color, var(--select-menu-default-focus-ring-color));--focus-ring-offset-shadow:0 0 0\n			var(--select-menu-focus-ring-offset-width, var(--select-menu-default-focus-ring-offset-width))\n			var(--select-menu-focus-ring-offset-color, var(--select-menu-default-focus-ring-offset-color));--focus-ring-box-shadow:var(--focus-ring-offset-shadow), var(--focus-ring-shadow), 0 0 #0000;--select-menu-default-dropdown-height:auto;--select-menu-default-dropdown-margin:0.5rem 0 0 0;--select-menu-default-dropdown-box-shadow:0 0 0 0px #fff, 0 0 0 1px rbg(0 0 0 / 0.05), 0 0 #0000;--select-menu-default-selected-item-background-color:hsl(0, 0%, 90%);--select-menu-default-item-padding:0.5rem 1rem;position:relative;display:inline-block;text-align:left;width:var(--select-menu-width, var(--select-menu-default-width));margin:var(--select-menu-margin, var(--select-menu-default-margin));flex:var(--select-menu-flex, var(--select-menu-default-flex))}.menu-icon.svelte-rjvx9g{width:var(--select-menu-font-size, var(--select-menu-default-font-size));height:var(--select-menu-font-size, var(--select-menu-default-font-size))}.open-list-button.svelte-rjvx9g{font-size:var(--select-menu-font-size, var(--select-menu-default-font-size));height:var(--select-menu-height, var(--select-menu-default-height));display:var(--select-menu-display, var(--select-menu-default-display));justify-content:var(--select-menu-justify-content, -var(-select-menu-default-justify-content));align-items:var(--select-menu-align-items, var(--select-menu-default-align-items));gap:var(--select-menu-gap, var(--select-menu-default-gap));padding:var(--select-menu-padding, var(--select-menu-default-padding));border-width:var(--select-menu-border-width, var(--select-menu-default-border-width));border-style:var(--select-menu-border-style, var(--select-menu-default-border-style));border-color:var(--select-menu-border-color, var(--select-menu-default-border-color));border-radius:var(--select-menu-border-radius, var(--select-menu-default-border-radius));box-shadow:var(--select-menu-box-shadow, var(--select-menu-default-box-shadow));width:100%}.open-list-button.svelte-rjvx9g,.dropdown.svelte-rjvx9g{background-color:var(--select-menu-background-color, var(--select-menu-default-background-color));color:var(--select-menu-text-color, var(--select-menu-default-text-color));border:1px solid var(--select-menu-border-color, var(--select-menu-default-border-color))}.open-list-button.svelte-rjvx9g:focus{outline:0;box-shadow:var(--focus-ring-box-shadow)}.open-list-button.svelte-rjvx9g:hover{background-color:var(--select-menu-hover-background-color, var(--select-menu-default-hover-background-color))}.open-list-button.disabled.svelte-rjvx9g{cursor:default;color:var(--select-menu-disabled-text-color, var(--select-menu-default-disabled-text-color, var(--dark-gray2)));background-color:var(\n			--select-menu-disabled-background-color,\n			var(--select-menu-default-disabled-background-color, var(--light-gray1))\n		)}.open-list-button.no-selection.svelte-rjvx9g{color:var(--select-menu-no-selection-text-color, var(--select-menu-default-no-selection-text-color, var(--gray4)))}.dropdown.svelte-rjvx9g{position:absolute;transform-origin:top right;right:0;z-index:10;width:100%;overflow-y:auto;height:var(--select-menu-dropdown-height, var(--select-menu-default-dropdown-height));margin:var(--select-menu-dropdown-margin, var(--select-menu-default-dropdown-margin));border-radius:var(--select-menu-border-radius, var(--select-menu-default-border-radius));box-shadow:var(--select-menu-dropdown-box-shadow, var(--select-menu-default-dropdown-box-shadow))}.dropdown.svelte-rjvx9g:focus{outline:0}.selected-value.svelte-rjvx9g{line-height:1;white-space:nowrap;margin:0 auto}",
  map: null
};
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let label;
  let noSelection;
  let { menuId: menuId2 = `select-menu-${getRandomHexString$1(4)}` } = $$props;
  let { menuLabel: menuLabel2 = "Options" } = $$props;
  let { options = [] } = $$props;
  let { selectedValue } = $$props;
  let { disabled = false } = $$props;
  let { displaySelectedOptionText = true } = $$props;
  let { dropdownShown = false } = $$props;
  let { style = "" } = $$props;
  let selectedOption;
  const dispatch = createEventDispatcher();
  function handleOptionClicked(selectedOptionNumber) {
    if (options.length > 0) {
      options.forEach((menuOption) => menuOption.active = false);
      selectedOption = options.find((menuOption) => menuOption.optionNumber == selectedOptionNumber);
      if (selectedOption) {
        selectedOption.active = true;
        dispatch("changed", selectedOption.value);
      }
      dropdownShown = false;
    }
  }
  if ($$props.menuId === void 0 && $$bindings.menuId && menuId2 !== void 0)
    $$bindings.menuId(menuId2);
  if ($$props.menuLabel === void 0 && $$bindings.menuLabel && menuLabel2 !== void 0)
    $$bindings.menuLabel(menuLabel2);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.selectedValue === void 0 && $$bindings.selectedValue && selectedValue !== void 0)
    $$bindings.selectedValue(selectedValue);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.displaySelectedOptionText === void 0 && $$bindings.displaySelectedOptionText && displaySelectedOptionText !== void 0)
    $$bindings.displaySelectedOptionText(displaySelectedOptionText);
  if ($$props.dropdownShown === void 0 && $$bindings.dropdownShown && dropdownShown !== void 0)
    $$bindings.dropdownShown(dropdownShown);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.handleOptionClicked === void 0 && $$bindings.handleOptionClicked && handleOptionClicked !== void 0)
    $$bindings.handleOptionClicked(handleOptionClicked);
  $$result.css.add(css$O);
  {
    if (options && selectedValue !== selectedOption?.value) {
      options.forEach((menuOption) => menuOption.active = false);
      selectedOption = options.find((menuOption) => menuOption.value == selectedValue);
      if (selectedOption) {
        selectedOption.active = true;
        selectedValue = selectedOption.value;
      }
    }
  }
  label = displaySelectedOptionText ? selectedOption?.label ?? menuLabel2 : menuLabel2;
  noSelection = selectedValue === "";
  return `



<div class="select-menu-wrapper svelte-rjvx9g"${add_attribute("data-testid", menuId2, 0)}${add_attribute("style", style, 0)}><div><button type="button" class="${[
    "open-list-button svelte-rjvx9g",
    (disabled ? "disabled" : "") + " " + (noSelection ? "no-selection" : "")
  ].join(" ").trim()}" id="${escape(menuId2, true) + "-open-list-button"}" data-testid="${escape(menuId2, true) + "-open-list-button"}"${add_attribute("aria-expanded", dropdownShown, 0)} aria-haspopup="true"><span class="selected-value svelte-rjvx9g">${slots.selectedValue ? slots.selectedValue({}) : `
					${escape(label)}
				`}</span>
			<div class="menu-icon svelte-rjvx9g">${validate_component(CaretDown$1, "CaretDown").$$render($$result, {}, {}, {})}</div></button></div>
	${dropdownShown ? `<div class="dropdown svelte-rjvx9g" role="menu" aria-orientation="vertical" aria-labelledby="${escape(menuId2, true) + "-open-list-button"}" tabindex="-1">${slots.options ? slots.options({}) : `
				${each(options, (option) => {
    return `${validate_component(Option, "Option").$$render($$result, Object.assign({}, option, { menuId: menuId2 }), {}, {})}`;
  })}
			`}</div>` : ``}
</div>`;
});
const menuId$1 = "select-color-space";
const menuLabel$3 = "";
const ColorSpaceSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "rgb" } = $$props;
  let { disabled = false } = $$props;
  const options = [
    {
      label: "RGB",
      value: "rgb",
      optionNumber: 1,
      active: false
    },
    {
      label: "RGBA",
      value: "rgba",
      optionNumber: 2,
      active: false
    },
    {
      label: "HSL",
      value: "hsl",
      optionNumber: 3,
      active: false
    },
    {
      label: "HSLA",
      value: "hsla",
      optionNumber: 4,
      active: false
    }
  ];
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `${validate_component(Select, "Select").$$render(
    $$result,
    {
      menuId: menuId$1,
      menuLabel: menuLabel$3,
      options,
      disabled,
      selectedValue: value
    },
    {},
    {}
  )}`;
});
const namedColors = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "currentcolor",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "Darkorange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "inherit",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "transparent",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen"
];
const RGB_REGEX = /^rgb\(((((((?<redDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?))(((?<greenDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?))|(((?<redDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s))(((?<greenDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)))(?<blueDec>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((?<redPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)((?<greenPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)|((?<redPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s)((?<greenPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s))(?<bluePerc>([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
const RGBA_REGEX = /^rgba\(((((((?<redDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?))(((?<greenDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?))(((?<blueDecA>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)))|(((?<redPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)((?<greenPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)((?<bluePercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?)))|((((?<redDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)((?<greenDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)((?<blueDecB>(1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s))|(((?<redPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s)((?<greenPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s)((?<bluePercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s)))\/\s)((?<alphaFloatA>0?\.\d+)|(?<alphaFloatB>[01])|(?<alphaPerc>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
const HEX_REGEX = /^#((?<redHexA>[\da-f])(?<greenHexA>[\da-f])(?<blueHexA>[\da-f]))$|^#((?<redHexB>[\da-f])(?<redHexC>[\da-f])(?<greenHexB>[\da-f])(?<greenHexC>[\da-f])(?<blueHexB>[\da-f])(?<blueHexC>[\da-f]))$/i;
const HEXA_REGEX = /^#((?<redHexA>[\da-f])(?<greenHexA>[\da-f])(?<blueHexA>[\da-f])(?<alphaHexA>[\da-f]))$|^#((?<redHexB>[\da-f])(?<redHexC>[\da-f])(?<greenHexB>[\da-f])(?<greenHexC>[\da-f])(?<blueHexB>[\da-f])(?<blueHexC>[\da-f])(?<alphaHexB>[\da-f])(?<alphaHexC>[\da-f]))$/i;
const HSL_REGEX = /^hsl\((((?<hueDeg>(([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(?<hueTurn>0|0?\.\d+)turn|(?<hueRad>(([0-6](\.\d+)?)|(\.\d+)))rad)((,\s?(?<satPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(,\s?(?<lightPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)|(\s(?<satPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(\s(?<lightPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
const HSLA_REGEX = /^hsla\((((?<hueDeg>(([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(?<hueTurn>0|0?\.\d+)turn|(?<hueRad>(([0-6](\.\d+)?)|(\.\d+)))rad)(((,\s?(?<satPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(,\s?(?<lightPercA>([1-9]?\d(\.\d+)?)|100|(\.\d+))%),\s?)|((\s(?<satPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)(\s(?<lightPercB>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\s\/\s))((?<alphaFloatA>0?\.\d+)|(?<alphaFloatB>[01])|(?<alphaPerc>([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
const byteIntToHexString = (byteInt) => 0 <= byteInt && byteInt < 256 ? byteInt.toString(16).toUpperCase().padStart(2, "0") : "??";
const getRandomHueValue = () => getRandomArrayItem(Array.from({ length: 360 }, (_, i) => i));
const decimalToOpacityValue = (decimal) => parseFloat((decimal / 255).toFixed(2));
const percentToDecimalValue = (percent) => Math.round(percent / 100 * 255);
const rgbToString = (rgb) => `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
const rgbaToString = (rgb) => `rgba(${rgb.r} ${rgb.g} ${rgb.b} / ${decimalToOpacityValue(rgb.a)})`;
const hslToString = (hsl) => `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`;
const hslaToString = (hsl) => `hsla(${hsl.h} ${hsl.s}% ${hsl.l}% / ${hsl.a})`;
const rgbToHex = (rgb) => `#${byteIntToHexString(rgb.r)}${byteIntToHexString(rgb.g)}${byteIntToHexString(rgb.b)}`;
const rgbaToHex = (rgb) => `#${byteIntToHexString(rgb.r)}${byteIntToHexString(rgb.g)}${byteIntToHexString(rgb.b)}${byteIntToHexString(rgb.a)}`;
const findNamedColor = (name) => namedColors.find((color) => color.toLowerCase() === normalize(name));
function parseColorFromString(s) {
  let match = RGB_REGEX.exec(s);
  if (match) {
    return parseRgb(match, false);
  }
  match = RGBA_REGEX.exec(s);
  if (match) {
    return parseRgb(match, true);
  }
  match = HEX_REGEX.exec(s);
  if (match) {
    return parseHex(match, false);
  }
  match = HEXA_REGEX.exec(s);
  if (match) {
    return parseHex(match, true);
  }
  match = HSL_REGEX.exec(s);
  if (match) {
    return parseHsl(match, false);
  }
  match = HSLA_REGEX.exec(s);
  if (match) {
    return parseHsl(match, true);
  }
  return parseNamedColor(s);
}
function parseRgb(match, hasAlpha) {
  const rgb = { r: 0, g: 0, b: 0, a: 255 };
  const redDec = match.groups.redDecA ?? match.groups.redDecB;
  const greenDec = match.groups.greenDecA ?? match.groups.greenDecB;
  const blueDec = match.groups.blueDec ?? match.groups.blueDecA ?? match.groups.blueDecB;
  const redPerc = match.groups.redPercA ?? match.groups.redPercB;
  const greenPerc = match.groups.greenPercA ?? match.groups.greenPercB;
  const bluePerc = match.groups.bluePerc ?? match.groups.bluePercA ?? match.groups.bluePercB;
  if (redDec && greenDec && blueDec) {
    rgb.r = parseInt(redDec);
    rgb.g = parseInt(greenDec);
    rgb.b = parseInt(blueDec);
  } else if (redPerc && greenPerc && bluePerc) {
    rgb.r = percentToDecimalValue(parseFloat(redPerc));
    rgb.g = percentToDecimalValue(parseFloat(greenPerc));
    rgb.b = percentToDecimalValue(parseFloat(bluePerc));
  }
  if (hasAlpha) {
    const alphaFloat = match.groups.alphaFloatA ?? match.groups.alphaFloatB;
    const alphaPerc = match.groups.alphaPerc;
    if (alphaFloat) {
      rgb.a = Math.round(parseFloat(alphaFloat) * 255);
    } else if (alphaPerc) {
      rgb.a = percentToDecimalValue(parseFloat(alphaPerc));
    }
  }
  const hsl = rgbaToHsla(rgb);
  const hex = rgbToHex(rgb);
  const hexAlpha = rgbaToHex(rgb);
  return {
    success: true,
    value: {
      rgb,
      hsl,
      hex,
      hasAlpha,
      hexAlpha,
      rgbString: rgbToString(rgb),
      hslString: hslToString(hsl),
      rgbaString: rgbaToString(rgb),
      hslaString: hslaToString(hsl),
      name: hasAlpha ? hexAlpha : hex
    }
  };
}
function rgbaToHsla(rgb) {
  const hsl = rgbToHsl(rgb);
  return { ...hsl, a: decimalToOpacityValue(rgb.a) };
}
function rgbToHsl(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const cmax = Math.max(r, g, b);
  const cmin = Math.min(r, g, b);
  const delta = cmax - cmin;
  const h = calculateHue(r, g, b, cmax, delta);
  const l = (cmax + cmin) / 2;
  const s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return { h, s: parseFloat((s * 100).toFixed(1)), l: parseFloat((l * 100).toFixed(1)), a: 1 };
}
function calculateHue(r, g, b, cmax, delta) {
  let h;
  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = (g - b) / delta % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else if (cmax === b) {
    h = (r - g) / delta + 4;
  }
  h = h * 60;
  h = h >= 0 ? h : h + 360;
  return parseFloat(h.toFixed(1));
}
function parseHex(match, hasAlpha) {
  let { didParse, rgb, hsl, hex } = parseHexCondensedFormat(match, hasAlpha);
  if (!didParse) {
    ({ didParse, rgb, hsl, hex } = parseHexFullFormat(match, hasAlpha));
  }
  const hexAlpha = rgbaToHex(rgb);
  return {
    success: true,
    value: {
      rgb,
      hsl,
      hex,
      hasAlpha,
      hexAlpha,
      rgbString: rgbToString(rgb),
      hslString: hslToString(hsl),
      rgbaString: rgbaToString(rgb),
      hslaString: hslaToString(hsl),
      name: hasAlpha ? hexAlpha : hex
    }
  };
}
function parseHexCondensedFormat(match, hasAlpha) {
  let didParse = false;
  let rgb;
  let hsl;
  let hex;
  const redHex = match.groups.redHexA;
  const greenHex = match.groups.greenHexA;
  const blueHex = match.groups.blueHexA;
  if (redHex && greenHex && blueHex) {
    rgb = {
      r: parseInt(`${redHex}${redHex}`, 16),
      g: parseInt(`${greenHex}${greenHex}`, 16),
      b: parseInt(`${blueHex}${blueHex}`, 16),
      a: 255
    };
    if (hasAlpha) {
      const alphaHex = match.groups.alphaHexA;
      rgb.a = parseInt(`${alphaHex}${alphaHex}`, 16);
      hsl = rgbaToHsla(rgb);
      hex = `#${redHex}${redHex}${greenHex}${greenHex}${blueHex}${blueHex}${alphaHex}${alphaHex}`;
    } else {
      hsl = rgbToHsl(rgb);
      hex = `#${redHex}${redHex}${greenHex}${greenHex}${blueHex}${blueHex}`;
    }
    didParse = true;
  }
  return { didParse, rgb, hsl, hex: hex?.toUpperCase() };
}
function parseHexFullFormat(match, hasAlpha) {
  let didParse = false;
  let rgb;
  let hsl;
  let hex;
  const redHex1 = match.groups.redHexB;
  const redHex2 = match.groups.redHexC;
  const greenHex1 = match.groups.greenHexB;
  const greenHex2 = match.groups.greenHexC;
  const blueHex1 = match.groups.blueHexB;
  const blueHex2 = match.groups.blueHexC;
  if (redHex1 && redHex2 && greenHex1 && greenHex2 && blueHex1 && blueHex2) {
    rgb = {
      r: parseInt(`${redHex1}${redHex2}`, 16),
      g: parseInt(`${greenHex1}${greenHex2}`, 16),
      b: parseInt(`${blueHex1}${blueHex2}`, 16),
      a: 255
    };
    if (hasAlpha) {
      const alphaHex1 = match.groups.alphaHexB;
      const alphaHex2 = match.groups.alphaHexC;
      rgb.a = parseInt(`${alphaHex1}${alphaHex2}`, 16);
      hex = `#${redHex1}${redHex2}${greenHex1}${greenHex2}${blueHex1}${blueHex2}${alphaHex1}${alphaHex2}`;
      hsl = rgbaToHsla(rgb);
    } else {
      hex = `#${redHex1}${redHex2}${greenHex1}${greenHex2}${blueHex1}${blueHex2}`;
      hsl = rgbToHsl(rgb);
    }
    didParse = true;
  }
  return { didParse, rgb, hsl, hex: hex?.toUpperCase() };
}
function parseHsl(match, hasAlpha) {
  const hsl = { h: parseHue(match), a: 1, ...parseSaturationAndLightness(match) };
  if (hasAlpha) {
    let alpha = match.groups.alphaFloatA ?? match.groups.alphaFloatB;
    if (!alpha) {
      alpha = (parseFloat(match.groups.alphaPerc) / 100).toFixed(2);
    }
    hsl.a = parseFloat(alpha);
  }
  const rgb = hslaToRgba(hsl);
  const hex = rgbToHex(rgb);
  const hexAlpha = rgbaToHex(rgb);
  return {
    success: true,
    value: {
      rgb,
      hsl,
      hex,
      hasAlpha,
      hexAlpha,
      rgbString: rgbToString(rgb),
      hslString: hslToString(hsl),
      rgbaString: rgbaToString(rgb),
      hslaString: hslaToString(hsl),
      name: hasAlpha ? hexAlpha : hex
    }
  };
}
function parseHue(match) {
  const hueDeg = match.groups.hueDeg;
  const hueRad = match.groups.hueRad;
  const hueTurn = match.groups.hueTurn;
  let hue;
  if (hueDeg) {
    hue = hueDeg;
  } else if (hueRad) {
    hue = (parseFloat(hueRad) * (180 / Math.PI)).toFixed(2);
  } else if (hueTurn) {
    hue = (parseFloat(hueTurn) * 360).toFixed(2);
  }
  return parseFloat(hue);
}
function parseSaturationAndLightness(match) {
  const satPerc = match.groups.satPercA ?? match.groups.satPercB;
  const lightPerc = match.groups.lightPercA ?? match.groups.lightPercB;
  return { s: parseFloat(satPerc), l: parseFloat(lightPerc) };
}
function hslaToRgba(hsl) {
  const rgb = hslToRgb(hsl);
  return { ...rgb, a: Math.round(hsl.a * 255) };
}
function hslToRgb(hsl) {
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(hsl.h / 60 % 2 - 1));
  const match = l - chroma / 2;
  let [r, g, b] = [0, 0, 0];
  if (0 <= hsl.h && hsl.h < 60) {
    r = chroma;
    g = x;
    b = 0;
  } else if (60 <= hsl.h && hsl.h < 120) {
    r = x;
    g = chroma;
    b = 0;
  } else if (120 <= hsl.h && hsl.h < 180) {
    r = 0;
    g = chroma;
    b = x;
  } else if (180 <= hsl.h && hsl.h < 240) {
    r = 0;
    g = x;
    b = chroma;
  } else if (240 <= hsl.h && hsl.h < 300) {
    r = x;
    g = 0;
    b = chroma;
  } else if (300 <= hsl.h && hsl.h < 360) {
    r = chroma;
    g = 0;
    b = x;
  }
  r = Math.round((r + match) * 255);
  g = Math.round((g + match) * 255);
  b = Math.round((b + match) * 255);
  return { r, g, b };
}
function parseNamedColor(name) {
  const namedColor = findNamedColor(name);
  if (namedColor) {
    const rgb = namedColorToRgb(namedColor);
    if (rgb) {
      let result;
      let match = RGB_REGEX.exec(rgb);
      if (match) {
        result = parseRgb(match, false);
      }
      match = RGBA_REGEX.exec(rgb);
      if (match) {
        result = parseRgb(match, true);
      }
      if (result && result.success) {
        const color = result.value;
        color.name = namedColor;
        return { success: true, value: color };
      }
    }
  }
  return { success: false, error: Error(`Unable to parse "${name}" as a valid color value`) };
}
function namedColorToRgb(name) {
  if (typeof window !== "undefined") {
    const testDiv = document.createElement("div");
    testDiv.style.color = name;
    document.body.appendChild(testDiv);
    const compStyles = window.getComputedStyle(testDiv);
    const colorRgb = compStyles.getPropertyValue("color");
    document.body.removeChild(testDiv);
    return colorRgb;
  }
}
function getX11ColorPalettes() {
  const hueRanges = [
    { hueStart: -30, hueEnd: 30, name: "red - orange", componentColor: "red" },
    { hueStart: 30, hueEnd: 45, name: "orange", componentColor: "orange" },
    { hueStart: 45, hueEnd: 60, name: "yellow", componentColor: "yellow" },
    { hueStart: 60, hueEnd: 150, name: "green", componentColor: "green" },
    { hueStart: 150, hueEnd: 195, name: "teal - light blue", componentColor: "teal" },
    { hueStart: 195, hueEnd: 240, name: "light blue - blue", componentColor: "blue" },
    { hueStart: 240, hueEnd: 330, name: "blue - magenta", componentColor: "indigo" }
  ];
  const [colors, grays] = getX11ColorsOrderedByHue();
  const colorPalettes = hueRanges.map(({ hueStart, hueEnd, name, componentColor }) => ({
    id: getRandomHexString$1(4),
    propName: String(componentColor),
    displayName: name,
    colors: getColorsInHueRange(hueStart, hueEnd, colors).map((c) => ({ color: c })),
    componentColor
  }));
  const grayPalette = {
    id: getRandomHexString$1(4),
    propName: "grayPalette",
    displayName: "black - white",
    colors: grays.map((c) => ({ color: c })),
    componentColor: "black"
  };
  return [...colorPalettes, grayPalette];
}
function getX11ColorsOrderedByHue() {
  const allColorsWithDupes = namedColors.filter((name) => name !== "currentcolor" && name !== "inherit").map((name) => ({ name, result: parseNamedColor(name) })).filter(({ result: { success } }) => success).map(({ name, result: { value } }) => ({ ...value, name }));
  const allColors = removeDuplicateColors(allColorsWithDupes);
  const colors = allColors.filter(({ hsl }) => hsl.s > 0 && hsl.l < 95).sort(sortColors);
  const noSaturation = allColors.filter(({ hsl }) => hsl.s === 0).sort(sortColors);
  const maxLightness = allColors.filter(({ hsl }) => hsl.l >= 95).sort(sortColors);
  const grays = [...noSaturation, ...maxLightness];
  return [colors, removeDuplicateColors(grays)];
}
function getColorsInHueRange(hueStart, hueEnd, colors) {
  if (hueStart < 0 && hueEnd > 0) {
    return [...getColorsInHueRange(hueStart + 360, 360, colors), ...getColorsInHueRange(0, hueEnd, colors)];
  }
  return colors.filter((c) => hueStart < c.hsl.h && c.hsl.h <= hueEnd);
}
const removeDuplicateColors = (colors) => Object.values(groupByProperty(colors, "hexAlpha")).map(
  (g) => g.length === 1 ? g[0] : { ...g[0], name: combineColorNames(g) }
);
const combineColorNames = (colors) => [...new Set(colors.map((c) => c?.name ? c.name : ""))].filter((n) => n).join("/");
const sortColors = (a, b) => a.hsl.l - b.hsl.l || a.hsl.s - b.hsl.s || a.hsl.h - b.hsl.h;
function createEmptyColorPalette(name = "custom palette") {
  const id = getRandomHexString$1(4);
  return {
    id,
    propName: `palette-${id}`,
    displayName: name,
    colors: [],
    componentColor: "black"
  };
}
function colorNameisCustomized(color) {
  const cssValues = [color.hex, color.hexAlpha, color.hslString, color.hslaString, color.rgbString, color.rgbaString];
  return !cssValues.includes(color.name);
}
const ColorSlider_svelte_svelte_type_style_lang = "";
const css$N = {
  code: "label.svelte-15ayqj5{width:15px}.value.svelte-15ayqj5{width:43px}.disabled.svelte-15ayqj5{color:var(--dark-gray1)}input[type='range'].svelte-15ayqj5:focus{outline:1px solid transparent}",
  map: null
};
const ColorSlider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formattedValue;
  let { name } = $$props;
  let { min = 0 } = $$props;
  let { max = 255 } = $$props;
  let { step = 1 } = $$props;
  let { value } = $$props;
  let { disabled = false } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  $$result.css.add(css$N);
  formattedValue = disabled ? "" : ["S", "L"].includes(name) ? `${value}%` : value?.toString();
  return `



<div class="${[
    "flex flex-row flex-nowrap items-center gap-2 svelte-15ayqj5",
    disabled ? "disabled" : ""
  ].join(" ").trim()}"><label for="slider" class="text-right flex-initial font-medium svelte-15ayqj5">${escape(name)}</label>
	<input id="${escape(name, true) + "-slider"}" data-testid="${escape(name, true) + "-slider"}" type="range"${add_attribute("min", min, 0)}${add_attribute("max", max, 0)}${add_attribute("step", step, 0)} ${disabled ? "disabled" : ""} class="m-0 flex-grow svelte-15ayqj5"${add_attribute("value", value, 0)}>
	<span class="value flex-initial font-medium svelte-15ayqj5" data-testid="${escape(name, true) + "-slider-value"}">${escape(formattedValue)}</span>
</div>`;
});
const HslColorChannels = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let disabled;
  let { alphaEnabled = false } = $$props;
  let { editable } = $$props;
  let { h } = $$props;
  let { s } = $$props;
  let { l } = $$props;
  let { a = 0 } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.alphaEnabled === void 0 && $$bindings.alphaEnabled && alphaEnabled !== void 0)
    $$bindings.alphaEnabled(alphaEnabled);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.h === void 0 && $$bindings.h && h !== void 0)
    $$bindings.h(h);
  if ($$props.s === void 0 && $$bindings.s && s !== void 0)
    $$bindings.s(s);
  if ($$props.l === void 0 && $$bindings.l && l !== void 0)
    $$bindings.l(l);
  if ($$props.a === void 0 && $$bindings.a && a !== void 0)
    $$bindings.a(a);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    disabled = !editable;
    {
      if (!alphaEnabled)
        dispatch("hslColorChanged", `hsl(${h} ${s}% ${l}%)`);
    }
    $$rendered = `${validate_component(ColorSlider, "ColorSlider").$$render(
      $$result,
      { name: "H", max: 359, disabled, value: h },
      {
        value: ($$value) => {
          h = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(ColorSlider, "ColorSlider").$$render(
      $$result,
      { name: "S", max: 100, disabled, value: s },
      {
        value: ($$value) => {
          s = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(ColorSlider, "ColorSlider").$$render(
      $$result,
      { name: "L", max: 100, disabled, value: l },
      {
        value: ($$value) => {
          l = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${alphaEnabled ? `${validate_component(ColorSlider, "ColorSlider").$$render(
      $$result,
      {
        name: "A",
        max: 1,
        step: 0.01,
        disabled,
        value: a
      },
      {
        value: ($$value) => {
          a = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `<div style="width: 100%; height: 20px"></div>`}`;
  } while (!$$settled);
  return $$rendered;
});
const RgbColorChannels = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let disabled;
  let { alphaEnabled = false } = $$props;
  let { editable } = $$props;
  let { r } = $$props;
  let { g } = $$props;
  let { b } = $$props;
  let { a = 0 } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.alphaEnabled === void 0 && $$bindings.alphaEnabled && alphaEnabled !== void 0)
    $$bindings.alphaEnabled(alphaEnabled);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.r === void 0 && $$bindings.r && r !== void 0)
    $$bindings.r(r);
  if ($$props.g === void 0 && $$bindings.g && g !== void 0)
    $$bindings.g(g);
  if ($$props.b === void 0 && $$bindings.b && b !== void 0)
    $$bindings.b(b);
  if ($$props.a === void 0 && $$bindings.a && a !== void 0)
    $$bindings.a(a);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    disabled = !editable;
    alphaEnabled ? decimalToOpacityValue(a) : 1;
    {
      if (!alphaEnabled)
        dispatch("rgbColorChanged", `rgb(${r} ${g} ${b})`);
    }
    $$rendered = `${validate_component(ColorSlider, "ColorSlider").$$render(
      $$result,
      { name: "R", disabled, value: r },
      {
        value: ($$value) => {
          r = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(ColorSlider, "ColorSlider").$$render(
      $$result,
      { name: "G", disabled, value: g },
      {
        value: ($$value) => {
          g = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(ColorSlider, "ColorSlider").$$render(
      $$result,
      { name: "B", disabled, value: b },
      {
        value: ($$value) => {
          b = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${alphaEnabled ? `${validate_component(ColorSlider, "ColorSlider").$$render(
      $$result,
      { name: "A", disabled, value: a },
      {
        value: ($$value) => {
          a = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `<div style="width: 100%; height: 20px"></div>`}`;
  } while (!$$settled);
  return $$rendered;
});
const getThemeColorCss = (userTheme, color) => `${color.cssVarName}: ${getCssValueForColor(color, userTheme.colorFormat)}`;
const convertThemePalettesToCss = (userTheme, withNewLines = false) => userTheme?.palettes.map((palette) => palette.colors.map((color) => getThemeColorCss(userTheme, color))).flat().join(withNewLines ? "\n;" : "; ");
class ColorParser {
  static parse = (s) => parseColorFromString(s);
}
const getCssValueForColor = (color, colorFormat) => ["currentcolor", "inherit"].includes(color.value) ? color.value : colorFormat === "hsl" ? color.color.hasAlpha ? color.color.hslaString : color.color.hslString : colorFormat === "rgb" ? color.color.hasAlpha ? color.color.rgbaString : color.color.rgbString : color.color.hasAlpha ? color.color.hexAlpha : color.color.hex;
function createAppStore(themeEditorState, colorPickerState) {
  return derived([themeEditorState, colorPickerState], ([$themeEditorState, $colorPickerState]) => {
    function getThemePalette() {
      if ($themeEditorState && $themeEditorState.userTheme) {
        return $themeEditorState.userTheme.palettes.find((p) => p.id === $themeEditorState.selectedPaletteId);
      }
    }
    return {
      x11PalettesShown: $colorPickerState?.x11PalettesShown,
      themeColorPalettes: $themeEditorState?.userTheme?.palettes,
      selectedThemePalette: getThemePalette(),
      themeCurrentColor: $themeEditorState?.selectedColor,
      themeColorHasAlpha: $themeEditorState?.selectedColor?.color?.hasAlpha,
      pickerColorHasAlpha: $colorPickerState?.alphaEnabled,
      componentStyles: convertThemePalettesToCss($themeEditorState?.userTheme)
    };
  });
}
function setService$1(key, service) {
  setContext(key, service);
  return service;
}
function getService$1(key) {
  return () => getContext(key);
}
function initThemeEditorStore(themeEditor) {
  return setService$1(get_store_value(themeEditor).editorId, themeEditor);
}
const getThemeEditorStore = (editorId) => getService$1(editorId)();
function initColorPickerStore(colorPicker) {
  return setService$1(get_store_value(colorPicker).pickerId, colorPicker);
}
const getColorPickerStore = (pickerId) => getService$1(pickerId)();
function initAppStore(themeEditorState, colorPickerState) {
  const key = `${get_store_value(themeEditorState).editorId}-app`;
  const app = createAppStore(themeEditorState, colorPickerState);
  return setService$1(key, app);
}
const getAppStore = (editorId) => getService$1(`${editorId}-app`)();
const ColorChannels = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  let { pickerId } = $$props;
  let state = getColorPickerStore(pickerId);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  if ($$props.pickerId === void 0 && $$bindings.pickerId && pickerId !== void 0)
    $$bindings.pickerId(pickerId);
  $$unsubscribe_state();
  return `<div class="text-sm flex flex-col flex-nowrap justify-center items-stretch gap-1.5">${$state?.colorSpace === "rgb" || $state?.colorSpace === "rgba" ? `${validate_component(RgbColorChannels, "RgbColorChannels").$$render(
    $$result,
    {
      r: $state.color.rgb.r,
      g: $state.color.rgb.g,
      b: $state.color.rgb.b,
      a: $state.color.rgb.a,
      alphaEnabled: $state.alphaEnabled,
      editable: $state.editable
    },
    {},
    {}
  )}` : `${$state?.colorSpace === "hsl" || $state?.colorSpace === "hsla" ? `${validate_component(HslColorChannels, "HslColorChannels").$$render(
    $$result,
    {
      h: $state.color.hsl.h,
      s: $state.color.hsl.s,
      l: $state.color.hsl.l,
      a: $state.color.hsl.a,
      alphaEnabled: $state.alphaEnabled,
      editable: $state.editable
    },
    {},
    {}
  )}` : ``}`}</div>`;
});
const Copy$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 448 512" }, $$props), {}, {
    default: () => {
      return `<path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>`;
    }
  })}`;
});
const Edit$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tooltip = null } = $$props;
  if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0)
    $$bindings.tooltip(tooltip);
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 576 512" }, { title: tooltip }, $$props), {}, {
    default: () => {
      return `<path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>`;
    }
  })}`;
});
const CopyColorString_svelte_svelte_type_style_lang = "";
const css$M = {
  code: "button.svelte-ykagqd{background-color:transparent;border:none}",
  map: null
};
const CopyColorString = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let colorLabels;
  let currentColorSpace;
  let tooltip;
  let fontSizeAlpha;
  let fontSizeOpaque;
  let fontSize;
  let { color } = $$props;
  let { alphaEnabled } = $$props;
  let { editable } = $$props;
  let { currentColor = "" } = $$props;
  let currentLabelIndex = 0;
  createEventDispatcher();
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.alphaEnabled === void 0 && $$bindings.alphaEnabled && alphaEnabled !== void 0)
    $$bindings.alphaEnabled(alphaEnabled);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.currentColor === void 0 && $$bindings.currentColor && currentColor !== void 0)
    $$bindings.currentColor(currentColor);
  $$result.css.add(css$M);
  colorLabels = alphaEnabled ? [color?.hexAlpha, color?.rgbaString, color?.hslaString] : [color?.hex, color?.rgbString, color?.hslString];
  currentColor = colorLabels[currentLabelIndex];
  currentColorSpace = alphaEnabled ? ["Hex", "RGBA", "HSLA"][currentLabelIndex] : ["Hex", "RGB", "HSL"][currentLabelIndex];
  tooltip = alphaEnabled ? "Click to toggle Hex, RGBA, and HSLA string values" : "Click to toggle Hex, RGB, and HSL string values";
  fontSizeAlpha = currentColorSpace === "HSLA" ? "0.7rem" : "0.8rem";
  fontSizeOpaque = currentColorSpace === "HSL" ? "0.825rem" : "0.85rem";
  fontSize = alphaEnabled ? fontSizeAlpha : fontSizeOpaque;
  return `<button type="button" id="copy-color-string-button" data-testid="copy-color-string-button" class="flex-initial h-4 w-4 my-auto cursor-pointer svelte-ykagqd" title="${"Copy " + escape(currentColorSpace, true) + " value"}">${validate_component(Copy$1, "Copy").$$render($$result, {}, {}, {})}</button>
<span class="cursor-pointer flex-grow text-center self-center font-medium leading-none whitespace-nowrap" style="${"font-size: " + escape(fontSize, true)}"${add_attribute("title", tooltip, 0)} data-testid="color-string">${escape(currentColor)}</span>
<button type="button" id="edit-color-string-button" data-testid="edit-color-string-button" class="${[
    "flex-initial h-4 w-4 my-auto svelte-ykagqd",
    (editable ? "cursor-pointer" : "") + " " + (!editable ? "cursor-not-allowed" : "")
  ].join(" ").trim()}" title="Edit string value">${validate_component(Edit$1, "Edit").$$render($$result, {}, {}, {})}
</button>`;
});
const IconBase_svelte_svelte_type_style_lang = "";
const css$L = {
  code: "svg.svelte-1s2286u{width:100%;height:auto;max-height:100%}",
  map: null
};
const IconBase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let strokeStyle;
  let paddingStyle;
  let transformStyle;
  let style;
  let { viewBox } = $$props;
  let { title = "" } = $$props;
  let { stroke = "currentColor" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  let { transform = "" } = $$props;
  if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
    $$bindings.viewBox(viewBox);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0)
    $$bindings.stroke(stroke);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.transform === void 0 && $$bindings.transform && transform !== void 0)
    $$bindings.transform(transform);
  $$result.css.add(css$L);
  strokeStyle = strokeWidth ? `stroke-width: ${strokeWidth}; ` : "";
  paddingStyle = padding ? `padding: ${padding}; ` : "";
  transformStyle = transform ? `-webkit-transform: ${transform}; transform: ${transform}; ` : "";
  style = `${strokeStyle}${paddingStyle}${transformStyle}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"${add_attribute("viewBox", viewBox, 0)}${add_attribute("stroke", stroke, 0)}${add_attribute("style", style, 0)} class="svelte-1s2286u">${title ? `<title>${escape(title)}</title>` : ``}${slots.default ? slots.default({}) : ``}</svg>`;
});
const AngleDoubleLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"></path>`;
      }
    }
  )}`;
});
const AngleDoubleRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>`;
      }
    }
  )}`;
});
const Arrow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>`;
      }
    }
  )}`;
});
const ArrowDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path>`;
      }
    }
  )}`;
});
const ArrowLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>`;
      }
    }
  )}`;
});
const ArrowRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>`;
      }
    }
  )}`;
});
const ArrowUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>`;
      }
    }
  )}`;
});
const Asterisk = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"></path>`;
      }
    }
  )}`;
});
const BezierCurve = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 640 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M368 32h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM208 88h-84.75C113.75 64.56 90.84 48 64 48 28.66 48 0 76.65 0 112s28.66 64 64 64c26.84 0 49.75-16.56 59.25-40h79.73c-55.37 32.52-95.86 87.32-109.54 152h49.4c11.3-41.61 36.77-77.21 71.04-101.56-3.7-8.08-5.88-16.99-5.88-26.44V88zm-48 232H64c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zM576 48c-26.84 0-49.75 16.56-59.25 40H432v72c0 9.45-2.19 18.36-5.88 26.44 34.27 24.35 59.74 59.95 71.04 101.56h49.4c-13.68-64.68-54.17-119.48-109.54-152h79.73c9.5 23.44 32.41 40 59.25 40 35.34 0 64-28.65 64-64s-28.66-64-64-64zm0 272h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32z"></path>`;
      }
    }
  )}`;
});
const Cancel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path>`;
      }
    }
  )}`;
});
const CaretDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 320 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>`;
      }
    }
  )}`;
});
const CaretUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 320 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path>`;
      }
    }
  )}`;
});
const Check$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>`;
      }
    }
  )}`;
});
const Checked$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H6.25Zm11.03 6.28l-6.754 6.747a.75.75 0 0 1-1.06 0L6.72 13.28a.75.75 0 0 1 1.06-1.06l2.217 2.216l6.223-6.217a.75.75 0 1 1 1.06 1.062Z"></path>`;
      }
    }
  )}`;
});
const Chevron = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 320 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>`;
      }
    }
  )}`;
});
const ChevronLeft$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 320 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>`;
      }
    }
  )}`;
});
const ChevronRight$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 320 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>`;
      }
    }
  )}`;
});
const ChevronUp_svelte_svelte_type_style_lang = "";
const css$K = {
  code: "svg.svelte-gp4bxt{stroke:currentcolor;fill:currentcolor;stroke-width:0;width:100%;height:auto;max-height:100%}",
  map: null
};
const ChevronUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let transform;
  let { rotateDegrees = 0 } = $$props;
  if ($$props.rotateDegrees === void 0 && $$bindings.rotateDegrees && rotateDegrees !== void 0)
    $$bindings.rotateDegrees(rotateDegrees);
  $$result.css.add(css$K);
  transform = rotateDegrees !== 0 ? `transform: rotate(${rotateDegrees}deg)` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"${add_attribute("style", transform, 0)} class="svelte-gp4bxt"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg>`;
});
const CircleFull = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>`;
      }
    }
  )}`;
});
const CircleOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"></path>`;
      }
    }
  )}`;
});
const Close$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 12 16",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>`;
      }
    }
  )}`;
});
const Code = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 640 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"></path>`;
      }
    }
  )}`;
});
const ColorSwatches_svelte_svelte_type_style_lang$1 = "";
const css$J = {
  code: "svg.svelte-smshid{stroke:#000;fill:url(#gradient-horizontal);stroke-width:2%;width:100%;height:auto;max-height:100%}svg.svelte-smshid:hover{fill:url(#gradient-hover)}",
  map: null
};
const ColorSwatches$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$J);
  return `<svg aria-hidden="true" focusable="false" style="width:0;height:0;position:absolute;" class="svelte-smshid"><linearGradient id="gradient-horizontal" x2="1" y2="1"><stop offset="0%" stop-color="#0044FF"></stop><stop offset="50%" stop-color="#76E0C4"></stop><stop offset="100%" stop-color="#8CFF1A"></stop></linearGradient><linearGradient id="gradient-hover" x2="1" y2="1"><stop offset="0%" stop-color="#0036CC"></stop><stop offset="50%" stop-color="#4CD6B2"></stop><stop offset="100%" stop-color="#73E600"></stop></linearGradient></svg>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 512" class="svelte-smshid"><path d="M479.06 320H372.29L186.15 506.51c-2.06 2.07-4.49 3.58-6.67 5.49h299.58c17.64 0 31.94-14.33 31.94-32V352c0-17.67-14.3-32-31.94-32zm-44.5-152.9l-90.33-90.51c-12.47-12.5-32.69-12.5-45.17 0l-75.5 75.65V416c0 2.96-.67 5.73-.87 8.64l211.87-212.28c12.47-12.5 12.47-32.77 0-45.26zM191.62 32c0-17.67-14.3-32-31.94-32H31.94C14.3 0 0 14.33 0 32v384c0 53.02 42.9 96 95.81 96s95.81-42.98 95.81-96V32zM95.81 440c-13.23 0-23.95-10.75-23.95-24 0-13.26 10.73-24 23.95-24s23.95 10.74 23.95 24c.01 13.25-10.72 24-23.95 24zm31.94-184H63.88v-64h63.88v64zm0-128H63.88V64h63.88v64z"></path></svg>`;
});
const Copy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>`;
      }
    }
  )}`;
});
const Database = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"></path>`;
      }
    }
  )}`;
});
const Deselect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M3 13v-2h2v2Zm4 8v-2h2v2Zm4-16V3h2v2Zm8 0V3q.825 0 1.413.587Q21 4.175 21 5ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19h2Zm-2-4v-2h2v2Zm8 4v-2h2v2Zm8-8v-2h2v2Zm0-4V7h2v2Zm-4-4V3h2v2ZM9 3v2H7.825L7 4.175V3Zm12 12v2h-1.175L19 16.175V15ZM9 15h3.175L9 11.825Zm6 6v-2h2v2Zm2-6.825l-2-2V9h-3.175l-2-2H16q.425 0 .712.287Q17 7.575 17 8ZM3 9V7h2v2Zm16.075 12.9l-4.9-4.9H8q-.425 0-.713-.288Q7 16.425 7 16V9.825l-4.9-4.9q-.275-.275-.275-.688q0-.412.275-.712q.3-.3.712-.3q.413 0 .713.3L20.5 20.5q.3.3.288.7q-.013.4-.313.7q-.3.275-.7.288q-.4.012-.7-.288Z"></path>`;
      }
    }
  )}`;
});
const DoubleUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 320 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"></path>`;
      }
    }
  )}`;
});
const Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>`;
      }
    }
  )}`;
});
const EditFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>`;
      }
    }
  )}`;
});
const Email = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>`;
      }
    }
  )}`;
});
const Exclamation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 192 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"></path>`;
      }
    }
  )}`;
});
const ExclamationTriangle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>`;
      }
    }
  )}`;
});
const Export$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M8 16.5v.5c1.691-2.578 3.6-3.953 6-4v3c0 .551.511 1 1.143 1 .364 0 .675-.158.883-.391 1.933-2.029 5.974-6.109 5.974-6.109s-4.041-4.082-5.975-6.137c-.208-.205-.518-.363-.882-.363-.632 0-1.143.447-1.143 1v3c-4.66 0-6 4.871-6 8.5zM5 21h14c.553 0 1-.448 1-1v-6.046c-.664.676-1.364 1.393-2 2.047v2.999h-12v-12h7v-2h-8c-.553 0-1 .448-1 1v14c0 .552.447 1 1 1z"></path>`;
      }
    }
  )}`;
});
const FastBackward = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M0 436V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v151.9L235.5 71.4C256.1 54.3 288 68.6 288 96v131.9L459.5 71.4C480.1 54.3 512 68.6 512 96v320c0 27.4-31.9 41.7-52.5 24.6L288 285.3V416c0 27.4-31.9 41.7-52.5 24.6L64 285.3V436c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12z"></path>`;
      }
    }
  )}`;
});
const FastForward = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M512 76v360c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V284.1L276.5 440.6c-20.6 17.2-52.5 2.8-52.5-24.6V284.1L52.5 440.6C31.9 457.8 0 443.4 0 416V96c0-27.4 31.9-41.7 52.5-24.6L224 226.8V96c0-27.4 31.9-41.7 52.5-24.6L448 226.8V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12z"></path>`;
      }
    }
  )}`;
});
const Filter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0.5px" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 16 16",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M6 12v-1h4v1H6zM4 7h8v1H4V7zm10-4v1H2V3h12z"></path>`;
      }
    }
  )}`;
});
const FolderOpen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"></path>`;
      }
    }
  )}`;
});
const Fork = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 384 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"></path>`;
      }
    }
  )}`;
});
const Gear$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M413.967 276.8c1.06-6.235 1.06-13.518 1.06-20.8s-1.06-13.518-1.06-20.8l44.667-34.318c4.26-3.118 5.319-8.317 2.13-13.518L418.215 115.6c-2.129-4.164-8.507-6.235-12.767-4.164l-53.186 20.801c-10.638-8.318-23.394-15.601-36.16-20.801l-7.448-55.117c-1.06-4.154-5.319-8.318-10.638-8.318h-85.098c-5.318 0-9.577 4.164-10.637 8.318l-8.508 55.117c-12.767 5.2-24.464 12.482-36.171 20.801l-53.186-20.801c-5.319-2.071-10.638 0-12.767 4.164L49.1 187.365c-2.119 4.153-1.061 10.399 2.129 13.518L96.97 235.2c0 7.282-1.06 13.518-1.06 20.8s1.06 13.518 1.06 20.8l-44.668 34.318c-4.26 3.118-5.318 8.317-2.13 13.518L92.721 396.4c2.13 4.164 8.508 6.235 12.767 4.164l53.187-20.801c10.637 8.318 23.394 15.601 36.16 20.801l8.508 55.117c1.069 5.2 5.318 8.318 10.637 8.318h85.098c5.319 0 9.578-4.164 10.638-8.318l8.518-55.117c12.757-5.2 24.464-12.482 36.16-20.801l53.187 20.801c5.318 2.071 10.637 0 12.767-4.164l42.549-71.765c2.129-4.153 1.06-10.399-2.13-13.518l-46.8-34.317zm-158.499 52c-41.489 0-74.46-32.235-74.46-72.8s32.971-72.8 74.46-72.8 74.461 32.235 74.461 72.8-32.972 72.8-74.461 72.8z"></path>`;
      }
    }
  )}`;
});
const Globe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 496 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1 0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z"></path>`;
      }
    }
  )}`;
});
const HalfStar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z"></path>`;
      }
    }
  )}`;
});
const HandLizard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title,
      transform: "scaleX(-1)"
    },
    {},
    {
      default: () => {
        return `<path d="M556.686 290.542L410.328 64.829C397.001 44.272 374.417 32 349.917 32H56C25.121 32 0 57.122 0 88v8c0 44.112 35.888 80 80 80h196.042l-18.333 48H144c-48.523 0-88 39.477-88 88 0 30.879 25.121 56 56 56h131.552c2.987 0 5.914.549 8.697 1.631L352 408.418V480h224V355.829c0-23.225-6.679-45.801-19.314-65.287zM528 432H400v-23.582c0-19.948-12.014-37.508-30.604-44.736l-99.751-38.788A71.733 71.733 0 0 0 243.552 320H112c-4.411 0-8-3.589-8-8 0-22.056 17.944-40 40-40h113.709c19.767 0 37.786-12.407 44.84-30.873l24.552-64.281c8.996-23.553-8.428-48.846-33.63-48.846H80c-17.645 0-32-14.355-32-32v-8c0-4.411 3.589-8 8-8h293.917c8.166 0 15.693 4.09 20.137 10.942l146.358 225.715A71.84 71.84 0 0 1 528 355.829V432z"></path>`;
      }
    }
  )}`;
});
const HandPointUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 384 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M135.652 0c23.625 0 43.826 20.65 43.826 44.8v99.851c17.048-16.34 49.766-18.346 70.944 6.299 22.829-14.288 53.017-2.147 62.315 16.45C361.878 158.426 384 189.346 384 240c0 2.746-.203 13.276-.195 16 .168 61.971-31.065 76.894-38.315 123.731C343.683 391.404 333.599 400 321.786 400H150.261l-.001-.002c-18.366-.011-35.889-10.607-43.845-28.464C93.421 342.648 57.377 276.122 29.092 264 10.897 256.203.008 242.616 0 224c-.014-34.222 35.098-57.752 66.908-44.119 8.359 3.583 16.67 8.312 24.918 14.153V44.8c0-23.45 20.543-44.8 43.826-44.8zM136 416h192c13.255 0 24 10.745 24 24v48c0 13.255-10.745 24-24 24H136c-13.255 0-24-10.745-24-24v-48c0-13.255 10.745-24 24-24zm168 28c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z"></path>`;
      }
    }
  )}`;
});
const Handshake = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0.5px" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 640 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>`;
      }
    }
  )}`;
});
const Hashtag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"></path>`;
      }
    }
  )}`;
});
const Help = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422s-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
	<path d="M235 339h42v42h-42zM276.8 318h-41.6c0-67 62.4-62.2 62.4-103.8 0-22.9-18.7-41.7-41.6-41.7S214.4 192 214.4 214h-41.6c0-46 37.2-83 83.2-83s83.2 37.1 83.2 83.1c0 52-62.4 57.9-62.4 103.9z"></path>`;
      }
    }
  )}`;
});
const Keyboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0.5px" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"></path>`;
      }
    }
  )}`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>`;
      }
    }
  )}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z"></path>`;
      }
    }
  )}`;
});
const Minus$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>`;
      }
    }
  )}`;
});
const MinusSquare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 14 16",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zm-2-5H3V7h8v2z"></path>`;
      }
    }
  )}`;
});
const Ok = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>`;
      }
    }
  )}`;
});
const Open$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M41 73v304.563L88.697 151H423v-30H185.514l-16-48H41zm62.303 96L43.092 455h381.605l60.211-286H103.303z"></path>`;
      }
    }
  )}`;
});
const Palette$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>`;
      }
    }
  )}`;
});
const PaletteWithBrush = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M274.174 41.604c-2.798-.01-5.576.056-8.332.195-96.67 4.85-177.38 86.93-217.842 192-40.462 105.06.914 239.97 90.336 237.48 89.42-2.5 18.09-99.6 65.486-146.12 24.345-23.9 58.852-15.48 94.207-5.64l-17.6-22.98-4.2-5.48c-1.38.06-2.79.102-4.26.09-8.24-.064-17.82-.54-25.25-7.347-13.89-12.73-14.4-31.304-14.08-47.908.32-16.605 1.12-32.375-4.05-42.587l-5.7-11.24 12.595-.37c1.046-.03 2.097-.05 3.15-.053 15.8-.073 32.304 2.776 46.914 9.03 15.584 6.67 29.254 17.44 36.154 33.053 4.18 9.46 3.665 20.116.623 29.768-.636 2.003-1.386 3.972-2.24 5.89l54.9 71.68c6.21-1.05 12.184-2.936 17.844-5.92 46.09-24.313 97.313-77.71 88.27-129.03-14.84-84.23-120.2-154.26-206.94-154.52zm60.79 39.888a34.152 39.804 15.878 0 1 17.913 7.06 34.152 39.804 15.878 0 1 4.666 54.87 34.152 39.804 15.878 0 1-48.72 9.77 34.152 39.804 15.878 0 1-4.665-54.87 34.152 39.804 15.878 0 1 30.805-16.83zm-119.85 4.467a39.307 30.27 71.565 0 1 34.603 35.56 39.307 30.27 71.565 0 1-23.213 41.31 39.307 30.27 71.565 0 1-37.678-35.47 39.307 30.27 71.565 0 1 23.213-41.31 39.307 30.27 71.565 0 1 3.07-.1zm-88.33 79.58a35.75 31.637 35.137 0 1 38.16 33.05 35.75 31.637 35.137 0 1-30.266 33.05 35.75 31.637 35.137 0 1-38.164-33.05 35.75 31.637 35.137 0 1 30.27-33.06zM421.256 170a34.25 40.436 25.644 0 1 20.41 9.578 34.25 40.436 25.644 0 1-2.914 55.51 34.25 40.436 25.644 0 1-50.107 3.966 34.25 40.436 25.644 0 1 2.916-55.51A34.25 40.436 25.644 0 1 421.26 170zm-174.152 27.95c2.982 12.774 1.784 26.197 1.548 38.275-.31 15.893.734 28.32 8.89 35.797 1.19 1.09 8.018 3.092 14.556 3.143 3.268.026 6.44-.22 8.718-.535 1.063-.146 1.874-.306 2.383-.425l13.02-9.362.02-.014c4.46-3.17 8.72-9.37 10.85-16.13 2.13-6.76 2.07-13.81 0-18.49-4.83-10.93-14.84-19.26-27.82-24.81-9.73-4.17-21-6.65-32.17-7.45zm67.455 83.808l-14.37 11L438.97 473.97l14.36-10.998-138.773-181.21zm-200.35 60.16a48.74 40.895 69.57 0 1 46.46 47.85 48.74 40.895 69.57 0 1-36.85 47.852 48.74 40.895 69.57 0 1-46.46-47.852 48.74 40.895 69.57 0 1 36.85-47.85z"></path>`;
      }
    }
  )}`;
});
const Pause = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>`;
      }
    }
  )}`;
});
const Pencil = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path>`;
      }
    }
  )}`;
});
const Play = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>`;
      }
    }
  )}`;
});
const Plus$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>`;
      }
    }
  )}`;
});
const PlusSquare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 14 16",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>`;
      }
    }
  )}`;
});
const ProjectDiagram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 640 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192V32zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z"></path>`;
      }
    }
  )}`;
});
const RemoveFilters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M8.414.414L7 1.828L8.172 3H4c-.553 0-1 .442-1 .99v2.556c0 .525.211 1.029.586 1.4L9.707 14a.984.984 0 0 1 .293.7v6.31c0 .735.782 1.213 1.447.884l2-.989A.988.988 0 0 0 14 20.02V14.7c0-.262.105-.514.293-.7l2.453-2.426l2.982 2.982l1.414-1.414L8.414.414Zm12 7.532l-.824.815L13.828 3H20c.553 0 1 .442 1 .99v2.556a1.97 1.97 0 0 1-.586 1.4Z"></path>`;
      }
    }
  )}`;
});
const Reset = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"></path>`;
      }
    }
  )}`;
});
const ReturnRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "10px" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M441.5 265.4L381.9 206c-2.6-2.6-6.1-4.1-9.9-4.1-3.7 0-7.3 1.4-9.9 4.1-2.6 2.6-4.1 6.1-4.1 9.9s1.5 7.3 4.1 9.9l.1.1 41.1 40.1H142c-13.2 0-25.8-5.2-35.3-14.7-9.5-9.5-14.7-22-14.7-35.3v-48c0-7.7-6.3-14-14-14s-14 6.3-14 14v48c0 20.8 8.1 40.3 22.9 55.1 14.8 14.8 34.3 22.9 55.1 22.9h261.7L364 334.2c-2.6 2.6-4.1 6.1-4.1 9.9 0 3.7 1.4 7.3 4.1 9.9l.1.1c2.7 2.5 6.2 3.9 9.8 3.9 3.9 0 7.3-1.4 9.9-4.1l57.6-57.4c4.2-4.2 6.5-9.8 6.5-15.7.1-5.8-2.2-11.3-6.4-15.4z"></path>`;
      }
    }
  )}`;
});
const Save$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path>`;
      }
    }
  )}`;
});
const SelectAll$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M20.496 5.627A2.25 2.25 0 0 1 22 7.75v10A4.25 4.25 0 0 1 17.75 22h-10a2.25 2.25 0 0 1-2.123-1.504l2.097.004H17.75a2.75 2.75 0 0 0 2.75-2.75v-10l-.004-.051V5.627ZM17.246 2a2.25 2.25 0 0 1 2.25 2.25v12.997a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.247V4.25A2.25 2.25 0 0 1 4.25 2h12.997ZM13.47 7.47l-3.89 3.888l-.98-1.308a.75.75 0 1 0-1.2.9l1.5 2a.75.75 0 0 0 1.13.08l4.5-4.5a.75.75 0 0 0-1.06-1.06Z"></path>`;
      }
    }
  )}`;
});
const SelectNone$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M20.496 5.627A2.25 2.25 0 0 1 22 7.75v10A4.25 4.25 0 0 1 17.75 22h-10a2.25 2.25 0 0 1-2.123-1.504l2.097.004H17.75a2.75 2.75 0 0 0 2.75-2.75v-10l-.004-.051V5.627ZM17.246 2a2.25 2.25 0 0 1 2.25 2.25v12.997a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.247V4.25A2.25 2.25 0 0 1 4.25 2h12.997Zm0 1.5H4.25a.75.75 0 0 0-.75.75v12.997c0 .414.336.75.75.75h12.997a.75.75 0 0 0 .75-.75V4.25a.75.75 0 0 0-.75-.75Z"></path>`;
      }
    }
  )}`;
});
const ShellPrompt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 20 20",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" fill-rule="evenodd" d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm3.293 1.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L7.586 10L5.293 7.707a1 1 0 0 1 0-1.414ZM11 12a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Z" clip-rule="evenodd"></path>`;
      }
    }
  )}`;
});
const Sort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0.5px" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M7 20h2V8h3L8 4L4 8h3zm13-4h-3V4h-2v12h-3l4 4z"></path>`;
      }
    }
  )}`;
});
const Star = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>`;
      }
    }
  )}`;
});
const StarOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 576 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>`;
      }
    }
  )}`;
});
const StepBackward = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z"></path>`;
      }
    }
  )}`;
});
const StepForward = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path>`;
      }
    }
  )}`;
});
const Trash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>`;
      }
    }
  )}`;
});
const Unchecked$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M3 6.25A3.25 3.25 0 0 1 6.25 3h11.5A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25ZM6.25 5C5.56 5 5 5.56 5 6.25v11.5c0 .69.56 1.25 1.25 1.25h11.5c.69 0 1.25-.56 1.25-1.25V6.25C19 5.56 18.44 5 17.75 5H6.25Z"></path>`;
      }
    }
  )}`;
});
const Codepen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z"></path>`;
      }
    }
  )}`;
});
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stroke = "currentColor" } = $$props;
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0)
    $$bindings.stroke(stroke);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 64 64",
      stroke,
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M32 0C14 0 0 14 0 32c0 21 19 30 22 30c2 0 2-1 2-2v-5c-7 2-10-2-11-5c0 0 0-1-2-3c-1-1-5-3-1-3c3 0 5 4 5 4c3 4 7 3 9 2c0-2 2-4 2-4c-8-1-14-4-14-15c0-4 1-7 3-9c0 0-2-4 0-9c0 0 5 0 9 4c3-2 13-2 16 0c4-4 9-4 9-4c2 7 0 9 0 9c2 2 3 5 3 9c0 11-7 14-14 15c1 1 2 3 2 6v8c0 1 0 2 2 2c3 0 22-9 22-30C64 14 50 0 32 0Z"></path>`;
      }
    }
  )}`;
});
const GithubSquare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stroke = "currentColor" } = $$props;
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0)
    $$bindings.stroke(stroke);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      stroke,
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z"></path>`;
      }
    }
  )}`;
});
const LinkedIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>`;
      }
    }
  )}`;
});
const LinkedInSquare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>`;
      }
    }
  )}`;
});
const Twitter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>`;
      }
    }
  )}`;
});
const TwitterSquare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"></path>`;
      }
    }
  )}`;
});
const AWS = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 640 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M180.41 203.01c-.72 22.65 10.6 32.68 10.88 39.05a8.164 8.164 0 0 1-4.1 6.27l-12.8 8.96a10.66 10.66 0 0 1-5.63 1.92c-.43-.02-8.19 1.83-20.48-25.61a78.608 78.608 0 0 1-62.61 29.45c-16.28.89-60.4-9.24-58.13-56.21-1.59-38.28 34.06-62.06 70.93-60.05 7.1.02 21.6.37 46.99 6.27v-15.62c2.69-26.46-14.7-46.99-44.81-43.91-2.4.01-19.4-.5-45.84 10.11-7.36 3.38-8.3 2.82-10.75 2.82-7.41 0-4.36-21.48-2.94-24.2 5.21-6.4 35.86-18.35 65.94-18.18a76.857 76.857 0 0 1 55.69 17.28 70.285 70.285 0 0 1 17.67 52.36l-.01 69.29zM93.99 235.4c32.43-.47 46.16-19.97 49.29-30.47 2.46-10.05 2.05-16.41 2.05-27.4-9.67-2.32-23.59-4.85-39.56-4.87-15.15-1.14-42.82 5.63-41.74 32.26-1.24 16.79 11.12 31.4 29.96 30.48zm170.92 23.05c-7.86.72-11.52-4.86-12.68-10.37l-49.8-164.65c-.97-2.78-1.61-5.65-1.92-8.58a4.61 4.61 0 0 1 3.86-5.25c.24-.04-2.13 0 22.25 0 8.78-.88 11.64 6.03 12.55 10.37l35.72 140.83 33.16-140.83c.53-3.22 2.94-11.07 12.8-10.24h17.16c2.17-.18 11.11-.5 12.68 10.37l33.42 142.63L420.98 80.1c.48-2.18 2.72-11.37 12.68-10.37h19.72c.85-.13 6.15-.81 5.25 8.58-.43 1.85 3.41-10.66-52.75 169.9-1.15 5.51-4.82 11.09-12.68 10.37h-18.69c-10.94 1.15-12.51-9.66-12.68-10.75L328.67 110.7l-32.78 136.99c-.16 1.09-1.73 11.9-12.68 10.75h-18.3zm273.48 5.63c-5.88.01-33.92-.3-57.36-12.29a12.802 12.802 0 0 1-7.81-11.91v-10.75c0-8.45 6.2-6.9 8.83-5.89 10.04 4.06 16.48 7.14 28.81 9.6 36.65 7.53 52.77-2.3 56.72-4.48 13.15-7.81 14.19-25.68 5.25-34.95-10.48-8.79-15.48-9.12-53.13-21-4.64-1.29-43.7-13.61-43.79-52.36-.61-28.24 25.05-56.18 69.52-55.95 12.67-.01 46.43 4.13 55.57 15.62 1.35 2.09 2.02 4.55 1.92 7.04v10.11c0 4.44-1.62 6.66-4.87 6.66-7.71-.86-21.39-11.17-49.16-10.75-6.89-.36-39.89.91-38.41 24.97-.43 18.96 26.61 26.07 29.7 26.89 36.46 10.97 48.65 12.79 63.12 29.58 17.14 22.25 7.9 48.3 4.35 55.44-19.08 37.49-68.42 34.44-69.26 34.42zm40.2 104.86c-70.03 51.72-171.69 79.25-258.49 79.25A469.127 469.127 0 0 1 2.83 327.46c-6.53-5.89-.77-13.96 7.17-9.47a637.37 637.37 0 0 0 316.88 84.12 630.22 630.22 0 0 0 241.59-49.55c11.78-5 21.77 7.8 10.12 16.38zm29.19-33.29c-8.96-11.52-59.28-5.38-81.81-2.69-6.79.77-7.94-5.12-1.79-9.47 40.07-28.17 105.88-20.1 113.44-10.63 7.55 9.47-2.05 75.41-39.56 106.91-5.76 4.87-11.27 2.3-8.71-4.1 8.44-21.25 27.39-68.49 18.43-80.02z"></path>`;
      }
    }
  )}`;
});
const Cypress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M11.998 0C5.366 0 0 5.367 0 12a11.992 11.992 0 0 0 12 12c6.633 0 12-5.367 12-12c-.001-6.633-5.412-12-12.002-12zM6.37 14.575c.392.523.916.742 1.657.742c.35 0 .699-.044 1.004-.175c.306-.13.655-.306 1.09-.567l1.223 1.745c-1.003.83-2.138 1.222-3.447 1.222c-1.048 0-1.92-.218-2.705-.654a4.393 4.393 0 0 1-1.746-1.92c-.392-.83-.611-1.79-.611-2.925c0-1.09.219-2.094.61-2.923a4.623 4.623 0 0 1 1.748-2.007c.741-.48 1.657-.698 2.661-.698c.699 0 1.353.087 1.877.305a5.64 5.64 0 0 1 1.614.96l-1.222 1.658A4.786 4.786 0 0 0 9.12 8.77c-.305-.13-.698-.174-1.048-.174c-1.483 0-2.225 1.134-2.225 3.446c-.043 1.18.175 2.008.524 2.532H6.37zm12 2.705c-.436 1.353-1.091 2.357-2.008 3.098c-.916.743-2.138 1.135-3.665 1.266l-.305-2.05c1.003-.132 1.745-.35 2.225-.7c.174-.13.524-.523.524-.523L11.519 6.764h3.01l2.095 8.683l2.226-8.683h2.923L18.37 17.28z"></path>`;
      }
    }
  )}`;
});
const FastAPI = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12c6.626 0 12-5.373 12-12c0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"></path>`;
      }
    }
  )}`;
});
const Flask = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M13.78 18.29c0 .12.15 0 0 0zm-3.35-2.7c.39.17-.31-.6 0 0zm-5.03.28c.15.26 0-.12 0 0zm5.6.39c-.27-.42-.2.06 0 .32c.48.47.18-.26 0-.32z"></path><path fill="currentColor" d="M20.24 19.06c-.53.63-1-.07-1.63.13c-1.1 0 .09-.5.06-1c-.58-.45-1.24.61-1.62.9a10.75 10.75 0 0 1-2.67-.83a8 8 0 0 1-2.6-1.94a8.36 8.36 0 0 1-1.87-2.84a21.36 21.36 0 0 1-.84-5.74c.07-1.3 1.44.14 2-.33c-.21-.67-1.29-.88-1.89-1.16c-.58 0-.79-.55-1.4-.59c0-.73-1.13-.33-1.56-.84c.42-1.08-1.37 0-1.23-.91c.58-1.2-1.78-1-.8.06c.95.54-.93.93-.38 1.29a.59.59 0 0 1-.53.86c-.74.07-.67 1.09.06.55c.81-.25.14.11-.25.18a1.3 1.3 0 0 0-.95 1.9a35.32 35.32 0 0 1 1 3.42A16.25 16.25 0 0 0 5.84 17A9.78 9.78 0 0 0 8 19a9.89 9.89 0 0 0 2.43 1.22a18 18 0 0 0 4.73.73a16.53 16.53 0 0 0 2.9-.24c.87.09 1.49-.65 2.26-.26c.48-.42 1.16-.23 1.63-.54c.32-1.22-1.22-.27-1.71-.85zm-1.74-.74c-.22 0 .05-.34 0 0zm-7.63-11c-.1 0-.08-.12-.16-.15c-.8-.37.39-.23.16.19zm6.76 11.39c-.35-.08.28-.25 0 0zm-2.81.11c-.23 0 .18-.14 0 0zm-1.88-1.18c-.13 0 0-.13 0 0zm-.22-.17c-.36 0-.09-.23 0 0zm-.42-.36c-.33.08 0-.34 0 0zm-6-11.66c-.53-.28.11.33-.34.32c-.24 0-.69-.52-.54-.78c.3.16.83.21.92.5zm-.92-.81h-.11c-.03-.27.87-.06.15.04zm-1.02-.79c-.42-.19 0-.93.44-.58c.51.73-.95-.08-.44.58zm.49.69c-.27.11.16-.21 0 0zm.48.92c.6.46-.34 0-.72.29c-.61.06.66-.34.72-.29zm.17.6c.35 0 1.88-.69 1.37-.07c.47.55.1.37-.21 0c.28.19.06 1-.37.45s-.5-.18-.17.21C5.8 6 4.88 6.28 4.21 6.5c-.43-.04 1.13-.37 1.29-.44zM3.58 7.51c-.16.4.24.53.62.6c.62-.17-.41-.28.06-.44c.26 0-.82-.26.08-.38S6.09 6.77 7 6.58a8.71 8.71 0 0 1 2.35-.19c.3.35-.23.94-.77 1a8.61 8.61 0 0 1-2 .39c-.8-.1-1.37.61-2.19.7c.22-.4-.18-.14-.59-.16c.21.82-1.47-.21-.48-.41c-.74-.26-.75.52-.67 1c-.65-.91.07-1.29.93-1.4zm1.88 1.08c-.22-.05.17-.2 0 0zm-.72.88s-.34-.08-.2-.17c1 .13-.9-.33.13-.22c.66-.02.44.36.07.39zm.33.17c-.12.12 0-.24 0 0zm-.71 0c-.44-.09.21-.22 0 0zm-.06 1.43c-.07.1-.1-.08 0 0zM4 10.9c-.55-.19 0-.21 0 0zm-.12 1.28c-.26-.09-.25-.5-.37-.72c-.38-1.03.41.4.33.72zm.23-1.49c-.69-.08-.05-.49 0 0zm0-.34h-.09c-.76-.35.45-.17-.02 0zM4 9.56c-.61-.31.58-.36 0 0zm.21.26c-.34.06.05-.32 0 0zm-1.3.07c-.12.08 0-.23 0 0zM3 9.75c-.16 0 0-.27 0 0zm.08-1c-.4-.1.33-.25 0 0zm.26 2c-.44-.1-.12-.65 0 0zm.3 1.25c.42.51.26.79.69 1.41c-.56-.35-.67-1.2-1-1.75c-.41-.9.23-.01.31.34zm4.09 6.38c-.34-.07-.57-.43-.81-.66a4.88 4.88 0 0 1-1.57-1.94a12.26 12.26 0 0 1-1.46-2.38c-.41-.92.25.07.35.42c.21.68.88 1.07.94 1.52c.74.42.36 1.12 1 1.31c.27-.14.3.84.89.64c-.33.15.13.33.3.61c.35-.05 1.17.82.36.52zM4.62 12c-.31-.07.33-.11 0 0zm.2.47c-.55-.14.52-.2 0 0zm1.39.47c.4-.17.16.78.55.9c.76 1-.53 0-1-.07c.06 0-.38-.12-.19-.16c-.14-.15-.45-.66.26-.32c.6.24.65.06.38-.39zm1.31 1.76c0 .15-.72.13-.06.42c-.38 0-.5 0 0 .3c-.22.17.43.31.21.57c.66.52-.12.13-.4-.08s-.85-.35-.75-.5c.81.42.21 0-.15-.3c.65.16-.51-.48.1-.31c.19.05-.27-.38.33-.07c-.54-.52.47-.12.72-.07zm.48-.17c-.61-.14 0-.34 0 0zm-.17 2c-.61-.26.39 0 0 0zm-.45-.17c-.71-.23.52 0 0 0zm-.09.11c-.22 0 0-.17 0 0zm-1.08-1.55c-.72-.3-.2-.33 0 0zm-.54-.35c-.58-.33-.08-.33 0 0zm0 .65c-.57-.44-.07-.25 0 0zm-.15-1.34c-.35 0 .13-.2 0 0zM8 17.38c-.51-.15 0-.14 0 0zM7.63 17h-.16c-.68-.54.31-.38.75-.14c.97.14-.22.39-.59.14zm2.7 1.65c-.68-.16.16-.27 0 0zm-.17-.52c-.05 0-.1-.11 0 0zm-.86-1.34c-.59-.14.21-.19.36 0c1.02.21-.06.26-.36 0zM9.51 18H9.4l-.13-.06c-.56-.59 1.19.28.24.06zm-.28.69c-.15.06 0-.14 0 0zm.29-1.19l-.16-.05c-.66-.45.84.09.16 0zm.16 1.72c-.4-.16.26-.25 0 0zm.1-.74c-.58-.14.36-.13 0 0zm.13-.61c-.44-.06.05-.21 0 0zm-.72-.88c.46.06.47.27 0 .14c-.09 0-.24 0-.28-.17c-.76-.5.03-.25.28-.02zm-.06 2c-.2.12 0-.22 0 0zm-.31-.51c-.53 0 .4-.26 0 0zm-.12.35c-.26-.1.17-.08 0 0zm.3-.89c-.52-.14.25-.18 0 0zm-.16-.57c-.28 0-.06-.16 0 0zm-.54-.95c-.57-.46 1.18.38 0 0zm-.06.19c0 .06-.11-.09 0 0zm3.65 3.78a9.4 9.4 0 0 1-2.56-.85l-.33-.2c-.57-.31-.5-.38.06-.07c.19.16 1.59.73.93.35c-.29-.07-1.9-.95-.84-.57a20.92 20.92 0 0 0 2.74 1.21a7.14 7.14 0 0 0 2.43.15c.65.33 1.33-.08 2 .21a13.05 13.05 0 0 1-4.45-.23zm-1.25-.7c-.51-.09.16-.23 0 0zm.73-1c-.58-.11.6-.23 0 0zm.84 1.31c1 .37-.6.12-.93-.09c-.92-.38.72.09.93.09zm-1.06-1.1c-.81-.12.9 0 0 0zm1.52.85c-.29.23 0-.3 0 0zm.29.05c-.15.06 0-.17 0 0zm.27-.38c-.16.2 0-.23 0 0zm.31 0c-.45.17.47-.39 0 0zm.14 0c.49-.42.51-.22.5.13c-.43.48-.17-.2-.44.06s-.19-.1-.06-.17zm.83.45c-.5 0 .51-.54 0 0zm0 .18c-.2.05 0-.13 0 0zm-.16-.35c-.39-.26.94-.61 0 0zm.57.09h-.08c-.03-.23.54-.27.08.02zm.15.19c-.3-.08.47-.4 0 0zm.36-.1c-.51.18.48-.4 0 0zm.22.11l-.12.08c-.23-.14.71-.48.12-.07zm-.43-.53c-.54-.18-1.4-.76-2-.37c-.8.51.41-.56-.24-.08c-.66.79-.45-.5-1.09-.11c0-.12-.57-.16-.17-.37c-.36 0-.13-.05 0-.34c-.16 0-1 0-1.36-.29c-.4-.52.07-.3.48-.23c-.67.12.24.5.68.29c-.2-.09-.43-.52-1-.9a18.83 18.83 0 0 0-2.13-1c-.84-.5.18-.18.47.08c.84.37.51-.51 0-.74c-.54 0-.67-.59-1.1-.56c.67.11 1.14-.17.39-.85s.3.63-.11.44c-.19-.25-.05-.6-.65-.73c0 .23-.08.58-.21.1c-.17 0-.36.21-.5-.28c.13-.57-.56-.7-.67-1.06c.6.38.87.08.45-.33s-.33-.11-.49 0c-.59.6-.06-1-.32-.56c-.26 0-.11.29-.1.65c-.86-.21.2.45.45.81c-.39-.4-.32.31-.65 0c-.11-.3-.12-.77-.67-.85c.62-.22-.36-.65-.28-.67c.35-.32.4-.76.82-.07c-.53 0 0 .88.12.6c0-.47.22-1-.59-1.19c-.24.32-.65-.63-.18-.43c-.06-.63.74-.26.69-.53c.42-.18-.5-.77 0-1c.38.24 1.36-.36.7-.44c.42 0 .75.18.79-.24c.33.07 1.24.36.42-.09a3.45 3.45 0 0 1 1.13-.25c.79-.61.63 1 .45 1.45c.3-.21.24.94.14 1.37c.16-.22.23.36 0 .77c0-.07.4-.13.12.35c-.22-.47-.31 1-.17.32c.37-.61.28 0 .39.24c.08.55.32 1.06.4 1.56c.35.35-.15.11-.15.59c.11-.14.58.19.57.68c0-.78.09-.18.47 0a5.48 5.48 0 0 0 1 1.42c.37.43 0 .13.14.39a3.19 3.19 0 0 0 2.09 1.28a1.46 1.46 0 0 0 1.57.7c-.6.37 1.68.47.91.67c-.23.16-.62-.2-1.01-.18zM8.7 15.89c-.24 0 0-.2 0 0zm.38.22c-.18 0-.12-.24 0 0zm-2.61-3.65c-.24-.07.1-.09 0 0zm-.59 0c-.26 0 0-.34 0 0zm-.3-.08c-.1.05 0-.11 0 0zm11 8.25c-.39-.07.32-.22 0 0zm.73-1.05h-.3c.06-.45 1.33-.1 1.85-.09c-.16.34-1.13.04-1.55.13zm2 0c-.27 0 .12-.32 0 0zm1-.09c-.25.13 0-.3 0 0zm.48.11c-.52-.12.24-.12.4-.14c.94.02 0 .16-.47.16z"></path><path fill="currentColor" d="M6.51 7.11c1-.2-.38-.33-.69 0c.18.13.41-.21.69 0zm-.82.13c0 .19.18-.22 0 0zm2.62-.48c.67-.11.11-.41-.09.1c.07.14.11-.05.09-.1zm-.62.1c.93.36-.05-1 0 0zm-2.92.93a.51.51 0 0 1 .33.1c.75.52-.1-.84-.33-.1z"></path><path fill="currentColor" d="M4.81 7.43c.16.13.29-.21 0 0zm.37.01l.14.12c.68.06-.11-.46-.14-.12zM10.69 16c.09.3 0-.39 0 0zm-4.78-5c.1.18.18-.18 0 0zm.09.61c.19.34 0-.51 0 0zm.21-.49c.33.21-.28-.52 0 0zm-.41-.82c.07.15.24.16.37.2c1.32.61-.95-1-.37-.2zm.54 1.43c.31.53.18-.37 0 0zm.48-.16c.37.92-.23-.12-.3-.43a2.11 2.11 0 0 0 .28 1c.34.51.19-.28.55.23c-.2-.45.1-.2.06-.4s-1-1.17-.59-.4zm.36 1.78c.09.31.18 0 0 0zM5.85 9c.06.14.11 0 0 0zm.67.42c.32.41.17-.36 0 0zm-.89 1.14l.14.15c.99.29-1.05-.95-.14-.15zm.7-.37c1 .41-.09-.27-.44-.2c.11.13.32.07.44.2zm-.18-.44c.18.18.82.51.31.06c.32-.06 0-.16-.24-.32c-.44-.67.07.06-.07.26z"></path><path fill="currentColor" d="M5.51 10.64c-.53-.44.16.21-.06.2c-.55-.4-.32-.11 0 .2c.33.5.6-.3.06-.4zm2.14.64c.12.11-.06-.68 0 0zm1.02-3.5c0 .12.07-.1 0 0zM9 12.47c0 .21 0-.18 0 0zm-.29-1.22c.08.46.1-.78 0 0zm.14.22v.1c.21-.51.04-.79 0-.1zm-.1-2.7c-.14.7-.27.41-.08-.11c-.05-.67-.45.41-.27.72c.29.47.6-1.16.35-.61zm1.01 5.98c.13.35.11-.42 0 0zm-1.35-4.28c0 .2 0-.14 0 0zm.64 1.7c0 .26.11-.38 0 0zM9.5 14l.07.11c.14-.49-.36-.79-.07-.11zm-1.56-.52c.27.22-.13-.23 0 0zm1.23-.85c.08.29 0-.42 0 0zM8.14 9.81c.15.33-.05-.27 0 0z"></path><path fill="currentColor" d="M8.3 10.23c.24.34-.26-.64 0 0zm-.06 1.15c-.13-1-.42.45 0 .69c.13.34.25.2.3-.19c-.32 0 .08-.62-.3-.5z"></path>`;
      }
    }
  )}`;
});
const Hugo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M11.754 0a3.998 3.998 0 00-2.049.596L3.33 4.532a4.252 4.252 0 00-2.017 3.615v8.03c0 1.473.79 2.838 2.067 3.574l6.486 3.733a3.88 3.88 0 003.835.018l7.043-3.966a3.817 3.817 0 001.943-3.323V7.752a3.57 3.57 0 00-1.774-3.084L13.817.541a3.998 3.998 0 00-2.063-.54zm.022 1.674c.413-.006.828.1 1.2.315l7.095 4.127c.584.34.941.96.94 1.635v8.462c0 .774-.414 1.484-1.089 1.864l-7.042 3.966a2.199 2.199 0 01-2.179-.01l-6.485-3.734a2.447 2.447 0 01-1.228-2.123v-8.03c0-.893.461-1.72 1.221-2.19l6.376-3.935a2.323 2.323 0 011.19-.347zm-4.7 3.844V18.37h2.69v-5.62h4.46v5.62h2.696V5.518h-2.696v4.681h-4.46V5.518Z"></path>`;
      }
    }
  )}`;
});
const Microsoft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"></path>`;
      }
    }
  )}`;
});
const Playwright = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M23.996 7.462c-.056.837-.257 2.135-.716 3.85c-.995 3.715-4.27 10.874-10.42 9.227c-6.15-1.65-5.407-9.487-4.412-13.201c.46-1.716.934-2.94 1.305-3.694c.42-.853.846-.289 1.815.523c.684.573 2.41 1.791 5.011 2.488c2.601.697 4.706.506 5.583.352c1.245-.219 1.897-.494 1.834.455Zm-9.807 3.863s-.127-1.819-1.773-2.286c-1.644-.467-2.613 1.04-2.613 1.04Zm4.058 4.539l-7.769-2.172s.446 2.306 3.338 3.153c2.862.836 4.43-.98 4.43-.981Zm2.701-2.51s-.13-1.818-1.773-2.286c-1.644-.469-2.612 1.038-2.612 1.038ZM8.57 18.23c-4.749 1.279-7.261-4.224-8.021-7.08C.197 9.831.044 8.832.003 8.188c-.047-.73.455-.52 1.415-.354c.677.118 2.3.261 4.308-.28a11.28 11.28 0 0 0 2.41-.956c-.058.197-.114.4-.17.61c-.433 1.618-.827 4.055-.632 6.426c-1.976.732-2.267 2.423-2.267 2.423l2.524-.715c.227 1.002.6 1.987 1.15 2.838a5.914 5.914 0 0 1-.171.049Zm-4.188-6.298c1.265-.333 1.363-1.631 1.363-1.631l-3.374.888s.745 1.076 2.01.743Z"></path>`;
      }
    }
  )}`;
});
const Puppeteer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M17.89 17.86h.397v.174h.028a.466.466 0 0 1 .619-.155l-.11.373a.364.364 0 0 0-.184-.043a.288.288 0 0 0-.243.11a.471.471 0 0 0-.082.29v.635h-.424zm-.26 1.048a.766.766 0 0 1-.27.28a.741.741 0 0 1-.398.101a.822.822 0 0 1-.3-.054a.752.752 0 0 1-.237-.155a.704.704 0 0 1-.214-.529c0-.1.018-.194.056-.282a.719.719 0 0 1 .156-.235a.725.725 0 0 1 .529-.22a.75.75 0 0 1 .302.056a.642.642 0 0 1 .353.384a.846.846 0 0 1 .037.402h-1.02c.02.09.063.156.127.198a.387.387 0 0 0 .214.062a.345.345 0 0 0 .32-.18zm-.376-.54a.227.227 0 0 0-.03-.074a.21.21 0 0 0-.058-.07a.264.264 0 0 0-.093-.054a.325.325 0 0 0-.43.198zm-1.242.54a.766.766 0 0 1-.27.28a.741.741 0 0 1-.397.101a.822.822 0 0 1-.3-.054a.752.752 0 0 1-.237-.155a.704.704 0 0 1-.215-.529c0-.1.019-.194.057-.282a.719.719 0 0 1 .155-.235a.725.725 0 0 1 .529-.22c.115 0 .215.018.302.056a.642.642 0 0 1 .353.384a.846.846 0 0 1 .037.402h-1.02c.02.09.063.156.127.198a.387.387 0 0 0 .215.062a.345.345 0 0 0 .32-.18zm-.376-.54a.227.227 0 0 0-.028-.074a.21.21 0 0 0-.06-.07a.264.264 0 0 0-.093-.054a.325.325 0 0 0-.43.198zm-1.918-.144l-.243-.004l.004-.388l.25.012l-.007-.41l.412.004l-.016.39l.367.02l-.012.355l-.365.008l.013.47c-.012.092.022.145.027.194c.08.1.137.068.137.068c.02-.008.162-.027.177-.038l.04.388c-.138.082-.377.036-.377.036c-.253-.037-.383-.217-.384-.293c-.025-.068-.018-.21-.029-.29zm-.412.717c-.037.126-.172.218-.283.285a.772.772 0 0 1-.406.11a.944.944 0 0 1-.32-.077c-.09-.038-.165-.113-.233-.18c-.068-.065-.093-.142-.131-.23a.822.822 0 0 1-.045-.31c-.015-.194.126-.378.212-.505c.28-.238.49-.22.49-.22c.387-.075.696.288.718.437c.03.086.022.18.022.28c-.005.054 0 .05-.031.125h-1.037c.02.09.063.192.104.24c.048.06.128.06.207.06c.079 0 .163.002.214-.032c.053-.034.172-.072.203-.125zm-.37-.558a.41.41 0 0 0-.04-.097c-.014-.026-.05-.046-.076-.066c-.024-.023-.071-.037-.109-.05a.31.31 0 0 0-.121-.023a.274.274 0 0 0-.168.053c-.057.037-.097.12-.123.19zm-2.34-.372h.028a.388.388 0 0 1 .147-.138a.498.498 0 0 1 .254-.06a.623.623 0 0 1 .467.207a.696.696 0 0 1 .147.232c.036.09.053.19.053.3a.8.8 0 0 1-.053.3a.729.729 0 0 1-.147.234a.647.647 0 0 1-.467.203a.518.518 0 0 1-.254-.056a.409.409 0 0 1-.147-.142h-.028l.028.198v.565H10.2V17.86h.396zm.336.198a.34.34 0 0 0-.31.201a.37.37 0 0 0-.026.141c0 .053.008.101.025.145a.362.362 0 0 0 .074.107c.032.028.068.05.107.068a.378.378 0 0 0 .257 0a.348.348 0 0 0 .108-.068a.304.304 0 0 0 .073-.107a.358.358 0 0 0 .028-.145a.338.338 0 0 0-.336-.342zm-2.026-.198h.03a.388.388 0 0 1 .146-.138a.498.498 0 0 1 .254-.06a.623.623 0 0 1 .466.207a.696.696 0 0 1 .147.232c.036.09.054.19.054.3a.8.8 0 0 1-.054.3a.729.729 0 0 1-.147.234a.647.647 0 0 1-.466.203a.518.518 0 0 1-.254-.056a.409.409 0 0 1-.147-.142h-.029l.03.198v.565H8.51V17.86h.395zm.337.198a.34.34 0 0 0-.31.201a.37.37 0 0 0-.027.141c0 .053.01.101.026.145a.362.362 0 0 0 .073.107c.032.028.068.05.108.068a.378.378 0 0 0 .257 0a.348.348 0 0 0 .107-.068a.303.303 0 0 0 .074-.107a.358.358 0 0 0 .028-.145a.338.338 0 0 0-.21-.316a.32.32 0 0 0-.126-.026zm-1.433.86h-.028a.47.47 0 0 1-.424.22c-.174 0-.303-.055-.387-.167a.703.703 0 0 1-.128-.438v-.825h.424v.777c0 .076.018.138.054.187c.036.047.091.07.167.07a.245.245 0 0 0 .217-.11a.497.497 0 0 0 .077-.288v-.636h.424v1.385H7.81zm-2.594.175V17.22h.724a.82.82 0 0 1 .285.048a.677.677 0 0 1 .23.136a.589.589 0 0 1 .15.206a.67.67 0 0 1 .053.27a.657.657 0 0 1-.054.267a.617.617 0 0 1-.379.342a.818.818 0 0 1-.285.048h-.283v.707zm.738-1.125c.092 0 .16-.023.206-.068a.234.234 0 0 0 .068-.172a.234.234 0 0 0-.068-.173c-.045-.045-.114-.068-.206-.068h-.297v.48zM18.04 2.758l-.594.05l.236 2.932l.626.363zm-12.016.01L5.728 6.01l.624-.3l.266-2.89zm-.49 5.183l-.044.557l-1.247 3.137c-.216.224-.308.514-.307.825L3.93 22.84c0 .669.49 1.16 1.158 1.16H18.82c.67 0 1.25-.444 1.25-1.11V12.485c0-.306-.1-.56-.286-.774L18.44 7.748l-.006-.068l-.575.257l.267 3.33H5.846l.237-2.615l.226-.588L6.143 8l.002-.03zm13.112 2.34l.323.987c-.088-.014-.158-.006-.245-.01zm-13.316.232l-.084.744c-.058-.005-.12.005-.172.007zm-.18 1.134l13.67.008c.47 0 .853.344.853.815v.796H4.313v-.796c0-.47.364-.823.837-.823zm.135.553a.27.27 0 0 0-.272.27c0 .36.542.36.542 0a.27.27 0 0 0-.27-.27zm.92 0c-.36 0-.36.54 0 .54s.362-.54.002-.54zm.896 0c-.39-.034-.39.572 0 .538c.33-.028.33-.51 0-.538zm-2.788 1.424h15.36v9.153c0 .595-.38.846-.853.845l-13.668-.004a.828.828 0 0 1-.84-.841zm1.883 4.42c.07-.117.07-.11.068-.186c-.008-.073-.004-.076-.053-.135c-.054-.054-.123-.138-.2-.134h-.387l-.02.55h.407c.122-.002.16-.084.185-.094zm-.185-.83a.58.58 0 0 1 .442.171c.11.117.164.273.164.465a.65.65 0 0 1-.16.462c-.117.12-.263.21-.43.203l-.4.008l-.004.774l-.412-.013l-.005-2.088zm1.793 1.26l-.012-.624l.366-.004l.004 1.435l-.36.004v-.122a.582.582 0 0 1-.432.15a.557.557 0 0 1-.413-.156c-.103-.11-.13-.31-.123-.46l-.004-.847h.372l-.008.77a.328.328 0 0 0 .075.23a.25.25 0 0 0 .198.09c.225 0 .336-.156.336-.468zm1.805.077a.36.36 0 0 0-.11-.272c-.07-.073-.115-.118-.218-.115c-.1 0-.186.018-.266.094a.388.388 0 0 0-.116.293c0 .12.038.217.117.29c.07.073.168.114.27.114c.102.003.166-.053.238-.126c.087-.094.06-.21.085-.278zm-.262-.76c.176 0 .333.11.466.245a.71.71 0 0 1 .197.515a.7.7 0 0 1-.197.512c-.093.16-.31.255-.486.254c-.16.005-.36-.066-.428-.197l.004.76l-.4.006l-.02-2.04l.416-.02v.157c.126-.103.285-.2.448-.193zm2.002.764c-.014-.16-.044-.203-.117-.283c-.072-.074-.117-.087-.22-.085c-.1 0-.178-.005-.257.07a.388.388 0 0 0-.116.294c0 .12.038.217.116.29c.07.073.168.114.27.114c.102.003.154-.065.226-.137c.073-.08.086-.175.098-.263zm-.318-.75c.177 0 .389.096.522.23a.712.712 0 0 1 .198.516a.7.7 0 0 1-.198.512c-.105.15-.344.255-.522.254a.475.475 0 0 1-.392-.197v.75l-.405.01l-.023-2.034h.428v.137c.126-.103.23-.183.392-.177zm1.268.576l.637-.008c-.017-.074-.063-.12-.124-.166a.357.357 0 0 0-.406.003c-.085.068-.054.056-.107.17zm.313-.575c.179-.003.425.078.552.203c.133.13.157.308.166.512l-.031.125h-1.03c.02.095.044.186.104.244c.059.056.153.07.234.07a.5.5 0 0 0 .383-.17l.316.141c-.046.14-.187.223-.304.296a.757.757 0 0 1-.408.094c-.184.003-.378-.116-.507-.247a.718.718 0 0 1-.2-.523c0-.21.094-.382.23-.518c.13-.132.31-.232.495-.227zm1.673 1.127c.08-.003.11.002.178-.038l.04.388c-.107.063-.135.038-.26.042a.633.633 0 0 1-.416-.155c-.094-.09-.097-.26-.097-.443l-.012-.513l-.243-.004l.004-.388l.25.012l-.007-.41l.412.004l-.016.39l.367.02l-.012.355l-.365.008l.003.507c.002.155.042.225.175.225zm.75-.54h.654a.32.32 0 0 0-.12-.186a.357.357 0 0 0-.407.003a.3.3 0 0 0-.127.184zm.338-.587c.185 0 .368.092.5.22c.133.13.173.295.183.5v.12h-1.03a.4.4 0 0 0 .12.228a.31.31 0 0 0 .218.086c.155 0 .297-.06.367-.18l.3.15c-.05.13-.12.19-.238.262a.958.958 0 0 1-.452.125a.712.712 0 0 1-.502-.224a.77.77 0 0 1-.208-.542c0-.21.106-.382.24-.518c.132-.132.316-.232.5-.227zm1.27.587h.654a.32.32 0 0 0-.12-.186a.357.357 0 0 0-.407.003a.3.3 0 0 0-.127.184zm.337-.587a.74.74 0 0 1 .5.22c.134.13.174.295.184.5v.12h-1.03a.4.4 0 0 0 .12.228a.31.31 0 0 0 .217.086c.154 0 .297-.06.368-.18l.3.15c-.05.13-.12.19-.238.262a.957.957 0 0 1-.454.125a.713.713 0 0 1-.5-.224a.77.77 0 0 1-.208-.542c0-.21.106-.382.24-.518c.13-.132.315-.232.5-.227zm1.938.04l-.067.364l-.18-.023c-.322 0-.36.207-.36.595v.49l-.393.005l.008-1.43h.365l-.004.22c.145-.17.215-.286.63-.22zM17.535 7.91l.02-.366l1.317-.687l.007.396zM5.04 6.84l1.35.68l-.008.393l-1.314-.65zm7.21-1.748l4.839 2.448v.392l-4.851-2.46zM6.874 7.51l4.894-2.42l-.007.374l-4.893 2.444zm3.467-3.974L5.418 1.099L6.64.494l5.352 2.744L17.335.466l1.257.65l-4.926 2.478c-.196.098-.13.388.067.486l4.838 2.42l-1.22.622l-5.353-2.697L6.62 7.129l-1.273-.634l4.998-2.483a.266.266 0 0 0-.004-.477zM5.059 1.888l.007-.377l4.607 2.276l-.348.2zm9.648 2.077l-.41-.184l4.596-2.303l-.028.412zm.422.306l4.124-2.07a.124.124 0 0 0 .07-.11v-.98c0-.046-.008-.136-.05-.157l-1.94-.94a.124.124 0 0 0-.113 0l-5.167 2.623a.123.123 0 0 1-.11 0L6.679.015a.124.124 0 0 0-.11 0L4.616.938c-.04.02-.02.11-.02.157v.995c0 .047.026.09.07.11l4.14 2.047L4.69 6.239c-.04.02-.108.062-.11.108l.017 1.034a.123.123 0 0 0 .068.113l1.933.986c.034.018.122.03.157.014l5.186-2.602a.124.124 0 0 1 .11 0l5.12 2.603a.124.124 0 0 0 .11 0l1.972-.954c.042-.02.103-.05.104-.096l-.007-1.033c0-.047-.047-.15-.09-.17z"></path>`;
      }
    }
  )}`;
});
const Python = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 448 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"></path>`;
      }
    }
  )}`;
});
const Redis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 32 32",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M31.99 19.12c-.01.307-.417.646-1.245 1.078c-1.708.891-10.552 4.531-12.438 5.51c-1.885.984-2.927.974-4.417.26c-1.49-.708-10.901-4.516-12.599-5.323c-.844-.406-1.276-.745-1.292-1.068v3.234c0 .323.448.661 1.292 1.068c1.698.813 11.115 4.615 12.599 5.323c1.49.714 2.531.724 4.417-.26c1.885-.979 10.729-4.62 12.438-5.51c.87-.448 1.255-.802 1.255-1.12v-3.188c0-.005-.005-.005-.01-.005zm0-5.271c-.016.302-.417.641-1.245 1.078c-1.708.885-10.552 4.526-12.438 5.505c-1.885.984-2.927.974-4.417.266c-1.49-.714-10.901-4.516-12.599-5.328c-.844-.401-1.276-.745-1.292-1.068v3.234c0 .323.448.667 1.292 1.068c1.698.813 11.109 4.615 12.599 5.328c1.49.708 2.531.719 4.417-.26c1.885-.984 10.729-4.62 12.438-5.51c.87-.453 1.255-.807 1.255-1.125v-3.188h-.01zm0-5.474c.016-.323-.406-.609-1.266-.922c-1.661-.609-10.458-4.109-12.141-4.729c-1.682-.615-2.37-.589-4.349.12c-1.979.714-11.339 4.385-13.005 5.036c-.833.328-1.24.63-1.224.953v3.234c0 .323.443.661 1.292 1.068c1.693.813 11.109 4.615 12.599 5.328c1.484.708 2.531.719 4.417-.266c1.88-.979 10.729-4.62 12.438-5.505c.865-.453 1.25-.807 1.25-1.125V8.374zm-20.532 3.063l7.417-1.135l-2.24 3.281zm16.401-2.959L23 10.401l-4.385-1.734l4.854-1.917zM14.984 5.302l-.719-1.323l2.24.875l2.109-.688l-.573 1.365l2.151.807l-2.771.286l-.625 1.495l-1-1.667l-3.203-.286zm-5.526 1.87c2.193 0 3.964.688 3.964 1.531c0 .849-1.776 1.536-3.964 1.536s-3.964-.688-3.964-1.536c0-.844 1.776-1.531 3.964-1.531z"></path>`;
      }
    }
  )}`;
});
const RegExp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M16 16.92c-.33.05-.66.08-1 .08c-.34 0-.67-.03-1-.08v-3.51l-2.5 2.48c-.5-.39-1-.89-1.39-1.39l2.48-2.5H9.08c-.05-.33-.08-.66-.08-1c0-.34.03-.67.08-1h3.51l-2.48-2.5c.19-.25.39-.5.65-.74c.24-.26.49-.46.74-.65L14 8.59V5.08c.33-.05.66-.08 1-.08c.34 0 .67.03 1 .08v3.51l2.5-2.48c.5.39 1 .89 1.39 1.39L17.41 10h3.51c.05.33.08.66.08 1c0 .34-.03.67-.08 1h-3.51l2.48 2.5c-.19.25-.39.5-.65.74c-.24.26-.49.46-.74.65L16 13.41v3.51M5 19a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2Z"></path>`;
      }
    }
  )}`;
});
const Sqlite = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 458 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="m228.502 233.071l-14.428 45.75c-7.693 28.4-7.039 37.358-3.137 43.966c.963 1.624 3.597 6.94 7.278 21.14c5.344 20.554 10.05 51.587 10.165 53.072c-.773 18.97-.355 39.069 1.179 58.313H39.147C17.617 455.312 0 437.695 0 416.166V61.88c0-21.53 17.616-39.15 39.147-39.15h293.008c-44.876 47.605-89.341 137.936-103.653 210.341zM435.338 11.136c53.695 47.899.376 157.402-48.565 234.483c-35.586 11.437-77.064 36.696-77.064 36.696s3.45-1.832 16.255-7.203c8.68-3.649 34.598-9.811 50.381-13.41c-26.349 39.726-48.896 67.532-48.896 67.532s-45.97 18.681-60.187 62.14c8.24-46.357 21.913-94.74 41.208-146.3c17.232-46.042 74.796-170.377 117.328-208.788c-46.664 37.193-97.65 115.072-134.4 212.138c-21.751 64.3-33.523 125.992-35.44 177.149c-1.267 33.467 1.626 62.488 8.749 84.632L261.414 512c-6.987-18.132-13.399-49.997-11.865-115.295c-.23-2.913-.367-4.806-.367-4.806s-4.242-28.568-10.343-52.035c-2.702-10.417-5.778-19.836-9.007-25.295c-1.664-2.817.18-14.388 4.824-31.527c7.864 13.692 16.348 28.515 19.607 40.643c0 0-6.284-32.33-16.595-51.197c2.26-7.627 4.96-16.057 8.015-25.07c7.605 13.3 15.361 25.955 18.455 38.63c-3.384-16.193-7.965-32.32-15.101-48.307c12.97-67.496 54.719-155.876 99.696-203.59c24.007-25.617 57.092-48.544 86.605-23.015z"></path>`;
      }
    }
  )}`;
});
const Svelte = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 139 139",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M110 28a34 34 0 0 0-46-9L38 35a30 30 0 0 0-13 20 32 32 0 0 0 3 20 30 30 0
0 0-5 12 32 32 0 0 0 6 24c10 15 31 19 46 10l26-17a30 30 0 0 0 13-20 32 32 0
0 0-3-20 30 30 0 0 0 5-11 32 32 0 0 0-6-25"></path>
	<path fill="#000" d="M62 112a21 21 0 0 1-22-8 19 19 0 0 1-4-15 17 17 0 0 1 1-2v-1l2 1a34 34 0
0 0 10 5h1v1a6 6 0 0 0 1 4 6 6 0 0 0 7 2 6 6 0 0 0 1-1l26-16a5 5 0 0 0 3-4 6
6 0 0 0-1-4 6 6 0 0 0-7-3 6 6 0 0 0-2 1l-10 6a19 19 0 0 1-5 3 21 21 0 0
1-22-8 19 19 0 0 1-3-15 18 18 0 0 1 8-12l26-17a19 19 0 0 1 5-2 21 21 0 0 1
22 8 19 19 0 0 1 4 15 20 20 0 0 1-1 2v2l-2-1a34 34 0 0 0-10-5l-1-1v-1a6 6 0
0 0-1-4 6 6 0 0 0-7-2 6 6 0 0 0-1 1L54 57a5 5 0 0 0-3 4 6 6 0 0 0 1 4 6 6 0
0 0 7 3 6 6 0 0 0 2-1l10-6a19 19 0 0 1 5-3 21 21 0 0 1 22 9 19 19 0 0 1 3 14
18 18 0 0 1-8 12l-26 17a19 19 0 0 1-5 2"></path>`;
      }
    }
  )}`;
});
const Tailwind = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8c1.2-1.6 2.6-2.2 4.2-1.8c.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8c-1.2 1.6-2.6 2.2-4.2 1.8c-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8c1.2-1.6 2.6-2.2 4.2-1.8c.913.228 1.565.89 2.288 1.624c1.177 1.194 2.538 2.576 5.512 2.576c3.2 0 5.2-1.6 6-4.8c-1.2 1.6-2.6 2.2-4.2 1.8c-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>`;
      }
    }
  )}`;
});
const TypeScript = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 512 512",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path d="M0 0v512h512V0H0zm294.445 222.23H221.63v225.553h-40.1V222.23h-72.665v-37.298h185.581v37.298zm149.212 202.559c-24.443 31.85-94.558 36.713-135.325 10.214v-49.857c22.19 24.235 45.152 27.699 63.042 29.342c55.89 4.65 57.509-41.905 34.886-61.101c-33.311-26.885-99.65-41.844-97.578-99.938c-.482-41.618 31.829-69.556 79.912-72.152c18.22-.984 44.193.15 60.527 10.698v46.867c-38.336-35.174-118.13-25.74-98.781 26.47c17.512 32.235 77.733 35.405 103.076 86.453c10.755 28.718 4.768 54.075-9.759 73.004z"></path>`;
      }
    }
  )}`;
});
const XML = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 16 16",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.527 11.85h-.893l-.823 1.439h-.036L.943 11.85H.012l1.227 1.983L0 15.85h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992l1.274-2.007Zm.954 3.999v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596h-.025L4.58 11.85h-.806v3.999h.706Zm4.71-.674h1.696v.674H8.4V11.85h.791v3.325Z"></path>`;
      }
    }
  )}`;
});
const XState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { strokeWidth = "0" } = $$props;
  let { padding = "0" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  return `${validate_component(IconBase, "IconBase").$$render(
    $$result,
    {
      viewBox: "0 0 24 24",
      strokeWidth,
      padding,
      title
    },
    {},
    {
      default: () => {
        return `<path fill="currentColor" d="M15.891 0h6.023l-6.085 10.563A10.653 10.653 0 0 1 15.891 0zm6.055 23.999L8.078.001H2.055l6.919 12.015L2.055 24h6.023L12 17.236L15.892 24z"></path>`;
      }
    }
  )}`;
});
function createBasicIconMap() {
  const iconMap = /* @__PURE__ */ new Map();
  iconMap.set("angledoubleleft", AngleDoubleLeft);
  iconMap.set("angledoubleright", AngleDoubleRight);
  iconMap.set("arrow", Arrow);
  iconMap.set("arrowdown", ArrowDown);
  iconMap.set("arrowleft", ArrowLeft);
  iconMap.set("arrowright", ArrowRight);
  iconMap.set("arrowup", ArrowUp);
  iconMap.set("asterisk", Asterisk);
  iconMap.set("beziercurve", BezierCurve);
  iconMap.set("cancel", Cancel);
  iconMap.set("caretdown", CaretDown);
  iconMap.set("caretup", CaretUp);
  iconMap.set("check", Check$1);
  iconMap.set("checked", Checked$1);
  iconMap.set("chevron", Chevron);
  iconMap.set("chevronleft", ChevronLeft$1);
  iconMap.set("chevronright", ChevronRight$1);
  iconMap.set("chevronup", ChevronUp);
  iconMap.set("circlefull", CircleFull);
  iconMap.set("circleoutline", CircleOutline);
  iconMap.set("close", Close$1);
  iconMap.set("code", Code);
  iconMap.set("colorswatches", ColorSwatches$1);
  iconMap.set("copy", Copy);
  iconMap.set("database", Database);
  iconMap.set("deselect", Deselect);
  iconMap.set("doubleup", DoubleUp);
  iconMap.set("edit", Edit);
  iconMap.set("editfilled", EditFilled);
  iconMap.set("email", Email);
  iconMap.set("exclamation", Exclamation);
  iconMap.set("exclamationtriangle", ExclamationTriangle);
  iconMap.set("export", Export$1);
  iconMap.set("fastbackward", FastBackward);
  iconMap.set("fastforward", FastForward);
  iconMap.set("filter", Filter);
  iconMap.set("folderopen", FolderOpen);
  iconMap.set("fork", Fork);
  iconMap.set("gear", Gear$1);
  iconMap.set("globe", Globe);
  iconMap.set("halfstar", HalfStar);
  iconMap.set("handlizard", HandLizard);
  iconMap.set("handpointup", HandPointUp);
  iconMap.set("handshake", Handshake);
  iconMap.set("hashtag", Hashtag);
  iconMap.set("help", Help);
  iconMap.set("keyboard", Keyboard);
  iconMap.set("link", Link);
  iconMap.set("menu", Menu);
  iconMap.set("minus", Minus$1);
  iconMap.set("minussquare", MinusSquare);
  iconMap.set("ok", Ok);
  iconMap.set("open", Open$1);
  iconMap.set("palette", Palette$2);
  iconMap.set("palettewithbrush", PaletteWithBrush);
  iconMap.set("pause", Pause);
  iconMap.set("pencil", Pencil);
  iconMap.set("play", Play);
  iconMap.set("plus", Plus$1);
  iconMap.set("plussquare", PlusSquare);
  iconMap.set("projectdiagram", ProjectDiagram);
  iconMap.set("removefilters", RemoveFilters);
  iconMap.set("reset", Reset);
  iconMap.set("returnright", ReturnRight);
  iconMap.set("save", Save$1);
  iconMap.set("selectall", SelectAll$1);
  iconMap.set("selectnone", SelectNone$1);
  iconMap.set("shellprompt", ShellPrompt);
  iconMap.set("sort", Sort);
  iconMap.set("star", Star);
  iconMap.set("staroutline", StarOutline);
  iconMap.set("stepbackward", StepBackward);
  iconMap.set("stepforward", StepForward);
  iconMap.set("trash", Trash);
  iconMap.set("unchecked", Unchecked$1);
  return iconMap;
}
function createSocialIconMap() {
  const iconMap = /* @__PURE__ */ new Map();
  iconMap.set("codepen", Codepen);
  iconMap.set("github", Github);
  iconMap.set("githubsquare", GithubSquare);
  iconMap.set("linkedin", LinkedIn);
  iconMap.set("linkedinsquare", LinkedInSquare);
  iconMap.set("twitter", Twitter);
  iconMap.set("twittersquare", TwitterSquare);
  return iconMap;
}
function createLangTechIconMap() {
  const iconMap = /* @__PURE__ */ new Map();
  iconMap.set("aws", AWS);
  iconMap.set("cypress", Cypress);
  iconMap.set("fastapi", FastAPI);
  iconMap.set("flask", Flask);
  iconMap.set("hugo", Hugo);
  iconMap.set("microsoft", Microsoft);
  iconMap.set("playwright", Playwright);
  iconMap.set("puppeteer", Puppeteer);
  iconMap.set("python", Python);
  iconMap.set("redis", Redis);
  iconMap.set("regexp", RegExp);
  iconMap.set("sqlite", Sqlite);
  iconMap.set("svelte", Svelte);
  iconMap.set("tailwind", Tailwind);
  iconMap.set("typescript", TypeScript);
  iconMap.set("xml", XML);
  iconMap.set("xstate", XState);
  return iconMap;
}
const BASIC_ICON_MAP = createBasicIconMap();
createSocialIconMap();
createLangTechIconMap();
const BasicIconRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let { icon } = $$props;
  let { width = "auto" } = $$props;
  let { height = "auto" } = $$props;
  let { margin = "" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.margin === void 0 && $$bindings.margin && margin !== void 0)
    $$bindings.margin(margin);
  style = `height: ${height}; width: ${width};${margin ? ` margin: ${margin}` : ""}`;
  return `<div class="icon-wrapper"${add_attribute("style", style, 0)}>${validate_component(BASIC_ICON_MAP.get(icon) || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>`;
});
const Checkbox_svelte_svelte_type_style_lang$1 = "";
const InputTextBox_svelte_svelte_type_style_lang$1 = "";
const Modal_svelte_svelte_type_style_lang$1 = "";
const ThemeButton_svelte_svelte_type_style_lang$1 = "";
const ListOption_svelte_svelte_type_style_lang = "";
const InputSelectList_svelte_svelte_type_style_lang = "";
const EditColorString_svelte_svelte_type_style_lang = "";
const css$I = {
  code: "input.svelte-1owntzy{flex:1;font-size:0.875rem;line-height:1.25rem;padding:0 0.25rem;border:1px solid var(--gray2);border-radius:6px;grid-column:4 / span 1}input.svelte-1owntzy:focus{border:1px solid var(--black2);outline:none;outline-offset:1px}#change-color-button.svelte-1owntzy,#keep-color-button.svelte-1owntzy{flex:0 1 auto;color:var(--black2);width:1rem;height:1rem;margin:auto 0;cursor:pointer}#change-color-button.svelte-1owntzy{grid-column:6 / span 1}#keep-color-button.svelte-1owntzy{grid-column:2 / span 1}",
  map: null
};
const EditColorString = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "" } = $$props;
  let textInput;
  createEventDispatcher();
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$I);
  return `<div id="keep-color-button" data-testid="keep-color-button" title="Cancel" class="svelte-1owntzy">${validate_component(BasicIconRenderer, "BasicIconRenderer").$$render($$result, { icon: "cancel" }, {}, {})}</div>
<input${add_attribute("value", value, 0)} type="text" data-testid="color-name-input" class="svelte-1owntzy"${add_attribute("this", textInput, 0)}>
<div id="change-color-button" data-testid="change-color-button" title="Change color" class="svelte-1owntzy">${validate_component(BasicIconRenderer, "BasicIconRenderer").$$render($$result, { icon: "ok" }, {}, {})}
</div>`;
});
const ColorLabel_svelte_svelte_type_style_lang = "";
const css$H = {
  code: ".color-label.svelte-164n6fz{display:flex;flex-flow:row nowrap;gap:0.75rem;border:1px solid var(--fg-color, --light-gray2);border-radius:6px;transition:background-color, color 350ms ease-out;width:230px;padding:6px 9px;height:30px}.color-label.edit-mode.svelte-164n6fz{display:grid;grid-template-columns:6px auto 6px 1fr 6px auto 6px;gap:0;padding:6px 0}",
  map: null
};
const ColorLabel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let inactiveStyle;
  let copiedStyle;
  let editStyle;
  let successStyle;
  let errorStyle;
  let style;
  let $state, $$unsubscribe_state;
  let { pickerId } = $$props;
  let currentColor;
  let state = getColorPickerStore(pickerId);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  let timeout;
  onDestroy(() => clearTimeout(timeout));
  if ($$props.pickerId === void 0 && $$bindings.pickerId && pickerId !== void 0)
    $$bindings.pickerId(pickerId);
  $$result.css.add(css$H);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    inactiveStyle = "background-color: var(--white3); color: var(--input-text-color);";
    copiedStyle = "background-color: var(--light-gray2)";
    editStyle = "background-color: var(--button-bg-color); color: var(--button-fg-color)";
    successStyle = "background-color: var(--white3); color: var(--green2)";
    errorStyle = "background-color: var(--white3); color: var(--red2)";
    style = $state?.labelState === "copied" ? copiedStyle : $state?.labelState === "edit" ? editStyle : $state?.labelState === "success" ? successStyle : $state?.labelState === "error" ? errorStyle : inactiveStyle;
    $$rendered = `<div class="${[
      "color-label svelte-164n6fz",
      $state?.labelState === "edit" ? "edit-mode" : ""
    ].join(" ").trim()}"${add_attribute("style", style, 0)}>${$state?.labelState === "edit" ? `${validate_component(EditColorString, "EditColorString").$$render($$result, { value: currentColor }, {}, {})}` : `${validate_component(CopyColorString, "CopyColorString").$$render(
      $$result,
      {
        color: $state?.color,
        alphaEnabled: $state.alphaEnabled,
        editable: $state?.editable,
        currentColor
      },
      {
        currentColor: ($$value) => {
          currentColor = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}
</div>`;
  } while (!$$settled);
  $$unsubscribe_state();
  return $$rendered;
});
const ThemeButton_svelte_svelte_type_style_lang = "";
const css$G = {
  code: ".color.svelte-115q5ot button.svelte-115q5ot{--button-background-color:hsl(var(--button-hue, 0), var(--background-sat, 0%), var(--background-light, 95%));--button-hover-background-color:hsl(\n			var(--button-hue, 0),\n			var(--background-sat, 0%),\n			var(--background-light-hover, 100%)\n		);--button-fg-color:hsl(var(--button-hue, 0), var(--fg-sat, 0%), var(--fg-light, 10%));--button-active-fg-color:hsl(var(--button-hue, 0), var(--fg-sat-active, 0%), var(--fg-light-active, 0%));--button-hover-fg-color:var(--button-fg-color)}.black.svelte-115q5ot button.svelte-115q5ot{--button-background-color:var(--white3);--button-hover-background-color:var(--white4);--button-fg-color:var(--black2);--button-active-fg-color:var(--black4);--button-hover-fg-color:var(--black4)}.x11-swatches button.svelte-115q5ot.svelte-115q5ot{--button-size:var(--square-button-size)}button.svelte-115q5ot.svelte-115q5ot{--default-border-radius:6px;display:flex;flex-flow:row nowrap;justify-content:center;align-items:center;gap:0.25rem;white-space:nowrap;background-color:var(--button-background-color);border:2px solid var(--button-fg-color);color:var(--button-fg-color);border-radius:var(--default-border-radius);width:100%;height:var(--button-size)}button.svelte-115q5ot.svelte-115q5ot:hover{color:var(--button-hover-fg-color);background-color:var(--button-hover-background-color)}button.svelte-115q5ot.svelte-115q5ot:active,button.svelte-115q5ot.svelte-115q5ot:focus,button.svelte-115q5ot.svelte-115q5ot:active:focus{background-color:var(--button-hover-background-color);border:2px solid var(--button-active-fg-color);color:var(--button-active-fg-color);outline:1px solid transparent;outline-offset:1px}.x11-swatches button.svelte-115q5ot.svelte-115q5ot:active,.x11-swatches button.svelte-115q5ot.svelte-115q5ot:focus,.x11-swatches button.svelte-115q5ot.svelte-115q5ot:active:focus{outline:2px solid var(--blue2)}.x11-swatches button.svelte-115q5ot.svelte-115q5ot:active,.x11-swatches button.svelte-115q5ot.svelte-115q5ot:focus,.x11-swatches button.svelte-115q5ot.svelte-115q5ot:active:focus,.x11-swatches button.active.svelte-115q5ot.svelte-115q5ot{background-color:var(--button-active-fg-color)}button[disabled].svelte-115q5ot.svelte-115q5ot,button:hover[disabled].svelte-115q5ot.svelte-115q5ot{background-color:var(--white1);border:2px solid var(--gray4);color:var(--gray4);cursor:not-allowed}.icon.svelte-115q5ot.svelte-115q5ot{margin:auto 0}span.svelte-115q5ot.svelte-115q5ot{font-size:13px;font-weight:500;line-height:1}",
  map: null
};
const ThemeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttonType;
  let hueStyle;
  let flexStyle;
  let widthStyle;
  let $$slots = compute_slots(slots);
  let { color = "black" } = $$props;
  let { disabled = false } = $$props;
  let { tooltip = "" } = $$props;
  let { alignSelf = "" } = $$props;
  let { wrapperWidth = "" } = $$props;
  let { classList = [] } = $$props;
  let { iconWidth = "11px" } = $$props;
  let { randomHue = false } = $$props;
  let { gridStyle = "" } = $$props;
  let style;
  let buttonElement;
  function focus() {
    buttonElement.focus();
  }
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0)
    $$bindings.tooltip(tooltip);
  if ($$props.alignSelf === void 0 && $$bindings.alignSelf && alignSelf !== void 0)
    $$bindings.alignSelf(alignSelf);
  if ($$props.wrapperWidth === void 0 && $$bindings.wrapperWidth && wrapperWidth !== void 0)
    $$bindings.wrapperWidth(wrapperWidth);
  if ($$props.classList === void 0 && $$bindings.classList && classList !== void 0)
    $$bindings.classList(classList);
  if ($$props.iconWidth === void 0 && $$bindings.iconWidth && iconWidth !== void 0)
    $$bindings.iconWidth(iconWidth);
  if ($$props.randomHue === void 0 && $$bindings.randomHue && randomHue !== void 0)
    $$bindings.randomHue(randomHue);
  if ($$props.gridStyle === void 0 && $$bindings.gridStyle && gridStyle !== void 0)
    $$bindings.gridStyle(gridStyle);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0)
    $$bindings.focus(focus);
  $$result.css.add(css$G);
  buttonType = randomHue || color !== "black" ? "color" : "black";
  hueStyle = randomHue ? `--button-hue: ${getRandomHueValue()};` : `--button-hue: var(--${color}-hue);`;
  flexStyle = alignSelf ? `align-self: ${alignSelf};` : "";
  widthStyle = wrapperWidth ? `width: ${wrapperWidth}; min-width: var(--button-size);` : classList.includes("square-button") ? "min-width: var(--square-button-size);" : "min-width: var(--button-size);";
  style = [hueStyle, flexStyle, widthStyle, gridStyle].filter((s) => s !== "").join(" ");
  return `<div class="${"theme-button-wrapper " + escape(buttonType, true) + " svelte-115q5ot"}"${add_attribute("style", style, 0)}><button type="button"${add_attribute("title", tooltip, 0)} class="${"theme-button transition-color " + escape(classList.join(" "), true) + " svelte-115q5ot"}" ${disabled ? "disabled" : ""}${add_attribute("this", buttonElement, 0)}>${$$slots.icon ? `<div class="icon svelte-115q5ot" style="${"width: " + escape(iconWidth, true)}">${slots.icon ? slots.icon({}) : ``}</div>` : ``}
		${$$slots.label ? `<span class="svelte-115q5ot">${slots.label ? slots.label({}) : ``}</span>` : ``}</button>
</div>`;
});
const X11ColorSwatch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let classList;
  let { paletteId } = $$props;
  let { activePaletteId = "" } = $$props;
  let { color } = $$props;
  let { disabled = false } = $$props;
  let { tooltip } = $$props;
  let buttonComponent;
  createEventDispatcher();
  function focus() {
    buttonComponent?.focus();
  }
  if ($$props.paletteId === void 0 && $$bindings.paletteId && paletteId !== void 0)
    $$bindings.paletteId(paletteId);
  if ($$props.activePaletteId === void 0 && $$bindings.activePaletteId && activePaletteId !== void 0)
    $$bindings.activePaletteId(activePaletteId);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0)
    $$bindings.tooltip(tooltip);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0)
    $$bindings.focus(focus);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    active = paletteId === activePaletteId;
    classList = active ? ["square-button", "active"] : ["square-button"];
    $$rendered = `${validate_component(ThemeButton, "ThemeButton").$$render(
      $$result,
      {
        color,
        tooltip,
        disabled,
        classList,
        this: buttonComponent
      },
      {
        this: ($$value) => {
          buttonComponent = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const X11Swatches = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { x11ColorPalettes } = $$props;
  let { activePaletteId = "" } = $$props;
  let swatchMap = {};
  if ($$props.x11ColorPalettes === void 0 && $$bindings.x11ColorPalettes && x11ColorPalettes !== void 0)
    $$bindings.x11ColorPalettes(x11ColorPalettes);
  if ($$props.activePaletteId === void 0 && $$bindings.activePaletteId && activePaletteId !== void 0)
    $$bindings.activePaletteId(activePaletteId);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (Object.keys(swatchMap).length === x11ColorPalettes.length)
        activePaletteId = x11ColorPalettes[0].id;
    }
    {
      if (activePaletteId)
        swatchMap[activePaletteId]?.focus();
    }
    $$rendered = `${each(x11ColorPalettes, (palette) => {
      return `${validate_component(X11ColorSwatch, "X11ColorSwatch").$$render(
        $$result,
        {
          paletteId: palette.id,
          activePaletteId,
          color: palette.componentColor,
          tooltip: palette.displayName,
          this: swatchMap[palette.id]
        },
        {
          this: ($$value) => {
            swatchMap[palette.id] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const ChevronLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 320 512" }, $$props), {}, {
    default: () => {
      return `<path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>`;
    }
  })}`;
});
const ChevronRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 320 512" }, $$props), {}, {
    default: () => {
      return `<path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>`;
    }
  })}`;
});
const Close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 12 16" }, $$props), {}, {
    default: () => {
      return `<path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>`;
    }
  })}`;
});
const ColorSwatch_svelte_svelte_type_style_lang = "";
const css$F = {
  code: ".swatch-wrapper.svelte-16zny5g{display:grid;grid-template-columns:1fr;width:var(--swatch-size);height:var(--swatch-size)}.swatch.svelte-16zny5g{z-index:1;position:relative;grid-column:1 / span 1}.swatch-overlay.svelte-16zny5g{z-index:2;grid-column:1 / span 1;border-radius:4px}#x11-palettes .swatch-overlay.svelte-16zny5g{border-radius:0}.icon.svelte-16zny5g{z-index:3;cursor:pointer;padding:0 0 0.25rem 0.25rem;grid-column:1 / span 1;grid-row:2 / span 1}",
  map: null
};
const ColorSwatch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let wrapperGrid;
  let swatchColor;
  let swatchGrid;
  let overlayColor;
  let overlayPointer;
  let $$slots = compute_slots(slots);
  let { color } = $$props;
  let { iconSize = "" } = $$props;
  let { iconTooltip = "" } = $$props;
  let { style = "" } = $$props;
  createEventDispatcher();
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.iconSize === void 0 && $$bindings.iconSize && iconSize !== void 0)
    $$bindings.iconSize(iconSize);
  if ($$props.iconTooltip === void 0 && $$bindings.iconTooltip && iconTooltip !== void 0)
    $$bindings.iconTooltip(iconTooltip);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css$F);
  wrapperGrid = $$slots.icon ? `grid-template-rows: 1fr ${iconSize};` : "grid-template-rows: 1fr;";
  swatchColor = color?.hasAlpha ? alphaBgPattern : "background-color: inherit;";
  swatchGrid = $$slots.icon ? "grid-row: 1 / span 2;" : "grid-row: 1 / span 1;";
  overlayColor = `background-color: ${color?.hslaString};`;
  overlayPointer = color?.hasAlpha ? `pointer-events: none;` : "";
  return `<div class="swatch-wrapper svelte-16zny5g" style="${escape(wrapperGrid, true) + " " + escape(style, true)}"><div class="swatch svelte-16zny5g" style="${escape(swatchColor, true) + " " + escape(swatchGrid, true)}"></div>
	<div class="swatch-overlay svelte-16zny5g" style="${escape(overlayColor, true) + " " + escape(swatchGrid, true) + " " + escape(overlayPointer, true)}"></div>
	${$$slots.icon ? `<div class="icon svelte-16zny5g"${add_attribute("title", iconTooltip, 0)} style="${"width: " + escape(iconSize, true) + "; height: " + escape(iconSize, true) + ";"}">${slots.icon ? slots.icon({}) : ``}</div>` : ``}
</div>`;
});
const Color_svelte_svelte_type_style_lang = "";
const css$E = {
  code: ".color-wrapper.svelte-1bgp9d3.svelte-1bgp9d3{display:flex;gap:0.25rem;justify-content:flex-start;border-radius:6px;-webkit-border-radius:6px}.selected-color.svelte-1bgp9d3.svelte-1bgp9d3{outline:2px solid var(--blue3);outline-offset:2px}.color-wrapper.user-color.svelte-1bgp9d3.svelte-1bgp9d3{padding:0.35rem 0.5rem;background-color:var(--color-wrapper-bg-color);border-radius:6px;width:100%}.color-wrapper.named-color.svelte-1bgp9d3.svelte-1bgp9d3{flex-flow:column nowrap}.color-wrapper.unnamed-color.svelte-1bgp9d3.svelte-1bgp9d3{flex-flow:row nowrap}.color-wrapper-top.svelte-1bgp9d3.svelte-1bgp9d3{display:flex;flex-flow:row nowrap;gap:0.25rem}button.svelte-1bgp9d3.svelte-1bgp9d3{flex:0 1 auto;border-width:2px;border-style:inset}button.svelte-1bgp9d3.svelte-1bgp9d3:focus{outline:none}.user-color.svelte-1bgp9d3 button.svelte-1bgp9d3{height:19px;align-self:center}.x11-color.svelte-1bgp9d3 button.svelte-1bgp9d3{height:19px}.color-name-wrapper.svelte-1bgp9d3.svelte-1bgp9d3{display:flex;flex-flow:column nowrap;gap:0.25rem;align-items:flex-start;font-size:0.75rem;line-height:1;text-align:left;padding:3px 4px}.color-name.svelte-1bgp9d3.svelte-1bgp9d3{cursor:pointer;font-weight:500;letter-spacing:0.5px;line-height:1.2}.color-name.svelte-1bgp9d3.svelte-1bgp9d3:hover{text-decoration:underline}.css-value.svelte-1bgp9d3.svelte-1bgp9d3{font-size:0.75rem;line-height:1;text-align:left;padding:3px 4px;grid-column:2 / span 1;grid-row:2 / span 1}.named-color.svelte-1bgp9d3 .css-value.svelte-1bgp9d3{margin:0 0 0 34px}",
  map: null
};
const Color = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentColor;
  let hasCustomName;
  let wrapperStyles;
  let buttonToolTip;
  let { color } = $$props;
  let { colorFormat } = $$props;
  let { displayColorName = false } = $$props;
  let { componentColor } = $$props;
  let timeout;
  createEventDispatcher();
  onDestroy(() => clearTimeout(timeout));
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.colorFormat === void 0 && $$bindings.colorFormat && colorFormat !== void 0)
    $$bindings.colorFormat(colorFormat);
  if ($$props.displayColorName === void 0 && $$bindings.displayColorName && displayColorName !== void 0)
    $$bindings.displayColorName(displayColorName);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  $$result.css.add(css$E);
  currentColor = getCssValueForColor(color, colorFormat);
  hasCustomName = colorNameisCustomized(color.color);
  wrapperStyles = displayColorName ? `border: 1px solid var(--${componentColor}-fg-color);` : "";
  buttonToolTip = !displayColorName ? `${color.color.name} (${color.color.hex}, hue: ${color.color.hsl.h})` : "";
  return `<div class="${[
    "color-wrapper svelte-1bgp9d3",
    (displayColorName ? "user-color" : "") + " " + (!displayColorName ? "x11-color" : "") + " " + (hasCustomName ? "named-color" : "") + " " + (!hasCustomName ? "unnamed-color" : "") + " " + (color.isSelected ? "selected-color" : "")
  ].join(" ").trim()}"${add_attribute("style", wrapperStyles, 0)}><div class="color-wrapper-top svelte-1bgp9d3"><button type="button"${add_attribute("title", buttonToolTip, 0)} class="svelte-1bgp9d3">${validate_component(ColorSwatch, "ColorSwatch").$$render(
    $$result,
    {
      color: color.color,
      swatchWidth: displayColorName ? "25px" : "28px",
      swatchHeight: displayColorName ? "15px" : "15px"
    },
    {},
    {}
  )}</button>
		${hasCustomName && displayColorName ? `<div class="color-name-wrapper svelte-1bgp9d3"><span class="color-name svelte-1bgp9d3">${escape(color.color.name)}</span></div>` : ``}</div>
	${displayColorName ? `<span class="css-value svelte-1bgp9d3">${escape(currentColor)}</span>` : ``}
</div>`;
});
const Palette_svelte_svelte_type_style_lang = "";
const css$D = {
  code: "button.svelte-x5hpex .accordion-heading.svelte-x5hpex{margin:0;font-weight:500}.accordion-button.svelte-x5hpex.svelte-x5hpex{display:flex;position:relative;align-items:center;background-color:var(--bg-color, var(--light-gray1));color:var(--text-color, var(--dark-gray2));font-size:14px;line-height:1;outline:1px solid transparent;outline-offset:1px;width:100%}.accordion-button.svelte-x5hpex.svelte-x5hpex:hover{background-color:var(--hover-bg-color, var(--bg-color, var(--light-gray1)));color:var(--hover-text-color, var(--indigo2));border-color:var(--hover-border-color, var(--black2))}.accordion-button.active.svelte-x5hpex.svelte-x5hpex,.accordion-button.active.svelte-x5hpex.svelte-x5hpex:hover,[data-state='expanded'].svelte-x5hpex .accordion-button.svelte-x5hpex{background-color:var(--active-bg-color, var(--bg-color, var(--light-gray1)));color:var(--active-text-color, var(--indigo2))}.icon.svelte-x5hpex.svelte-x5hpex{width:14px;height:14px;line-height:14px;margin:0 0 0 4px}.accordion-content.svelte-x5hpex.svelte-x5hpex{flex-grow:1;background-color:var(--active-bg-color, var(--bg-color, var(--light-gray1)));border-bottom-left-radius:var(--border-radius, var(--default-border-radius));border-bottom-right-radius:var(--border-radius, var(--default-border-radius));border-top:none;border-bottom:1px solid var(--active-border-color, var(--black2));border-right:1px solid var(--active-border-color, var(--black2));border-left:1px solid var(--active-border-color, var(--black2));margin:0 auto}.x11-palette.svelte-x5hpex.svelte-x5hpex{border:none;border-radius:0}.collapsed{display:none}.expanded{display:block}",
  map: null
};
const Palette$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasColors;
  let color;
  let accordionContentPadding;
  let accordionContentHeight;
  let accordionButtonWidth;
  let accordionButtonCursor;
  let accordionButtonPadding;
  let accordionButtonBorder;
  let accordionStylesSlide;
  let accordionStyles;
  let accordionCollapsedStyles;
  let accordionExpandedStyles;
  let paletteGrid;
  let { colorFormat = "hex" } = $$props;
  let { palette } = $$props;
  let { expanded = false } = $$props;
  let { displayPaletteName = true } = $$props;
  let { displayColorName = false } = $$props;
  let { alwaysExpanded = false } = $$props;
  let { columns = 4 } = $$props;
  let { x11Palette = false } = $$props;
  let { contentHeight = null } = $$props;
  let colorRefs = {};
  const dispatch = createEventDispatcher();
  function togglePalette() {
    if (!alwaysExpanded) {
      dispatch("togglePalette", palette.id);
    }
  }
  if ($$props.colorFormat === void 0 && $$bindings.colorFormat && colorFormat !== void 0)
    $$bindings.colorFormat(colorFormat);
  if ($$props.palette === void 0 && $$bindings.palette && palette !== void 0)
    $$bindings.palette(palette);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.displayPaletteName === void 0 && $$bindings.displayPaletteName && displayPaletteName !== void 0)
    $$bindings.displayPaletteName(displayPaletteName);
  if ($$props.displayColorName === void 0 && $$bindings.displayColorName && displayColorName !== void 0)
    $$bindings.displayColorName(displayColorName);
  if ($$props.alwaysExpanded === void 0 && $$bindings.alwaysExpanded && alwaysExpanded !== void 0)
    $$bindings.alwaysExpanded(alwaysExpanded);
  if ($$props.columns === void 0 && $$bindings.columns && columns !== void 0)
    $$bindings.columns(columns);
  if ($$props.x11Palette === void 0 && $$bindings.x11Palette && x11Palette !== void 0)
    $$bindings.x11Palette(x11Palette);
  if ($$props.contentHeight === void 0 && $$bindings.contentHeight && contentHeight !== void 0)
    $$bindings.contentHeight(contentHeight);
  if ($$props.togglePalette === void 0 && $$bindings.togglePalette && togglePalette !== void 0)
    $$bindings.togglePalette(togglePalette);
  $$result.css.add(css$D);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (palette?.updated) {
        if (!expanded) {
          togglePalette();
        }
        palette.updated = false;
      }
    }
    hasColors = palette.colors.length > 0;
    color = palette.componentColor;
    accordionContentPadding = x11Palette ? "padding: 0 0 3px 0;" : "padding: 0.5rem;";
    accordionContentHeight = contentHeight ? `height: ${contentHeight};` : "";
    accordionButtonWidth = x11Palette ? "width: 320px;" : "width: 100%;";
    accordionButtonCursor = x11Palette ? "cursor: default;" : "cursor: pointer;";
    accordionButtonPadding = x11Palette ? "padding: 7px 0 10px 0;" : alwaysExpanded ? "padding: 6px 1px 0px 1px;" : "padding: 0.5rem;";
    accordionButtonBorder = x11Palette ? `border-radius: 0; border: none;` : expanded && hasColors ? "border-top-left-radius: var(--border-radius, var(--default-border-radius));; border-top-right-radius: var(--border-radius, var(--default-border-radius));; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; border-top: 1px solid var(--active-border-color, var(--black2)); border-bottom: none; border-right: 1px solid var(--active-border-color, var(--black2)); border-left: 1px solid var(--active-border-color, var(--black2));" : expanded && !hasColors ? "border: 1px solid var(--active-border-color, var(--black2)); border-radius: var(--border-radius, var(--default-border-radius));" : "border: 1px solid var(--border-color, var(--black2)); border-radius: var(--border-radius, var(--default-border-radius));";
    accordionStylesSlide = `--text-color: var(--${color}-fg-color); --hover-text-color: var(--${color}-fg-color); --active-text-color: var(--${color}-fg-color); --border-radius: 6px; --hover-bg-color: var(--${color}-hover-bg-color); --active-bg-color: var(--${color}-hover-bg-color); --color-wrapper-bg-color: var(--${color}-cw-bg-color);`;
    accordionStyles = x11Palette ? `${accordionStylesSlide} border: none;` : `${accordionStylesSlide} --border-color: var(--${color}-fg-color); --hover-border-color: var(--${color}-fg-color); --active-border-color: var(--${color}-fg-color);`;
    accordionCollapsedStyles = `--bg-color: var(--${color}-bg-color);`;
    accordionExpandedStyles = `--bg-color: var(--${color}-hover-bg-color);`;
    paletteGrid = displayColorName ? "grid-template-columns: 100%; justify-items: flex-start; gap: 0.5rem; " : `grid-template-columns: repeat(${columns}, minmax(0, 1fr)); grid-auto-rows: auto; justify-items: center; row-gap: 6px; `;
    $$rendered = `



<div id="${"accordion-item-" + escape(palette.id, true)}" class="${"accordion-item " + escape(color, true) + " svelte-x5hpex"}"${add_attribute("data-state", expanded ? "expanded" : "collapsed", 0)} style="${escape(accordionStyles, true) + " " + escape(
      expanded ? accordionExpandedStyles : accordionCollapsedStyles,
      true
    )}"><button class="${["accordion-button transition-color svelte-x5hpex", expanded ? "active" : ""].join(" ").trim()}" type="button" style="${escape(accordionButtonWidth, true) + " " + escape(accordionButtonPadding, true) + " " + escape(accordionButtonBorder, true) + " " + escape(accordionButtonCursor, true)}" aria-expanded="false" aria-controls="${"accordion-content-" + escape(palette.id, true)}">${displayPaletteName ? `<h2 class="accordion-heading mb-0 w-full svelte-x5hpex" id="${"accordion-heading-" + escape(palette.id, true)}">${escape(palette.displayName)}</h2>` : ``}</button>
	${hasColors && expanded ? `<div id="${"accordion-content-" + escape(palette.id, true)}" class="${[
      "accordion-content transition svelte-x5hpex",
      x11Palette ? "x11-palette" : ""
    ].join(" ").trim()}" style="${"display: grid; " + escape(paletteGrid, true) + " " + escape(accordionContentPadding, true) + " " + escape(accordionContentHeight, true)}" aria-labelledby="${"accordion-heading-" + escape(palette.id, true)}">${each(palette.colors, (color2) => {
      return `${validate_component(Color, "Color").$$render(
        $$result,
        {
          color: color2,
          colorFormat,
          displayColorName,
          componentColor: palette.componentColor,
          this: colorRefs[color2.color.hexAlpha]
        },
        {
          this: ($$value) => {
            colorRefs[color2.color.hexAlpha] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div>` : ``}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const X11Palettes_svelte_svelte_type_style_lang = "";
const css$C = {
  code: "#x11-palettes.svelte-m5mtwh{display:grid;position:relative;grid:[controls-start] 'controls' 36px [controls-end]\n			[carousel-start] 'carousel-wrapper' 118px [carousel-end]\n			/ 100%;width:371px;height:169px;border-radius:6px;margin:0 auto;padding:7px}.x11-controls.svelte-m5mtwh{display:grid;grid-area:controls;grid:'. swatches btn-close' 36px / 1fr 320px 1fr}.x11-swatches.svelte-m5mtwh{display:flex;grid-area:swatches;flex-flow:row nowrap;justify-content:center;align-items:center;gap:0.5rem;width:100%}.btn-close.svelte-m5mtwh{grid-area:btn-close;place-self:start center;width:14px;color:var(--black1);margin:2px 0 0 0}.btn-close.svelte-m5mtwh:hover{color:var(--dark-gray1)}.carousel-wrapper.svelte-m5mtwh{display:grid;grid-area:carousel-wrapper;grid:'prev carousel next' 1fr / 1fr 320px 1fr;width:100%}.carousel.svelte-m5mtwh{display:flex;align-items:flex-start;grid-area:carousel;place-self:end stretch;scroll-snap-type:x mandatory;overflow-x:scroll;overflow-y:hidden;-webkit-overflow-scrolling:touch}.carousel-item.svelte-m5mtwh{flex:0 1 320px;scroll-snap-align:center;scroll-snap-stop:always;margin:0 auto}.btn-nav.svelte-m5mtwh{background-color:transparent;border:none;width:12px;margin:0 0 36px 0}.prev-page.svelte-m5mtwh{grid-area:prev;place-self:center start}.next-page.svelte-m5mtwh{grid-area:next;place-self:center end}",
  map: null
};
const X11Palettes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activePaletteIndex;
  let { x11ColorPalettes } = $$props;
  let x11PaletteMap = {};
  let paletteColor = "red";
  let activePaletteId;
  let carouselElement;
  createEventDispatcher();
  if (x11ColorPalettes) {
    x11ColorPalettes.forEach((p, i) => x11PaletteMap[p.id] = i);
    activePaletteId = x11ColorPalettes[0].id;
  }
  if ($$props.x11ColorPalettes === void 0 && $$bindings.x11ColorPalettes && x11ColorPalettes !== void 0)
    $$bindings.x11ColorPalettes(x11ColorPalettes);
  $$result.css.add(css$C);
  activePaletteIndex = x11PaletteMap?.[activePaletteId] ?? 0;
  paletteColor = x11ColorPalettes?.[activePaletteIndex]?.componentColor || "red";
  return `

<div id="x11-palettes" style="${"background-color: var(--" + escape(paletteColor, true) + "-hover-bg-color); border: 1px solid var(--" + escape(paletteColor, true) + "-fg-color)"}" class="svelte-m5mtwh"><div class="x11-controls svelte-m5mtwh"><div class="x11-swatches svelte-m5mtwh">${validate_component(X11Swatches, "X11Swatches").$$render($$result, { activePaletteId, x11ColorPalettes }, {}, {})}</div>
		<button type="button" class="btn-close svelte-m5mtwh" aria-label="Close" title="Close X11 Color Palettes" style="${"color: var(--" + escape(paletteColor, true) + "-fg-color)"}">${validate_component(Close, "Close").$$render($$result, {}, {}, {})}</button></div>
	<div class="carousel-wrapper svelte-m5mtwh"><button type="button" class="btn-nav prev-page svelte-m5mtwh" aria-label="Previous Color Palette" title="Previous Color Palette" style="${"color: var(--" + escape(paletteColor, true) + "-fg-color)"}">${validate_component(ChevronLeft, "ChevronLeft").$$render($$result, {}, {}, {})}</button>
		<div class="carousel svelte-m5mtwh"${add_attribute("this", carouselElement, 0)}>${each(x11ColorPalettes, (palette) => {
    return `<div id="${"x11-palette-" + escape(palette.id, true)}" class="carousel-item svelte-m5mtwh">${validate_component(Palette$1, "Palette").$$render(
      $$result,
      {
        palette,
        expanded: true,
        alwaysExpanded: true,
        displayPaletteName: true,
        x11Palette: true,
        columns: 7
      },
      {},
      {}
    )}
				</div>`;
  })}</div>
		<button type="button" class="btn-nav next-page svelte-m5mtwh" aria-label="Next Color Palette" title="Next Color Palette" style="${"color: var(--" + escape(paletteColor, true) + "-fg-color)"}">${validate_component(ChevronRight, "ChevronRight").$$render($$result, {}, {}, {})}</button></div>
</div>`;
});
const ColorSwatches_svelte_svelte_type_style_lang = "";
const css$B = {
  code: "svg.svelte-smshid{stroke:#000;fill:url(#gradient-horizontal);stroke-width:2%;width:100%;height:auto;max-height:100%}svg.svelte-smshid:hover{fill:url(#gradient-hover)}",
  map: null
};
const ColorSwatches = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$B);
  return `<svg aria-hidden="true" focusable="false" style="width:0;height:0;position:absolute;" class="svelte-smshid"><linearGradient id="gradient-horizontal" x2="1" y2="1"><stop offset="0%" stop-color="#0044FF"></stop><stop offset="50%" stop-color="#76E0C4"></stop><stop offset="100%" stop-color="#8CFF1A"></stop></linearGradient><linearGradient id="gradient-hover" x2="1" y2="1"><stop offset="0%" stop-color="#0036CC"></stop><stop offset="50%" stop-color="#4CD6B2"></stop><stop offset="100%" stop-color="#73E600"></stop></linearGradient></svg>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 512" class="svelte-smshid"><path d="M479.06 320H372.29L186.15 506.51c-2.06 2.07-4.49 3.58-6.67 5.49h299.58c17.64 0 31.94-14.33 31.94-32V352c0-17.67-14.3-32-31.94-32zm-44.5-152.9l-90.33-90.51c-12.47-12.5-32.69-12.5-45.17 0l-75.5 75.65V416c0 2.96-.67 5.73-.87 8.64l211.87-212.28c12.47-12.5 12.47-32.77 0-45.26zM191.62 32c0-17.67-14.3-32-31.94-32H31.94C14.3 0 0 14.33 0 32v384c0 53.02 42.9 96 95.81 96s95.81-42.98 95.81-96V32zM95.81 440c-13.23 0-23.95-10.75-23.95-24 0-13.26 10.73-24 23.95-24s23.95 10.74 23.95 24c.01 13.25-10.72 24-23.95 24zm31.94-184H63.88v-64h63.88v64zm0-128H63.88V64h63.88v64z"></path></svg>`;
});
const ColorPicker_svelte_svelte_type_style_lang = "";
const css$A = {
  code: ".color-picker.svelte-m75wer{--select-menu-background-color:var(--white3);--swatch-size:111px;display:flex;flex-flow:row nowrap;align-items:flex-start;gap:0.5rem;width:371px;height:169px;background-color:var(--color-picker-background-color);border:1px solid var(--fg-color, --black2);border-radius:6px;padding:0.5rem}.picker-left-col.svelte-m75wer,.picker-right-col.svelte-m75wer{display:flex;flex-flow:column nowrap;justify-content:flex-start;align-items:stretch;gap:0.5rem}.swatch-wrapper.svelte-m75wer{border-radius:6px}",
  map: null
};
const ColorPicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let swatchBorderColor;
  let swatchBorderStyles;
  let pointerStyles;
  let tooltip;
  let $state, $$unsubscribe_state = noop, $$subscribe_state = () => ($$unsubscribe_state(), $$unsubscribe_state = subscribe(state, ($$value) => $state = $$value), state);
  let { pickerId = `color-picker` } = $$props;
  let { state } = $$props;
  $$subscribe_state();
  let { editMode = false } = $$props;
  let initialized = false;
  let timeout;
  let colorPicker;
  function setColor(color) {
    console.log({ color });
    setCorrectColorSpace(color);
    set_store_value(state, $state.color = color, $state);
    set_store_value(state, $state.labelState = "success", $state);
    timeout = setTimeout(
      () => {
        set_store_value(state, $state.labelState = "inactive", $state);
      },
      500
    );
  }
  function setCorrectColorSpace(color) {
    if ($state.colorSpace === "rgba" && !color.hasAlpha) {
      set_store_value(state, $state.colorSpace = "rgb", $state);
    } else if ($state.colorSpace === "rgb" && color.hasAlpha) {
      set_store_value(state, $state.colorSpace = "rgba", $state);
    } else if ($state.colorSpace === "hsla" && !color.hasAlpha) {
      set_store_value(state, $state.colorSpace = "hsl", $state);
    } else if ($state.colorSpace === "hsl" && color.hasAlpha) {
      set_store_value(state, $state.colorSpace = "hsla", $state);
    }
  }
  onDestroy(() => clearTimeout(timeout));
  if ($$props.pickerId === void 0 && $$bindings.pickerId && pickerId !== void 0)
    $$bindings.pickerId(pickerId);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  if ($$props.editMode === void 0 && $$bindings.editMode && editMode !== void 0)
    $$bindings.editMode(editMode);
  if ($$props.setColor === void 0 && $$bindings.setColor && setColor !== void 0)
    $$bindings.setColor(setColor);
  $$result.css.add(css$A);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if ($state)
        set_store_value(state, $state.editable = !editMode, $state);
    }
    {
      if ($state)
        set_store_value(state, $state.alphaEnabled = $state?.colorSpace === "rgba" || $state?.colorSpace === "hsla", $state);
    }
    {
      if (typeof window !== "undefined" && !initialized) {
        $$subscribe_state(state = writable({
          pickerId,
          color: ColorParser.parse("rgb(128 128 128)").value,
          x11PalettesShown: false,
          x11ColorPalettes: getX11ColorPalettes(),
          colorSpace: "rgb",
          labelState: "prerender",
          editable: true,
          alphaEnabled: false
        }));
        $$subscribe_state(state = initColorPickerStore(state));
        initialized = true;
      }
    }
    swatchBorderColor = {
      ...$state?.color?.hsl,
      l: $state?.color?.hsl.l - 20
    };
    swatchBorderStyles = `border: 2px solid ${hslToString(swatchBorderColor)};`;
    pointerStyles = !$state.editable ? `pointer-events: none` : "";
    tooltip = $state.alphaEnabled || !$state.editable ? "Color picker does not support RGBA/HSLA color space" : "Click to open color picker";
    $$rendered = `



${initialized ? `<input type="color" style="display: none"${add_attribute("value", $state?.color?.hex, 0)}${add_attribute("this", colorPicker, 0)}>
	${!$state.x11PalettesShown ? `<div class="color-picker svelte-m75wer"${add_attribute("data-testid", $state?.pickerId, 0)}><div class="picker-left-col svelte-m75wer">${validate_component(ColorSpaceSelector, "ColorSpaceSelector").$$render(
      $$result,
      {
        disabled: !$state.editable,
        value: $state.colorSpace
      },
      {
        value: ($$value) => {
          $state.colorSpace = $$value;
          $$settled = false;
        }
      },
      {}
    )}
				<div class="${[
      "swatch-wrapper svelte-m75wer",
      (!$state.alphaEnabled && $state?.editable ? "cursor-pointer" : "") + " " + ($state.alphaEnabled || !$state?.editable ? "cursor-not-allowed" : "")
    ].join(" ").trim()}"${add_attribute("title", tooltip, 0)} style="${escape(swatchBorderStyles, true) + " " + escape(pointerStyles, true)}">${validate_component(ColorSwatch, "ColorSwatch").$$render(
      $$result,
      {
        color: $state.color,
        iconSize: "25px",
        iconTooltip: "Open X11 Color Palettes"
      },
      {},
      {
        icon: () => {
          return `${validate_component(ColorSwatches, "ColorSwatches").$$render($$result, {}, {}, {})}`;
        }
      }
    )}</div></div>
			<div class="picker-right-col svelte-m75wer">${validate_component(ColorLabel, "ColorLabel").$$render($$result, { pickerId: $state.pickerId }, {}, {})}
				${validate_component(ColorChannels, "ColorChannels").$$render($$result, { pickerId: $state.pickerId }, {}, {})}</div></div>` : `${$state.x11ColorPalettes ? `${validate_component(X11Palettes, "X11Palettes").$$render(
      $$result,
      {
        x11ColorPalettes: $state.x11ColorPalettes
      },
      {},
      {}
    )}` : ``}`}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_state();
  return $$rendered;
});
const InputTextBox_svelte_svelte_type_style_lang = "";
const css$z = {
  code: "input.svelte-1w14vts{--input-text-default-text-color:var(--black1);--input-text-default-background-color:var(--white4);--input-text-default-border-color:var(--black1);--input-text-default-border-radius:6px;--input-text-default-font-size:1rem;--input-text-default-line-height:19px;--input-text-default-padding:0.25rem 0.5rem;--input-text-default-focus-ring-color:var(--blue4);--input-text-default-invalid-text-color:var(--red3);--input-text-default-invalid-focus-ring-color:var(--red3);--input-text-default-invalid-background-color:var(--white4);--input-text-default-disabled-text-color:var(--dark-gray2);--input-text-default-disabled-background-color:var(--light-gray1);--input-text-default-disabled-border-color:var(--dark-gray2);justify-self:flex-start;color:var(--input-text-text-color, var(--input-text-default-text-color));background-color:var(--input-text-background-color, var(--input-text-default-background-color));border:1px solid var(--input-text-border-color, var(--input-text-default-border-color));border-radius:var(--input-text-border-radius, var(--input-text-default-border-radius));-webkit-border-radius:var(--input-text-border-radius, var(--input-text-default-border-radius));font-size:var(--input-text-font-size, var(--input-text-default-font-size));line-height:var(--input-text-line-height, var(--input-text-default-line-height));padding:var(--input-text-padding, var(--input-text-default-padding));margin:auto 0;width:100%}input.svelte-1w14vts:focus{box-shadow:0 0 0 2px var(--input-text-focus-ring-color, var(--input-text-default-focus-ring-color));outline:0}input:not([readonly]):not([disabled]).error.svelte-1w14vts,input.svelte-1w14vts:not([readonly]):not([disabled]):invalid{color:var(--input-text-invalid-text-color, var(--input-text-default-invalid-text-color));background-color:var(--input-text-invalid-background-color, var(--input-text-default-invalid-background-color));box-shadow:0 0 0 2px var(--input-text-invalid-focus-ring-color, var(--input-text-default-invalid-focus-ring-color));outline:0}input:not([readonly]):not([disabled]).error.svelte-1w14vts:focus,input.svelte-1w14vts:not([readonly]):not([disabled]):invalid:focus{outline:0}input[disabled].svelte-1w14vts{color:var(--input-text-disabled-text-color, var(--input-text-default-disabled-text-color));background-color:var(--input-text-disabled-background-color, var(--input-text-default-disabled-background-color));border:1px solid var(--input-text-disabled-border-color, var(--input-text-default-disabled-border-color))}input[readonly].svelte-1w14vts{pointer-events:none;color:var(--input-text-disabled-text-color, var(--input-text-default-disabled-text-color));background-color:var(--input-text-disabled-background-color, var(--input-text-default-disabled-background-color));border:1px solid var(--input-text-disabled-border-color, var(--input-text-default-disabled-border-color))}",
  map: null
};
const InputTextBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pattern;
  let { style = null } = $$props;
  let { inputText } = $$props;
  let { regex = null } = $$props;
  let { required = false } = $$props;
  let { disabled = false } = $$props;
  let { readonly = false } = $$props;
  let { error = false } = $$props;
  let { tooltip = null } = $$props;
  let { id = `text-box-${getRandomHexString$1(4)}` } = $$props;
  let inputTextElement;
  createEventDispatcher();
  function focus() {
    inputTextElement.focus();
  }
  function blur() {
    inputTextElement.blur();
  }
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.inputText === void 0 && $$bindings.inputText && inputText !== void 0)
    $$bindings.inputText(inputText);
  if ($$props.regex === void 0 && $$bindings.regex && regex !== void 0)
    $$bindings.regex(regex);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0)
    $$bindings.tooltip(tooltip);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0)
    $$bindings.focus(focus);
  if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0)
    $$bindings.blur(blur);
  $$result.css.add(css$z);
  pattern = regex ? regex.source : null;
  error = regex ? !regex.test(inputText) : required ? !Boolean(inputText) : false;
  return `<input type="text" spellcheck="false" data-testid="input-text"${add_attribute("style", style, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""} ${readonly ? "readonly" : ""}${add_attribute("pattern", pattern, 0)}${add_attribute("id", id, 0)}${add_attribute("name", id, 0)}${add_attribute("title", tooltip, 0)} class="${["svelte-1w14vts", error ? "error" : ""].join(" ").trim()}"${add_attribute("this", inputTextElement, 0)}${add_attribute("value", inputText, 0)}>`;
});
const BgColorOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options = [] } = $$props;
  let { menuId: menuId2 = "" } = $$props;
  let selectedOption;
  const dispatch = createEventDispatcher();
  function handleOptionClicked(selectedOptionNumber) {
    if (options.length > 0) {
      options.forEach((menuOption) => menuOption.active = false);
      selectedOption = options.find((menuOption) => menuOption.optionNumber == selectedOptionNumber);
      if (selectedOption) {
        selectedOption.active = true;
        dispatch("changed", selectedOption.value);
      }
    }
  }
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.menuId === void 0 && $$bindings.menuId && menuId2 !== void 0)
    $$bindings.menuId(menuId2);
  if ($$props.handleOptionClicked === void 0 && $$bindings.handleOptionClicked && handleOptionClicked !== void 0)
    $$bindings.handleOptionClicked(handleOptionClicked);
  return `${each(options, (option) => {
    return `${validate_component(Option, "Option").$$render($$result, Object.assign({}, option, { menuId: menuId2 }), {}, {
      default: () => {
        return `${validate_component(ColorSwatch, "ColorSwatch").$$render(
          $$result,
          {
            color: parseColorFromString(String(option.value)).value,
            swatchWidth: "15px",
            swatchHeight: "15px",
            style: "border: 1px solid var(--black4);"
          },
          {},
          {}
        )}
	`;
      }
    })}`;
  })}`;
});
const BgColorSelector_svelte_svelte_type_style_lang = "";
const css$y = {
  code: ".swatch-border.svelte-1naa3zy{border:1px solid var(--black4)}",
  map: null
};
const menuLabel$2 = "";
const BgColorSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "#00000000" } = $$props;
  let { disabled = false } = $$props;
  const menuId2 = "select-component-background-color";
  let selectComponent;
  const options = [
    {
      label: "",
      value: "#00000000",
      optionNumber: 1,
      active: false
    },
    {
      label: "",
      value: "#000000",
      optionNumber: 2,
      active: false
    },
    {
      label: "",
      value: "#FFFFFF",
      optionNumber: 3,
      active: false
    },
    {
      label: "",
      value: "#808080",
      optionNumber: 4,
      active: false
    }
  ];
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.menuId === void 0 && $$bindings.menuId && menuId2 !== void 0)
    $$bindings.menuId(menuId2);
  $$result.css.add(css$y);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Select, "Select").$$render(
      $$result,
      {
        menuLabel: menuLabel$2,
        options,
        selectedValue: value,
        menuId: menuId2,
        disabled,
        this: selectComponent
      },
      {
        this: ($$value) => {
          selectComponent = $$value;
          $$settled = false;
        }
      },
      {
        selectedValue: () => {
          return `${!disabled ? `<div class="swatch-border svelte-1naa3zy">${validate_component(ColorSwatch, "ColorSwatch").$$render(
            $$result,
            {
              color: parseColorFromString(value).value,
              swatchWidth: "15px",
              swatchHeight: "15px"
            },
            {},
            {}
          )}</div>` : `<div class="swatch-border svelte-1naa3zy" style="width: 15px; height: 15px"></div>`}
	`;
        },
        options: () => {
          return `${validate_component(BgColorOptions, "BgColorOptions").$$render($$result, { options, menuId: menuId2 }, {}, {})}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Checked = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 24 24" }, $$props), {}, {
    default: () => {
      return `<path fill="currentColor" d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H6.25Zm11.03 6.28l-6.754 6.747a.75.75 0 0 1-1.06 0L6.72 13.28a.75.75 0 0 1 1.06-1.06l2.217 2.216l6.223-6.217a.75.75 0 1 1 1.06 1.062Z"></path>`;
    }
  })}`;
});
const Unchecked = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 24 24" }, $$props), {}, {
    default: () => {
      return `<path fill="currentColor" d="M3 6.25A3.25 3.25 0 0 1 6.25 3h11.5A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25ZM6.25 5C5.56 5 5 5.56 5 6.25v11.5c0 .69.56 1.25 1.25 1.25h11.5c.69 0 1.25-.56 1.25-1.25V6.25C19 5.56 18.44 5 17.75 5H6.25Z"></path>`;
    }
  })}`;
});
const Checkbox_svelte_svelte_type_style_lang = "";
const css$x = {
  code: "label.color.svelte-d3la1j{--button-background-color:hsl(var(--button-hue, 0), var(--background-sat, 0%), var(--background-light, 95%));--button-hover-background-color:hsl(\n			var(--button-hue, 0),\n			var(--background-sat, 0%),\n			var(--background-light-hover, 100%)\n		);--button-fg-color:hsl(var(--button-hue, 0), var(--fg-sat, 0%), var(--fg-light, 10%));--button-active-fg-color:hsl(var(--button-hue, 0), var(--fg-sat-active, 0%), var(--fg-light-active, 0%));--button-disabled-fg-color:hsl(var(--button-hue, 0), var(--fg-sat-active, 0%), var(--fg-light-disabled, 0%));--button-hover-fg-color:var(--button-fg-color)}label.black.svelte-d3la1j{--button-background-color:var(--white2);--button-hover-background-color:var(--white4);--button-fg-color:var(--black2);--button-active-fg-color:var(--black4);--button-disabled-fg-color:var(--gray1);--button-hover-fg-color:var(--black4)}label.svelte-d3la1j{display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;font-weight:500;line-height:1}input.svelte-d3la1j{display:none}.icon.svelte-d3la1j{width:20px}.disabled.svelte-d3la1j{color:var(--button-disabled-fg-color)}",
  map: null
};
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  let { id } = $$props;
  let { checked } = $$props;
  let { disabled = false } = $$props;
  let { color = "black" } = $$props;
  let { style = "" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css$x);
  return `${!disabled ? `<label${add_attribute("for", id, 0)} class="${escape(null_to_empty(color !== "black" ? "color" : "black"), true) + " svelte-d3la1j"}" style="${"--button-hue: var(--" + escape(color, true) + "-hue); cursor: pointer; " + escape(style, true)}">${$$slots.leftLabel ? `<span>${slots.leftLabel ? slots.leftLabel({}) : ``}</span>` : ``}
		${checked ? `<div class="icon svelte-d3la1j" style="cursor: pointer">${validate_component(Checked, "Checked").$$render($$result, {}, {}, {})}</div>` : `<div class="icon svelte-d3la1j" style="cursor: pointer">${validate_component(Unchecked, "Unchecked").$$render($$result, {}, {}, {})}</div>`}
		${$$slots.rightLabel ? `<span>${slots.rightLabel ? slots.rightLabel({}) : ``}</span>` : ``}</label>
	<input type="checkbox"${add_attribute("id", id, 0)}${add_attribute("name", id, 0)} class="svelte-d3la1j"${add_attribute("checked", checked, 1)}>` : `<label class="${escape(color !== "black" ? "color" : "black", true) + " disabled svelte-d3la1j"}" style="${"--button-hue: var(--" + escape(color, true) + "-hue); cursor: not-allowed; " + escape(style, true)}">${$$slots.leftLabel ? `<span>${slots.leftLabel ? slots.leftLabel({}) : ``}</span>` : ``}
		<div class="icon svelte-d3la1j">${validate_component(Unchecked, "Unchecked").$$render($$result, {}, {}, {})}</div>
		${$$slots.rightLabel ? `<span>${slots.rightLabel ? slots.rightLabel({}) : ``}</span>` : ``}</label>`}`;
});
const UseCustomColorCheckbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { checked } = $$props;
  let { componentColor } = $$props;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      {
        id: "use-custom-color-checkbox",
        color: componentColor,
        checked
      },
      {
        checked: ($$value) => {
          checked = $$value;
          $$settled = false;
        }
      },
      {
        rightLabel: () => {
          return `Use Custom Color`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const ComponentSection_svelte_svelte_type_style_lang = "";
const css$w = {
  code: ".component-padding.svelte-1vcfral{padding:0.75rem;border-radius:6px;border:1px solid;width:auto}.bg-color-selector.svelte-1vcfral{--select-menu-width:58px;--select-menu-height:30px;--select-menu-margin:0 6px 0 0;--select-menu-padding:4px 10px;display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;line-height:1;font-weight:500;white-space:nowrap}",
  map: null
};
const ComponentSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let parseCustomColorResult;
  let customCssColor;
  let bgColor;
  let paddingBorder;
  let $app, $$unsubscribe_app;
  let { editorId } = $$props;
  let { componentColor } = $$props;
  let useCustomColor = false;
  let bgColorHex;
  let customColor = "#000000";
  let customColorTextBox;
  let app = getAppStore(editorId);
  $$unsubscribe_app = subscribe(app, (value) => $app = value);
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  $$result.css.add(css$w);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (useCustomColor && customColorTextBox)
        customColorTextBox.focus();
    }
    parseCustomColorResult = useCustomColor ? parseColorFromString(customColor) : { success: false };
    customCssColor = parseCustomColorResult.success ? parseCustomColorResult.value : null;
    bgColor = parseCustomColorResult.success ? `background-color: ${customCssColor.hexAlpha};` : bgColorHex === "#00000000" ? alphaBgPattern : `background-color: ${bgColorHex};`;
    paddingBorder = `border: 1px solid var(--${componentColor}-fg-color);`;
    $$rendered = `<div class="component-padding svelte-1vcfral" style="${escape(bgColor, true) + " " + escape(paddingBorder, true) + " " + escape($app.componentStyles, true)}">${slots.default ? slots.default({}) : ``}</div>
<div class="bg-color-selector svelte-1vcfral">Background Color
	${validate_component(BgColorSelector, "BgColorSelector").$$render(
      $$result,
      {
        disabled: useCustomColor,
        value: bgColorHex
      },
      {
        value: ($$value) => {
          bgColorHex = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(UseCustomColorCheckbox, "UseCustomColorCheckbox").$$render(
      $$result,
      { componentColor, checked: useCustomColor },
      {
        checked: ($$value) => {
          useCustomColor = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${useCustomColor ? `${validate_component(InputTextBox, "InputTextBox").$$render(
      $$result,
      {
        error: !parseCustomColorResult.success,
        disabled: !useCustomColor,
        this: customColorTextBox,
        inputText: customColor
      },
      {
        this: ($$value) => {
          customColorTextBox = $$value;
          $$settled = false;
        },
        inputText: ($$value) => {
          customColor = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}
</div>`;
  } while (!$$settled);
  $$unsubscribe_app();
  return $$rendered;
});
const SelectAll = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 24 24" }, $$props), {}, {
    default: () => {
      return `<path fill="currentColor" d="M20.496 5.627A2.25 2.25 0 0 1 22 7.75v10A4.25 4.25 0 0 1 17.75 22h-10a2.25 2.25 0 0 1-2.123-1.504l2.097.004H17.75a2.75 2.75 0 0 0 2.75-2.75v-10l-.004-.051V5.627ZM17.246 2a2.25 2.25 0 0 1 2.25 2.25v12.997a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.247V4.25A2.25 2.25 0 0 1 4.25 2h12.997ZM13.47 7.47l-3.89 3.888l-.98-1.308a.75.75 0 1 0-1.2.9l1.5 2a.75.75 0 0 0 1.13.08l4.5-4.5a.75.75 0 0 0-1.06-1.06Z"></path>`;
    }
  })}`;
});
const SelectAllCustomPropsButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { componentColor } = $$props;
  let { disabled = false } = $$props;
  let { wrapperWidth = null } = $$props;
  let { style = "" } = $$props;
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.wrapperWidth === void 0 && $$bindings.wrapperWidth && wrapperWidth !== void 0)
    $$bindings.wrapperWidth(wrapperWidth);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color: componentColor,
      gridStyle: style,
      tooltip: "Select All CSS Custom Properties",
      disabled,
      iconWidth: "18px",
      wrapperWidth
    },
    {},
    {
      label: () => {
        return `Select All`;
      },
      icon: () => {
        return `${validate_component(SelectAll, "SelectAll").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`;
});
const SelectNone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 24 24" }, $$props), {}, {
    default: () => {
      return `<path fill="currentColor" d="M20.496 5.627A2.25 2.25 0 0 1 22 7.75v10A4.25 4.25 0 0 1 17.75 22h-10a2.25 2.25 0 0 1-2.123-1.504l2.097.004H17.75a2.75 2.75 0 0 0 2.75-2.75v-10l-.004-.051V5.627ZM17.246 2a2.25 2.25 0 0 1 2.25 2.25v12.997a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.247V4.25A2.25 2.25 0 0 1 4.25 2h12.997Zm0 1.5H4.25a.75.75 0 0 0-.75.75v12.997c0 .414.336.75.75.75h12.997a.75.75 0 0 0 .75-.75V4.25a.75.75 0 0 0-.75-.75Z"></path>`;
    }
  })}`;
});
const SelectNoneCustomPropsButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { componentColor } = $$props;
  let { disabled = false } = $$props;
  let { wrapperWidth = null } = $$props;
  let { style = "" } = $$props;
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.wrapperWidth === void 0 && $$bindings.wrapperWidth && wrapperWidth !== void 0)
    $$bindings.wrapperWidth(wrapperWidth);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color: componentColor,
      gridStyle: style,
      tooltip: "Deselect All CSS Custom Properties",
      disabled,
      iconWidth: "18px",
      wrapperWidth
    },
    {},
    {
      label: () => {
        return `Deselect All`;
      },
      icon: () => {
        return `${validate_component(SelectNone, "SelectNone").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`;
});
const CssControls_svelte_svelte_type_style_lang = "";
const css$v = {
  code: ".css-controls.svelte-16t5twv{display:flex;align-items:center;font-size:0.8rem;gap:1.5rem;padding:0.5rem 1rem;margin:0.5rem 0 0 0}.button-list.svelte-16t5twv{display:flex;gap:0.5rem}",
  map: null
};
const CssControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { componentColor } = $$props;
  let { totalSelected } = $$props;
  let { allCustomPropsSelected } = $$props;
  let { anyCustomPropsSelected } = $$props;
  createEventDispatcher();
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.totalSelected === void 0 && $$bindings.totalSelected && totalSelected !== void 0)
    $$bindings.totalSelected(totalSelected);
  if ($$props.allCustomPropsSelected === void 0 && $$bindings.allCustomPropsSelected && allCustomPropsSelected !== void 0)
    $$bindings.allCustomPropsSelected(allCustomPropsSelected);
  if ($$props.anyCustomPropsSelected === void 0 && $$bindings.anyCustomPropsSelected && anyCustomPropsSelected !== void 0)
    $$bindings.anyCustomPropsSelected(anyCustomPropsSelected);
  $$result.css.add(css$v);
  return `<div class="css-controls svelte-16t5twv"><div class="button-list svelte-16t5twv">${validate_component(SelectAllCustomPropsButton, "SelectAllCustomPropsButton").$$render(
    $$result,
    {
      componentColor,
      disabled: allCustomPropsSelected,
      wrapperWidth: "112px"
    },
    {},
    {}
  )}
		${validate_component(SelectNoneCustomPropsButton, "SelectNoneCustomPropsButton").$$render(
    $$result,
    {
      componentColor,
      disabled: !anyCustomPropsSelected,
      wrapperWidth: "112px"
    },
    {},
    {}
  )}</div>
	<span class="total-selected"><strong>${escape(totalSelected)}</strong> custom properties selected</span>
</div>`;
});
const SvgIcon_svelte_svelte_type_style_lang = "";
const css$u = {
  code: "svg.svelte-q1wtpt{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}",
  map: null
};
const SvgIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { viewBox } = $$props;
  if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
    $$bindings.viewBox(viewBox);
  $$result.css.add(css$u);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("viewBox", viewBox, 0)} class="svelte-q1wtpt">${slots.default ? slots.default({}) : ``}</svg>`;
});
const SortAscending = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 24 24" }, $$props), {}, {
    default: () => {
      return `<path d="M18.2 13.3l-6.2-6.3-6.2 6.3c-.2.2-.3.5-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7z"></path>`;
    }
  })}`;
});
const SortDescending = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 24 24" }, $$props), {}, {
    default: () => {
      return `<path d="M5.8 9.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7s.1.5.3.7z"></path>`;
    }
  })}`;
});
const PROP_TYPES = ["string", "number", "boolean", "date", "unsorted"];
const KEBAB_CASE_REGEX = /^(?=.*-)[a-z-]*$/;
const SNAKE_CASE_REGEX = /^(?=.*_)[a-z_]*$/;
const CAMEL_CASE_REGEX = /^[a-z](?=.*[A-Z])[A-Za-z]*[^[-`]$/;
const getDefaultTableId = () => `table-${getRandomHexString(8)}`;
const getRandomHexString = (length) => Array.from({ length }, () => Math.floor(Math.random() * 16)).map((n) => Number(n).toString(16)).join("");
const capitalize = (string) => string.charAt(0).toUpperCase() + string.substring(1);
const isPropType = (type) => PROP_TYPES.includes(type);
const getCSSPropValue = (element, propName) => getComputedStyle(element).getPropertyValue(propName);
function getBorderCssValues(tableId) {
  if (typeof window !== "undefined") {
    const tableWrapper = document.getElementById(`${tableId}-wrapper`);
    if (tableWrapper) {
      let borderWidth = getCSSPropValue(tableWrapper, "--sst-table-wrapper-border-width");
      if (!borderWidth) {
        borderWidth = getCSSPropValue(tableWrapper, "--sst-default-table-wrapper-border-width");
      }
      let borderStyle = getCSSPropValue(tableWrapper, "--sst-table-wrapper-border-style");
      if (!borderStyle) {
        borderStyle = getCSSPropValue(tableWrapper, "--sst-default-table-wrapper-border-style");
      }
      let borderColor = getCSSPropValue(tableWrapper, "--sst-table-wrapper-border-color");
      if (!borderColor) {
        borderColor = getCSSPropValue(tableWrapper, "--sst-default-table-wrapper-border-color");
      }
      return borderWidth && borderStyle && borderColor ? `${borderWidth} ${borderStyle} ${borderColor}`.replaceAll(/['"`]/g, "") : "none";
    }
    return "none";
  }
}
function getDefaultColHeader(propName, capitalized = true) {
  const property = String(propName);
  let words = [property];
  if (KEBAB_CASE_REGEX.test(property)) {
    words = getWordsFromKebabCase(property);
  }
  if (SNAKE_CASE_REGEX.test(property)) {
    words = getWordsFromSnakeCase(property);
  }
  if (CAMEL_CASE_REGEX.test(property)) {
    words = getWordsFromCamelCase(property);
  }
  return capitalized ? words.map((w) => capitalize(w)).join(" ") : words.map((w) => w.toLowerCase()).join(" ");
}
function getWordsFromKebabCase(input) {
  return input.split("-");
}
function getWordsFromSnakeCase(input) {
  return input.split("_");
}
function getWordsFromCamelCase(input) {
  const wordBoundaries = Array.from({ length: input.length }, (_, i) => input.charCodeAt(i)).map((n, i) => ({ isUpper: n < 97, index: i })).filter((x) => x.isUpper).map((x) => x.index);
  let start = 0;
  const words = [];
  for (const i of wordBoundaries) {
    words.push(input.slice(start, i));
    start = i;
  }
  words.push(input.slice(start, input.length));
  return words;
}
function getValidPropertyNames(input) {
  if (CAMEL_CASE_REGEX.test(input)) {
    const kebabCase = getWordsFromCamelCase(input).map((w) => w.toLowerCase()).join("-");
    return [input, kebabCase];
  }
  if (KEBAB_CASE_REGEX.test(input)) {
    const words = getWordsFromKebabCase(input);
    const wordsCapitalized = words.slice(1).map((w) => capitalize(w));
    const camelCase = [words[0], ...wordsCapitalized].join("");
    return [camelCase, input];
  }
  return [input, input];
}
function getSortType(instance, propName) {
  if (instance[propName] instanceof Date) {
    return "date";
  }
  const propType = typeof instance[propName];
  if (isPropType(propType)) {
    return propType;
  }
  return "unsorted";
}
function getSortFunction(propName, propType, dir) {
  let sort;
  switch (propType) {
    case "string":
      sort = {
        desc: (a, b) => String(b[propName]).localeCompare(String(a[propName])),
        asc: (a, b) => String(a[propName]).localeCompare(String(b[propName]))
      };
      break;
    case "number":
    case "boolean":
      sort = {
        desc: (a, b) => Number(b[propName]) - Number(a[propName]),
        asc: (a, b) => Number(a[propName]) - Number(b[propName])
      };
      break;
    case "date":
      sort = {
        desc: (a, b) => b[propName] > a[propName] ? 1 : -1,
        asc: (a, b) => a[propName] > b[propName] ? 1 : -1
      };
      break;
    default:
      sort = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        desc: (a, b) => 0,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        asc: (a, b) => 0
      };
  }
  return sort[dir];
}
const elementsInColSelector = (tableId, colStat) => `#${tableId} .sst-table-body-cell[data-stat-name="${colStat}"] > *`;
const colHeaderSelector = (tableId, colStat) => `#${tableId} .sortable[data-stat-name="${colStat}"] .header-content`;
function getColumnWidth(tableId, colStat, sortBy) {
  if (typeof window !== "undefined") {
    const columnElements = Array.from(document.querySelectorAll(elementsInColSelector(tableId, String(colStat))));
    const widestElement = columnElements.reduce((max, el) => max.offsetWidth > el.offsetWidth ? max : el).offsetWidth;
    return Math.max(widestElement, getColHeaderWidth(tableId, String(colStat), sortBy));
  }
}
function getColHeaderWidth(tableId, colStat, sortStat) {
  const colHeaderWidth = document.querySelector(colHeaderSelector(tableId, colStat))?.scrollWidth ?? 0;
  return colStat === sortStat ? colHeaderWidth + getTableFontSizeInPixels(tableId) : colHeaderWidth;
}
function getNumberOfPixelsFromString(input) {
  const match = /(?<css_len>\d?.\d*)px/.exec(input);
  if (match) {
    return parseFloat(match.groups.css_len);
  }
}
function getTableFontSize(tableId) {
  if (typeof window !== "undefined") {
    const tableElement = document.getElementById(tableId);
    if (tableElement) {
      return getStyle(tableElement, "font-size");
    }
  }
}
const getTableFontSizeInPixels = (tableId) => getNumberOfPixelsFromString(getTableFontSize(tableId));
function getTableWrapperPaddingWidth(tableId) {
  if (typeof window !== "undefined") {
    const tableWrapper = document.getElementById(`${tableId}-wrapper`);
    if (tableWrapper) {
      const paddingLeft = getNumberOfPixelsFromString(getStyle(tableWrapper, "padding-left")) ?? 0;
      const paddingRight = getNumberOfPixelsFromString(getStyle(tableWrapper, "padding-right")) ?? 0;
      const borderLeft = getNumberOfPixelsFromString(getStyle(tableWrapper, "border-left-width")) ?? 0;
      const borderRight = getNumberOfPixelsFromString(getStyle(tableWrapper, "border-right-width")) ?? 0;
      return paddingLeft + paddingRight + borderLeft + borderRight;
    }
    return 0;
  }
}
function getStyle(el, property) {
  const [camelCase, kebabCase] = getValidPropertyNames(property);
  if (el && el.style[camelCase]) {
    return String(el.style[camelCase]);
  }
  if (typeof window !== "undefined" && window?.getComputedStyle) {
    const compStyles = window.getComputedStyle(el);
    return compStyles?.getPropertyValue(kebabCase);
  }
}
function getAriaValues(pageNumber, currentPage, totalPages, disabled) {
  const aria = {};
  const label = [];
  if (currentPage === totalPages) {
    label.push("Last Page");
  }
  if (currentPage === pageNumber) {
    label.push("Current Page");
    aria["aria-current"] = true;
  }
  if (disabled) {
    aria["aria-disabled"] = true;
  }
  label.push(`Goto Page ${pageNumber}`);
  aria["aria-label"] = label.join(", ");
  return aria;
}
function createComponentWidthStore(tableState) {
  return derived([tableState, pageWidth], ([$tableState, $pageWidth]) => {
    const getPaginationWidth = () => $tableState.state.paginationLeftWidth + $tableState.state.paginationRightWidth + getTableFontSizeInPixels($tableState.tableId);
    const getMinComponentWidth = () => Math.max($tableState.state.captionWidth, $tableState.state.sortDescriptionWidth, $tableState.state.tableWidth, getPaginationWidth());
    const getPaddedComponentWidth = () => $tableState.tableWrapper ? getMinComponentWidth() + getTableWrapperPaddingWidth($tableState.tableId) : getMinComponentWidth();
    const tableExceedsViewportWidth = () => getPaddedComponentWidth() > $pageWidth.current;
    const tableExceedsContainerWidth = () => getPaddedComponentWidth() > $tableState.state.containerWidth;
    const fitToContainer = () => tableExceedsContainerWidth() || tableExceedsViewportWidth() || $tableState.expandToContainerWidth;
    return {
      finalComponentWidth: fitToContainer() ? "100%" : `${getMinComponentWidth()}px`,
      finalWrapperWidth: fitToContainer() ? "100%" : "min-content"
    };
  });
}
const getPageWidth = () => {
  if (typeof window !== "undefined") {
    const svelteDiv = document.getElementById("svelte");
    return svelteDiv ? syncWidth(svelteDiv) : null;
  }
};
const pageWidth = derived(getPageWidth(), ($pageWidth) => {
  const isDefault = (width) => width < 640;
  const isSmall = (width) => width >= 640 && width < 768;
  const isMedium = (width) => width >= 768 && width < 1024;
  const isLarge = (width) => width >= 1024 && width < 1280;
  const isExtraLarge = (width) => width >= 1280 && width < 1536;
  const is2xExtraLarge = (width) => width >= 1536;
  const isMobileDisplay = (width) => width < 768;
  const breakPoint = (width) => isDefault(width) ? "default" : isSmall(width) ? "sm" : isMedium(width) ? "md" : isLarge(width) ? "lg" : isExtraLarge(width) ? "xl" : "2xl";
  const validInterface = {
    current: $pageWidth,
    breakPoint: breakPoint($pageWidth),
    isMobileDisplay: isMobileDisplay($pageWidth),
    isDefault: isDefault($pageWidth),
    isSmall: isSmall($pageWidth),
    isMedium: isMedium($pageWidth),
    isLarge: isLarge($pageWidth),
    isExtraLarge: isExtraLarge($pageWidth),
    is2xExtraLarge: is2xExtraLarge($pageWidth)
  };
  const NullInterface = {
    current: 0,
    breakPoint: "default",
    isMobileDisplay: true,
    isDefault: true,
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isExtraLarge: false,
    is2xExtraLarge: false
  };
  return $pageWidth > 0 ? validInterface : NullInterface;
});
function syncWidth(el) {
  return writable(null, (set) => {
    if (!el) {
      return;
    }
    const ro = new ResizeObserver(() => el && set(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  });
}
function getDefaultTableSettings(totalRows = 5) {
  return {
    tableId: getDefaultTableId(),
    showHeader: false,
    header: "",
    showSortDescription: false,
    sortBy: null,
    sortType: null,
    sortDir: "asc",
    tableWrapper: false,
    expandToContainerWidth: false,
    themeName: "lighter",
    clickableRows: false,
    animateSorting: false,
    paginated: false,
    pageSize: totalRows,
    pageSizeOptions: [5, 10, 15],
    pageRangeFormat: "auto",
    pageNavFormat: "auto",
    rowType: "rows",
    state: {
      syncState: "not-started",
      captionWidth: 0,
      sortDescriptionWidth: 0,
      tableWidth: 0,
      paginationLeftWidth: 0,
      paginationRightWidth: 0,
      containerWidth: 0
    },
    pagination: {
      totalRows,
      totalPages: 1,
      currentPage: 1,
      startRow: 0,
      endRow: totalRows
    }
  };
}
function createTableStateStore(totalRows, settings) {
  const pageSize = settings?.paginated ? settings?.pageSize || 5 : totalRows;
  const { set, subscribe: subscribe2, update } = writable({
    ...getDefaultTableSettings(totalRows),
    ...settings,
    pagination: {
      totalRows,
      totalPages: Math.ceil(totalRows / pageSize),
      currentPage: 1,
      startRow: 0,
      endRow: Math.min(pageSize, totalRows)
    }
  });
  function reset(totalRowsChanged, pageSize2, settings2) {
    totalRows = totalRowsChanged;
    return changePageSize(pageSize2, settings2);
  }
  function changePageSize(pageSize2, settings2) {
    settings2.pageSize = pageSize2;
    settings2.pagination = {
      totalRows,
      totalPages: Math.ceil(totalRows / pageSize2),
      currentPage: 1,
      startRow: 0,
      endRow: Math.min(pageSize2, totalRows)
    };
    settings2.state.syncState = "finished-sort-table";
    return settings2;
  }
  function goToPage(pageNumber, settings2) {
    const { pagination } = settings2;
    settings2.pagination = {
      ...pagination,
      currentPage: pageNumber,
      startRow: (pageNumber - 1) * settings2.pageSize,
      endRow: Math.min(pageNumber * settings2.pageSize, totalRows)
    };
    settings2.state.syncState = "finished-sort-table";
    return settings2;
  }
  return {
    set,
    subscribe: subscribe2,
    reset: (totalRowsChanged, pageSize2) => update((settings2) => reset(totalRowsChanged, pageSize2, settings2)),
    changePageSize: (pageSize2) => update((settings2) => changePageSize(pageSize2, settings2)),
    changePageNumber: (page) => update((settings2) => goToPage(page, settings2)),
    goToFirstPage: () => update((settings2) => goToPage(1, settings2)),
    goToPrevPage: () => update((settings2) => goToPage(settings2.pagination.currentPage - 1, settings2)),
    goToNextPage: () => update((settings2) => goToPage(settings2.pagination.currentPage + 1, settings2)),
    goToLastPage: () => update((settings2) => goToPage(settings2.pagination.totalPages, settings2))
  };
}
function setService(key, service) {
  setContext(key, service);
  return service;
}
function getService(key) {
  return () => getContext(key);
}
function initTableState(tableState) {
  const key = `${get_store_value(tableState).tableId}-state`;
  return setService(key, tableState);
}
function initTableSize(tableState) {
  const key = `${get_store_value(tableState).tableId}-size`;
  const tableSize = createComponentWidthStore(tableState);
  return setService(key, tableSize);
}
function initTableStores(tableState) {
  return [initTableState(tableState), initTableSize(tableState)];
}
function getTableState(tableId) {
  const key = `${tableId}-state`;
  return getService(key)();
}
function getTableSize(tableId) {
  const key = `${tableId}-size`;
  return getService(key)();
}
const ColumnHeader_svelte_svelte_type_style_lang = "";
const css$t = {
  code: ".sst-table-header-cell.svelte-iy09v5{display:table-cell;text-align:center;font-weight:var(--sst-col-header-text-weight, var(--sst-default-col-header-text-weight));color:var(--sst-col-header-text-color, var(--sst-default-col-header-text-color));background-color:var(--sst-col-header-bg-color, var(--sst-default-col-header-bg-color));border-top:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));border-left:1px solid var(--sst-col-header-vert-border-color, var(--sst-default-col-header-vert-border-color));border-bottom:1px solid var(--sst-col-header-horiz-border-color, var(--sst-default-col-header-horiz-border-color));padding:var(--sst-col-header-padding, var(--sst-default-col-header-padding))}.sst-table-header-cell.svelte-iy09v5:first-child{border-top-left-radius:var(--sst-table-border-radius, var(--sst-default-table-border-radius));border-left:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color))}.sst-table-header-cell.svelte-iy09v5:last-child{border-top-right-radius:var(--sst-table-border-radius, var(--sst-default-table-border-radius));border-right:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color))}.sortable.svelte-iy09v5{cursor:pointer}.sst-header-content-wrapper.svelte-iy09v5{display:flex;flex-flow:row nowrap;justify-content:center;column-gap:0.25em}.asc.svelte-iy09v5,.desc.svelte-iy09v5{color:var(--sst-col-header-highlight-sort-text-color, var(--sst-default-col-header-highlight-sort-text-color));font-weight:var(--sst-col-header-highlight-text-weight, var(--sst-default-col-header-highlight-text-weight));background-color:var(\n			--sst-col-header-highlight-sort-bg-color,\n			var(--sst-default-col-header-highlight-sort-bg-color)\n		);border-top:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));border-left:1px solid\n			var(\n				--sst-col-header-highlight-sort-vert-border-color,\n				var(--sst-default-col-header-highlight-sort-vert-border-color)\n			);border-bottom:1px solid\n			var(\n				--sst-col-header-highlight-sort-horiz-border-color,\n				var(--sst-default-col-header-highlight-sort-horiz-border-color)\n			)}.asc.svelte-iy09v5:first-child,.desc.svelte-iy09v5:first-child{border-left:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color))}.asc.svelte-iy09v5:last-child,.desc.svelte-iy09v5:last-child{border-right:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color))}.asc_icon.svelte-iy09v5,.desc_icon.svelte-iy09v5{flex:0 0 1em;display:flex;flex-flow:column;justify-content:center;font-size:1em;stroke:currentColor;stroke-width:2;cursor:pointer;line-height:1;margin:0 0 0 auto;color:var(--sst-col-header-highlight-sort-text-color, var(--sst-default-col-header-highlight-sort-text-color));background-color:var(\n			--sst-col-header-highlight-sort-bg-color,\n			var(--sst-default-col-header-highlight-sort-bg-color)\n		)}",
  map: null
};
const ColumnHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let asc;
  let desc;
  let $tableState, $$unsubscribe_tableState;
  let { tableId } = $$props;
  let { data = [] } = $$props;
  let { propName } = $$props;
  let { headerText = getDefaultColHeader(propName) } = $$props;
  let { tooltip = getDefaultColHeader(propName) } = $$props;
  let { sortable = true } = $$props;
  let width;
  createEventDispatcher();
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  let ariaSort = null;
  const getAriaSortValue = (sortBy, sortDir) => sortBy !== propName ? null : sortDir === "asc" ? "ascending" : "descending";
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.propName === void 0 && $$bindings.propName && propName !== void 0)
    $$bindings.propName(propName);
  if ($$props.headerText === void 0 && $$bindings.headerText && headerText !== void 0)
    $$bindings.headerText(headerText);
  if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0)
    $$bindings.tooltip(tooltip);
  if ($$props.sortable === void 0 && $$bindings.sortable && sortable !== void 0)
    $$bindings.sortable(sortable);
  $$result.css.add(css$t);
  {
    if ($tableState.state.syncState === "started-resize-columns")
      width = `${getColumnWidth(tableId, propName, $tableState.sortBy)}px`;
  }
  data.length ? getSortType(data[0], propName) : "unsorted";
  asc = sortable && $tableState.sortBy === propName && $tableState.sortDir === "asc";
  desc = sortable && $tableState.sortBy === propName && $tableState.sortDir === "desc";
  ariaSort = getAriaSortValue($tableState.sortBy, $tableState.sortDir);
  $$unsubscribe_tableState();
  return `<div role="columnheader"${add_attribute("aria-sort", ariaSort, 0)} class="${[
    "sst-table-header-cell svelte-iy09v5",
    (sortable ? "sortable" : "") + " " + (asc ? "asc" : "") + " " + (desc ? "desc" : "")
  ].join(" ").trim()}"${add_attribute("data-stat-name", propName, 0)}${add_attribute("title", tooltip, 0)} data-testid="${escape($tableState.tableId, true) + "-toggle-" + escape(String(propName), true)}" tabindex="0"><div class="sst-header-content-wrapper svelte-iy09v5"${add_attribute("style", width ? ` width: ${width}` : "", 0)}><span class="header-content">${escape(headerText)}</span>
		${asc ? `<div class="asc_icon svelte-iy09v5">${validate_component(SortAscending, "SortAscending").$$render($$result, {}, {}, {})}</div>` : `${desc ? `<div class="desc_icon svelte-iy09v5">${validate_component(SortDescending, "SortDescending").$$render($$result, {}, {}, {})}</div>` : ``}`}</div>
</div>`;
});
const TableCell_svelte_svelte_type_style_lang = "";
const css$s = {
  code: ".sst-table-body-cell.svelte-721e9l{display:table-cell;text-align:right;border-top:none;border-left:1px solid var(--sst-body-inner-vert-border-color, var(--sst-default-body-inner-vert-border-color));border-bottom:1px dotted var(--sst-body-inner-horiz-border-color, var(--sst-default-body-inner-horiz-border-color));padding:var(--sst-body-cell-padding, var(--sst-default-body-cell-padding))}.sst-table-body-cell.svelte-721e9l:first-child{border-left:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color))}.sst-table-body-cell.svelte-721e9l:last-child{border-right:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color))}.sst-resp-table-row:last-child .sst-table-body-cell.svelte-721e9l{border-bottom:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color))}.sst-resp-table-row:last-child .sst-table-body-cell.svelte-721e9l:first-child{border-bottom-left-radius:var(--sst-table-border-radius, var(--sst-default-table-border-radius))}.sst-resp-table-row:last-child .sst-table-body-cell.svelte-721e9l:last-child{border-bottom-right-radius:var(--sst-table-border-radius, var(--sst-default-table-border-radius))}.highlight-stat.svelte-721e9l{color:var(--sst-body-highlight-sort-text-color, var(--sst-default-body-highlight-sort-text-color));background-color:var(--sst-body-highlight-sort-bg-color, var(--sst-default-body-highlight-sort-bg-color));border-bottom:1px dotted\n			var(--sst-body-highlight-sort-border-color, var(--sst-default-body-highlight-sort-border-color))}.sst-resp-table-row:last-child .highlight-stat.svelte-721e9l{border-bottom:1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color))}.text-center.svelte-721e9l{text-align:center}",
  map: null
};
const TableCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let propType;
  let $tableState, $$unsubscribe_tableState;
  let { tableId } = $$props;
  let { obj } = $$props;
  let { propName } = $$props;
  let { classList = [] } = $$props;
  let { colValue = null } = $$props;
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  let cellValue = "";
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  if ($$props.obj === void 0 && $$bindings.obj && obj !== void 0)
    $$bindings.obj(obj);
  if ($$props.propName === void 0 && $$bindings.propName && propName !== void 0)
    $$bindings.propName(propName);
  if ($$props.classList === void 0 && $$bindings.classList && classList !== void 0)
    $$bindings.classList(classList);
  if ($$props.colValue === void 0 && $$bindings.colValue && colValue !== void 0)
    $$bindings.colValue(colValue);
  $$result.css.add(css$s);
  cellValue = colValue ? colValue(obj) : obj[propName].toString();
  propType = getSortType(obj, propName);
  $$unsubscribe_tableState();
  return `<div role="cell" class="${[
    "sst-table-body-cell" + escape(classList ? ` ${classList.join(" ")}` : "", true) + " svelte-721e9l",
    ($tableState.sortBy === propName ? "highlight-stat" : "") + " " + (propType === "number" ? "text-right" : "")
  ].join(" ").trim()}"${add_attribute("data-stat-name", propName, 0)}><span><!-- HTML_TAG_START -->${cellValue}<!-- HTML_TAG_END --></span>
</div>`;
});
const TableHeader_svelte_svelte_type_style_lang = "";
const css$r = {
  code: ".sst-table-header-wrapper.svelte-1iqjlfk{display:flex;flex-flow:column nowrap;align-items:baseline}.sst-resp-table-caption.svelte-1iqjlfk{display:table-caption;color:var(--sst-table-header-text-color, var(--sst-default-table-header-text-color));font-size:var(--sst-table-header-font-size, var(--sst-default-table-header-font-size));font-weight:500;letter-spacing:0.025em;line-height:1;white-space:nowrap;margin:0 0 0.375em}.sst-sort-description.svelte-1iqjlfk{color:var(--sst-sort-description-text-color, var(--sst-default-sort-description-text-color));font-size:var(--sst-sort-description-font-size, var(--sst-default-sort-description-font-size));line-height:1;font-style:italic;margin-bottom:0.8em}",
  map: null
};
const TableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tableSortDescWidthStore, $$unsubscribe_tableSortDescWidthStore = noop, $$subscribe_tableSortDescWidthStore = () => ($$unsubscribe_tableSortDescWidthStore(), $$unsubscribe_tableSortDescWidthStore = subscribe(tableSortDescWidthStore, ($$value) => $tableSortDescWidthStore = $$value), tableSortDescWidthStore);
  let $tableState, $$unsubscribe_tableState;
  let $tableCaptionWidthStore, $$unsubscribe_tableCaptionWidthStore = noop, $$subscribe_tableCaptionWidthStore = () => ($$unsubscribe_tableCaptionWidthStore(), $$unsubscribe_tableCaptionWidthStore = subscribe(tableCaptionWidthStore, ($$value) => $tableCaptionWidthStore = $$value), tableCaptionWidthStore);
  let $componentWidth, $$unsubscribe_componentWidth;
  let { tableId } = $$props;
  let tableCaptionElement;
  let tableSortDescElement;
  let tableCaptionWidthStore;
  let tableSortDescWidthStore;
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  const componentWidth = getTableSize(tableId);
  $$unsubscribe_componentWidth = subscribe(componentWidth, (value) => $componentWidth = value);
  const describeSortSetting = (sortBy, sortDir) => `Sorted by: ${getDefaultColHeader(sortBy, false)} (${sortDir === "asc" ? "ascending" : "descending"})`;
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  $$result.css.add(css$r);
  {
    if (typeof window !== "undefined")
      $$subscribe_tableCaptionWidthStore(tableCaptionWidthStore = syncWidth(tableCaptionElement));
  }
  {
    if (typeof window !== "undefined")
      $$subscribe_tableSortDescWidthStore(tableSortDescWidthStore = syncWidth(tableSortDescElement));
  }
  {
    if (typeof window !== "undefined")
      set_store_value(tableState, $tableState.state.captionWidth = $tableCaptionWidthStore, $tableState);
  }
  {
    if (typeof window !== "undefined")
      set_store_value(tableState, $tableState.state.sortDescriptionWidth = $tableSortDescWidthStore, $tableState);
  }
  $$unsubscribe_tableSortDescWidthStore();
  $$unsubscribe_tableState();
  $$unsubscribe_tableCaptionWidthStore();
  $$unsubscribe_componentWidth();
  return `<div class="sst-table-header-wrapper svelte-1iqjlfk" style="${"width: " + escape($componentWidth.finalComponentWidth, true)}">${$tableState.showHeader ? `<h3 id="${escape($tableState.tableId, true) + "-caption"}" class="sst-resp-table-caption svelte-1iqjlfk" data-testid="${escape($tableState.tableId, true) + "-caption"}"${add_attribute("this", tableCaptionElement, 0)}>${escape($tableState.header)}</h3>` : ``}
	${$tableState.showSortDescription && $tableState.sortBy ? `<div id="${escape($tableState.tableId, true) + "-sort-description"}" class="sst-sort-description svelte-1iqjlfk" data-testid="${escape($tableState.tableId, true) + "-sort-description"}"${add_attribute("this", tableSortDescElement, 0)}>${escape(describeSortSetting($tableState.sortBy, $tableState.sortDir))}</div>` : ``}
</div>`;
});
const DataTable_svelte_svelte_type_style_lang = "";
const css$q = {
  code: ".sst-resp-table-container.svelte-uzwvsv{overflow-x:auto;white-space:nowrap;border-top-left-radius:var(--sst-table-border-radius, var(--sst-default-table-border-radius));border-top-right-radius:var(--sst-table-border-radius, var(--sst-default-table-border-radius))}.sst-resp-table-wrapper.svelte-uzwvsv{display:inline-block}.sst-resp-table.svelte-uzwvsv{display:table;color:var(--sst-text-color, var(--sst-default-text-color));line-height:1.25em;margin:0 auto;table-layout:fixed}.sst-resp-table-header.svelte-uzwvsv{display:table-header-group;text-align:center}.sst-resp-table-body.svelte-uzwvsv{display:table-row-group}.sst-resp-table-body.svelte-uzwvsv a{text-decoration:none;color:var(--sst-link-text-color, var(--sst-default-link-text-color))}.sst-resp-table-body.svelte-uzwvsv a:hover{text-decoration:underline;color:var(--sst-link-hover-text-color, var(--sst-default-link-hover-text-color))}.sst-resp-table-row.svelte-uzwvsv{display:table-row}.sst-resp-table-row.svelte-uzwvsv:nth-child(even){background-color:var(--sst-body-even-row-bg-color, var(--sst-default-body-even-row-bg-color))}.sst-resp-table-row.svelte-uzwvsv:nth-child(odd){background-color:var(--sst-body-odd-row-bg-color, var(--sst-default-body-odd-row-bg-color))}.sst-resp-table-row.svelte-uzwvsv:last-child{border-bottom-left-radius:var(--sst-table-border-radius, var(--sst-default-table-border-radius));border-bottom-right-radius:var(--sst-table-border-radius, var(--sst-default-table-border-radius))}.clickable.svelte-uzwvsv{cursor:pointer}",
  map: null
};
const DataTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tableWidthStore;
  let $tableState, $$unsubscribe_tableState;
  let $tableWidthStore, $$unsubscribe_tableWidthStore = noop, $$subscribe_tableWidthStore = () => ($$unsubscribe_tableWidthStore(), $$unsubscribe_tableWidthStore = subscribe(tableWidthStore, ($$value) => $tableWidthStore = $$value), tableWidthStore);
  let { tableId } = $$props;
  let { data = [] } = $$props;
  let { columnSettings = [] } = $$props;
  let tableElement;
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  createEventDispatcher();
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.columnSettings === void 0 && $$bindings.columnSettings && columnSettings !== void 0)
    $$bindings.columnSettings(columnSettings);
  $$result.css.add(css$q);
  $$subscribe_tableWidthStore(tableWidthStore = syncWidth(tableElement));
  set_store_value(tableState, $tableState.state.tableWidth = $tableWidthStore, $tableState);
  $$unsubscribe_tableState();
  $$unsubscribe_tableWidthStore();
  return `${validate_component(TableHeader, "TableHeader").$$render($$result, { tableId: $tableState.tableId }, {}, {})}
<article class="sst-resp-table-container svelte-uzwvsv"><div class="sst-resp-table-wrapper svelte-uzwvsv"${add_attribute("data-testid", $tableState.tableId, 0)}><div${add_attribute("id", $tableState.tableId, 0)} role="table" aria-labelledby="${escape($tableState.tableId, true) + "-cap"}"${add_attribute("aria-rowcount", $tableState.pagination.totalRows, 0)} class="sst-resp-table svelte-uzwvsv"${add_attribute("this", tableElement, 0)}><div role="row" class="sst-resp-table-header svelte-uzwvsv">${each(columnSettings, ({ propName, headerText, tooltip, sortable }) => {
    return `${validate_component(ColumnHeader, "ColumnHeader").$$render(
      $$result,
      {
        tableId: $tableState.tableId,
        data,
        propName,
        headerText,
        tooltip,
        sortable
      },
      {},
      {}
    )}`;
  })}</div>
			<div role="rowgroup" class="sst-resp-table-body svelte-uzwvsv">${$tableState.animateSorting ? `${each(data, (obj, i) => {
    return `<div role="row" class="${[
      "sst-resp-table-row svelte-uzwvsv",
      $tableState.clickableRows ? "clickable" : ""
    ].join(" ").trim()}"${add_attribute("aria-rowindex", $tableState.pagination.startRow + i + 1, 0)} data-testid="${escape($tableState.tableId, true) + "-row"}">${each(columnSettings, ({ propName, classList, colValue }) => {
      return `${validate_component(TableCell, "TableCell").$$render(
        $$result,
        {
          tableId: $tableState.tableId,
          obj,
          propName,
          classList,
          colValue
        },
        {},
        {}
      )}`;
    })}
						</div>`;
  })}` : `${each(data, (obj, i) => {
    return `<div role="row" class="${[
      "sst-resp-table-row svelte-uzwvsv",
      $tableState.clickableRows ? "clickable" : ""
    ].join(" ").trim()}"${add_attribute("aria-rowindex", $tableState.pagination.startRow + i + 1, 0)} data-testid="${escape($tableState.tableId, true) + "-row"}">${each(columnSettings, ({ propName, classList, colValue }) => {
      return `${validate_component(TableCell, "TableCell").$$render(
        $$result,
        {
          tableId: $tableState.tableId,
          obj,
          propName,
          classList,
          colValue
        },
        {},
        {}
      )}`;
    })}
						</div>`;
  })}`}</div></div></div>
</article>`;
});
const Button_svelte_svelte_type_style_lang = "";
const css$p = {
  code: ".sst-btn.svelte-uxamqm{cursor:pointer;color:var(--sst-button-text-color, var(--sst-default-button-text-color));background-color:var(--sst-button-bg-color, var(--sst-default-button-bg-color));border-top:1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));border-bottom:1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));border-left:1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));border-right:none;background-position:center;transition:background 0.2s;margin:0px;padding:0.25em 0.5em;white-space:nowrap;overflow:hidden;font-size:1em;line-height:1.5em;font-weight:500;letter-spacing:0.025em;border-radius:0px;box-shadow:0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)}.sst-btn.svelte-uxamqm:first-child{border-top-right-radius:0px;border-bottom-right-radius:0px;border-top-left-radius:var(--sst-button-group-border-radius, var(--sst-default-button-group-border-radius, 4px));border-bottom-left-radius:var(\n			--sst-button-group-border-radius,\n			var(--sst-default-button-group-border-radius, 4px)\n		)}.sst-btn.svelte-uxamqm:last-child{border-right:1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));border-top-right-radius:var(--sst-button-group-border-radius, var(--sst-default-button-group-border-radius, 4px));border-bottom-right-radius:var(\n			--sst-button-group-border-radius,\n			var(--sst-default-button-group-border-radius, 4px)\n		);border-top-left-radius:0px;border-bottom-left-radius:0px}.sst-btn.svelte-uxamqm:hover{color:var(--sst-button-hover-text-color, var(--sst-default-button-hover-text-color));background-color:var(--sst-button-hover-bg-color, var(--sst-default-button-hover-bg-color));border-top:1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));border-bottom:1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));border-left:1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color))}.sst-btn.svelte-uxamqm:hover:last-child{border-right:1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color))}.sst-btn.active.svelte-uxamqm{color:var(--sst-button-active-text-color, var(--sst-default-button-active-text-color));background-color:var(--sst-button-active-bg-color, var(--sst-default-button-active-bg-color));border-top:1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));border-bottom:1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));border-left:1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));background-size:100%;transition:background 0.1s}.sst-btn.active.svelte-uxamqm:last-child{border-right:1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color))}.sst-btn.svelte-uxamqm:focus{border-top:1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));border-bottom:1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));border-left:1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));outline:2px solid transparent;outline-offset:2px}.sst-btn.svelte-uxamqm:focus:last-child{border-right:1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color))}.sst-btn.disabled.svelte-uxamqm,.sst-btn.svelte-uxamqm:disabled,.sst-btn.svelte-uxamqm:disabled:hover{color:var(--sst-button-disabled-text-color, var(--sst-default-button-disabled-text-color));background-color:var(--sst-button-disabled-bg-color, var(--sst-default-button-disabled-bg-color));border-top:1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));border-bottom:1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));border-left:1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));cursor:default}.sst-btn.disabled.svelte-uxamqm:last-child,.sst-btn.svelte-uxamqm:disabled:last-child,.sst-btn.svelte-uxamqm:disabled:hover:last-child{border-right:1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color))}.sst-btn.symbol.svelte-uxamqm{width:30px;height:30px;font-size:14px;padding:0}.sst-btn.symbol.svelte-uxamqm:nth-child(2){border-right:1px solid var(--sst-button-border-color, var(--sst-default-button-border-color))}.sst-btn.symbol.svelte-uxamqm:nth-child(2):hover{border-right:1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color))}.sst-btn.symbol:nth-child(2).active.svelte-uxamqm{border-right:1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color))}.sst-btn.symbol.svelte-uxamqm:nth-child(2):focus{border-right:1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color))}.sst-btn.symbol:nth-child(2).disabled.svelte-uxamqm,.sst-btn.symbol.svelte-uxamqm:nth-child(2):disabled,.sst-btn.symbol.svelte-uxamqm:nth-child(2):disabled:hover{border-right:1px solid var(--sst-button-border-color, var(--sst-default-button-border-color))}.sst-btn.symbol.disabled.no-page-nav.svelte-uxamqm:nth-child(2),.sst-btn.symbol.no-page-nav.svelte-uxamqm:nth-child(2):disabled,.sst-btn.symbol.no-page-nav.svelte-uxamqm:nth-child(2):disabled:hover{border-right:1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color))}.sst-btn.symbol.svelte-uxamqm:nth-child(3){border-left:none}.sst-btn.text.svelte-uxamqm{line-height:1;font-size:0.9em;width:75px;height:30px}.sst-btn.text.svelte-uxamqm:last-child{border-left:none}.sst-btn.number.svelte-uxamqm{line-height:1;font-size:0.9em;width:30px;height:30px}.sst-btn.number.svelte-uxamqm:nth-last-child(2){border-right:1px solid var(--sst-button-border-color, var(--sst-default-button-border-color))}.sst-btn.number.svelte-uxamqm:nth-last-child(2):hover{border-right:1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color))}.sst-btn.number:nth-last-child(2).active.svelte-uxamqm{border-right:1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color))}.sst-btn.number.svelte-uxamqm:nth-last-child(2):focus{border-right:1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color))}.sst-btn.number:nth-last-child(2).disabled.svelte-uxamqm,.sst-btn.number.svelte-uxamqm:nth-last-child(2):disabled,.sst-btn.number.svelte-uxamqm:nth-last-child(2):disabled:hover{border-right:1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color))}.sst-btn.page-size.svelte-uxamqm{line-height:1;font-weight:500;width:26px;height:26px;font-size:12px;padding:0}@media screen and (min-width: 1024px){.sst-btn.text.svelte-uxamqm{font-size:0.95em;width:85px;height:35px}.sst-btn.number.svelte-uxamqm{font-size:0.95em;width:35px;height:35px}}",
  map: null
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "" } = $$props;
  let { active = null } = $$props;
  let { disabled = null } = $$props;
  let { title = label || null } = $$props;
  let { classList = [] } = $$props;
  let { aria = {} } = $$props;
  let { testId = null } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.classList === void 0 && $$bindings.classList && classList !== void 0)
    $$bindings.classList(classList);
  if ($$props.aria === void 0 && $$bindings.aria && aria !== void 0)
    $$bindings.aria(aria);
  if ($$props.testId === void 0 && $$bindings.testId && testId !== void 0)
    $$bindings.testId(testId);
  $$result.css.add(css$p);
  return `<button${spread(
    [
      { type: "button" },
      escape_object(aria),
      { title: escape_attribute_value(title) },
      { disabled: disabled || null },
      {
        class: "sst-btn" + escape(classList.length > 0 ? ` ${classList.join(" ")}` : "", true)
      },
      {
        "data-testid": escape_attribute_value(testId)
      }
    ],
    {
      classes: (active ? "active" : "") + " " + (disabled ? "disabled" : "") + " svelte-uxamqm"
    }
  )}>${escape(label)}
</button>`;
});
const PageNavigation_svelte_svelte_type_style_lang = "";
const css$o = {
  code: "nav.svelte-nfje9{background-color:inherit}.page-nav.svelte-nfje9{display:flex;flex-flow:row nowrap}",
  map: null
};
const PageNavigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pageNumbers;
  let paginationRightWidthStore;
  let $tableState, $$unsubscribe_tableState;
  let $paginationRightWidthStore, $$unsubscribe_paginationRightWidthStore = noop, $$subscribe_paginationRightWidthStore = () => ($$unsubscribe_paginationRightWidthStore(), $$unsubscribe_paginationRightWidthStore = subscribe(paginationRightWidthStore, ($$value) => $paginationRightWidthStore = $$value), paginationRightWidthStore);
  let { tableId } = $$props;
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  let pageNavElement;
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  $$result.css.add(css$o);
  set_store_value(tableState, $tableState.state.paginationRightWidth = $paginationRightWidthStore, $tableState);
  pageNumbers = Array.from(
    {
      length: $tableState.pagination.totalPages
    },
    (_, i) => i + 1
  );
  $$subscribe_paginationRightWidthStore(paginationRightWidthStore = syncWidth(pageNavElement));
  $$unsubscribe_tableState();
  $$unsubscribe_paginationRightWidthStore();
  return `<nav id="${escape(tableId, true) + "-page-nav"}" aria-label="Table Pagination Controls" class="page-nav btn-group svelte-nfje9" data-testid="page-nav"${add_attribute("this", pageNavElement, 0)}>${validate_component(Button, "Button").$$render(
    $$result,
    {
      classList: ["text"],
      disabled: $tableState.pagination.currentPage === 1,
      label: "Previous",
      title: "Previous Page",
      aria: getAriaValues(1, $tableState.pagination.currentPage, $tableState.pagination.totalPages, $tableState.pagination.currentPage === 1),
      testId: "prev"
    },
    {},
    {}
  )}
	${each(pageNumbers, (page) => {
    return `${validate_component(Button, "Button").$$render(
      $$result,
      {
        classList: ["number"],
        label: page.toString(),
        title: "Page " + page,
        active: $tableState.pagination.currentPage === page,
        aria: getAriaValues(page, $tableState.pagination.currentPage, $tableState.pagination.totalPages, $tableState.pagination.currentPage === page),
        testId: "page" + page
      },
      {},
      {}
    )}`;
  })}
	${validate_component(Button, "Button").$$render(
    $$result,
    {
      classList: ["text"],
      disabled: $tableState.pagination.currentPage === $tableState.pagination.totalPages,
      label: "Next",
      title: "Next Page",
      aria: getAriaValues($tableState.pagination.totalPages, $tableState.pagination.currentPage, $tableState.pagination.totalPages, $tableState.pagination.currentPage === $tableState.pagination.totalPages),
      testId: "next"
    },
    {},
    {}
  )}
</nav>`;
});
const PageNavigationCompact_svelte_svelte_type_style_lang = "";
const css$n = {
  code: "nav.svelte-nfje9{background-color:inherit}.page-nav.svelte-nfje9{display:flex;flex-flow:row nowrap}",
  map: null
};
const PageNavigationCompact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let paginationRightWidthStore;
  let classList;
  let $tableState, $$unsubscribe_tableState;
  let $paginationRightWidthStore, $$unsubscribe_paginationRightWidthStore = noop, $$subscribe_paginationRightWidthStore = () => ($$unsubscribe_paginationRightWidthStore(), $$unsubscribe_paginationRightWidthStore = subscribe(paginationRightWidthStore, ($$value) => $paginationRightWidthStore = $$value), paginationRightWidthStore);
  let { tableId } = $$props;
  let pageNavElement;
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  $$result.css.add(css$n);
  $$subscribe_paginationRightWidthStore(paginationRightWidthStore = syncWidth(pageNavElement));
  set_store_value(tableState, $tableState.state.paginationRightWidth = $paginationRightWidthStore, $tableState);
  classList = $tableState.pagination.totalPages === 1 ? ["symbol", "no-page-nav"] : ["symbol"];
  $$unsubscribe_tableState();
  $$unsubscribe_paginationRightWidthStore();
  return `<nav id="${escape(tableId, true) + "-page-nav"}" aria-label="Table Pagination Controls" class="page-nav btn-group svelte-nfje9" data-testid="page-nav"${add_attribute("this", pageNavElement, 0)}>${validate_component(Button, "Button").$$render(
    $$result,
    {
      classList,
      disabled: $tableState.pagination.currentPage === 1,
      label: "❬❬",
      title: "First Page",
      aria: getAriaValues(1, $tableState.pagination.currentPage, $tableState.pagination.totalPages, $tableState.pagination.currentPage === 1),
      testId: "first"
    },
    {},
    {}
  )}
	${validate_component(Button, "Button").$$render(
    $$result,
    {
      classList,
      disabled: $tableState.pagination.currentPage === 1,
      label: "❬",
      title: "Previous Page",
      aria: getAriaValues($tableState.pagination.currentPage - 1, $tableState.pagination.currentPage, $tableState.pagination.totalPages, $tableState.pagination.currentPage === 1),
      testId: "prev"
    },
    {},
    {}
  )}
	${validate_component(Button, "Button").$$render(
    $$result,
    {
      classList,
      disabled: $tableState.pagination.currentPage === $tableState.pagination.totalPages,
      label: "❭",
      title: "Next Page",
      aria: getAriaValues($tableState.pagination.currentPage + 1, $tableState.pagination.currentPage, $tableState.pagination.totalPages, $tableState.pagination.currentPage === $tableState.pagination.totalPages),
      testId: "next"
    },
    {},
    {}
  )}
	${validate_component(Button, "Button").$$render(
    $$result,
    {
      classList,
      disabled: $tableState.pagination.currentPage === $tableState.pagination.totalPages,
      label: "❭❭",
      title: "Last Page",
      aria: getAriaValues($tableState.pagination.totalPages, $tableState.pagination.currentPage, $tableState.pagination.totalPages, $tableState.pagination.currentPage === $tableState.pagination.totalPages),
      testId: "last"
    },
    {},
    {}
  )}
</nav>`;
});
const SettingsIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 24 24" }, $$props), {}, {
    default: () => {
      return `<path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path>`;
    }
  })}`;
});
const PageRangeDescription_svelte_svelte_type_style_lang = "";
const css$m = {
  code: ".pagination-description.svelte-d1g2e6{color:var(--sst-page-range-description-text-color, var(--sst-default-page-range-description-text-color));display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-start;gap:0.25em;line-height:1;cursor:pointer}.change-settings-icon.svelte-d1g2e6{display:block;margin-bottom:0.125em;stroke:currentColor;stroke-width:2;width:1.25em;height:1em}.current-page-range.svelte-d1g2e6{display:inline-block}",
  map: null
};
const PageRangeDescription = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fontSize;
  let pageDescWidthStore;
  let compact;
  let $tableState, $$unsubscribe_tableState;
  let $pageDescWidthStore, $$unsubscribe_pageDescWidthStore = noop, $$subscribe_pageDescWidthStore = () => ($$unsubscribe_pageDescWidthStore(), $$unsubscribe_pageDescWidthStore = subscribe(pageDescWidthStore, ($$value) => $pageDescWidthStore = $$value), pageDescWidthStore);
  let $pageWidth, $$unsubscribe_pageWidth;
  $$unsubscribe_pageWidth = subscribe(pageWidth, (value) => $pageWidth = value);
  let { tableId } = $$props;
  let pageDescriptionElement;
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  $$result.css.add(css$m);
  fontSize = $pageWidth.current < 1024 ? "1em" : "1.05em";
  $$subscribe_pageDescWidthStore(pageDescWidthStore = syncWidth(pageDescriptionElement));
  set_store_value(tableState, $tableState.state.paginationLeftWidth = $pageDescWidthStore, $tableState);
  compact = $tableState.pageRangeFormat === "compact" || $tableState.pageRangeFormat === "auto" && $tableState.state.containerWidth < 768;
  $$unsubscribe_tableState();
  $$unsubscribe_pageDescWidthStore();
  $$unsubscribe_pageWidth();
  return `<div id="${escape(tableId, true) + "-page-size"}" class="pagination-description svelte-d1g2e6" data-testid="change-page-size"${add_attribute("this", pageDescriptionElement, 0)}><div class="change-settings-icon svelte-d1g2e6" title="Click to change # of rows displayed per page">${validate_component(SettingsIcon, "SettingsIcon").$$render($$result, {}, {}, {})}</div>
	<aside title="Click to change # of rows displayed per page" style="${"font-size: " + escape(fontSize, true)}"><div class="current-page-range svelte-d1g2e6" data-testid="page-range">${compact ? `<b>${escape($tableState.pagination.startRow + 1)}-${escape($tableState.pagination.endRow)}/${escape($tableState.pagination.totalRows)}</b>` : `Showing <b>${escape($tableState.pagination.startRow + 1)}</b> to <b>${escape($tableState.pagination.endRow)}</b> of
				<b>${escape($tableState.pagination.totalRows)}</b>
				${escape($tableState.rowType)}`}</div></aside>
</div>`;
});
const PageSizeSetting_svelte_svelte_type_style_lang = "";
const css$l = {
  code: ".page-size-setting-wrapper.svelte-19ixd1c{display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-start}.page-size-setting.svelte-19ixd1c{display:flex;flex-flow:row nowrap}span.svelte-19ixd1c{color:var(--sst-table-header-text-color, var(--sst-default-table-header-text-color));font-size:0.95em;line-height:1;margin-left:0.5em}",
  map: null
};
const PageSizeSetting = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pageSizeSettingWidthStore;
  let $tableState, $$unsubscribe_tableState;
  let $pageSizeSettingWidthStore, $$unsubscribe_pageSizeSettingWidthStore = noop, $$subscribe_pageSizeSettingWidthStore = () => ($$unsubscribe_pageSizeSettingWidthStore(), $$unsubscribe_pageSizeSettingWidthStore = subscribe(pageSizeSettingWidthStore, ($$value) => $pageSizeSettingWidthStore = $$value), pageSizeSettingWidthStore);
  let { tableId } = $$props;
  createEventDispatcher();
  let pageSizeSettingElement;
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  function pageSizeIsInvalid(i) {
    const prevPageSizeOption = i - 1 >= 0 ? $tableState.pageSizeOptions[i - 1] : 0;
    return prevPageSizeOption > $tableState.pagination.totalRows ? true : null;
  }
  const getFirstInvalidPageSizeOption = (pageSizeOptions) => pageSizeOptions.map((opt, i) => ({
    size: opt,
    sizeIsValid: !pageSizeIsInvalid(i)
  })).sort((a, b) => a.size - b.size).find(({ sizeIsValid }) => !sizeIsValid)?.size;
  function fixFirstInvalidPageSizeButton(pageSizeOptions) {
    const pageSize = getFirstInvalidPageSizeOption(pageSizeOptions);
    if (pageSize) {
      const buttonSelector = `#${tableId}-page-size [data-testid="page-size-${pageSize}"]`;
      const pageSizeButton = document.querySelector(buttonSelector);
      if (pageSizeButton) {
        pageSizeButton.style.borderLeft = "1px solid var(--sst-button-border-color, var(--sst-default-button-border-color))";
      }
    }
  }
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  $$result.css.add(css$l);
  $$subscribe_pageSizeSettingWidthStore(pageSizeSettingWidthStore = syncWidth(pageSizeSettingElement));
  set_store_value(tableState, $tableState.state.paginationLeftWidth = $pageSizeSettingWidthStore, $tableState);
  {
    if (typeof window !== "undefined")
      fixFirstInvalidPageSizeButton($tableState.pageSizeOptions);
  }
  $$unsubscribe_tableState();
  $$unsubscribe_pageSizeSettingWidthStore();
  return `<div class="page-size-setting-wrapper svelte-19ixd1c" data-testid="page-size-choices"${add_attribute("this", pageSizeSettingElement, 0)}><div id="${escape(tableId, true) + "-page-size"}" class="page-size-setting btn-group svelte-19ixd1c">${each($tableState.pageSizeOptions, (pageSizeChoice, i) => {
    return `${validate_component(Button, "Button").$$render(
      $$result,
      {
        classList: ["page-size"],
        disabled: pageSizeIsInvalid(i),
        active: pageSizeChoice === $tableState.pageSize,
        label: pageSizeChoice.toString(),
        title: pageSizeChoice + " Rows/Page",
        aria: {},
        testId: "page-size-" + pageSizeChoice
      },
      {},
      {}
    )}`;
  })}</div>
	<span class="svelte-19ixd1c">rows/page</span>
</div>`;
});
const Pagination_svelte_svelte_type_style_lang = "";
const css$k = {
  code: ".pagination-wrapper.svelte-k2167a{display:flex;flex-flow:column nowrap;justify-content:flex-start;margin-top:0.5em}.pagination.svelte-k2167a{display:flex;flex-flow:row nowrap;margin-top:0.25em}",
  map: null
};
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let compact;
  let flexJustify;
  let $tableState, $$unsubscribe_tableState;
  let $componentWidth, $$unsubscribe_componentWidth;
  let { tableId } = $$props;
  const tableState = getTableState(tableId);
  $$unsubscribe_tableState = subscribe(tableState, (value) => $tableState = value);
  const componentWidth = getTableSize(tableId);
  $$unsubscribe_componentWidth = subscribe(componentWidth, (value) => $componentWidth = value);
  if ($$props.tableId === void 0 && $$bindings.tableId && tableId !== void 0)
    $$bindings.tableId(tableId);
  $$result.css.add(css$k);
  compact = $tableState.pageNavFormat === "compact" || $tableState.pageNavFormat === "auto" && $tableState.state.containerWidth < 768 || $tableState.pageNavFormat === "auto" && $tableState.pagination.totalPages > 4;
  flexJustify = "space-between";
  $$unsubscribe_tableState();
  $$unsubscribe_componentWidth();
  return `<section class="pagination-wrapper svelte-k2167a" style="${"width: " + escape($componentWidth.finalComponentWidth, true)}"><div class="pagination svelte-k2167a" style="${"justify-content: " + escape(flexJustify, true)}">${`${$tableState.pageRangeFormat !== "none" ? `${validate_component(PageRangeDescription, "PageRangeDescription").$$render($$result, { tableId }, {}, {})}` : `${validate_component(PageSizeSetting, "PageSizeSetting").$$render($$result, { tableId }, {}, {})}`}
			${compact ? `${validate_component(PageNavigationCompact, "PageNavigationCompact").$$render($$result, { tableId }, {}, {})}` : `${validate_component(PageNavigation, "PageNavigation").$$render($$result, { tableId }, {}, {})}`}`}</div>
</section>`;
});
const SimpleTable_svelte_svelte_type_style_lang = "";
const css$j = {
  code: ".light-theme.svelte-1jqqd3y,.lighter-theme.svelte-1jqqd3y,.dark-theme.svelte-1jqqd3y,.darker-theme.svelte-1jqqd3y,.custom-theme.svelte-1jqqd3y{--sst-default-font-size:13px;--sst-default-table-wrapper-border-width:2px;--sst-default-table-wrapper-border-style:'dotted';--sst-default-table-wrapper-padding:13px;--sst-default-table-wrapper-margin:0 auto 1em 0;--sst-default-sort-description-font-size:0.85em;--sst-default-table-header-font-size:1.25em;--sst-default-table-border-radius:4px;--sst-default-col-header-padding:2px 4px;--sst-default-col-header-text-weight:500;--sst-default-col-header-highlight-text-weight:500;--sst-default-body-cell-padding:2px 4px;--sst-default-button-group-border-radius:0.375em;font-size:var(--sst-font-size, var(--sst-default-font-size))}.sst-container.svelte-1jqqd3y,.sst-wrapper.svelte-1jqqd3y{box-sizing:border-box}.sst-wrapper.svelte-1jqqd3y{background-color:var(--sst-table-wrapper-bg-color, var(--sst-default-table-wrapper-bg-color));border-radius:4px;padding:var(--sst-table-wrapper-padding, var(--sst-default-table-wrapper-padding));margin:var(--sst-table-wrapper-margin, var(--sst-default-table-wrapper-margin))}.sst-container.svelte-1jqqd3y{background-color:inherit;margin:var(--sst-table-wrapper-margin, var(--sst-default-table-wrapper-margin))}.simple-table.svelte-1jqqd3y{display:flex;flex-flow:column nowrap;overflow-x:auto;white-space:nowrap}.btn-group{display:flex;flex-flow:row nowrap;justify-content:center;flex-grow:0}.lighter-theme.svelte-1jqqd3y{--sst-default-table-wrapper-bg-color:hsl(0, 0%, 100%);--sst-default-table-wrapper-border-color:hsl(212, 76%, 80%);--sst-default-text-color:hsl(213, 13%, 16%);--sst-default-link-text-color:hsl(216, 97%, 36%);--sst-default-link-hover-text-color:hsl(216, 97%, 36%);--sst-default-table-outer-border-color:hsl(212, 12%, 21%);--sst-default-table-header-text-color:hsl(213, 13%, 16%);--sst-default-sort-description-text-color:hsl(7, 84%, 61%);--sst-default-page-range-description-text-color:hsl(7, 84%, 61%);--sst-default-col-header-bg-color:hsl(207, 23%, 92%);--sst-default-col-header-text-color:hsl(213, 13%, 16%);--sst-default-col-header-vert-border-color:hsl(212, 12%, 21%);--sst-default-col-header-horiz-border-color:hsl(212, 12%, 21%);--sst-default-col-header-highlight-sort-bg-color:hsl(207, 23%, 92%);--sst-default-col-header-highlight-sort-text-color:hsl(213, 13%, 16%);--sst-default-col-header-highlight-sort-vert-border-color:hsl(212, 12%, 21%);--sst-default-col-header-highlight-sort-horiz-border-color:hsl(212, 12%, 21%);--sst-default-body-even-row-bg-color:hsl(0, 0%, 96%);--sst-default-body-odd-row-bg-color:hsl(0, 0%, 100%);--sst-default-body-inner-vert-border-color:hsl(212, 12%, 21%);--sst-default-body-inner-horiz-border-color:hsl(212, 12%, 21%);--sst-default-body-highlight-sort-bg-color:hsl(191, 90%, 92%);--sst-default-body-highlight-sort-text-color:hsl(7, 84%, 61%);--sst-default-body-highlight-sort-border-color:hsl(212, 12%, 21%);--sst-default-button-text-color:hsl(213, 13%, 16%);--sst-default-button-bg-color:hsl(207, 23%, 92%);--sst-default-button-border-color:hsl(213, 13%, 16%);--sst-default-button-hover-text-color:hsl(213, 13%, 16%);--sst-default-button-hover-bg-color:hsl(210, 17%, 84%);--sst-default-button-hover-border-color:hsla(218, 80%, 2%, 0.8);--sst-default-button-active-text-color:hsl(213, 13%, 16%);--sst-default-button-active-bg-color:hsl(210, 14%, 71%);--sst-default-button-active-border-color:hsl(213, 13%, 16%);--sst-default-button-disabled-text-color:hsl(211, 10%, 57%);--sst-default-button-disabled-bg-color:hsl(207, 23%, 92%);--sst-default-button-disabled-border-color:hsl(211, 10%, 57%);--sst-default-button-focus-border-color:hsla(218, 80%, 2%, 0.8)}.light-theme.svelte-1jqqd3y{--sst-default-table-wrapper-bg-color:hsl(0, 0%, 95%);--sst-default-table-wrapper-border-color:hsl(218, 100%, 25%);--sst-default-text-color:hsl(0, 0%, 5%);--sst-default-link-text-color:hsl(218, 100%, 25%);--sst-default-link-hover-text-color:hsl(218, 100%, 25%);--sst-default-table-outer-border-color:hsl(218, 100%, 25%);--sst-default-table-header-text-color:hsl(0, 0%, 15%);--sst-default-sort-description-text-color:hsl(113, 100%, 30%);--sst-default-page-range-description-text-color:hsl(113, 100%, 30%);--sst-default-col-header-bg-color:hsl(218, 100%, 25%);--sst-default-col-header-text-color:hsl(0, 0%, 85%);--sst-default-col-header-vert-border-color:hsl(218, 100%, 25%);--sst-default-col-header-horiz-border-color:hsl(218, 100%, 25%);--sst-default-col-header-highlight-sort-bg-color:hsl(218, 100%, 25%);--sst-default-col-header-highlight-sort-text-color:hsl(0, 0%, 85%);--sst-default-col-header-highlight-sort-vert-border-color:hsl(218, 100%, 25%);--sst-default-col-header-highlight-sort-horiz-border-color:hsl(218, 100%, 25%);--sst-default-body-even-row-bg-color:hsl(0, 0%, 85%);--sst-default-body-odd-row-bg-color:hsl(0, 0%, 80%);--sst-default-body-inner-vert-border-color:hsl(0, 0%, 45%);--sst-default-body-inner-horiz-border-color:hsl(0, 0%, 50%);--sst-default-body-highlight-sort-bg-color:hsl(113, 100%, 70%);--sst-default-body-highlight-sort-text-color:hsl(0, 0%, 5%);--sst-default-body-highlight-sort-border-color:hsl(0, 0%, 50%);--sst-default-button-text-color:hsl(0, 0%, 100%);--sst-default-button-bg-color:hsl(113, 100%, 30%);--sst-default-button-border-color:hsl(113, 100%, 30%);--sst-default-button-hover-text-color:hsl(0, 0%, 100%);--sst-default-button-hover-bg-color:hsl(113, 100%, 20%);--sst-default-button-hover-border-color:transparent;--sst-default-button-active-text-color:hsl(0, 0%, 100%);--sst-default-button-active-bg-color:hsl(113, 100%, 40%);--sst-default-button-active-border-color:transparent;--sst-default-button-disabled-text-color:hsl(0, 0%, 80%);--sst-default-button-disabled-bg-color:hsl(0, 0%, 60%);--sst-default-button-disabled-border-color:transparent;--sst-default-button-focus-border-color:transparent}.dark-theme.svelte-1jqqd3y{--sst-default-table-wrapper-bg-color:hsl(226, 27%, 10%);--sst-default-table-wrapper-border-color:hsl(251, 74%, 30%);--sst-default-text-color:hsl(0, 0%, 5%);--sst-default-link-text-color:hsl(251deg 74% 40%);--sst-default-link-hover-text-color:hsl(251deg 74% 50%);--sst-default-table-outer-border-color:hsl(251, 74%, 30%);--sst-default-table-header-text-color:hsl(0, 0%, 95%);--sst-default-sort-description-text-color:hsl(165, 100%, 45%);--sst-default-page-range-description-text-color:hsl(165, 100%, 45%);--sst-default-col-header-bg-color:hsl(251, 74%, 30%);--sst-default-col-header-text-color:hsl(0, 0%, 95%);--sst-default-col-header-vert-border-color:hsl(251, 74%, 30%);--sst-default-col-header-horiz-border-color:hsl(251, 74%, 30%);--sst-default-col-header-highlight-sort-bg-color:hsl(251, 74%, 30%);--sst-default-col-header-highlight-sort-text-color:hsl(0, 0%, 95%);--sst-default-col-header-highlight-sort-vert-border-color:hsl(251, 74%, 30%);--sst-default-col-header-highlight-sort-horiz-border-color:hsl(251, 74%, 30%);--sst-default-body-even-row-bg-color:hsl(0, 0%, 50%);--sst-default-body-odd-row-bg-color:hsl(0, 0%, 45%);--sst-default-body-inner-vert-border-color:hsl(0, 0%, 30%);--sst-default-body-inner-horiz-border-color:hsl(0, 0%, 35%);--sst-default-body-highlight-sort-bg-color:hsl(165, 100%, 55%);--sst-default-body-highlight-sort-text-color:hsl(0, 0%, 5%);--sst-default-body-highlight-sort-border-color:hsl(0, 0%, 35%);--sst-default-button-text-color:hsl(0, 0%, 10%);--sst-default-button-bg-color:hsl(165, 100%, 45%);--sst-default-button-border-color:hsl(165, 100%, 45%);--sst-default-button-hover-text-color:hsl(0, 0%, 0%);--sst-default-button-hover-bg-color:hsl(165, 100%, 35%);--sst-default-button-hover-border-color:transparent;--sst-default-button-active-text-color:hsl(0, 0%, 0%);--sst-default-button-active-bg-color:hsl(165, 100%, 75%);--sst-default-button-active-border-color:transparent;--sst-default-button-disabled-text-color:hsl(0, 0%, 30%);--sst-default-button-disabled-bg-color:hsl(0, 0%, 50%);--sst-default-button-disabled-border-color:transparent;--sst-default-button-focus-border-color:transparent}.darker-theme.svelte-1jqqd3y{--sst-default-table-wrapper-bg-color:hsl(220, 13%, 3%);--sst-default-table-wrapper-border-color:hsl(215, 22%, 41%);--sst-default-text-color:hsl(210, 25%, 95%);--sst-default-link-text-color:hsl(210, 100%, 72%);--sst-default-link-hover-text-color:hsl(210, 100%, 72%);--sst-default-table-outer-border-color:hsl(215, 22%, 41%);--sst-default-table-header-text-color:hsl(210, 25%, 95%);--sst-default-sort-description-text-color:hsl(210, 100%, 72%);--sst-default-page-range-description-text-color:hsl(210, 100%, 72%);--sst-default-col-header-bg-color:hsl(220, 13%, 18%);--sst-default-col-header-text-color:hsl(210, 25%, 95%);--sst-default-col-header-vert-border-color:hsl(216, 8%, 32%);--sst-default-col-header-horiz-border-color:hsl(215, 22%, 41%);--sst-default-col-header-highlight-sort-bg-color:hsl(220, 13%, 18%);--sst-default-col-header-highlight-sort-text-color:hsl(210, 25%, 95%);--sst-default-col-header-highlight-sort-vert-border-color:hsl(216, 8%, 32%);--sst-default-col-header-highlight-sort-horiz-border-color:hsl(215, 22%, 41%);--sst-default-body-even-row-bg-color:hsl(220, 23%, 5%);--sst-default-body-odd-row-bg-color:hsl(220, 23%, 8%);--sst-default-body-inner-vert-border-color:hsl(216, 8%, 32%);--sst-default-body-inner-horiz-border-color:hsl(216, 8%, 32%);--sst-default-body-highlight-sort-bg-color:current;--sst-default-body-highlight-sort-text-color:hsl(65, 100%, 50%);--sst-default-body-highlight-sort-border-color:hsl(216, 8%, 32%);--sst-default-button-text-color:hsl(210, 25%, 95%);--sst-default-button-bg-color:hsl(220, 13%, 18%);--sst-default-button-border-color:hsl(216, 8%, 52%);--sst-default-button-hover-text-color:hsl(210, 25%, 95%);--sst-default-button-hover-bg-color:hsl(217, 10%, 36%);--sst-default-button-hover-border-color:hsl(212, 13%, 77%);--sst-default-button-active-text-color:hsl(210, 25%, 95%);--sst-default-button-active-bg-color:hsl(217, 10%, 33%);--sst-default-button-active-border-color:hsl(214, 12%, 66%);--sst-default-button-disabled-text-color:hsl(0, 0%, 50%);--sst-default-button-disabled-bg-color:hsl(0, 0%, 25%);--sst-default-button-disabled-border-color:hsl(0, 0%, 50%);--sst-default-button-focus-border-color:hsl(212, 13%, 77%)}@media screen and (min-width: 640px){.light-theme.svelte-1jqqd3y,.lighter-theme.svelte-1jqqd3y,.dark-theme.svelte-1jqqd3y,.darker-theme.svelte-1jqqd3y,.custom-theme.svelte-1jqqd3y{--sst-default-table-header-font-size:1.35em;--sst-default-table-wrapper-padding:14px;--sst-default-font-size:14px;--sst-default-col-header-padding:4px 6px;--sst-default-body-cell-padding:4px 6px}}@media screen and (min-width: 768px){.light-theme.svelte-1jqqd3y,.lighter-theme.svelte-1jqqd3y,.dark-theme.svelte-1jqqd3y,.darker-theme.svelte-1jqqd3y,.custom-theme.svelte-1jqqd3y{--sst-default-table-header-font-size:1.5em}}",
  map: null
};
const SimpleTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fontSize;
  let tableWrapperBorderStyle;
  let $tableState, $$unsubscribe_tableState = noop, $$subscribe_tableState = () => ($$unsubscribe_tableState(), $$unsubscribe_tableState = subscribe(tableState, ($$value) => $tableState = $$value), tableState);
  let $tableWrapperContainerWidth;
  let $componentWidth, $$unsubscribe_componentWidth = noop, $$subscribe_componentWidth = () => ($$unsubscribe_componentWidth(), $$unsubscribe_componentWidth = subscribe(componentWidth, ($$value) => $componentWidth = $$value), componentWidth);
  let { data } = $$props;
  let { columnSettings } = $$props;
  let { tableSettings } = $$props;
  let { tableState = null } = $$props;
  $$subscribe_tableState();
  let componentWidth;
  let tableWrapperElement;
  if (!tableState) {
    $$subscribe_tableState(tableState = createTableStateStore(data.length, tableSettings));
  }
  $$subscribe_tableState([tableState, componentWidth] = initTableStores(tableState), $$subscribe_componentWidth());
  const sortBy = columnSettings.find((col) => col.propName === $tableState.sortBy)?.propName;
  set_store_value(tableState, $tableState.sortType = data.length ? getSortType(data[0], sortBy) : "unsorted", $tableState);
  let sortFunction = getSortFunction($tableState.sortBy, $tableState.sortType, $tableState.sortDir);
  let dataCurrentPage = data.sort(sortFunction).slice($tableState.pagination.startRow, $tableState.pagination.endRow);
  tableState.goToFirstPage();
  async function changeSortSettings() {
    sortFunction = getSortFunction($tableState.sortBy, $tableState.sortType, $tableState.sortDir);
    tableState.goToFirstPage();
    set_store_value(tableState, $tableState.state.syncState = "finished-sort-table", $tableState);
  }
  async function updateColumnWidths() {
    if ($tableState.state.syncState !== "not-started") {
      await tick();
      set_store_value(tableState, $tableState.state.syncState = "started-resize-columns", $tableState);
      await tick();
      set_store_value(tableState, $tableState.state.syncState = "finished-resize-columns", $tableState);
      await tick();
      set_store_value(tableState, $tableState.state.syncState = "not-started", $tableState);
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.columnSettings === void 0 && $$bindings.columnSettings && columnSettings !== void 0)
    $$bindings.columnSettings(columnSettings);
  if ($$props.tableSettings === void 0 && $$bindings.tableSettings && tableSettings !== void 0)
    $$bindings.tableSettings(tableSettings);
  if ($$props.tableState === void 0 && $$bindings.tableState && tableState !== void 0)
    $$bindings.tableState(tableState);
  $$result.css.add(css$j);
  set_store_value(tableState, $tableState.state.containerWidth = $tableWrapperContainerWidth, $tableState);
  fontSize = getTableFontSize($tableState.tableId);
  {
    if ($tableState.state.syncState === "started-sort-table")
      changeSortSettings();
  }
  {
    if ($tableState.state.syncState === "finished-sort-table")
      updateColumnWidths();
  }
  dataCurrentPage = data.sort(sortFunction).slice($tableState.pagination.startRow, $tableState.pagination.endRow);
  tableWrapperBorderStyle = $tableState.tableWrapper ? getBorderCssValues($tableState.tableId) : "none";
  $$unsubscribe_tableState();
  $$unsubscribe_componentWidth();
  return `

${data ? `<div id="${escape($tableState.tableId, true) + "-wrapper"}"${add_attribute("data-font-size", fontSize, 0)} style="${"width: " + escape($componentWidth.finalWrapperWidth, true) + "; border: " + escape(tableWrapperBorderStyle, true)}" class="${[
    "svelte-1jqqd3y",
    ($tableState.tableWrapper ? "sst-wrapper" : "") + " " + (!$tableState.tableWrapper ? "sst-container" : "") + " " + ($tableState.themeName === "light" ? "light-theme" : "") + " " + ($tableState.themeName === "lighter" ? "lighter-theme" : "") + " " + ($tableState.themeName === "dark" ? "dark-theme" : "") + " " + ($tableState.themeName === "darker" ? "darker-theme" : "") + " " + ($tableState.themeName === "custom" ? "custom-theme" : "")
  ].join(" ").trim()}"${add_attribute("this", tableWrapperElement, 0)}>${columnSettings ? `<div class="simple-table svelte-1jqqd3y" style="${"width: " + escape($componentWidth.finalComponentWidth, true)}">${validate_component(DataTable, "DataTable").$$render(
    $$result,
    {
      tableId: $tableState.tableId,
      data: dataCurrentPage,
      columnSettings
    },
    {},
    {}
  )}
				${$tableState.paginated ? `${validate_component(Pagination, "Pagination").$$render($$result, { tableId: $tableState.tableId }, {}, {})}` : ``}</div>` : ``}</div>` : ``}`;
});
const CssCustomPropTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = [] } = $$props;
  const tableSettings = {
    showHeader: false,
    showSortDescription: false,
    sortBy: "name",
    sortDir: "asc",
    tableWrapper: false,
    expandToContainerWidth: true,
    themeName: "lighter",
    clickableRows: false,
    animateSorting: false,
    paginated: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 15, 20],
    pageRangeFormat: "verbose",
    pageNavFormat: "compact",
    rowType: "custom properties"
  };
  let { tableState = createTableStateStore(data.length, tableSettings) } = $$props;
  const columnSettings = [
    {
      propName: "addToTheme",
      headerText: "Add",
      tooltip: "Add this custom property to the current theme",
      colValue: (data2) => `<input type="checkbox" id="add-prop-${data2.id}" name="add-prop-${data2.id}" data-prop-id="${data2.id}"${data2.addToTheme ? " checked" : ""} />`,
      classList: ["py-2"]
    },
    {
      propName: "name",
      headerText: "Property Name",
      tooltip: "CSS Custom Property Name"
    },
    {
      propName: "selector",
      headerText: "Selector",
      tooltip: "CSS Rule Selector Text",
      classList: ["whitespace-normal"]
    },
    {
      propName: "value",
      tooltip: "Value for this instance of the custom property",
      classList: ["whitespace-normal"]
    }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.tableState === void 0 && $$bindings.tableState && tableState !== void 0)
    $$bindings.tableState(tableState);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(SimpleTable, "SimpleTable").$$render(
      $$result,
      {
        data,
        columnSettings,
        tableSettings,
        tableState
      },
      {
        tableState: ($$value) => {
          tableState = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const IgnoreTailwindsCheckbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { checked } = $$props;
  let { componentColor } = $$props;
  const style = `grid-column: 4 / span 1; grid-row: 2 / span 1;`;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      {
        id: "ignore-tailwinds-checkbox",
        color: componentColor,
        style,
        checked
      },
      {
        checked: ($$value) => {
          checked = $$value;
          $$settled = false;
        }
      },
      {
        leftLabel: () => {
          return `Ignore Tailwinds?`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const menuId = "css-rule-selector";
const menuLabel$1 = "";
const RuleSelectorList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let { value } = $$props;
  let { disabled = false } = $$props;
  let { allSelectors = [] } = $$props;
  let options = [];
  const noSelection = {
    label: "",
    value: "",
    optionNumber: 1,
    active: false
  };
  createEventDispatcher();
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.allSelectors === void 0 && $$bindings.allSelectors && allSelectors !== void 0)
    $$bindings.allSelectors(allSelectors);
  options = [
    noSelection,
    ...allSelectors.map((sel, i) => ({
      label: sel,
      value: sel,
      optionNumber: i + 2,
      active: false
    }))
  ];
  style = `grid-column: 3 / span 1; grid-row: 2 / span 1;`;
  return `${validate_component(Select, "Select").$$render(
    $$result,
    {
      menuLabel: menuLabel$1,
      options,
      selectedValue: value,
      menuId,
      disabled,
      style
    },
    {},
    {}
  )}`;
});
const UseThemePrefixCheckbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { checked } = $$props;
  let { componentColor } = $$props;
  let { disabled } = $$props;
  const style = `grid-column: 2 / span 1; grid-row: 2 / span 1;`;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      {
        id: "use-theme-prefix-checkbox",
        color: componentColor,
        style,
        disabled,
        checked
      },
      {
        checked: ($$value) => {
          checked = $$value;
          $$settled = false;
        }
      },
      {
        leftLabel: () => {
          return `Use Theme Prefix?`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const CssFilters_svelte_svelte_type_style_lang = "";
const css$i = {
  code: ".css-filters.svelte-sh2psd{display:grid;grid-template-columns:2fr auto 3fr auto;grid-template-rows:auto auto;-moz-column-gap:1em;column-gap:1em;row-gap:0.25rem;padding:1rem 1rem 0 1rem}.label.svelte-sh2psd{font-size:0.75rem;font-weight:500;line-height:1}.prefix-label.svelte-sh2psd{grid-column:1 / span 1;grid-row:1 / span 1}.selector-label.svelte-sh2psd{grid-column:3 / span 1;grid-row:1 / span 1}",
  map: null
};
const CssFilters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let themePrefixExists;
  let themePrefixInputTextBoxDisabled;
  let $state, $$unsubscribe_state;
  let { editorId } = $$props;
  let { allSelectors } = $$props;
  let { useThemePrefix = false } = $$props;
  let { ignoreTailwinds = false } = $$props;
  let { selector = "" } = $$props;
  let { componentColor } = $$props;
  let { prefix } = $$props;
  let { themeInitialized } = $$props;
  const dispatch = createEventDispatcher();
  let state = getThemeEditorStore(editorId);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  function handleUserThemeUpdated(usesPrefix) {
    useThemePrefix = usesPrefix;
  }
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  if ($$props.allSelectors === void 0 && $$bindings.allSelectors && allSelectors !== void 0)
    $$bindings.allSelectors(allSelectors);
  if ($$props.useThemePrefix === void 0 && $$bindings.useThemePrefix && useThemePrefix !== void 0)
    $$bindings.useThemePrefix(useThemePrefix);
  if ($$props.ignoreTailwinds === void 0 && $$bindings.ignoreTailwinds && ignoreTailwinds !== void 0)
    $$bindings.ignoreTailwinds(ignoreTailwinds);
  if ($$props.selector === void 0 && $$bindings.selector && selector !== void 0)
    $$bindings.selector(selector);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0)
    $$bindings.prefix(prefix);
  if ($$props.themeInitialized === void 0 && $$bindings.themeInitialized && themeInitialized !== void 0)
    $$bindings.themeInitialized(themeInitialized);
  if ($$props.handleUserThemeUpdated === void 0 && $$bindings.handleUserThemeUpdated && handleUserThemeUpdated !== void 0)
    $$bindings.handleUserThemeUpdated(handleUserThemeUpdated);
  $$result.css.add(css$i);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    themePrefixExists = Boolean($state?.userTheme?.usesPrefix && $state?.userTheme?.themePrefix);
    themePrefixInputTextBoxDisabled = !themeInitialized || themeInitialized && useThemePrefix && themePrefixExists;
    {
      if (ignoreTailwinds || !ignoreTailwinds) {
        dispatch("ignoreTailwindsChanged", ignoreTailwinds);
      }
    }
    {
      if (!themeInitialized) {
        prefix = "";
      }
    }
    {
      if (useThemePrefix || !useThemePrefix) {
        dispatch("useThemePrefixChanged", useThemePrefix);
      }
    }
    {
      if (useThemePrefix && themePrefixExists) {
        prefix = $state?.userTheme?.themePrefix;
      }
    }
    {
      if (prefix) {
        dispatch("componentPrefixChanged", prefix);
      }
    }
    $$rendered = `<div class="css-filters svelte-sh2psd"><span class="prefix-label label svelte-sh2psd">Component Prefix:</span>
	${validate_component(InputTextBox, "InputTextBox").$$render(
      $$result,
      {
        disabled: themePrefixInputTextBoxDisabled,
        id: "theme-prefix-textbox",
        style: "grid-column: 1 / span 1; grid-row: 2 / span 1;",
        inputText: prefix
      },
      {
        inputText: ($$value) => {
          prefix = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(UseThemePrefixCheckbox, "UseThemePrefixCheckbox").$$render(
      $$result,
      {
        componentColor,
        disabled: !themeInitialized,
        checked: useThemePrefix
      },
      {
        checked: ($$value) => {
          useThemePrefix = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	<span class="selector-label label svelte-sh2psd">CSS Rule Selector:</span>
	${validate_component(RuleSelectorList, "RuleSelectorList").$$render(
      $$result,
      { allSelectors, value: selector },
      {
        value: ($$value) => {
          selector = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(IgnoreTailwindsCheckbox, "IgnoreTailwindsCheckbox").$$render(
      $$result,
      { componentColor, checked: ignoreTailwinds },
      {
        checked: ($$value) => {
          ignoreTailwinds = $$value;
          $$settled = false;
        }
      },
      {}
    )}
</div>`;
  } while (!$$settled);
  $$unsubscribe_state();
  return $$rendered;
});
const CssSection_svelte_svelte_type_style_lang = "";
const css$h = {
  code: ".css-filter-results.svelte-12nuky8{font-size:0.8rem;padding:1rem 1rem 0.5rem 1rem}strong.svelte-12nuky8{font-weight:700}.css-table-wrapper.svelte-12nuky8{padding:0.5rem 1rem 0 1rem}",
  map: null
};
const selectorBlackList = ".theme-editor-wrapper";
const CssSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalCustomProps;
  let $tableState;
  let { editorId } = $$props;
  let { componentColor } = $$props;
  let { themeInitialized } = $$props;
  let data;
  let allCustomProps;
  let selectedCustomProps;
  let allSelectors;
  let selectorWhiteList;
  let prefix = "";
  let ignoreTailwinds;
  let totalFiltered;
  let totalSelected;
  let allCustomPropsSelected;
  let anyCustomPropsSelected;
  let tableState;
  let cssFilters;
  function handleUserThemeChanged(usePrefix, newPrefix) {
    cssFilters.handleUserThemeUpdated(usePrefix);
    handleComponentPrefixChanged(newPrefix);
  }
  function refreshCssCustomProps(ignoreTailwinds2, prefixBlackList, prefix2, selectorWhiteList2, selectorBlackList2) {
    try {
      return getAllCssVariables({
        ignoreTailwinds: ignoreTailwinds2,
        prefixBlackList,
        prefixWhiteList: prefix2 ? [prefix2] : [],
        selectorWhiteList: selectorWhiteList2 ? [selectorWhiteList2] : [],
        selectorBlackList: selectorBlackList2 ? [selectorBlackList2] : []
      });
    } catch {
    }
  }
  function getUniqueSelectors() {
    const allSelectors2 = allCustomProps.map((prop) => prop.selector.split(",").map((s) => s.trim())).flat();
    return [...new Set(allSelectors2)].sort();
  }
  function handleComponentPrefixChanged(newPrefix) {
    prefix = newPrefix;
    data = refreshCssCustomProps(ignoreTailwinds, [], prefix, selectorWhiteList, selectorBlackList);
    tableState.reset(data.length, $tableState.pageSize);
  }
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.themeInitialized === void 0 && $$bindings.themeInitialized && themeInitialized !== void 0)
    $$bindings.themeInitialized(themeInitialized);
  if ($$props.handleUserThemeChanged === void 0 && $$bindings.handleUserThemeChanged && handleUserThemeChanged !== void 0)
    $$bindings.handleUserThemeChanged(handleUserThemeChanged);
  $$result.css.add(css$h);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    allCustomProps = getAllCssVariables({ ignoreTailwinds: false });
    totalCustomProps = allCustomProps.length;
    {
      if (allCustomProps) {
        data = refreshCssCustomProps(ignoreTailwinds, [], prefix, selectorWhiteList, selectorBlackList);
        allSelectors = getUniqueSelectors();
      }
    }
    {
      if (prefix) {
        data = refreshCssCustomProps(ignoreTailwinds, [], prefix, selectorWhiteList, selectorBlackList);
      }
    }
    totalFiltered = data.length;
    selectedCustomProps = data.filter((data2) => data2.addToTheme);
    totalSelected = selectedCustomProps.length;
    allCustomPropsSelected = totalSelected === totalFiltered;
    anyCustomPropsSelected = totalSelected > 0;
    $$rendered = `${validate_component(CssFilters, "CssFilters").$$render(
      $$result,
      {
        editorId,
        allSelectors,
        componentColor,
        themeInitialized,
        this: cssFilters,
        prefix
      },
      {
        this: ($$value) => {
          cssFilters = $$value;
          $$settled = false;
        },
        prefix: ($$value) => {
          prefix = $$value;
          $$settled = false;
        }
      },
      {}
    )}
<span class="css-filter-results svelte-12nuky8"><strong class="svelte-12nuky8">${escape(totalFiltered)}</strong> custom properties match these filter settings (<strong class="svelte-12nuky8">${escape(totalCustomProps)}</strong> total
	custom properties on page)</span>
<div class="css-table-wrapper svelte-12nuky8">${validate_component(CssCustomPropTable, "CssCustomPropTable").$$render(
      $$result,
      { data, tableState },
      {
        tableState: ($$value) => {
          tableState = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
${validate_component(CssControls, "CssControls").$$render(
      $$result,
      {
        componentColor,
        totalSelected,
        allCustomPropsSelected,
        anyCustomPropsSelected
      },
      {},
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const JsonSection_svelte_svelte_type_style_lang = "";
const css$g = {
  code: ".json-section-wrapper.svelte-vvk8u2{padding:1rem}",
  map: null
};
const JsonSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$g);
  return `<div class="json-section-wrapper svelte-vvk8u2"><p>Coming Soon!</p>
</div>`;
});
const ContentSections_svelte_svelte_type_style_lang = "";
const css$f = {
  code: ".component-wrapper.svelte-s7dy3{display:flex;flex-flow:column nowrap;gap:1rem;padding:1rem;background-color:var(--hover-bg-color)}.css-section-wrapper.svelte-s7dy3{--sst-font-size:13px;--sst-table-wrapper-margin:0;display:flex;flex-flow:column nowrap}.invisible.svelte-s7dy3{visibility:hidden;height:1px;padding:0}.visible.svelte-s7dy3{visibility:visible}",
  map: null
};
const ContentSections = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  let { editorId } = $$props;
  let { componentColor } = $$props;
  let { themeInitialized } = $$props;
  let state = getThemeEditorStore(editorId);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  let cssSection;
  const changeComponentPrefix = (usePrefix, newPrefix) => cssSection.handleUserThemeChanged(usePrefix, newPrefix);
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.themeInitialized === void 0 && $$bindings.themeInitialized && themeInitialized !== void 0)
    $$bindings.themeInitialized(themeInitialized);
  if ($$props.changeComponentPrefix === void 0 && $$bindings.changeComponentPrefix && changeComponentPrefix !== void 0)
    $$bindings.changeComponentPrefix(changeComponentPrefix);
  $$result.css.add(css$f);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${[
      "component-wrapper svelte-s7dy3",
      ($state.currentlyViewing === "component" ? "visible" : "") + " " + ($state.currentlyViewing !== "component" ? "invisible" : "")
    ].join(" ").trim()}">${validate_component(ComponentSection, "ComponentSection").$$render($$result, { editorId, componentColor }, {}, {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    })}</div>
<div class="${[
      "css-section-wrapper svelte-s7dy3",
      ($state.currentlyViewing === "css" ? "visible" : "") + " " + ($state.currentlyViewing !== "css" ? "invisible" : "")
    ].join(" ").trim()}">${validate_component(CssSection, "CssSection").$$render(
      $$result,
      {
        editorId,
        componentColor,
        themeInitialized,
        this: cssSection
      },
      {
        this: ($$value) => {
          cssSection = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
<div class="${[
      "json-section-wrapper svelte-s7dy3",
      ($state.currentlyViewing === "json" ? "visible" : "") + " " + ($state.currentlyViewing !== "json" ? "invisible" : "")
    ].join(" ").trim()}">${validate_component(JsonSection, "JsonSection").$$render($$result, {}, {}, {})}
</div>`;
  } while (!$$settled);
  $$unsubscribe_state();
  return $$rendered;
});
const ContentSelector_svelte_svelte_type_style_lang = "";
const css$e = {
  code: ".button-wrapper.svelte-cx3v0r{display:grid;grid-template-columns:repeat(3, auto) 1fr;place-items:center;background-color:var(--section-bg-color);border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-left-radius:0;border-bottom-right-radius:0;background-color:transparent;grid-column:1 / span 1;grid-row:1 / span 1}button.svelte-cx3v0r{background-color:var(--button-bg-color);color:var(--button-fg-color);padding:0.5rem 1rem;font-weight:500;font-size:0.85rem;min-width:110px;border-top:1px solid var(--button-border-color);border-left:0.5px solid var(--button-border-color);border-right:0.5px solid var(--button-border-color);border-bottom:1px solid var(--button-border-color);border-top-left-radius:6px;border-top-right-radius:6px}button.svelte-cx3v0r:hover,button.svelte-cx3v0r:active,button.svelte-cx3v0r:focus,button.svelte-cx3v0r:active:focus{background-color:var(--button-active-bg-color)}button.active.svelte-cx3v0r{background-color:var(--button-hover-bg-color);border-bottom:1px solid transparent}button.first.svelte-cx3v0r{border-left:1px solid var(--button-border-color)}button.last.svelte-cx3v0r{border-right:1px solid var(--button-border-color)}.placeholder.svelte-cx3v0r{background-color:var(--white1);width:100%;flex:1;height:100%;align-items:flex-end}",
  map: null
};
const ContentSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let componentShown;
  let cssShown;
  let jsonShown;
  let $state, $$unsubscribe_state;
  let { editorId } = $$props;
  let state = getThemeEditorStore(editorId);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  $$result.css.add(css$e);
  componentShown = $state.currentlyViewing === "component";
  cssShown = $state.currentlyViewing === "css";
  jsonShown = $state.currentlyViewing === "json";
  $$unsubscribe_state();
  return `<div class="button-wrapper svelte-cx3v0r"><button type="button" title="View Component" class="${["first svelte-cx3v0r", componentShown ? "active" : ""].join(" ").trim()}">Component</button>
	<button type="button" title="View CSS Variables" class="${["svelte-cx3v0r", cssShown ? "active" : ""].join(" ").trim()}">CSS</button>
	<button type="button" title="Download Theme JSON" class="${["last svelte-cx3v0r", jsonShown ? "active" : ""].join(" ").trim()}">JSON</button>
	<div class="placeholder svelte-cx3v0r"></div>
</div>`;
});
const irBlack = `<style>pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#000;color:#f8f8f8}.hljs-comment,.hljs-meta,.hljs-quote{color:#7c7c7c}.hljs-keyword,.hljs-name,.hljs-selector-tag,.hljs-tag{color:#96cbfe}.hljs-attribute,.hljs-selector-id{color:#ffffb6}.hljs-addition,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-string{color:#a8ff60}.hljs-subst{color:#daefa3}.hljs-link,.hljs-regexp{color:#e9c062}.hljs-doctag,.hljs-section,.hljs-title,.hljs-type{color:#ffffb6}.hljs-bullet,.hljs-literal,.hljs-symbol,.hljs-template-variable,.hljs-variable{color:#c6c5fe}.hljs-deletion,.hljs-number{color:#ff73fd}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}</style>`;
const irBlack$1 = irBlack;
const ContentViewer_svelte_svelte_type_style_lang = "";
const css$d = {
  code: ".content-viewer.svelte-1286jpe{--select-menu-width:110px;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;border-radius:6px;color:var(--fg-color, --black2)}.bg-left.svelte-1286jpe,.bg-right.svelte-1286jpe{background-color:var(--button-hover-bg-color);z-index:1;grid-row:2 / span 1}.bg-left.svelte-1286jpe{border-left:1px solid var(--fg-color, --black2);border-bottom:1px solid var(--fg-color, --black2);border-bottom-left-radius:6px;border-top-left-radius:0;grid-column:1 / span 1}.bg-right.svelte-1286jpe{border-top:1px solid var(--fg-color, --black2);border-right:1px solid var(--fg-color, --black2);border-bottom:1px solid var(--fg-color, --black2);border-bottom-right-radius:6px;border-top-right-radius:6px;margin-top:-1px;grid-column:2 / span 1}.content-wrapper.svelte-1286jpe{line-height:1.4;font-size:0.875rem;display:flex;flex-flow:column nowrap;z-index:2;margin:0 auto 0 0;padding:2px;width:100%;grid-column:1 / span 2;grid-row:2 / span 1}",
  map: null
};
const ContentViewer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { editorId } = $$props;
  let { componentColor } = $$props;
  let { themeInitialized } = $$props;
  let contentSections;
  const changeComponentPrefix = (usePrefix, newPrefix) => contentSections.changeComponentPrefix(usePrefix, newPrefix);
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.themeInitialized === void 0 && $$bindings.themeInitialized && themeInitialized !== void 0)
    $$bindings.themeInitialized(themeInitialized);
  if ($$props.changeComponentPrefix === void 0 && $$bindings.changeComponentPrefix && changeComponentPrefix !== void 0)
    $$bindings.changeComponentPrefix(changeComponentPrefix);
  $$result.css.add(css$d);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1mhkm1q_START --><!-- HTML_TAG_START -->${irBlack$1}<!-- HTML_TAG_END --><!-- HEAD_svelte-1mhkm1q_END -->`, ""}

<div class="content-viewer svelte-1286jpe">${validate_component(ContentSelector, "ContentSelector").$$render($$result, { editorId }, {}, {})}
	<div class="bg-left svelte-1286jpe"></div>
	<div class="bg-right svelte-1286jpe"></div>
	<div class="content-wrapper svelte-1286jpe">${validate_component(ContentSections, "ContentSections").$$render(
      $$result,
      {
        editorId,
        componentColor,
        themeInitialized,
        this: contentSections
      },
      {
        this: ($$value) => {
          contentSections = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}</div>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Modal_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".modal.svelte-rpus5k.svelte-rpus5k{--modal-outer-background-color:hsla(0, 0%, 0%, 0.75);--modal-dialog-background-color:var(--white2);--modal-body-background-color:var(--white2);--modal-header-background-color:var(--light-gray4);--modal-footer-background-color:var(--white2);--modal-header-text-color:var(--black1);overflow-y:auto;overflow-x:hidden;position:fixed;top:0;left:0;width:100%;height:100%;outline:0;z-index:98}.fade.svelte-rpus5k.svelte-rpus5k{transition:background-color 0.15s linear}.hidden.svelte-rpus5k.svelte-rpus5k{display:none}.shown.svelte-rpus5k.svelte-rpus5k{display:block;background-color:var(--modal-outer-background-color)}.modal-dialog.svelte-rpus5k.svelte-rpus5k{position:relative;min-width:314px;max-width:450px;width:calc(100% - 4rem);margin:2rem auto 0 auto;background-clip:padding-box;background-color:var(--modal-dialog-background-color);border:2px solid var(--black1);border-radius:6px;border-style:none;outline:0;pointer-events:auto;box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);z-index:99}.modal-content.svelte-rpus5k.svelte-rpus5k{display:flex;flex-direction:column;position:relative;color:currentColor;width:100%;gap:0.5rem;border-radius:6px}.modal-header.svelte-rpus5k.svelte-rpus5k{display:flex;padding:0;flex-shrink:0;justify-content:flex-end;align-items:center;line-height:1;background-color:var(--modal-header-background-color);border-top-left-radius:6px;border-top-right-radius:6px;padding:0.5rem 1rem}.modal-header.svelte-rpus5k h5.svelte-rpus5k{color:var(--modal-header-text-color);font-size:1.1rem;font-weight:700;letter-spacing:0.6px;line-height:1;margin:0;flex:1}.btn-close.svelte-rpus5k.svelte-rpus5k{cursor:pointer;box-sizing:content-box;background-color:inherit;width:1rem;border-radius:0;border-style:none;opacity:1;padding:0;margin:0 0 0 auto}.btn-close.svelte-rpus5k.svelte-rpus5k:focus,.btn-close.svelte-rpus5k.svelte-rpus5k:active,.btn-close.svelte-rpus5k.svelte-rpus5k:active:focus{outline:0;box-shadow:none}.modal-body.svelte-rpus5k.svelte-rpus5k{position:relative;font-size:0.9rem;padding:0.25rem 1rem;background-color:var(--modal-body-background-color)}.modal-footer.svelte-rpus5k.svelte-rpus5k{display:flex;flex-wrap:wrap;flex-shrink:0;justify-content:flex-end;align-items:center;gap:0.5rem;border-bottom-right-radius:0.375rem;border-bottom-left-radius:0.375rem;background-color:var(--modal-footer-background-color);padding:0.5rem 1rem}.modal-footer.svelte-rpus5k button.svelte-rpus5k{color:var(--white1);background-color:var(--dark-gray4);font-size:0.95rem;padding:0.25rem 0.5rem;white-space:nowrap;letter-spacing:0.6px;border:2px solid var(--dark-gray4);border-radius:6px;min-width:75px}.modal-footer.svelte-rpus5k button.svelte-rpus5k:hover,.modal-footer.svelte-rpus5k button.svelte-rpus5k:active,.modal-footer.svelte-rpus5k button.svelte-rpus5k:focus,.modal-footer.svelte-rpus5k button.svelte-rpus5k:active:focus{color:var(--white4);background-color:var(--dark-gray1);border:2px solid var(--dark-gray4)}.modal-footer.svelte-rpus5k button[disabled].svelte-rpus5k{cursor:not-allowed;color:var(--light-gray2);background-color:var(--gray2);border:2px solid var(--gray2)}@media screen and (min-width: 762px){.modal-dialog.svelte-rpus5k.svelte-rpus5k{max-width:500px;margin:2rem auto 0 auto}.modal-content.svelte-rpus5k.svelte-rpus5k{border-radius:0}}",
  map: null
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let modelLabel;
  let { modalId = `modal-${getRandomHexString$1(4)}` } = $$props;
  let { title = "" } = $$props;
  let { closed = true } = $$props;
  let { disableSaveButton = false } = $$props;
  let { noHeader = false } = $$props;
  let { noFooter = false } = $$props;
  let { outsideClickClosesModal = true } = $$props;
  let { saveButtonText = "Save" } = $$props;
  createEventDispatcher();
  const toggleModal = () => closed = !closed;
  if ($$props.modalId === void 0 && $$bindings.modalId && modalId !== void 0)
    $$bindings.modalId(modalId);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.closed === void 0 && $$bindings.closed && closed !== void 0)
    $$bindings.closed(closed);
  if ($$props.disableSaveButton === void 0 && $$bindings.disableSaveButton && disableSaveButton !== void 0)
    $$bindings.disableSaveButton(disableSaveButton);
  if ($$props.noHeader === void 0 && $$bindings.noHeader && noHeader !== void 0)
    $$bindings.noHeader(noHeader);
  if ($$props.noFooter === void 0 && $$bindings.noFooter && noFooter !== void 0)
    $$bindings.noFooter(noFooter);
  if ($$props.outsideClickClosesModal === void 0 && $$bindings.outsideClickClosesModal && outsideClickClosesModal !== void 0)
    $$bindings.outsideClickClosesModal(outsideClickClosesModal);
  if ($$props.saveButtonText === void 0 && $$bindings.saveButtonText && saveButtonText !== void 0)
    $$bindings.saveButtonText(saveButtonText);
  if ($$props.toggleModal === void 0 && $$bindings.toggleModal && toggleModal !== void 0)
    $$bindings.toggleModal(toggleModal);
  $$result.css.add(css$c);
  modelLabel = `${modalId}-label`;
  return `

<div class="${[
    "modal fade svelte-rpus5k",
    (closed ? "hidden" : "") + " " + (!closed ? "shown" : "")
  ].join(" ").trim()}"${add_attribute("id", modalId, 0)} tabindex="-1"${add_attribute("aria-labelledby", modelLabel, 0)} aria-hidden="true"><div class="modal-dialog svelte-rpus5k"><div class="modal-content svelte-rpus5k">${!noHeader ? `<div class="modal-header svelte-rpus5k">${title ? `<h5${add_attribute("id", modelLabel, 0)} class="svelte-rpus5k">${escape(title)}</h5>` : ``}
					<button type="button" class="btn-close svelte-rpus5k" aria-label="Close">${validate_component(Close, "Close").$$render($$result, {}, {}, {})}</button></div>` : ``}
			<div class="modal-body svelte-rpus5k">${slots.default ? slots.default({}) : ``}</div>
			${!noFooter ? `<div class="modal-footer svelte-rpus5k"><button type="button" ${disableSaveButton ? "disabled" : ""} class="modal-button svelte-rpus5k">${escape(saveButtonText)}</button>
					<button type="button" class="modal-button svelte-rpus5k">Cancel</button></div>` : ``}</div></div>
</div>`;
});
const ColorSettings_svelte_svelte_type_style_lang = "";
const AddColorToPaletteModal_svelte_svelte_type_style_lang = "";
const EditColorDetailsModal_svelte_svelte_type_style_lang = "";
const ComponentColorOptions_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".color-swatch.svelte-j647rp{width:15px;height:15px;padding:3px;border:1px solid var(--black2)}",
  map: null
};
const ComponentColorOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options = [] } = $$props;
  let { menuId: menuId2 = "" } = $$props;
  let selectedOption;
  const dispatch = createEventDispatcher();
  function handleOptionClicked(selectedOptionNumber) {
    if (options.length > 0) {
      options.forEach((menuOption) => menuOption.active = false);
      selectedOption = options.find((menuOption) => menuOption.optionNumber == selectedOptionNumber);
      if (selectedOption) {
        selectedOption.active = true;
        dispatch("changed", selectedOption.value);
      }
    }
  }
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.menuId === void 0 && $$bindings.menuId && menuId2 !== void 0)
    $$bindings.menuId(menuId2);
  if ($$props.handleOptionClicked === void 0 && $$bindings.handleOptionClicked && handleOptionClicked !== void 0)
    $$bindings.handleOptionClicked(handleOptionClicked);
  $$result.css.add(css$b);
  return `${each(options, (option) => {
    return `${validate_component(Option, "Option").$$render($$result, Object.assign({}, option, { menuId: menuId2 }), {}, {
      default: () => {
        return `<div class="color-swatch svelte-j647rp" style="${"background-color: var(--" + escape(option.value, true) + "-fg-color)"}"></div>
	`;
      }
    })}`;
  })}`;
});
const ComponentColorSelector_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".color-swatch.svelte-j647rp{width:15px;height:15px;padding:3px;border:1px solid var(--black2)}",
  map: null
};
const menuLabel = "";
const ComponentColorSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "black" } = $$props;
  let { disabled = false } = $$props;
  const menuId2 = "select-component-color";
  let selectComponent;
  const options = [
    {
      label: "",
      value: "black",
      optionNumber: 1,
      active: false
    },
    {
      label: "",
      value: "red",
      optionNumber: 2,
      active: false
    },
    {
      label: "",
      value: "orange",
      optionNumber: 3,
      active: false
    },
    {
      label: "",
      value: "yellow",
      optionNumber: 4,
      active: false
    },
    {
      label: "",
      value: "green",
      optionNumber: 5,
      active: false
    },
    {
      label: "",
      value: "teal",
      optionNumber: 6,
      active: false
    },
    {
      label: "",
      value: "blue",
      optionNumber: 7,
      active: false
    },
    {
      label: "",
      value: "indigo",
      optionNumber: 8,
      active: false
    }
  ];
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.menuId === void 0 && $$bindings.menuId && menuId2 !== void 0)
    $$bindings.menuId(menuId2);
  $$result.css.add(css$a);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Select, "Select").$$render(
      $$result,
      {
        menuLabel,
        options,
        selectedValue: value,
        menuId: menuId2,
        disabled,
        this: selectComponent
      },
      {
        this: ($$value) => {
          selectComponent = $$value;
          $$settled = false;
        }
      },
      {
        selectedValue: () => {
          return `<div class="color-swatch svelte-j647rp" style="${"background-color: var(--" + escape(value, true) + "-fg-color)"}"></div>
	`;
        },
        options: () => {
          return `${validate_component(ComponentColorOptions, "ComponentColorOptions").$$render($$result, { options, menuId: menuId2 }, {}, {})}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const EditThemeSettingsModal_svelte_svelte_type_style_lang = "";
const Highlight_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".langtag.svelte-4cqgwq{position:relative}.langtag.svelte-4cqgwq::after{content:attr(data-language);position:absolute;top:0;right:0;padding:1em;display:flex;align-items:center;justify-content:center;background:inherit;color:inherit;background:var(--hljs-background);color:var(--hljs-foreground);border-radius:var(--hljs-radius)}",
  map: null
};
const Highlight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["language", "code", "langtag"]);
  let { language = { name: void 0, register: void 0 } } = $$props;
  let { code = void 0 } = $$props;
  let { langtag = false } = $$props;
  createEventDispatcher();
  let highlighted = void 0;
  if ($$props.language === void 0 && $$bindings.language && language !== void 0)
    $$bindings.language(language);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.langtag === void 0 && $$bindings.langtag && langtag !== void 0)
    $$bindings.langtag(langtag);
  $$result.css.add(css$9);
  {
    if (language.name && language.register) {
      hljs.registerLanguage(language.name, language.register);
      highlighted = hljs.highlight(code, { language: language.name }).value;
    }
  }
  return `${slots.default ? slots.default({ highlighted }) : `
  
  <pre${spread(
    [
      {
        "data-language": escape_attribute_value(language.name || "plaintext")
      },
      escape_object($$restProps)
    ],
    {
      classes: (langtag ? "langtag" : "") + " svelte-4cqgwq"
    }
  )}><code class="hljs">${highlighted !== void 0 ? `<!-- HTML_TAG_START -->${highlighted}<!-- HTML_TAG_END -->` : `${escape(code)}`}</code></pre>
`}`;
});
const HighlightAuto_svelte_svelte_type_style_lang = "";
const HighlightSvelte_svelte_svelte_type_style_lang = "";
const css$1$1 = {
  code: ".langtag.svelte-4cqgwq{position:relative}.langtag.svelte-4cqgwq::after{content:attr(data-language);position:absolute;top:0;right:0;padding:1em;display:flex;align-items:center;justify-content:center;background:inherit;color:inherit;background:var(--hljs-background);color:var(--hljs-foreground);border-radius:var(--hljs-radius)}",
  map: null
};
const HighlightSvelte = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let highlighted;
  let $$restProps = compute_rest_props($$props, ["code", "langtag"]);
  let { code = void 0 } = $$props;
  let { langtag = false } = $$props;
  createEventDispatcher();
  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("css", css$R);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.langtag === void 0 && $$bindings.langtag && langtag !== void 0)
    $$bindings.langtag(langtag);
  $$result.css.add(css$1$1);
  highlighted = hljs.highlightAuto(code).value;
  return `${slots.default ? slots.default({ highlighted }) : `
  
  <pre${spread([{ "data-language": "svelte" }, escape_object($$restProps)], {
    classes: (langtag ? "langtag" : "") + " svelte-4cqgwq"
  })}><code class="hljs"><!-- HTML_TAG_START -->${highlighted}<!-- HTML_TAG_END --></code></pre>
`}`;
});
const json = { name: "json", register };
const json$1 = json;
const LoadUserThemeModal_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".load-theme.svelte-16tuojk.svelte-16tuojk{display:flex;flex-flow:column nowrap;gap:0.5rem}.top-row.svelte-16tuojk.svelte-16tuojk{flex:0 1 auto;display:grid;grid-template-columns:auto 1fr auto;gap:0.5rem}.theme-details.svelte-16tuojk.svelte-16tuojk{display:grid;grid-template-columns:auto 1fr;grid-template-rows:repeat(3, auto);line-height:1;gap:0.5rem}.theme-details.svelte-16tuojk .name.svelte-16tuojk{text-align:right;font-weight:700}label.svelte-16tuojk.svelte-16tuojk{cursor:pointer;color:var(--white1);background-color:var(--dark-gray1);font-size:0.95rem;padding:0.25rem 0.5rem;white-space:nowrap;letter-spacing:0.6px;border:1px solid var(--dark-gray1);border-radius:6px;place-self:center}label.svelte-16tuojk.svelte-16tuojk:hover,label.svelte-16tuojk.svelte-16tuojk:active,label.svelte-16tuojk.svelte-16tuojk:focus,label.svelte-16tuojk.svelte-16tuojk:active:focus{color:var(--white4);background-color:var(--dark-gray3);border:1px solid var(--dark-gray3)}input.svelte-16tuojk.svelte-16tuojk{opacity:0;width:1px}.error.svelte-16tuojk.svelte-16tuojk,.code-viewer.svelte-16tuojk.svelte-16tuojk{flex:1;border-radius:6px;max-height:300px;min-height:67px;background-color:var(--black4)}.code-viewer.svelte-16tuojk pre,.code-viewer.svelte-16tuojk code{border-radius:6px}.error.svelte-16tuojk.svelte-16tuojk{flex:1;display:flex;flex-flow:column nowrap;gap:0.5rem;font-weight:400;font-size:0.85rem;line-height:1;color:var(--red3);padding:1rem}.code-viewer.svelte-16tuojk code.hljs{font-size:0.65rem;line-height:1.5;max-height:300px;padding:1rem}",
  map: null
};
const LoadUserThemeModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let modal;
  let closed;
  let error = "";
  let code = "";
  let userTheme;
  createEventDispatcher();
  function toggleModal() {
    error = "";
    code = "";
    modal.toggleModal();
  }
  if ($$props.toggleModal === void 0 && $$bindings.toggleModal && toggleModal !== void 0)
    $$bindings.toggleModal(toggleModal);
  $$result.css.add(css$8);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1mhkm1q_START --><!-- HTML_TAG_START -->${irBlack$1}<!-- HTML_TAG_END --><!-- HEAD_svelte-1mhkm1q_END -->`, ""}

${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Load User Theme",
        disableSaveButton: !userTheme,
        outsideClickClosesModal: false,
        saveButtonText: "Load Theme",
        this: modal,
        closed
      },
      {
        this: ($$value) => {
          modal = $$value;
          $$settled = false;
        },
        closed: ($$value) => {
          closed = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="load-theme svelte-16tuojk"><div class="top-row svelte-16tuojk">${`<label for="file-input" class="svelte-16tuojk">Choose JSON File</label>
				<input type="file" id="file-input" name="file-input" accept=".json, application/json" class="svelte-16tuojk">`}</div>
		${error ? `<span class="error svelte-16tuojk"><strong>Error!</strong>
				${escape(error)}</span>` : `<div class="code-viewer svelte-16tuojk">${validate_component(Highlight, "Highlight").$$render($$result, { language: json$1, code }, {}, {})}</div>`}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 448 512" }, $$props), {}, {
    default: () => {
      return `<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>`;
    }
  })}`;
});
const SelectedColor_svelte_svelte_type_style_lang = "";
const SelectedPalette_svelte_svelte_type_style_lang = "";
const Save = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 448 512" }, $$props), {}, {
    default: () => {
      return `<path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path>`;
    }
  })}`;
});
const PaletteControls_svelte_svelte_type_style_lang = "";
const ColorPalettes_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".accordion.svelte-1wdyasw{display:grid;gap:0.25rem;margin:0;width:100%}",
  map: null
};
const ColorPalettes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { colorFormat } = $$props;
  let { palettes } = $$props;
  let { columns = 2 } = $$props;
  let { allowMultiplePalettesOpen = false } = $$props;
  let { displayColorName = false } = $$props;
  let paletteRefs = {};
  createEventDispatcher();
  if ($$props.colorFormat === void 0 && $$bindings.colorFormat && colorFormat !== void 0)
    $$bindings.colorFormat(colorFormat);
  if ($$props.palettes === void 0 && $$bindings.palettes && palettes !== void 0)
    $$bindings.palettes(palettes);
  if ($$props.columns === void 0 && $$bindings.columns && columns !== void 0)
    $$bindings.columns(columns);
  if ($$props.allowMultiplePalettesOpen === void 0 && $$bindings.allowMultiplePalettesOpen && allowMultiplePalettesOpen !== void 0)
    $$bindings.allowMultiplePalettesOpen(allowMultiplePalettesOpen);
  if ($$props.displayColorName === void 0 && $$bindings.displayColorName && displayColorName !== void 0)
    $$bindings.displayColorName(displayColorName);
  $$result.css.add(css$7);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (palettes && palettes.length === 0)
        paletteRefs = {};
    }
    $$rendered = `<div class="accordion svelte-1wdyasw" style="${"grid-template-columns: repeat(" + escape(columns, true) + ", minmax(0, 1fr));"}">${palettes && palettes.length ? `${each(palettes, (palette) => {
      return `${validate_component(Palette$1, "Palette").$$render(
        $$result,
        {
          colorFormat,
          palette,
          displayColorName,
          this: paletteRefs[palette.id]
        },
        {
          this: ($$value) => {
            paletteRefs[palette.id] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}` : ``}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Open = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 512 512" }, $$props), {}, {
    default: () => {
      return `<path d="M41 73v304.563L88.697 151H423v-30H185.514l-16-48H41zm62.303 96L43.092 455h381.605l60.211-286H103.303z"></path>`;
    }
  })}`;
});
const LoadUserThemeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { compact = true } = $$props;
  let { color = "black" } = $$props;
  let { disabled = false } = $$props;
  let { width = null } = $$props;
  if ($$props.compact === void 0 && $$bindings.compact && compact !== void 0)
    $$bindings.compact(compact);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `${compact ? `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Import Color Theme",
      disabled,
      iconWidth: "16px",
      wrapperWidth: "32px"
    },
    {},
    {
      icon: () => {
        return `${validate_component(Open, "Open").$$render($$result, {}, {}, {})}`;
      }
    }
  )}` : `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Import Color Theme",
      disabled,
      iconWidth: "16px",
      wrapperWidth: width
    },
    {},
    {
      label: () => {
        return `Load Theme`;
      },
      icon: () => {
        return `${validate_component(Open, "Open").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`}`;
});
const Palette = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 512 512" }, $$props), {}, {
    default: () => {
      return `<path d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>`;
    }
  })}`;
});
const NewUserThemeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { compact = true } = $$props;
  let { color = "black" } = $$props;
  let { disabled = false } = $$props;
  let { width = null } = $$props;
  if ($$props.compact === void 0 && $$bindings.compact && compact !== void 0)
    $$bindings.compact(compact);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `${compact ? `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Create New Color Theme",
      disabled,
      iconWidth: "16px",
      wrapperWidth: "32px"
    },
    {},
    {
      icon: () => {
        return `${validate_component(Palette, "Palette").$$render($$result, {}, {}, {})}`;
      }
    }
  )}` : `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Create New Color Theme",
      disabled,
      iconWidth: "16px",
      wrapperWidth: width
    },
    {},
    {
      label: () => {
        return `New Theme`;
      },
      icon: () => {
        return `${validate_component(Palette, "Palette").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`}`;
});
const InitializeUserTheme_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".init-theme.svelte-zy10fo.svelte-zy10fo{flex:1;display:flex;flex-flow:column nowrap;gap:1rem;width:371px;height:169px;padding:1rem;border-radius:6px}.intro-text.svelte-zy10fo.svelte-zy10fo{display:flex;flex-flow:column nowrap;gap:0.5rem}.intro-text.svelte-zy10fo p.svelte-zy10fo{margin:0;font-size:0.875rem}.headline.svelte-zy10fo.svelte-zy10fo{font-weight:700;text-align:center;font-style:italic}.button-wrapper.svelte-zy10fo.svelte-zy10fo{display:flex;flex-flow:row nowrap;gap:1rem;flex:1;justify-content:center}",
  map: null
};
const InitializeUserTheme = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let componentColor;
  let style;
  createEventDispatcher();
  $$result.css.add(css$6);
  componentColor = getRandomArrayItem(COMPONENT_COLORS);
  style = `color: var(--${componentColor}-fg-color); border: 1px solid var(--${componentColor}-fg-color); background-color: var(--${componentColor}-hover-bg-color);`;
  return `<div class="init-theme svelte-zy10fo"${add_attribute("style", style, 0)}><div class="intro-text svelte-zy10fo"><p class="headline svelte-zy10fo">Welcome to the Component Theme Editor!</p>
		<p class="svelte-zy10fo">Would you like to create a new theme or load an existing theme?</p></div>
	<div class="button-wrapper svelte-zy10fo">${validate_component(NewUserThemeButton, "NewUserThemeButton").$$render(
    $$result,
    {
      color: componentColor,
      compact: false,
      width: "113px"
    },
    {},
    {}
  )}
		${validate_component(LoadUserThemeButton, "LoadUserThemeButton").$$render(
    $$result,
    {
      color: componentColor,
      compact: false,
      width: "113px"
    },
    {},
    {}
  )}</div>
</div>`;
});
const AddPaletteButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `${validate_component(ThemeButton, "ThemeButton").$$render($$result, { color, tooltip: "Add New Palette" }, {}, {
    label: () => {
      return `New Palette`;
    },
    icon: () => {
      return `${validate_component(Plus, "Plus").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
const Minus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 448 512" }, $$props), {}, {
    default: () => {
      return `<path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>`;
    }
  })}`;
});
const DeletePaletteButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  let { disabled = false } = $$props;
  let { tooltip } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0)
    $$bindings.tooltip(tooltip);
  return `${validate_component(ThemeButton, "ThemeButton").$$render($$result, { color, tooltip, disabled }, {}, {
    icon: () => {
      return `${validate_component(Minus, "Minus").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
const EditPaletteForm_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".edit-palette.svelte-1vi5tp6{--select-menu-width:58px;--select-menu-height:30px;--select-menu-margin:0 6px 0 0;--select-menu-padding:4px 10px;display:flex;flex-flow:row nowrap;align-items:center;width:100%}.palette-number.svelte-1vi5tp6{font-size:0.875rem;font-weight:500;line-height:1.5;margin:0;padding:3px 6px;border-top-left-radius:6px;border-bottom-left-radius:6px;border-top-right-radius:0px;border-bottom-right-radius:0px}input.svelte-1vi5tp6{flex-grow:1;padding:3px 8px;margin:0 6px 0 0;border-top-left-radius:0px;border-bottom-left-radius:0px;border-top-right-radius:6px;border-bottom-right-radius:6px;font-size:0.875rem;outline:none}input.svelte-1vi5tp6:focus{outline:none}",
  map: null
};
const EditPaletteForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let numberStyles;
  let borderStyle;
  let { palette } = $$props;
  let { paletteNumber } = $$props;
  let { disabled = false } = $$props;
  let inputElement;
  createEventDispatcher();
  const getToolTip = () => disabled ? "Your theme must contain at least one color palette" : `Delete Palette #${paletteNumber}`;
  if ($$props.palette === void 0 && $$bindings.palette && palette !== void 0)
    $$bindings.palette(palette);
  if ($$props.paletteNumber === void 0 && $$bindings.paletteNumber && paletteNumber !== void 0)
    $$bindings.paletteNumber(paletteNumber);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  $$result.css.add(css$5);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    numberStyles = `color: var(--${palette.componentColor}-fg-color); background-color: var(--${palette.componentColor}-bg-color); border-top: 1.5px solid var(--${palette.componentColor}-fg-color); border-right: none; border-bottom: 1.5px solid var(--${palette.componentColor}-fg-color); border-left: 1.5px solid var(--${palette.componentColor}-fg-color)`;
    borderStyle = `border: 1.5px solid var(--${palette.componentColor}-fg-color)`;
    $$rendered = `<div class="edit-palette svelte-1vi5tp6"><span class="palette-number svelte-1vi5tp6"${add_attribute("style", numberStyles, 0)}>${escape(paletteNumber)}</span>
	<input type="text" placeholder="palette name"${add_attribute("style", borderStyle, 0)} class="svelte-1vi5tp6"${add_attribute("this", inputElement, 0)}${add_attribute("value", palette.displayName, 0)}>
	${validate_component(ComponentColorSelector, "ComponentColorSelector").$$render(
      $$result,
      { value: palette.componentColor },
      {
        value: ($$value) => {
          palette.componentColor = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(DeletePaletteButton, "DeletePaletteButton").$$render(
      $$result,
      {
        color: palette.componentColor,
        tooltip: getToolTip(),
        disabled
      },
      {},
      {}
    )}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const PaletteEditor_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".palette-editor.svelte-1jlo9im{display:flex;flex-flow:column nowrap;justify-content:space-between;align-items:flex-end;gap:1rem}.palette-list.svelte-1jlo9im{--select-menu-default-border-color:var(--black1);display:flex;flex-flow:column nowrap;justify-content:flex-start;align-items:flex-end;gap:0.25rem;width:100%}.add-palette-controls.svelte-1jlo9im{width:115px}",
  map: null
};
const PaletteEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let disabled;
  let $state, $$unsubscribe_state;
  let { editorId } = $$props;
  let { color } = $$props;
  let state = getThemeEditorStore(editorId);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  createEventDispatcher();
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$4);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    disabled = $state.userTheme.palettes.length === 1;
    $$rendered = `<div class="palette-editor svelte-1jlo9im"><div class="palette-list svelte-1jlo9im">${each($state.userTheme.palettes, (palette, i) => {
      return `${validate_component(EditPaletteForm, "EditPaletteForm").$$render(
        $$result,
        { disabled, paletteNumber: i + 1, palette },
        {
          palette: ($$value) => {
            palette = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div>
	<div class="add-palette-controls svelte-1jlo9im">${validate_component(AddPaletteButton, "AddPaletteButton").$$render($$result, { color }, {}, {})}</div>
</div>`;
  } while (!$$settled);
  $$unsubscribe_state();
  return $$rendered;
});
const ThemeName_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".theme-name-label.svelte-zeszsj.svelte-zeszsj{font-size:0.85rem;line-height:1;flex:0 1 auto;white-space:nowrap}.theme-name-wrapper.svelte-zeszsj.svelte-zeszsj{display:flex;flex-flow:row nowrap;align-items:center;border-radius:6px;gap:0.5rem}#theme-name.svelte-zeszsj.svelte-zeszsj{flex:1;font-size:0.85rem;font-weight:500;font-style:italic;line-height:1;text-align:left;max-width:150px;background-color:var(--white1)}#theme-name-input.svelte-zeszsj.svelte-zeszsj{flex:1;line-height:1;border:none;outline:none;border-radius:6px;font-size:0.875rem;text-align:left;padding:2px 0 2px 4px;max-width:150px;background-color:var(--white4)}.error.svelte-zeszsj #theme-name-input.svelte-zeszsj,.error.svelte-zeszsj #theme-name-input.svelte-zeszsj:focus{outline:2px solid var(--red2);outline-offset:2px}#theme-name-input.svelte-zeszsj.svelte-zeszsj:focus{outline:none}",
  map: null
};
const ThemeName = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let themeNameStyles;
  let { themeName = "" } = $$props;
  let { editMode = false } = $$props;
  let { componentColor } = $$props;
  let newName = themeName;
  let error = false;
  if ($$props.themeName === void 0 && $$bindings.themeName && themeName !== void 0)
    $$bindings.themeName(themeName);
  if ($$props.editMode === void 0 && $$bindings.editMode && editMode !== void 0)
    $$bindings.editMode(editMode);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  $$result.css.add(css$3);
  error = editMode && !newName;
  themeNameStyles = `color: var(--${componentColor}-fg-color);`;
  return `

<div class="${[
    "theme-name-wrapper svelte-zeszsj",
    (editMode ? "edit-mode" : "") + " " + (error ? "error" : "")
  ].join(" ").trim()}"><span class="theme-name-label svelte-zeszsj">Theme Name:</span>
	${editMode ? `<input id="theme-name-input" name="theme-name-input" type="text"${add_attribute("style", themeNameStyles, 0)} class="svelte-zeszsj"${add_attribute("value", newName, 0)}>` : `<span id="theme-name" title="Click to change theme name"${add_attribute("style", themeNameStyles, 0)} class="svelte-zeszsj">${escape(themeName)}</span>`}
</div>`;
});
const CloseUserThemeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  let { disabled = false } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      disabled,
      tooltip: "Close User Theme",
      iconWidth: "14px"
    },
    {},
    {
      icon: () => {
        return `${validate_component(Close, "Close").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`;
});
const EditPalettesButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  let { disabled = false } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Edit Palettes",
      disabled,
      iconWidth: "14px"
    },
    {},
    {
      icon: () => {
        return `${validate_component(Palette, "Palette").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`;
});
const Gear = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 512 512" }, $$props), {}, {
    default: () => {
      return `<path d="M413.967 276.8c1.06-6.235 1.06-13.518 1.06-20.8s-1.06-13.518-1.06-20.8l44.667-34.318c4.26-3.118 5.319-8.317 2.13-13.518L418.215 115.6c-2.129-4.164-8.507-6.235-12.767-4.164l-53.186 20.801c-10.638-8.318-23.394-15.601-36.16-20.801l-7.448-55.117c-1.06-4.154-5.319-8.318-10.638-8.318h-85.098c-5.318 0-9.577 4.164-10.637 8.318l-8.508 55.117c-12.767 5.2-24.464 12.482-36.171 20.801l-53.186-20.801c-5.319-2.071-10.638 0-12.767 4.164L49.1 187.365c-2.119 4.153-1.061 10.399 2.129 13.518L96.97 235.2c0 7.282-1.06 13.518-1.06 20.8s1.06 13.518 1.06 20.8l-44.668 34.318c-4.26 3.118-5.318 8.317-2.13 13.518L92.721 396.4c2.13 4.164 8.508 6.235 12.767 4.164l53.187-20.801c10.637 8.318 23.394 15.601 36.16 20.801l8.508 55.117c1.069 5.2 5.318 8.318 10.637 8.318h85.098c5.319 0 9.578-4.164 10.638-8.318l8.518-55.117c12.757-5.2 24.464-12.482 36.16-20.801l53.187 20.801c5.318 2.071 10.637 0 12.767-4.164l42.549-71.765c2.129-4.153 1.06-10.399-2.13-13.518l-46.8-34.317zm-158.499 52c-41.489 0-74.46-32.235-74.46-72.8s32.971-72.8 74.46-72.8 74.461 32.235 74.461 72.8-32.972 72.8-74.461 72.8z"></path>`;
    }
  })}`;
});
const EditSettingsButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  let { disabled = false } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Edit Theme Settings",
      disabled,
      iconWidth: "21px"
    },
    {},
    {
      icon: () => {
        return `${validate_component(Gear, "Gear").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`;
});
const Export = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 24 24" }, $$props), {}, {
    default: () => {
      return `<path d="M8 16.5v.5c1.691-2.578 3.6-3.953 6-4v3c0 .551.511 1 1.143 1 .364 0 .675-.158.883-.391 1.933-2.029 5.974-6.109 5.974-6.109s-4.041-4.082-5.975-6.137c-.208-.205-.518-.363-.882-.363-.632 0-1.143.447-1.143 1v3c-4.66 0-6 4.871-6 8.5zM5 21h14c.553 0 1-.448 1-1v-6.046c-.664.676-1.364 1.393-2 2.047v2.999h-12v-12h7v-2h-8c-.553 0-1 .448-1 1v14c0 .552.447 1 1 1z"></path>`;
    }
  })}`;
});
const ExportUserThemeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  let { disabled = false } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Export User Theme",
      disabled,
      iconWidth: "25px"
    },
    {},
    {
      icon: () => {
        return `${validate_component(Export, "Export").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvgIcon$1, "SvgIcon").$$render($$result, Object.assign({}, { viewBox: "0 0 512 512" }, $$props), {}, {
    default: () => {
      return `<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>`;
    }
  })}`;
});
const FinishEditingButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Save Changes",
      alignSelf: "center",
      iconWidth: "14px"
    },
    {},
    {
      icon: () => {
        return `${validate_component(Check, "Check").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`;
});
const SaveUserThemeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  let { disabled = false } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `${validate_component(ThemeButton, "ThemeButton").$$render(
    $$result,
    {
      color,
      tooltip: "Download User Theme as JSON",
      disabled,
      iconWidth: "16px",
      wrapperWidth: "32px"
    },
    {},
    {
      icon: () => {
        return `${validate_component(Save, "Save").$$render($$result, {}, {}, {})}`;
      }
    }
  )}`;
});
const UserThemeControls_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".user-theme-controls.svelte-53nics{display:grid;grid-template-columns:auto 1fr auto;gap:0.25rem}.buttons-left.svelte-53nics,.buttons-right.svelte-53nics{display:flex;gap:0.25rem}.buttons-left.svelte-53nics{grid-column:1 / span 1}.buttons-right.svelte-53nics{grid-column:3 / span 1}",
  map: null
};
const UserThemeControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let disabled;
  let $state, $$unsubscribe_state;
  let { editorId } = $$props;
  let { componentColor } = $$props;
  let { themeColorPalettes } = $$props;
  let { x11PalettesShown } = $$props;
  getAppStore(editorId);
  let state = getThemeEditorStore(editorId);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  createEventDispatcher();
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.themeColorPalettes === void 0 && $$bindings.themeColorPalettes && themeColorPalettes !== void 0)
    $$bindings.themeColorPalettes(themeColorPalettes);
  if ($$props.x11PalettesShown === void 0 && $$bindings.x11PalettesShown && x11PalettesShown !== void 0)
    $$bindings.x11PalettesShown(x11PalettesShown);
  $$result.css.add(css$2);
  disabled = !themeColorPalettes.length || $state.editMode || x11PalettesShown;
  $$unsubscribe_state();
  return `<div class="user-theme-controls svelte-53nics"><div class="buttons-left svelte-53nics">${$state.editMode ? `${validate_component(FinishEditingButton, "FinishEditingButton").$$render($$result, { color: componentColor }, {}, {})}` : `${validate_component(EditPalettesButton, "EditPalettesButton").$$render($$result, { color: componentColor, disabled }, {}, {})}`}
		${validate_component(EditSettingsButton, "EditSettingsButton").$$render($$result, { color: componentColor, disabled }, {}, {})}
		${validate_component(SaveUserThemeButton, "SaveUserThemeButton").$$render($$result, { color: componentColor, disabled }, {}, {})}
		${validate_component(ExportUserThemeButton, "ExportUserThemeButton").$$render($$result, { color: componentColor, disabled }, {}, {})}</div>
	<div class="buttons-right svelte-53nics">${validate_component(CloseUserThemeButton, "CloseUserThemeButton").$$render($$result, { color: componentColor, disabled }, {}, {})}</div>
</div>`;
});
const UserTheme_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".user-theme.svelte-1ws75vb{display:flex;flex-flow:column nowrap;width:100%;gap:1rem}",
  map: null
};
const UserTheme = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  let { editorId } = $$props;
  let { componentColor } = $$props;
  let { colorFormat } = $$props;
  let { initialized = false } = $$props;
  let { themeColorPalettes } = $$props;
  let { x11PalettesShown } = $$props;
  let state = getThemeEditorStore(editorId);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  getAppStore(editorId);
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  if ($$props.componentColor === void 0 && $$bindings.componentColor && componentColor !== void 0)
    $$bindings.componentColor(componentColor);
  if ($$props.colorFormat === void 0 && $$bindings.colorFormat && colorFormat !== void 0)
    $$bindings.colorFormat(colorFormat);
  if ($$props.initialized === void 0 && $$bindings.initialized && initialized !== void 0)
    $$bindings.initialized(initialized);
  if ($$props.themeColorPalettes === void 0 && $$bindings.themeColorPalettes && themeColorPalettes !== void 0)
    $$bindings.themeColorPalettes(themeColorPalettes);
  if ($$props.x11PalettesShown === void 0 && $$bindings.x11PalettesShown && x11PalettesShown !== void 0)
    $$bindings.x11PalettesShown(x11PalettesShown);
  $$result.css.add(css$1);
  $$unsubscribe_state();
  return `${!initialized ? `${validate_component(InitializeUserTheme, "InitializeUserTheme").$$render($$result, {}, {}, {})}` : `<div class="user-theme svelte-1ws75vb">${validate_component(UserThemeControls, "UserThemeControls").$$render(
    $$result,
    {
      editorId,
      componentColor,
      themeColorPalettes,
      x11PalettesShown
    },
    {},
    {}
  )}
		${!$state.editMode ? `${validate_component(ThemeName, "ThemeName").$$render(
    $$result,
    {
      themeName: $state?.userTheme?.themeName,
      componentColor
    },
    {},
    {}
  )}` : ``}
		${$state.editMode ? `${validate_component(PaletteEditor, "PaletteEditor").$$render($$result, { editorId, color: "teal" }, {}, {})}` : `${validate_component(ColorPalettes, "ColorPalettes").$$render(
    $$result,
    {
      colorFormat,
      palettes: $state?.userTheme?.palettes,
      allowMultiplePalettesOpen: false,
      displayColorName: true,
      columns: 1
    },
    {},
    {}
  )}`}</div>`}`;
});
const getDefaultEditorState = (editorId) => ({ ...defaultThemeEditorState, editorId });
function createThemeEditorStore(editorId) {
  const { set, subscribe: subscribe2, update } = writable(getDefaultEditorState(editorId));
  function createNewPalette(state) {
    state.userTheme.palettes = [
      ...state.userTheme.palettes,
      createEmptyColorPalette(`palette ${state.userTheme.palettes.length + 1}`)
    ];
    return state;
  }
  function deletePalette(paletteId, state) {
    state.userTheme.palettes = [...state.userTheme.palettes.filter((p) => p.id !== paletteId)];
    if (state.selectedPaletteId === paletteId) {
      state.selectedPaletteId = "";
    }
    return state;
  }
  function changeSelectedPalette(paletteId, state) {
    if (paletteId) {
      state.selectedPaletteId = paletteId;
      state = _resetAllColorsInPalette(state);
    } else {
      state.selectedPaletteId = null;
    }
    return deselectColor(state);
  }
  function changeSelectedColor(color, state) {
    state = _resetAllColorsInPalette(state);
    state.colorSelected = true;
    state.selectedColor = color;
    state.selectedColor.isSelected = true;
    return state;
  }
  function _resetAllColorsInPalette(state) {
    const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
    if (selectedPalette) {
      selectedPalette.colors.forEach((c) => c.isSelected = false);
      selectedPalette.colors = [...selectedPalette.colors];
      state.userTheme.palettes = [...state.userTheme.palettes];
      selectedPalette.updated = true;
    }
    return state;
  }
  function updateThemeColor(color, state) {
    color.name = state.selectedColor.displayName;
    state.selectedColor.color = color;
    state.selectedColor.value = getCssValueForColor(state.selectedColor, state.userTheme.colorFormat);
    state.selectedColor.isSelected = true;
    return updatePaletteColors(state);
  }
  function deselectColor(state) {
    state.colorSelected = false;
    state.selectedColor.isSelected = false;
    return state;
  }
  function addColorToPalette(newColor, state) {
    const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
    selectedPalette.colors = [...selectedPalette.colors, newColor];
    return updatePaletteColors(state);
  }
  function updatePaletteColors(state) {
    const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
    selectedPalette.colors = [...selectedPalette.colors];
    state.userTheme.palettes = [...state.userTheme.palettes];
    selectedPalette.updated = true;
    return state;
  }
  function deleteColorFromPalette(color, state) {
    const selectedPalette = state.userTheme.palettes.find((p) => p.id === state.selectedPaletteId);
    const removeIndex = selectedPalette.colors.indexOf(color);
    selectedPalette.colors = [
      ...selectedPalette.colors.slice(0, removeIndex),
      ...selectedPalette.colors.slice(removeIndex + 1)
    ];
    state.userTheme.palettes = [...state.userTheme.palettes];
    selectedPalette.updated = true;
    return state;
  }
  return {
    set,
    subscribe: subscribe2,
    createNewPalette: () => update((state) => createNewPalette(state)),
    deletePalette: (id) => update((state) => deletePalette(id, state)),
    changeSelectedPalette: (id) => update((state) => changeSelectedPalette(id, state)),
    changeSelectedColor: (color) => update((state) => changeSelectedColor(color, state)),
    updateThemeColor: (color) => update((state) => updateThemeColor(color, state)),
    deselectColor: () => update((state) => deselectColor(state)),
    addColorToPalette: (color) => update((state) => addColorToPalette(color, state)),
    deleteColorFromPalette: (color) => update((state) => deleteColorFromPalette(color, state))
  };
}
const ComponentEditor_svelte_svelte_type_style_lang = "";
const css = {
  code: ".theme-editor-wrapper.svelte-1l9vnro.svelte-1l9vnro{--select-menu-width:100%;--select-menu-background-color:var(--white3);--select-menu-hover-background-color:var(--hover-bg-color);--select-menu-text-color:var(--fg-color);--select-menu-border-color:var(--fg-color);--select-menu-padding:0 4px;--select-menu-height:30px;--select-menu-dropdown-height:300px;--select-menu-no-selection-text-color:var(--fg-color);--color-picker-background-color:var(--hover-bg-color);--input-text-font-size:0.875rem;--input-text-border-color:var(--fg-color);--input-text-color:var(--fg-color);--input-text-background-color:var(--bg-color);--input-text-disabled-text-color:var(--button-fg-color);--input-text-disabled-background-color:var(--button-bg-color);--input-text-disabled-border-color:var(--button-fg-color);--sst-button-bg-color:var(--button-bg-color);--sst-button-text-color:var(--button-fg-color);--sst-button-border-color:var(--button-fg-color);--sst-button-hover-bg-color:var(--hover-bg-color);--sst-button-hover-text-color:var(--button-fg-color);--sst-button-hover-border-color:var(--button-fg-color);--sst-button-disabled-bg-color:var(--white1);--sst-button-disabled-text-color:var(--gray4);--sst-button-disabled-border-color:var(--gray4);display:flex;flex-flow:column nowrap;gap:2rem;width:100%;background-color:var(--white1);padding:1rem}.theme-editor-wrapper.color.svelte-1l9vnro.svelte-1l9vnro{--button-bg-color:hsl(var(--button-hue, 0), var(--background-sat, 0%), 90%);--button-hover-bg-color:hsl(var(--button-hue, 0), var(--background-sat, 0%), 99%);--button-active-bg-color:hsl(var(--button-hue, 0), var(--background-sat, 0%), 90%);--button-fg-color:hsl(var(--button-hue, 0), var(--fg-sat, 0%), var(--fg-light, 10%));--section-bg-color:hsl(var(--button-hue, 0), var(--background-sat, 0%), 95%);--button-border-color:hsl(var(--button-hue, 0), 63%, 26%)}.theme-editor-wrapper.black.svelte-1l9vnro.svelte-1l9vnro{--button-bg-color:var(--white2);--button-hover-bg-color:var(--white4);--button-active-bg-color:var(--white4);--button-fg-color:var(--black2);--section-bg-color:var(--white4);--button-border-color:var(--black2)}#theme-editor.svelte-1l9vnro.svelte-1l9vnro{display:flex;flex-flow:row nowrap;gap:1rem;margin:0 auto 0 0}.editor-left-col.svelte-1l9vnro.svelte-1l9vnro{flex:0 1 auto;display:flex;flex-flow:column nowrap;justify-content:flex-start;gap:1rem}.editor-right-col.svelte-1l9vnro.svelte-1l9vnro{flex:1;display:flex;flex-flow:column nowrap;align-items:flex-start;gap:1rem;min-width:335px}.help-text.svelte-1l9vnro.svelte-1l9vnro{display:flex;flex-flow:column nowrap;gap:0.5rem;background-color:var(--white2);border:1px solid var(--black4);border-radius:6px;padding:1rem}.help-text.svelte-1l9vnro p.svelte-1l9vnro{line-height:1.6}.help-text.svelte-1l9vnro code.svelte-1l9vnro{font-size:12px;background-color:var(--white4);border:1px solid var(--light-gray2);padding:2px 5px;border-radius:4px}.help-text.svelte-1l9vnro strong.svelte-1l9vnro{font-weight:700}.code-viewer.svelte-1l9vnro.svelte-1l9vnro{flex:1;border-radius:6px;max-height:300px;min-height:67px;background-color:var(--black4)}.code-viewer.svelte-1l9vnro pre,.code-viewer.svelte-1l9vnro code{border-radius:6px}.code-viewer.svelte-1l9vnro code.hljs{font-size:0.65rem;line-height:1.5;max-height:300px;padding:1rem}.code-viewer.svelte-1l9vnro .hljs-tag{color:#ea33c6}.code-viewer.svelte-1l9vnro .hljs-title,.code-viewer.svelte-1l9vnro .language-javascript .hljs-name{color:#dfc244}.code-viewer.svelte-1l9vnro .hljs-name{color:#74f9b1}.code-viewer.svelte-1l9vnro .hljs-attr{color:#56adc4}.code-viewer.svelte-1l9vnro .hljs-string{color:#ececec}.code-viewer.svelte-1l9vnro .hljs-keyword{color:#ea3375}",
  map: null
};
const ComponentEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let colorFormat;
  let style;
  let $state, $$unsubscribe_state = noop, $$subscribe_state = () => ($$unsubscribe_state(), $$unsubscribe_state = subscribe(state, ($$value) => $state = $$value), state);
  let $colorPickerState, $$unsubscribe_colorPickerState = noop, $$subscribe_colorPickerState = () => ($$unsubscribe_colorPickerState(), $$unsubscribe_colorPickerState = subscribe(colorPickerState, ($$value) => $colorPickerState = $$value), colorPickerState);
  let $app, $$unsubscribe_app = noop, $$subscribe_app = () => ($$unsubscribe_app(), $$unsubscribe_app = subscribe(app, ($$value) => $app = $$value), app);
  let { editorId = "component-css-editor" } = $$props;
  let pickerId = "color-picker";
  let state;
  let colorPickerState;
  let editorStateInitialized = false;
  let storesInitialized = false;
  let themeInitialized = false;
  let app;
  let loadUserThemeModal;
  let componentColor = "black";
  let colorPicker;
  let contentViewer;
  if ($$props.editorId === void 0 && $$bindings.editorId && editorId !== void 0)
    $$bindings.editorId(editorId);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      console.log({
        picker: $colorPickerState,
        state: $state,
        app: $app
      });
    }
    {
      if (typeof window !== "undefined" && !editorStateInitialized) {
        $$subscribe_state(state = createThemeEditorStore(editorId));
        $$subscribe_state(state = initThemeEditorStore(state));
        editorStateInitialized = true;
      }
    }
    {
      if (!storesInitialized && editorStateInitialized && $colorPickerState) {
        $$subscribe_colorPickerState(colorPickerState = initColorPickerStore(colorPickerState));
        $$subscribe_app(app = initAppStore(state, colorPickerState));
        storesInitialized = true;
      }
    }
    colorFormat = $state?.userTheme?.colorFormat ?? "hsl";
    componentColor = $state?.userTheme?.uiColor ?? "black";
    style = `--button-hue: var(--${componentColor}-hue); --bg-color: var(--${componentColor}-bg-color); --fg-color: var(--${componentColor}-fg-color); --active-fg-color: var(--${componentColor}-active-fg-color); --disabled-bg-color: var(--${componentColor}-hover-bg-color);  --hover-bg-color: var(--${componentColor}-hover-bg-color); --border-color: var(--fg-color);`;
    $$rendered = `${`${validate_component(LoadUserThemeModal, "LoadUserThemeModal").$$render(
      $$result,
      { this: loadUserThemeModal },
      {
        this: ($$value) => {
          loadUserThemeModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${editorStateInitialized ? `<div class="${[
      "theme-editor-wrapper svelte-1l9vnro",
      (componentColor === "black" ? "black" : "") + " " + (componentColor !== "black" ? "color" : "")
    ].join(" ").trim()}"${add_attribute("style", style, 0)}><div id="theme-editor"${add_attribute("data-testid", $state.editorId, 0)} class="svelte-1l9vnro"><div class="editor-left-col svelte-1l9vnro">${validate_component(ColorPicker, "ColorPicker").$$render(
      $$result,
      {
        editMode: $state.editMode,
        this: colorPicker,
        pickerId,
        state: colorPickerState
      },
      {
        this: ($$value) => {
          colorPicker = $$value;
          $$settled = false;
        },
        pickerId: ($$value) => {
          pickerId = $$value;
          $$settled = false;
        },
        state: ($$value) => {
          colorPickerState = $$value;
          $$settled = false;
        }
      },
      {}
    )}
				${``}</div>
			<div class="editor-right-col svelte-1l9vnro">${storesInitialized ? `${validate_component(UserTheme, "UserTheme").$$render(
      $$result,
      {
        editorId,
        componentColor,
        colorFormat,
        initialized: themeInitialized,
        themeColorPalettes: $app.themeColorPalettes,
        x11PalettesShown: $app.x11PalettesShown
      },
      {},
      {}
    )}` : ``}</div></div>
		${storesInitialized ? `${validate_component(ContentViewer, "ContentViewer").$$render(
      $$result,
      {
        editorId,
        componentColor,
        themeInitialized,
        this: contentViewer
      },
      {
        this: ($$value) => {
          contentViewer = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : `
					<div class="help-text svelte-1l9vnro"><p class="svelte-1l9vnro"><strong class="svelte-1l9vnro"><code class="svelte-1l9vnro">ComponentCssEditor</code> has not been be initialized!</strong></p>
						<p class="svelte-1l9vnro">In order to customize CSS properties for your component and see live updates, import your svelte component
							in the <code class="svelte-1l9vnro">+page.svelte</code> file containing this <code class="svelte-1l9vnro">ComponentCssEditor</code> instance and add
							your component as a child of the <code class="svelte-1l9vnro">ComponentCssEditor</code> as shown below:
						</p>
						<div class="code-viewer svelte-1l9vnro">${validate_component(HighlightSvelte, "HighlightSvelte").$$render($$result, { code: getThemeEditorSlotExampleCode() }, {}, {})}</div></div>
				`}`;
        }
      }
    )}` : ``}</div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_state();
  $$unsubscribe_colorPickerState();
  $$unsubscribe_app();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let editorId;
  return `${$$result.head += `<!-- HEAD_svelte-alf9ot_START -->${$$result.title = `<title>Component Theme Editor by Aaron Luna</title>`, ""}<!-- HEAD_svelte-alf9ot_END -->`, ""}



${validate_component(ComponentEditor, "ComponentCssEditor").$$render($$result, { editorId }, {}, {
    default: () => {
      return `${validate_component(ColorSpaceSelector, "ColorSpaceSelector").$$render($$result, {}, {}, {})}`;
    }
  })}

`;
});
export {
  Page as default
};
