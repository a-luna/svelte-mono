export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }) {
	const handleOutsideClick = ({ target }) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update(initialEnabled);
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}

export async function copyToClipboard(text: string) {
	if (typeof window !== 'undefined') {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			console.log('Error! Failed to copy text to clipboard.');
		}
	}
}

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');
