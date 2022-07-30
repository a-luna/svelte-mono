export const getCodeBlock1 = (): string => `<div class="highlight">
  <pre class="chroma">
    <code class="language-xxxx">
      (the code we wish to copy)
    </code>
  </pre>
</div>`;

export const getCodeBlock2 = (): string => `<div class="highlight">
  <div class="chroma">
    <table class="lntable">
      <tbody>
        <tr>
          <td class="lntd">(line numbers are rendered here)</td>
          <td class="lntd">
            <pre class="chroma">
              <code class="language-xxxx">
                (the code we wish to copy)
              </code>
            </pre>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;

export const getCodeBlock3 = (): string => `.highlight-wrapper {
  display: block;
}

.highlight {
  position: relative;
  z-index: 0;
  padding: 0;
  margin: 0;
  border-radius: 4px;
}

.highlight > .chroma {
  color: #d0d0d0;
  background-color: #212121;
  position: static;
  z-index: 1;
  border-radius: 4px;
  padding: 10px;
}

.chroma .lntd:first-child {
  padding: 7px 7px 7px 10px;
  margin: 0;
}

.chroma .lntd:last-child {
  padding: 7px 10px 7px 7px;
  margin: 0;
}

.copy-code-button {
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0.5px;
  width: 65px;
  color: #232326;
  background-color: #7f7f7f;
  border: 1.25px solid #232326;
  border-top-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 4px;
  white-space: nowrap;
  padding: 4px 4px 5px 4px;
  margin: 0 0 0 1px;
  cursor: pointer;
  opacity: 0.6;
}

.copy-code-button:hover,
.copy-code-button:focus,
.copy-code-button:active,
.copy-code-button:active:hover {
  color: #222225;
  background-color: #b3b3b3;
  opacity: 0.8;
}

.copyable-text-area {
  position: absolute;
  height: 0;
  z-index: -1;
  opacity: 0.01;
}`;

export const getCodeBlock4 =
  (): string => `function createCopyButton(highlightDiv) {
  const button = document.createElement("button");
  button.className = "copy-code-button";
  button.type = "button";
  button.innerText = "Copy";
  button.addEventListener("click", () =>
    copyCodeToClipboard(button, highlightDiv)
  );
  addCopyButtonToDom(button, highlightDiv);
}

async function copyCodeToClipboard(button, highlightDiv) {
  const codeToCopy = highlightDiv.querySelector(
    ":last-child > .chroma > code"
  ).innerText;
  try {
    result = await navigator.permissions.query({ name: "clipboard-write" });
    if (result.state == "granted" || result.state == "prompt") {
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      copyCodeBlockExecCommand(codeToCopy, highlightDiv);
    }
  } catch (_) {
    copyCodeBlockExecCommand(codeToCopy, highlightDiv);
  } finally {
    codeWasCopied(button);
  }
}

function copyCodeBlockExecCommand(codeToCopy, highlightDiv) {
  const textArea = document.createElement("textArea");
  textArea.contentEditable = "true";
  textArea.readOnly = "false";
  textArea.className = "copyable-text-area";
  textArea.value = codeToCopy;
  highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
  const range = document.createRange();
  range.selectNodeContents(textArea);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  textArea.setSelectionRange(0, 999999);
  document.execCommand("copy");
  highlightDiv.removeChild(textArea);
}

function codeWasCopied(button) {
  button.blur();
  button.innerText = "Copied!";
  setTimeout(function () {
    button.innerText = "Copy";
  }, 2000);
}

function addCopyButtonToDom(button, highlightDiv) {
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
  const wrapper = document.createElement("div");
  wrapper.className = "highlight-wrapper";
  highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
  wrapper.appendChild(highlightDiv);
}

document
  .querySelectorAll(".highlight")
  .forEach((highlightDiv) => createCopyButton(highlightDiv));`;
