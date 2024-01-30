import { isInitialPageLoad, sectionTransition, url } from '$lib/stores';
// import type { ScreenSize } from '$lib/types';
import { get } from 'svelte/store';
import { isTransitionSection } from './typeguards';

export function typewriter(node: HTMLElement, { delay = 0, speed = 50 }) {
	const thisTransition = get(sectionTransition);
	const from = thisTransition.from;
	let to = thisTransition.to;
	type TextNodeDetails = {
		textNode: ChildNode | null;
		range: { start: number; end: number };
		text: string;
		action: 'type' | 'delete';
	};
	const defaultTextNodeDetails: TextNodeDetails = {
		textNode: null,
		range: { start: 0, end: 0 },
		text: '',
		action: 'type',
	};
	const sectionRoutes = { '/': 'Welcome!', '/projects': 'Projects', '/blog': 'Blog', '/about': 'About Me' };
	const ranges: TextNodeDetails[] = [];
	let totalLength = 0;

	if (get(isInitialPageLoad)) {
		const firstUrl = get(url);
		if (isTransitionSection(firstUrl)) {
			to = firstUrl;
			sectionTransition.set({
				inProgress: true,
				from: '',
				fromComplete: true,
				to: sectionRoutes[firstUrl],
				toComplete: false,
			});
		}
	}
	if (from && isTransitionSection(from)) {
		ranges.push({
			textNode: node,
			range: { start: 0, end: sectionRoutes[from].length },
			text: sectionRoutes[from],
			action: 'delete',
		});
		totalLength += sectionRoutes[from].length;
	}
	if (to && isTransitionSection(to)) {
		ranges.push({
			textNode: node,
			range: { start: totalLength, end: totalLength + sectionRoutes[to].length },
			text: sectionRoutes[to],
			action: 'type',
		});
		totalLength += sectionRoutes[to].length;
	}

	let currentRangeIndex = 0;
	function getCurrentRange(i: number): TextNodeDetails {
		let currentRange = ranges[currentRangeIndex] ?? defaultTextNodeDetails;
		while (currentRange.range.end < i) {
			if (currentRange.textNode) {
				currentRange.textNode.textContent = currentRange.text;
				currentRangeIndex++;
				currentRange = ranges[currentRangeIndex] ?? defaultTextNodeDetails;
				if (currentRangeIndex === 1) {
					sectionTransition.set({ ...get(sectionTransition), fromComplete: true });
				}
			}
		}
		return currentRange;
	}

	return {
		delay,
		duration: totalLength * speed,
		tick: (t: number) => {
			const progress = ~~(totalLength * t);
			const {
				textNode,
				range: { start, end },
				text,
				action,
			} = getCurrentRange(progress);
			const textLength = ((progress - start) / (end - start)) * text.length;
			if (textNode) {
				textNode.textContent = action === 'type' ? text.slice(0, textLength) : text.slice(0, text.length - textLength);
			}
			if (progress === totalLength) {
				sectionTransition.set({ ...get(sectionTransition), toComplete: true, inProgress: false });
			}
		},
	};
}
