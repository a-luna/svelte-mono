import type { LabelState, TemporaryLabelState } from '$lib/types';

export const isCssStyleRule = (rule: CSSRule): rule is CSSStyleRule => rule instanceof CSSStyleRule;

export const isTemporaryLabelState = (state: LabelState): state is TemporaryLabelState =>
	['copied', 'error', 'success'].includes(state as TemporaryLabelState);
