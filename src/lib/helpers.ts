import type { ComponentColor } from '$lib/types';
import { COMPONENT_COLORS } from '$lib/types';

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
		},
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

export function groupByProperty<T>(array: T[], property: keyof T): Record<string, T[]> {
	return array.reduce((grouped, item) => {
		const groupVal = item[property].toString();
		grouped[groupVal] = grouped[groupVal] || [];
		grouped[groupVal].push(item);
		return grouped;
	}, {});
}

export const getRandomArrayItem = (array: readonly string[]) => array[Math.floor(Math.random() * array.length)];

export function isComponentColor(arg: string): arg is ComponentColor {
	return COMPONENT_COLORS.includes(arg as ComponentColor);
}
