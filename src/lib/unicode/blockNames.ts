const unicodeBlocks = [
	{
		start: 0,
		finish: 127,
		block: 'Basic Latin',
	},
	{
		start: 128,
		finish: 255,
		block: 'Latin-1 Supplement',
	},
	{
		start: 256,
		finish: 383,
		block: 'Latin Extended-A',
	},
	{
		start: 384,
		finish: 591,
		block: 'Latin Extended-B',
	},
	{
		start: 592,
		finish: 687,
		block: 'IPA Extensions',
	},
	{
		start: 688,
		finish: 767,
		block: 'Spacing Modifier Letters',
	},
	{
		start: 768,
		finish: 879,
		block: 'Combining Diacritical Marks',
	},
	{
		start: 880,
		finish: 1023,
		block: 'Greek and Coptic',
	},
	{
		start: 1024,
		finish: 1279,
		block: 'Cyrillic',
	},
	{
		start: 1280,
		finish: 1327,
		block: 'Cyrillic Supplement',
	},
	{
		start: 1328,
		finish: 1423,
		block: 'Armenian',
	},
	{
		start: 1424,
		finish: 1535,
		block: 'Hebrew',
	},
	{
		start: 1536,
		finish: 1791,
		block: 'Arabic',
	},
	{
		start: 1792,
		finish: 1871,
		block: 'Syriac',
	},
	{
		start: 1872,
		finish: 1919,
		block: 'Arabic Supplement',
	},
	{
		start: 1920,
		finish: 1983,
		block: 'Thaana',
	},
	{
		start: 1984,
		finish: 2047,
		block: 'NKo',
	},
	{
		start: 2048,
		finish: 2111,
		block: 'Samaritan',
	},
	{
		start: 2112,
		finish: 2143,
		block: 'Mandaic',
	},
	{
		start: 2144,
		finish: 2159,
		block: 'Syriac Supplement',
	},
	{
		start: 2160,
		finish: 2207,
		block: 'Arabic Extended-B',
	},
	{
		start: 2208,
		finish: 2303,
		block: 'Arabic Extended-A',
	},
	{
		start: 2304,
		finish: 2431,
		block: 'Devanagari',
	},
	{
		start: 2432,
		finish: 2559,
		block: 'Bengali',
	},
	{
		start: 2560,
		finish: 2687,
		block: 'Gurmukhi',
	},
	{
		start: 2688,
		finish: 2815,
		block: 'Gujarati',
	},
	{
		start: 2816,
		finish: 2943,
		block: 'Oriya',
	},
	{
		start: 2944,
		finish: 3071,
		block: 'Tamil',
	},
	{
		start: 3072,
		finish: 3199,
		block: 'Telugu',
	},
	{
		start: 3200,
		finish: 3327,
		block: 'Kannada',
	},
	{
		start: 3328,
		finish: 3455,
		block: 'Malayalam',
	},
	{
		start: 3456,
		finish: 3583,
		block: 'Sinhala',
	},
	{
		start: 3584,
		finish: 3711,
		block: 'Thai',
	},
	{
		start: 3712,
		finish: 3839,
		block: 'Lao',
	},
	{
		start: 3840,
		finish: 4095,
		block: 'Tibetan',
	},
	{
		start: 4096,
		finish: 4255,
		block: 'Myanmar',
	},
	{
		start: 4256,
		finish: 4351,
		block: 'Georgian',
	},
	{
		start: 4352,
		finish: 4607,
		block: 'Hangul Jamo',
	},
	{
		start: 4608,
		finish: 4991,
		block: 'Ethiopic',
	},
	{
		start: 4992,
		finish: 5023,
		block: 'Ethiopic Supplement',
	},
	{
		start: 5024,
		finish: 5119,
		block: 'Cherokee',
	},
	{
		start: 5120,
		finish: 5759,
		block: 'Unified Canadian Aboriginal Syllabics',
	},
	{
		start: 5760,
		finish: 5791,
		block: 'Ogham',
	},
	{
		start: 5792,
		finish: 5887,
		block: 'Runic',
	},
	{
		start: 5888,
		finish: 5919,
		block: 'Tagalog',
	},
	{
		start: 5920,
		finish: 5951,
		block: 'Hanunoo',
	},
	{
		start: 5952,
		finish: 5983,
		block: 'Buhid',
	},
	{
		start: 5984,
		finish: 6015,
		block: 'Tagbanwa',
	},
	{
		start: 6016,
		finish: 6143,
		block: 'Khmer',
	},
	{
		start: 6144,
		finish: 6319,
		block: 'Mongolian',
	},
	{
		start: 6320,
		finish: 6399,
		block: 'Unified Canadian Aboriginal Syllabics Extended',
	},
	{
		start: 6400,
		finish: 6479,
		block: 'Limbu',
	},
	{
		start: 6480,
		finish: 6527,
		block: 'Tai Le',
	},
	{
		start: 6528,
		finish: 6623,
		block: 'New Tai Lue',
	},
	{
		start: 6624,
		finish: 6655,
		block: 'Khmer Symbols',
	},
	{
		start: 6656,
		finish: 6687,
		block: 'Buginese',
	},
	{
		start: 6688,
		finish: 6831,
		block: 'Tai Tham',
	},
	{
		start: 6832,
		finish: 6911,
		block: 'Combining Diacritical Marks Extended',
	},
	{
		start: 6912,
		finish: 7039,
		block: 'Balinese',
	},
	{
		start: 7040,
		finish: 7103,
		block: 'Sundanese',
	},
	{
		start: 7104,
		finish: 7167,
		block: 'Batak',
	},
	{
		start: 7168,
		finish: 7247,
		block: 'Lepcha',
	},
	{
		start: 7248,
		finish: 7295,
		block: 'Ol Chiki',
	},
	{
		start: 7296,
		finish: 7311,
		block: 'Cyrillic Extended-C',
	},
	{
		start: 7312,
		finish: 7359,
		block: 'Georgian Extended',
	},
	{
		start: 7360,
		finish: 7375,
		block: 'Sundanese Supplement',
	},
	{
		start: 7376,
		finish: 7423,
		block: 'Vedic Extensions',
	},
	{
		start: 7424,
		finish: 7551,
		block: 'Phonetic Extensions',
	},
	{
		start: 7552,
		finish: 7615,
		block: 'Phonetic Extensions Supplement',
	},
	{
		start: 7616,
		finish: 7679,
		block: 'Combining Diacritical Marks Supplement',
	},
	{
		start: 7680,
		finish: 7935,
		block: 'Latin Extended Additional',
	},
	{
		start: 7936,
		finish: 8191,
		block: 'Greek Extended',
	},
	{
		start: 8192,
		finish: 8303,
		block: 'General Punctuation',
	},
	{
		start: 8304,
		finish: 8351,
		block: 'Superscripts and Subscripts',
	},
	{
		start: 8352,
		finish: 8399,
		block: 'Currency Symbols',
	},
	{
		start: 8400,
		finish: 8447,
		block: 'Combining Diacritical Marks for Symbols',
	},
	{
		start: 8448,
		finish: 8527,
		block: 'Letterlike Symbols',
	},
	{
		start: 8528,
		finish: 8591,
		block: 'Number Forms',
	},
	{
		start: 8592,
		finish: 8703,
		block: 'Arrows',
	},
	{
		start: 8704,
		finish: 8959,
		block: 'Mathematical Operators',
	},
	{
		start: 8960,
		finish: 9215,
		block: 'Miscellaneous Technical',
	},
	{
		start: 9216,
		finish: 9279,
		block: 'Control Pictures',
	},
	{
		start: 9280,
		finish: 9311,
		block: 'Optical Character Recognition',
	},
	{
		start: 9312,
		finish: 9471,
		block: 'Enclosed Alphanumerics',
	},
	{
		start: 9472,
		finish: 9599,
		block: 'Box Drawing',
	},
	{
		start: 9600,
		finish: 9631,
		block: 'Block Elements',
	},
	{
		start: 9632,
		finish: 9727,
		block: 'Geometric Shapes',
	},
	{
		start: 9728,
		finish: 9983,
		block: 'Miscellaneous Symbols',
	},
	{
		start: 9984,
		finish: 10175,
		block: 'Dingbats',
	},
	{
		start: 10176,
		finish: 10223,
		block: 'Miscellaneous Mathematical Symbols-A',
	},
	{
		start: 10224,
		finish: 10239,
		block: 'Supplemental Arrows-A',
	},
	{
		start: 10240,
		finish: 10495,
		block: 'Braille Patterns',
	},
	{
		start: 10496,
		finish: 10623,
		block: 'Supplemental Arrows-B',
	},
	{
		start: 10624,
		finish: 10751,
		block: 'Miscellaneous Mathematical Symbols-B',
	},
	{
		start: 10752,
		finish: 11007,
		block: 'Supplemental Mathematical Operators',
	},
	{
		start: 11008,
		finish: 11263,
		block: 'Miscellaneous Symbols and Arrows',
	},
	{
		start: 11264,
		finish: 11359,
		block: 'Glagolitic',
	},
	{
		start: 11360,
		finish: 11391,
		block: 'Latin Extended-C',
	},
	{
		start: 11392,
		finish: 11519,
		block: 'Coptic',
	},
	{
		start: 11520,
		finish: 11567,
		block: 'Georgian Supplement',
	},
	{
		start: 11568,
		finish: 11647,
		block: 'Tifinagh',
	},
	{
		start: 11648,
		finish: 11743,
		block: 'Ethiopic Extended',
	},
	{
		start: 11744,
		finish: 11775,
		block: 'Cyrillic Extended-A',
	},
	{
		start: 11776,
		finish: 11903,
		block: 'Supplemental Punctuation',
	},
	{
		start: 11904,
		finish: 12031,
		block: 'CJK Radicals Supplement',
	},
	{
		start: 12032,
		finish: 12255,
		block: 'Kangxi Radicals',
	},
	{
		start: 12272,
		finish: 12287,
		block: 'Ideographic Description Characters',
	},
	{
		start: 12288,
		finish: 12351,
		block: 'CJK Symbols and Punctuation',
	},
	{
		start: 12352,
		finish: 12447,
		block: 'Hiragana',
	},
	{
		start: 12448,
		finish: 12543,
		block: 'Katakana',
	},
	{
		start: 12544,
		finish: 12591,
		block: 'Bopomofo',
	},
	{
		start: 12592,
		finish: 12687,
		block: 'Hangul Compatibility Jamo',
	},
	{
		start: 12688,
		finish: 12703,
		block: 'Kanbun',
	},
	{
		start: 12704,
		finish: 12735,
		block: 'Bopomofo Extended',
	},
	{
		start: 12736,
		finish: 12783,
		block: 'CJK Strokes',
	},
	{
		start: 12784,
		finish: 12799,
		block: 'Katakana Phonetic Extensions',
	},
	{
		start: 12800,
		finish: 13055,
		block: 'Enclosed CJK Letters and Months',
	},
	{
		start: 13056,
		finish: 13311,
		block: 'CJK Compatibility',
	},
	{
		start: 13312,
		finish: 19903,
		block: 'CJK Unified Ideographs Extension A',
	},
	{
		start: 19904,
		finish: 19967,
		block: 'Yijing Hexagram Symbols',
	},
	{
		start: 19968,
		finish: 40959,
		block: 'CJK Unified Ideographs',
	},
	{
		start: 40960,
		finish: 42127,
		block: 'Yi Syllables',
	},
	{
		start: 42128,
		finish: 42191,
		block: 'Yi Radicals',
	},
	{
		start: 42192,
		finish: 42239,
		block: 'Lisu',
	},
	{
		start: 42240,
		finish: 42559,
		block: 'Vai',
	},
	{
		start: 42560,
		finish: 42655,
		block: 'Cyrillic Extended-B',
	},
	{
		start: 42656,
		finish: 42751,
		block: 'Bamum',
	},
	{
		start: 42752,
		finish: 42783,
		block: 'Modifier Tone Letters',
	},
	{
		start: 42784,
		finish: 43007,
		block: 'Latin Extended-D',
	},
	{
		start: 43008,
		finish: 43055,
		block: 'Syloti Nagri',
	},
	{
		start: 43056,
		finish: 43071,
		block: 'Common Indic Number Forms',
	},
	{
		start: 43072,
		finish: 43135,
		block: 'Phags-pa',
	},
	{
		start: 43136,
		finish: 43231,
		block: 'Saurashtra',
	},
	{
		start: 43232,
		finish: 43263,
		block: 'Devanagari Extended',
	},
	{
		start: 43264,
		finish: 43311,
		block: 'Kayah Li',
	},
	{
		start: 43312,
		finish: 43359,
		block: 'Rejang',
	},
	{
		start: 43360,
		finish: 43391,
		block: 'Hangul Jamo Extended-A',
	},
	{
		start: 43392,
		finish: 43487,
		block: 'Javanese',
	},
	{
		start: 43488,
		finish: 43519,
		block: 'Myanmar Extended-B',
	},
	{
		start: 43520,
		finish: 43615,
		block: 'Cham',
	},
	{
		start: 43616,
		finish: 43647,
		block: 'Myanmar Extended-A',
	},
	{
		start: 43648,
		finish: 43743,
		block: 'Tai Viet',
	},
	{
		start: 43744,
		finish: 43775,
		block: 'Meetei Mayek Extensions',
	},
	{
		start: 43776,
		finish: 43823,
		block: 'Ethiopic Extended-A',
	},
	{
		start: 43824,
		finish: 43887,
		block: 'Latin Extended-E',
	},
	{
		start: 43888,
		finish: 43967,
		block: 'Cherokee Supplement',
	},
	{
		start: 43968,
		finish: 44031,
		block: 'Meetei Mayek',
	},
	{
		start: 44032,
		finish: 55215,
		block: 'Hangul Syllables',
	},
	{
		start: 55216,
		finish: 55295,
		block: 'Hangul Jamo Extended-B',
	},
	{
		start: 55296,
		finish: 56191,
		block: 'High Surrogates',
	},
	{
		start: 56192,
		finish: 56319,
		block: 'High Private Use Surrogates',
	},
	{
		start: 56320,
		finish: 57343,
		block: 'Low Surrogates',
	},
	{
		start: 57344,
		finish: 63743,
		block: 'Private Use Area',
	},
	{
		start: 63744,
		finish: 64255,
		block: 'CJK Compatibility Ideographs',
	},
	{
		start: 64256,
		finish: 64335,
		block: 'Alphabetic Presentation Forms',
	},
	{
		start: 64336,
		finish: 65023,
		block: 'Arabic Presentation Forms-A',
	},
	{
		start: 65024,
		finish: 65039,
		block: 'Variation Selectors',
	},
	{
		start: 65040,
		finish: 65055,
		block: 'Vertical Forms',
	},
	{
		start: 65056,
		finish: 65071,
		block: 'Combining Half Marks',
	},
	{
		start: 65072,
		finish: 65103,
		block: 'CJK Compatibility Forms',
	},
	{
		start: 65104,
		finish: 65135,
		block: 'Small Form Variants',
	},
	{
		start: 65136,
		finish: 65279,
		block: 'Arabic Presentation Forms-B',
	},
	{
		start: 65280,
		finish: 65519,
		block: 'Halfwidth and Fullwidth Forms',
	},
	{
		start: 65520,
		finish: 65535,
		block: 'Specials',
	},
	{
		start: 65536,
		finish: 65663,
		block: 'Linear B Syllabary',
	},
	{
		start: 65664,
		finish: 65791,
		block: 'Linear B Ideograms',
	},
	{
		start: 65792,
		finish: 65855,
		block: 'Aegean Numbers',
	},
	{
		start: 65856,
		finish: 65935,
		block: 'Ancient Greek Numbers',
	},
	{
		start: 65936,
		finish: 65999,
		block: 'Ancient Symbols',
	},
	{
		start: 66000,
		finish: 66047,
		block: 'Phaistos Disc',
	},
	{
		start: 66176,
		finish: 66207,
		block: 'Lycian',
	},
	{
		start: 66208,
		finish: 66271,
		block: 'Carian',
	},
	{
		start: 66272,
		finish: 66303,
		block: 'Coptic Epact Numbers',
	},
	{
		start: 66304,
		finish: 66351,
		block: 'Old Italic',
	},
	{
		start: 66352,
		finish: 66383,
		block: 'Gothic',
	},
	{
		start: 66384,
		finish: 66431,
		block: 'Old Permic',
	},
	{
		start: 66432,
		finish: 66463,
		block: 'Ugaritic',
	},
	{
		start: 66464,
		finish: 66527,
		block: 'Old Persian',
	},
	{
		start: 66560,
		finish: 66639,
		block: 'Deseret',
	},
	{
		start: 66640,
		finish: 66687,
		block: 'Shavian',
	},
	{
		start: 66688,
		finish: 66735,
		block: 'Osmanya',
	},
	{
		start: 66736,
		finish: 66815,
		block: 'Osage',
	},
	{
		start: 66816,
		finish: 66863,
		block: 'Elbasan',
	},
	{
		start: 66864,
		finish: 66927,
		block: 'Caucasian Albanian',
	},
	{
		start: 66928,
		finish: 67007,
		block: 'Vithkuqi',
	},
	{
		start: 67072,
		finish: 67455,
		block: 'Linear A',
	},
	{
		start: 67456,
		finish: 67519,
		block: 'Latin Extended-F',
	},
	{
		start: 67584,
		finish: 67647,
		block: 'Cypriot Syllabary',
	},
	{
		start: 67648,
		finish: 67679,
		block: 'Imperial Aramaic',
	},
	{
		start: 67680,
		finish: 67711,
		block: 'Palmyrene',
	},
	{
		start: 67712,
		finish: 67759,
		block: 'Nabataean',
	},
	{
		start: 67808,
		finish: 67839,
		block: 'Hatran',
	},
	{
		start: 67840,
		finish: 67871,
		block: 'Phoenician',
	},
	{
		start: 67872,
		finish: 67903,
		block: 'Lydian',
	},
	{
		start: 67968,
		finish: 67999,
		block: 'Meroitic Hieroglyphs',
	},
	{
		start: 68000,
		finish: 68095,
		block: 'Meroitic Cursive',
	},
	{
		start: 68096,
		finish: 68191,
		block: 'Kharoshthi',
	},
	{
		start: 68192,
		finish: 68223,
		block: 'Old South Arabian',
	},
	{
		start: 68224,
		finish: 68255,
		block: 'Old North Arabian',
	},
	{
		start: 68288,
		finish: 68351,
		block: 'Manichaean',
	},
	{
		start: 68352,
		finish: 68415,
		block: 'Avestan',
	},
	{
		start: 68416,
		finish: 68447,
		block: 'Inscriptional Parthian',
	},
	{
		start: 68448,
		finish: 68479,
		block: 'Inscriptional Pahlavi',
	},
	{
		start: 68480,
		finish: 68527,
		block: 'Psalter Pahlavi',
	},
	{
		start: 68608,
		finish: 68687,
		block: 'Old Turkic',
	},
	{
		start: 68736,
		finish: 68863,
		block: 'Old Hungarian',
	},
	{
		start: 68864,
		finish: 68927,
		block: 'Hanifi Rohingya',
	},
	{
		start: 69216,
		finish: 69247,
		block: 'Rumi Numeral Symbols',
	},
	{
		start: 69248,
		finish: 69311,
		block: 'Yezidi',
	},
	{
		start: 69376,
		finish: 69423,
		block: 'Old Sogdian',
	},
	{
		start: 69424,
		finish: 69487,
		block: 'Sogdian',
	},
	{
		start: 69488,
		finish: 69551,
		block: 'Old Uyghur',
	},
	{
		start: 69552,
		finish: 69599,
		block: 'Chorasmian',
	},
	{
		start: 69600,
		finish: 69631,
		block: 'Elymaic',
	},
	{
		start: 69632,
		finish: 69759,
		block: 'Brahmi',
	},
	{
		start: 69760,
		finish: 69839,
		block: 'Kaithi',
	},
	{
		start: 69840,
		finish: 69887,
		block: 'Sora Sompeng',
	},
	{
		start: 69888,
		finish: 69967,
		block: 'Chakma',
	},
	{
		start: 69968,
		finish: 70015,
		block: 'Mahajani',
	},
	{
		start: 70016,
		finish: 70111,
		block: 'Sharada',
	},
	{
		start: 70112,
		finish: 70143,
		block: 'Sinhala Archaic Numbers',
	},
	{
		start: 70144,
		finish: 70223,
		block: 'Khojki',
	},
	{
		start: 70272,
		finish: 70319,
		block: 'Multani',
	},
	{
		start: 70320,
		finish: 70399,
		block: 'Khudawadi',
	},
	{
		start: 70400,
		finish: 70527,
		block: 'Grantha',
	},
	{
		start: 70656,
		finish: 70783,
		block: 'Newa',
	},
	{
		start: 70784,
		finish: 70879,
		block: 'Tirhuta',
	},
	{
		start: 71040,
		finish: 71167,
		block: 'Siddham',
	},
	{
		start: 71168,
		finish: 71263,
		block: 'Modi',
	},
	{
		start: 71264,
		finish: 71295,
		block: 'Mongolian Supplement',
	},
	{
		start: 71296,
		finish: 71375,
		block: 'Takri',
	},
	{
		start: 71424,
		finish: 71503,
		block: 'Ahom',
	},
	{
		start: 71680,
		finish: 71759,
		block: 'Dogra',
	},
	{
		start: 71840,
		finish: 71935,
		block: 'Warang Citi',
	},
	{
		start: 71936,
		finish: 72031,
		block: 'Dives Akuru',
	},
	{
		start: 72096,
		finish: 72191,
		block: 'Nandinagari',
	},
	{
		start: 72192,
		finish: 72271,
		block: 'Zanabazar Square',
	},
	{
		start: 72272,
		finish: 72367,
		block: 'Soyombo',
	},
	{
		start: 72368,
		finish: 72383,
		block: 'Unified Canadian Aboriginal Syllabics Extended-A',
	},
	{
		start: 72384,
		finish: 72447,
		block: 'Pau Cin Hau',
	},
	{
		start: 72704,
		finish: 72815,
		block: 'Bhaiksuki',
	},
	{
		start: 72816,
		finish: 72895,
		block: 'Marchen',
	},
	{
		start: 72960,
		finish: 73055,
		block: 'Masaram Gondi',
	},
	{
		start: 73056,
		finish: 73135,
		block: 'Gunjala Gondi',
	},
	{
		start: 73440,
		finish: 73471,
		block: 'Makasar',
	},
	{
		start: 73648,
		finish: 73663,
		block: 'Lisu Supplement',
	},
	{
		start: 73664,
		finish: 73727,
		block: 'Tamil Supplement',
	},
	{
		start: 73728,
		finish: 74751,
		block: 'Cuneiform',
	},
	{
		start: 74752,
		finish: 74879,
		block: 'Cuneiform Numbers and Punctuation',
	},
	{
		start: 74880,
		finish: 75087,
		block: 'Early Dynastic Cuneiform',
	},
	{
		start: 77712,
		finish: 77823,
		block: 'Cypro-Minoan',
	},
	{
		start: 77824,
		finish: 78895,
		block: 'Egyptian Hieroglyphs',
	},
	{
		start: 78896,
		finish: 78911,
		block: 'Egyptian Hieroglyph Format Controls',
	},
	{
		start: 82944,
		finish: 83583,
		block: 'Anatolian Hieroglyphs',
	},
	{
		start: 92160,
		finish: 92735,
		block: 'Bamum Supplement',
	},
	{
		start: 92736,
		finish: 92783,
		block: 'Mro',
	},
	{
		start: 92784,
		finish: 92879,
		block: 'Tangsa',
	},
	{
		start: 92880,
		finish: 92927,
		block: 'Bassa Vah',
	},
	{
		start: 92928,
		finish: 93071,
		block: 'Pahawh Hmong',
	},
	{
		start: 93760,
		finish: 93855,
		block: 'Medefaidrin',
	},
	{
		start: 93952,
		finish: 94111,
		block: 'Miao',
	},
	{
		start: 94176,
		finish: 94207,
		block: 'Ideographic Symbols and Punctuation',
	},
	{
		start: 94208,
		finish: 100351,
		block: 'Tangut',
	},
	{
		start: 100352,
		finish: 101119,
		block: 'Tangut Components',
	},
	{
		start: 101120,
		finish: 101631,
		block: 'Khitan Small Script',
	},
	{
		start: 101632,
		finish: 101759,
		block: 'Tangut Supplement',
	},
	{
		start: 110576,
		finish: 110591,
		block: 'Kana Extended-B',
	},
	{
		start: 110592,
		finish: 110847,
		block: 'Kana Supplement',
	},
	{
		start: 110848,
		finish: 110895,
		block: 'Kana Extended-A',
	},
	{
		start: 110896,
		finish: 110959,
		block: 'Small Kana Extension',
	},
	{
		start: 110960,
		finish: 111359,
		block: 'Nushu',
	},
	{
		start: 113664,
		finish: 113823,
		block: 'Duployan',
	},
	{
		start: 113824,
		finish: 113839,
		block: 'Shorthand Format Controls',
	},
	{
		start: 118528,
		finish: 118735,
		block: 'Znamenny Musical Notation',
	},
	{
		start: 118784,
		finish: 119039,
		block: 'Byzantine Musical Symbols',
	},
	{
		start: 119040,
		finish: 119295,
		block: 'Musical Symbols',
	},
	{
		start: 119296,
		finish: 119375,
		block: 'Ancient Greek Musical Notation',
	},
	{
		start: 119520,
		finish: 119551,
		block: 'Mayan Numerals',
	},
	{
		start: 119552,
		finish: 119647,
		block: 'Tai Xuan Jing Symbols',
	},
	{
		start: 119648,
		finish: 119679,
		block: 'Counting Rod Numerals',
	},
	{
		start: 119808,
		finish: 120831,
		block: 'Mathematical Alphanumeric Symbols',
	},
	{
		start: 120832,
		finish: 121519,
		block: 'Sutton SignWriting',
	},
	{
		start: 122624,
		finish: 122879,
		block: 'Latin Extended-G',
	},
	{
		start: 122880,
		finish: 122927,
		block: 'Glagolitic Supplement',
	},
	{
		start: 123136,
		finish: 123215,
		block: 'Nyiakeng Puachue Hmong',
	},
	{
		start: 123536,
		finish: 123583,
		block: 'Toto',
	},
	{
		start: 123584,
		finish: 123647,
		block: 'Wancho',
	},
	{
		start: 124896,
		finish: 124927,
		block: 'Ethiopic Extended-B',
	},
	{
		start: 124928,
		finish: 125151,
		block: 'Mende Kikakui',
	},
	{
		start: 125184,
		finish: 125279,
		block: 'Adlam',
	},
	{
		start: 126064,
		finish: 126143,
		block: 'Indic Siyaq Numbers',
	},
	{
		start: 126208,
		finish: 126287,
		block: 'Ottoman Siyaq Numbers',
	},
	{
		start: 126464,
		finish: 126719,
		block: 'Arabic Mathematical Alphabetic Symbols',
	},
	{
		start: 126976,
		finish: 127023,
		block: 'Mahjong Tiles',
	},
	{
		start: 127024,
		finish: 127135,
		block: 'Domino Tiles',
	},
	{
		start: 127136,
		finish: 127231,
		block: 'Playing Cards',
	},
	{
		start: 127232,
		finish: 127487,
		block: 'Enclosed Alphanumeric Supplement',
	},
	{
		start: 127488,
		finish: 127743,
		block: 'Enclosed Ideographic Supplement',
	},
	{
		start: 127744,
		finish: 128511,
		block: 'Miscellaneous Symbols and Pictographs',
	},
	{
		start: 128512,
		finish: 128591,
		block: 'Emoticons',
	},
	{
		start: 128592,
		finish: 128639,
		block: 'Ornamental Dingbats',
	},
	{
		start: 128640,
		finish: 128767,
		block: 'Transport and Map Symbols',
	},
	{
		start: 128768,
		finish: 128895,
		block: 'Alchemical Symbols',
	},
	{
		start: 128896,
		finish: 129023,
		block: 'Geometric Shapes Extended',
	},
	{
		start: 129024,
		finish: 129279,
		block: 'Supplemental Arrows-C',
	},
	{
		start: 129280,
		finish: 129535,
		block: 'Supplemental Symbols and Pictographs',
	},
	{
		start: 129536,
		finish: 129647,
		block: 'Chess Symbols',
	},
	{
		start: 129648,
		finish: 129791,
		block: 'Symbols and Pictographs Extended-A',
	},
	{
		start: 129792,
		finish: 130047,
		block: 'Symbols for Legacy Computing',
	},
];

export const getBlockContainingCodepoint = (codepoint: number): string =>
	unicodeBlocks.find((block) => block.start <= codepoint && codepoint <= block.finish)?.block;
