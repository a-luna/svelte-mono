export const CODE_FENCE_REGEX =
	/```(?<lang>[\w-]+)(?:\s{)?(?:(?<linenos>linenos)=table)?(?:,)?(?:linenostart=(?<start1>[\d]+)|hl_lines=\[(?<highlight1>.+)\])?(?:,)?(?:hl_lines=\[(?<highlight2>.+)\]|linenostart=(?<start2>[\d]+))?(?:})?/g;

export const INFO_BOX_REGEX =
	/{{< info_box >}}(?:\s)?(?:<p>)?([\s\S][^{]*)(?:<\/p>)?(?:\s)?{{< \/info_box >}}/g;

export const ALERT_BOX_REGEX =
	/{{< alert_box >}}(?:\s)?(?:<p>)?([\s\S][^{]*)(?:\s)?(?:<p>)?{{< \/alert_box >}}/g;

export const LINKED_IMAGE_REGEX = /{{< linked_image (?<name>.+) >}}/g;

export const VIDEO_REGEX =
	/{{< autoplay_video video="(?<name>[\w]+)"(?: device="(?<device>mobile|desktop)")?(?: width="(?<width>[\d]+)px")? >}}/g;

export const HTML_HEADING_REGEX =
	/<h(?<level>2|3|4|5|6) id="(?<slug>[a-z-]+)">(?<text>.+)<\/(?:h2|h3|h4|h5|h6)>/g;

export const TOX_TEST_RESULTS_REGEX =
	/test session starts [=]+(?:\s)?([\s\S][^=]*)(?:\s)?[=]+ [\d]+ passed/g;

export const copySvgIcon =
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" stroke="currentColor" fill="currentColor" class="s-x0McpB_FEdHb" style="stroke-width: 0; padding: 0px; height: 13px"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>';
