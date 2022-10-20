// These RegExps are directly copied from the implementation of the _stringToArray function in lodash
// (https://github.com/lodash/lodash/blob/4.13.1-npm/_stringToArray.js)

/** Used to compose unicode character classes. */
const astralRangePattern = '\\ud800-\\udfff',
	comboMarksRangePattern = '\\u0300-\\u036f\\ufe20-\\ufe23',
	comboSymbolsRangePattern = '\\u20d0-\\u20f0',
	varRangePattern = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
const astralPattern = `[${astralRangePattern}]`,
	comboPattern = `[${comboMarksRangePattern}${comboSymbolsRangePattern}]`,
	fitzPattern = '\\ud83c[\\udffb-\\udfff]',
	modifierPattern = `(?:${comboPattern}|${fitzPattern})`,
	nonAstralPattern = `[^${astralRangePattern}]`,
	regionalPattern = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	surrPairPattern = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	zwjPattern = '\\u200d';

/** Used to compose unicode regexes. */
const optModPattern = `${modifierPattern}?`,
	optVarPattern = `[${varRangePattern}]?`,
	optJoinPattern = `(?:${zwjPattern}(?:${nonAstralPattern}|${regionalPattern}|${surrPairPattern})${optVarPattern}${optModPattern})*`,
	seqPattern = `${optVarPattern}${optModPattern}${optJoinPattern}`,
	symbolPattern = `(?:${nonAstralPattern}${comboPattern}?|${comboPattern}|${regionalPattern}|${surrPairPattern}|${astralPattern})`;

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
export const COMPLEX_SYMBOL_REGEX = RegExp(`${fitzPattern}(?=${fitzPattern})|${symbolPattern}${seqPattern}`, 'g');
