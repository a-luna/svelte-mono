export const normalize = (s: string): string => s.replaceAll(/[\s-_]/g, '').toLowerCase();
export const getVariableName = (x: object) => Object.keys(x)[0];
export const objectIsEmpty = (obj: object) => JSON.stringify(obj) === '{}';
export const divmod = (x: number, y: number): [number, number] => [(x / y) | 0, x % y];

export function getRandomHexString(options: { length: number }): string {
	const { length } = options;
	return Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');
}

export const copyObject = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export function groupByProperty<T>(array: T[], property: keyof T): { [k: string]: T[] } {
	return array.reduce(
		(grouped, item) => {
			const groupVal = item[property] as string;
			grouped[groupVal] = grouped[groupVal] || [];
			grouped[groupVal]?.push(item);
			return grouped;
		},
		{} as { [k: string]: T[] },
	);
}

export function getRandomArrayItem<T>(array: readonly T[]): T | undefined {
	return array[Math.floor(Math.random() * array.length)];
}

export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }: { enabled: boolean; cb: () => void }) {
	const handleOutsideClick = ({ target }: { target: EventTarget | null }) => {
		if (target instanceof Node) {
			if (!node.contains(target)) {
				cb();
			}
		}
	};

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		},
	};
}

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}
