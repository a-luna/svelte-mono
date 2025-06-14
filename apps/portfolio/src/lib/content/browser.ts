import { browser } from '$app/environment';
import type { Result } from '$lib/types';

export function enableCopyCodeButtons() {
	if (!browser) return false;

	document.querySelectorAll<HTMLElement>('[data-code-block-id]').forEach((e) => {
		const codeBlockId = e.dataset.codeBlockId;
		const codeToCopy = document.querySelector<HTMLElement>(`#${codeBlockId}`)?.innerText ?? '';
		e.addEventListener('click', () => copyCodeToClipboard(codeToCopy, e));
		e.addEventListener('mouseenter', () => updateStatusLabel(e, 'copy'));
		e.addEventListener('mouseleave', () => updateStatusLabel(e, 'copy'));
	});
	return true;
}

async function copyCodeToClipboard(codeToCopy: string, button: HTMLElement) {
	let resultClass: string;
	try {
		let result = await copyToClipboard(codeToCopy);
		if (!result.success) {
			result = await copyToClipboardSafari(codeToCopy);
		}
		if (!result.success) {
			console.error(`Failed to copy: ${result.error}`);
		}
		resultClass = result.success ? 'success' : 'error';
	} catch (err) {
		console.error(`Failed to copy: ${err}`);
		resultClass = 'error';
	}
	toggleClass(button.parentNode as HTMLElement, resultClass);
	updateStatusLabel(button, resultClass === 'success' ? 'copied!' : 'error!');
}
async function copyToClipboard(text: string): Promise<Result> {
	if (typeof window !== 'undefined') {
		await navigator.clipboard.writeText(text);
		return { success: true, value: undefined };
	}
	return { success: false, error: 'Error! Failed to copy text to clipboard.' };
}

async function copyToClipboardSafari(textToCopy: string): Promise<Result> {
	if (typeof ClipboardItem && navigator.clipboard.write) {
		const clipboardItem = new ClipboardItem({
			'text/plain': new Promise((r) => setTimeout(r, 10)).then(() => {
				return new Promise((resolve) => {
					resolve(new Blob([textToCopy]));
				});
			}),
		});
		navigator.clipboard.write([clipboardItem]);
		return { success: true, value: undefined };
	} else {
		return { success: false, error: 'Error! Failed to copy text to clipboard.' };
	}
}

function toggleClass(element: HTMLElement | null, className: string) {
	if (element) {
		element.blur();
		element.classList.add(className);
		setTimeout(function () {
			element.classList.remove(className);
			const statusLabel = element.parentNode?.querySelector('.copy-status');
			if (statusLabel) statusLabel.textContent = 'copy';
		}, 1000);
	}
}

function updateStatusLabel(button: HTMLElement, status: string) {
	const statusLabel = button.parentNode?.querySelector('.copy-status');
	if (statusLabel) statusLabel.textContent = status;
}
